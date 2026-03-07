# รายงานการตรวจสอบความปลอดภัยเว็บไซต์ — ViralHookLab.com

**วันที่ตรวจสอบ:** มีนาคม 2026  
**ขอบเขต:** โค้ดเบส (middleware, API, auth, headers, input, webhooks, admin)  
**หมายเหตุ:** รายงานนี้เป็นการตรวจสอบเท่านั้น ไม่มีการแก้ไขโค้ดใดๆ

---

## 1. สรุปผลการตรวจสอบ

| หมวด | สถานะ | หมายเหตุสั้นๆ |
|------|--------|------------------|
| Security Headers (CSP, HSTS, X-Frame-Options ฯลฯ) | ✅ ผ่าน | ใช้ใน production ครบ |
| การยืนยันตัวตน (Clerk) | ✅ ผ่าน | API ที่ต้อง login ใช้ auth() |
| Webhooks (Stripe, Clerk) | ✅ ผ่าน | ตรวจ signature ก่อนประมวลผล |
| Admin API | ✅ ผ่าน | ใช้ header x-admin-secret กับ ADMIN_SECRET |
| Rate limiting | ✅ ผ่าน | ใช้ทั้ง global และ generate แยก + Redis ได้ |
| CORS / Origin | ✅ ผ่าน | ตรวจ origin/referer สำหรับ POST |
| Input / XSS / Injection | ✅ ผ่าน | มีการ sanitize และ block pattern อันตราย |
| บล็อก bot / URL น่าสงสัย | ✅ ผ่าน | User-Agent และ URL patterns |
| ความลับ (secrets) | ✅ ผ่าน | ไม่ส่ง secret ไป client |
| Health endpoint | ⚠️ ข้อมูลจำกัด | Production ใช้ token ได้ แค่ระวังการเปิดเผยสถานะ env |

---

## 2. รายละเอียดตามหมวด

### 2.1 Security Headers (Production)

- **Content-Security-Policy (CSP):** กำหนด default-src 'self', base-uri, form-action, frame-ancestors, object-src 'none', upgrade-insecure-requests และอนุญาต script/style/img/font/connect/frame เฉพาะ domain ที่จำเป็น (Clerk, Google Analytics, AdSense) — ลดความเสี่ยง XSS และการโหลดสคริปต์จากแหล่งที่ไม่น่าเชื่อถือ
- **X-Frame-Options: SAMEORIGIN** — ป้องกันการใส่ไซต์ใน iframe จาก domain อื่น (clickjacking)
- **X-Content-Type-Options: nosniff** — บังคับให้เบราว์เซอร์ใช้ content-type ตามที่ส่ง
- **Referrer-Policy: strict-origin-when-cross-origin** — จำกัดการส่ง referrer ข้ามไซต์
- **Strict-Transport-Security:** max-age=63072000; includeSubDomains; preload — บังคับใช้ HTTPS
- **Permissions-Policy:** ปิด camera, microphone, geolocation, interest-cohort

Headers ใช้เฉพาะเมื่อ `NODE_ENV === "production"` เท่านั้น

---

### 2.2 การยืนยันตัวตน (Authentication)

- **Clerk** ใช้ผ่าน `auth()` และ `currentUser()` จาก `@clerk/nextjs/server`
- **API ที่ต้อง login:**  
  `/api/credits`, `/api/generate`, `/api/stripe/checkout`, `/api/stripe/checkout-status`, `/api/stripe/customer-portal`, `/api/profile/ensure` ใช้ `auth()` และตอบ 401 ถ้าไม่มี userId
- **Middleware:** ใช้ `clerkMiddleware` ทำให้ route ที่ต้องการ auth ถูกตรวจโดย Clerk
- **ไม่มี JWT หรือ session ฝั่งเซิร์ฟเวอร์ที่เขียนเอง** — ใช้บริการ Clerk ทั้งหมด

---

### 2.3 Webhooks

**Stripe (`/api/webhooks/stripe`):**

- ต้องมี header `stripe-signature`
- ใช้ `stripe.webhooks.constructEvent(body, signature, secret)` ตรวจความถูกต้องก่อนประมวลผล
- ถ้า signature ไม่ตรง ตอบ 400 ไม่ทำอะไรกับ request

**Clerk (`/api/webhooks/clerk`):**

- ต้องมี headers `svix-id`, `svix-timestamp`, `svix-signature`
- ใช้ `Webhook(secret).verify(payload, headers)` (svix) ตรวจก่อนประมวลผล
- ถ้า verify ไม่ผ่าน ตอบ 400

