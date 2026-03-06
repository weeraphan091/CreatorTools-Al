# วิธีเช็คว่าอะไรพัง (ViralHookLab)

## 1. ใช้ Health Check API (แนะนำ)

หลัง deploy แล้วเปิดใน browser หรือใช้ curl:

```
https://viralhooklab.com/api/health
```

หรือ local:

```
http://localhost:3000/api/health
```

**ผลลัพธ์:**
- `ok: true` = env ที่จำเป็นครบ
- `ok: false` = มีอย่างน้อย 1 อย่างไม่ครบ จะมี `failedKeys` บอกว่าตัวไหนขาด

**แต่ละ check หมายถึงอะไร:**

| key | ความหมาย | ถ้าไม่ Set จะเกิดอะไร |
|-----|----------|------------------------|
| site_url | NEXT_PUBLIC_SITE_URL | CORS / link กลับหลัง Stripe อาจผิด |
| allowed_origins | ALLOWED_ORIGINS | Request จาก frontend อาจถูก middleware บล็อก |
| clerk_publishable | Clerk ปุ่มล็อกอิน/สมัคร | หน้า Sign in/Sign up ไม่โหลด |
| clerk_secret | Clerk ฝั่ง server | Auth ไม่ทำงาน, API return 401 |
| clerk_webhook_secret | Webhook สร้าง profile | สมัครใหม่แล้วไม่มีแถวใน Supabase profiles |
| supabase_url | เชื่อม Supabase | Credits, profile ไม่ทำงาน |
| supabase_service_role | สิทธิ admin Supabase | RPC (ensure_profile, get_credits) ล้ม |
| stripe_secret | Stripe ฝั่ง server | กดจ่ายแล้วได้ 503 |
| stripe_webhook_secret | Webhook อัปเดต tier/credits | จ่ายแล้วเครดิตไม่ขึ้น |
| stripe_price_starter | Price ID แผน Starter | Checkout สร้าง session ไม่ได้ |
| stripe_price_agency | Price ID แผน Agency | เหมือนด้านบน |
| stripe_price_topup | Price ID Top-up 100 | เหมือนด้านบน |
| gemini_or_openai | API สำหรับ generate | ใช้ tool generate ไม่ได้ |

---

## 2. เช็คทีละส่วน (ถ้าไม่ใช้ /api/health)

### หน้าแรก / หน้าทั่วไป
- **ไม่โหลด / หน้าขาว:** เช็ค Vercel Deployment Logs, ดู error ใน Browser Console (F12).
- **Clerk (ปุ่ม Sign in/Sign up) ไม่ขึ้น:** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` ไม่มีหรือผิด; เช็ค Clerk Dashboard → Domains ว่าเพิ่มโดเมนแล้ว.

### สมัคร / ล็อกอิน
- **สมัครแล้วไม่มีแถวใน Supabase profiles:** ไม่มี `CLERK_WEBHOOK_SECRET` หรือ Webhook URL ใน Clerk ผิด (ต้องชี้ไป `https://viralhooklab.com/api/webhooks/clerk`).
- **ล็อกอินแล้วเครดิตไม่ขึ้น:** ไม่มี `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` หรือตาราง/RPC ใน Supabase ยังไม่ได้รัน (รัน `supabase/schema.sql`).

### จ่ายเงิน / Stripe
- **กด Subscribe แล้วไม่ไป Stripe / ขึ้น error:** เปิด F12 → Network ดู request ไป `/api/stripe/checkout` ว่าได้ status อะไร (503 = ไม่มี Stripe key หรือ price IDs).
- **จ่ายแล้วเครดิตไม่ขึ้น:** ไม่มี `STRIPE_WEBHOOK_SECRET` หรือ Stripe Webhook URL ผิด (ต้องชี้ไป `https://viralhooklab.com/api/webhooks/stripe` และเลือก events ให้ครบ).

### ใช้ Tool Generate
- **กด Generate แล้ว error / ไม่มีผล:** เปิด F12 → Network ดู `/api/generate` (401 = ไม่ได้ล็อกอิน, 403 = เครดิตหมด, 500 = ไม่มี AI key หรือ Supabase ล้ม).

---

## 3. เช็คบน Vercel

1. ไปที่ Vercel → โปรเจกต์ → **Settings** → **Environment Variables**.
2. ดูว่า Production (และ Preview ถ้าใช้) มีตัวแปรครบตาม `.env.example`.
3. แก้ env แล้วต้อง **Redeploy** ถึงจะใช้ค่าใหม่.

---

## 4. ปิดการแสดงผล Health Check (Production)

`/api/health` แสดงเฉพาะว่า env ตั้งหรือไม่ ไม่ได้ส่งค่า secret ออกไป ถ้าต้องการปิดการเข้าถึงใน production สามารถ:

- ลบไฟล์ `app/api/health/route.ts` หรือ
- ใน middleware เพิ่มเงื่อนไขให้ return 404 สำหรับ `/api/health` เมื่อ `NODE_ENV === "production"`