ทั้งคู่ใช้ secret จาก env (`STRIPE_WEBHOOK_SECRET`, `CLERK_WEBHOOK_SECRET`) และไม่ประมวลผล request ที่ตรวจสอบลายเซ็นไม่ผ่าน

---

### 2.4 Admin API (`/api/admin/grant-credits`)

- ต้องส่ง header **`x-admin-secret`** ให้ตรงกับค่า **`ADMIN_SECRET`** ใน env
- ถ้าไม่มีหรือไม่ตรง ตอบ 401 Unauthorized
- Middleware อนุญาต path `/api/admin/` ให้ผ่าน (ไม่โดนบล็อก origin) แต่การเข้าถึงจริงยังขึ้นกับ admin secret
- ควรเก็บ `ADMIN_SECRET` ให้ยาวและไม่เดาได้ และไม่เปิดเผยที่ client

---

### 2.5 Rate Limiting

- **Global API (middleware):** จำกัดจำนวน request ต่อ IP ต่อ 10 นาที (ค่าเริ่มต้น 120 ครั้ง, ใช้ `API_RATE_LIMIT_GLOBAL`)
- **Generate API:** จำกัดแยกต่อ IP ต่อ 10 นาที (ค่าเริ่มต้น 25 ครั้ง, ใช้ `API_GENERATE_RATE_LIMIT`)
- ใช้ key แบบ `mw:api:{ip}` และสำหรับ generate มี key แยก
- รองรับ **Upstash Redis** (ถ้ามี `UPSTASH_REDIS_REST_URL` และ `UPSTASH_REDIS_REST_TOKEN`) เพื่อ limit แบบกระจาย ถ้าไม่มีใช้ in-memory store
- ตอบ 429 พร้อม header `Retry-After` เมื่อเกิน limit

ช่วยลดความเสี่ยงจากการโจมตีแบบ brute force / DDoS แบบธรรมดา

---

### 2.6 CORS และ Origin

- **getAllowedOriginForRequest:** ใช้ค่าจาก `ALLOWED_ORIGINS` (env) และ/หรือ `NEXT_PUBLIC_SITE_URL` / `siteConfig.url`
- **Production POST:** ถ้าไม่มี header `Origin` จะดู `Referer` ว่า same-origin หรือไม่; อนุญาตเฉพาะ path บางตัว (เช่น `/api/stripe/checkout`, `/api/generate`) เมื่อ referer same-origin
- ถ้ามี `Origin` แต่ไม่อยู่ในรายการที่อนุญาต → ตอบ 403
- Webhook และ admin ไม่ตรวจ origin (ข้ามใน middleware)

ลดความเสี่ยงการเรียก API จาก domain อื่นที่ไม่ได้ตั้งใจอนุญาต

---

### 2.7 ขนาด Request และ Method

- **Body size:** จำกัดความยาวจาก header `Content-Length` ไม่เกิน `API_MAX_BODY_BYTES` (ค่าเริ่มต้น 20000) — ตอบ 413 ถ้าเกิน
- **HTTP method:** อนุญาตเฉพาะ GET, POST, OPTIONS สำหรับ API ที่ middleware ตรวจ — method อื่นได้ 405

---

### 2.8 Input และการป้องกัน XSS / Injection

- **lib/security/input.ts:**  
  - ลบ/แทนที่ control characters, อักขระอันตราย `<>{}`$\\`, จำกัดความยาว (topic 280, tool 120, email 254)  
  - ตรวจ pattern น่าสงสัย: script, javascript:, onerror, onload, union select, drop table, insert into, delete from, ../, $where, $ne
- **Generate API:** ใช้ `sanitizeTopicInput`, `sanitizeToolInput`, `isValidTopicInput`, `containsSuspiciousInput` — ถ้า input ไม่ผ่านจะไม่ส่งไปยัง AI
- **Supabase:** ใช้ RPC ที่รับพารามิเตอร์ (เช่น `p_user_id`, `p_amount`) และใช้ client `.from().select().eq().update()` โดยไม่มี raw SQL ที่ต่อสตริงจาก input — ลดความเสี่ยง SQL injection

---

### 2.9 บล็อก Bot และ URL น่าสงสัย

- **User-Agent ที่ถูกบล็อก (ตัวอย่าง):** sqlmap, nikto, nmap, masscan, zgrab, acunetix, nessus, dirbuster, gobuster, crawler4j, httpclient, python-requests, scrapy  
  ยกเว้น crawler ที่อนุญาต (เช่น googlebot, bingbot, duckduckbot ฯลฯ)
- **URL/query string ที่ถือว่าสงสัย (ตัวอย่าง):** &lt;script, union select, drop table, wp-admin, ../  
  ถ้าตรงจะตอบ 403 และไม่ส่งต่อ request

ช่วยลดการสแกนและโจมตีจากเครื่องมืออัตโนมัติ

---

### 2.10 ความลับ (Secrets)

- **ไม่มีการส่งค่า secret ไปยัง client:**  
  CLERK_SECRET_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SUPABASE_SERVICE_ROLE_KEY, ADMIN_SECRET, API keys (Gemini/OpenAI) ใช้เฉพาะฝั่ง server (API routes / server components)
- **ตัวแปรที่ขึ้นต้นด้วย NEXT_PUBLIC_** ถูกออกแบบให้เปิดเผยได้ (เช่น NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) และไม่มีค่าเช่น private key อยู่ในนั้น

---

### 2.11 Health endpoint (`/api/health`)

- ใน **production** ถ้ามี `HEALTHCHECK_TOKEN` จะยืนยัน header **`x-health-token`** ว่าตรงกับ token นั้น ถ้าไม่ตรงตอบ 401
- Response มีเฉพาะสถานะแบบ "Set" / "Missing" สำหรับ env ต่างๆ ไม่มีค่า actual secret — เป็นการเปิดเผยข้อมูลจำกัดว่ามีการตั้งค่าอะไรบ้าง

แนะนำ: ใช้ HEALTHCHECK_TOKEN ให้ยาวและไม่เดาได้ และจำกัดการเข้าถึง (เช่น ใช้เฉพาะจากระบบ monitoring ที่รู้ token)

---

### 2.12 โครงสร้างและจุดที่อาจต้องดูแลต่อ (ไม่ใช่ข้อบกพร่องร้ายแรง)

- **Admin secret comparison:** ใช้การเทียบสตริงธรรมดา (`provided !== adminSecret`) — ในทางทฤษฎีอาจมีผลต่อ timing attack ได้เล็กน้อย สำหรับ admin ที่ใช้ไม่บ่อยและเก็บ secret ให้แข็งแรงถือว่ายอมรับได้
- **CSP มี 'unsafe-inline'** สำหรับ script และ style — มาจากความจำเป็นของ third-party (Clerk, analytics, ads) การลด unsafe-inline ในอนาคตอาจต้องปรับตามการ migrate ไปใช้ nonce หรือ hash
- **Rate limit ใช้ IP จาก x-forwarded-for / x-real-ip** — ถ้า reverse proxy ไม่ตั้งค่าให้ถูกต้อง อาจถูก bypass ได้บางกรณี ขึ้นกับสภาพ deploy จริง

---

## 3. สรุปท้ายรายงาน

- **ภาพรวม:** โครงสร้างความปลอดภัยของเว็บอยู่ในระดับดี — มีการตรวจสอบตัวตน, ตรวจ signature webhook, จำกัด origin, rate limit, จำกัด input และบล็อก bot/URL น่าสงสัย รวมถึง security headers ครบใน production
- **ความเสี่ยงร้ายแรง (critical):** จากการตรวจสอบไม่พบจุดที่เปิดช่องให้แฮกหรือก่อกวนโดยตรง เช่น ไม่พบการส่ง secret ไป client, ไม่พบการประมวลผล webhook โดยไม่ตรวจ signature, ไม่พบ API ที่ควรต้อง login แต่ไม่เช็ค auth
- **ข้อควรปฏิบัติต่อ:** เก็บค่า env ทั้งหมด (โดยเฉพาะ CLERK, STRIPE, SUPABASE, ADMIN_SECRET, HEALTHCHECK_TOKEN) ในที่ปลอดภัย ไม่ commit ใน repo และใช้ความสามารถของ Vercel/platform ในการจัดการ secret; ตั้ง ADMIN_SECRET และ HEALTHCHECK_TOKEN ให้ยาวและไม่เดาได้

**รายงานนี้จัดทำเพื่อใช้ประกอบการตรวจสอบความปลอดภัยเท่านั้น ไม่มีการแก้ไขไฟล์หรือโค้ดใดๆ ตามที่กำหนด**
