# สรุปการปรับปรุงระบบ (Improvements Summary)

เอกสารนี้สรุปการตรวจสอบและปรับปรุงทุกด้านของ ViralHookLab.com ให้ใช้งานได้จริง ปลอดภัย และครบถ้วน

---

## 1. Tools & Generate Flow

- **GeneratorForm**
  - ส่ง `credentials: "same-origin"` ในทุก request ไป `/api/generate` เพื่อให้ session (Clerk) ไปกับ request
  - เมื่อ **ยังไม่ล็อกอิน**: แสดงกล่องข้อความ "Sign in to generate results" และปุ่ม Generate เป็น "Sign in to generate" (disabled)
  - เมื่อได้ **401**: แสดงข้อความชัดเจนและลิงก์ "Sign in to generate →"
  - เมื่อได้ **429**: แสดง "Too many requests..." และแนะนำเวลา retry (จาก header Retry-After)
  - เมื่อ **เครือข่ายล้ม** (Failed to fetch): แสดง "Network error. Please check your connection and try again."
  - อ่าน response body แค่ครั้งเดียว (ไม่ double-parse) เพื่อป้องกัน bug

- **API /api/generate**
  - เรียก `ensure_profile` ก่อน `deductOneCredit` เพื่อให้มี profile ใน Supabase แน่นอน
  - ยอมรับ request ที่ไม่มี Origin header ถ้า Referer เป็น same-site (รองรับ browser บางตัว)

- **Middleware**
  - อนุญาต POST ไป `/api/generate` แม้ไม่มี Origin เมื่อ Referer เป็น same-site

---

## 2. Security

- **CreditsNav**: ทุก `fetch` ไป `/api/profile/ensure` และ `/api/credits` ใช้ `credentials: "same-origin"`
- **PricingCheckoutButton**: ใช้ `credentials: "same-origin"` อยู่แล้ว
- **API credits**: เพิ่ม header `Cache-Control: private, no-store, max-age=0` เพื่อไม่ให้ browser cache ยอดเครดิต
- **Input validation**: ใช้ `lib/security/input` (sanitize, length, suspicious patterns) ใน generate route อยู่แล้ว
- **CORS / Origin**: ตรวจสอบ origin ใน middleware และใน generate route; same-site (Referer) ใช้ได้เมื่อไม่มี Origin

---

## 3. UX & Accessibility

- **CreditModal**: เพิ่ม `role="dialog"`, `aria-modal="true"`, `aria-labelledby` สำหรับ screen reader
- **PricingFeedbackBanner**: แสดงข้อความตาม query params บนหน้า pricing
  - `?success=1` → ข้อความชำระเงินสำเร็จ
  - `?canceled=1` → ข้อความยกเลิก checkout
  - `?error=portal` → ข้อความเมื่อเปิด billing portal ไม่ได้ + ลิงก์ support
- **Not Found (404)**: เพิ่มปุ่ม "Home" และใช้ `flex-wrap` สำหรับปุ่ม
- **Global Error**: ปุ่ม "Try again" ใช้ `reset?.()` เพื่อกันกรณี reset ไม่มี

---

## 4. API & Backend

- **Credits API**: คืนค่า default snapshot เมื่อ get_credits หรือ ensure_profile ล้ม; ไม่ให้ฝั่ง client พัง
- **Generate API**: มี try/catch รอบ logic หลัก คืน 500 พร้อมข้อความปลอดภัย (ไม่ leak รายละเอียดใน production)
- **Stripe checkout / customer-portal**: เรียก `ensure_profile` ก่อนสร้างหรือใช้ Stripe customer อยู่แล้ว

---

## 5. Legal & Footer

- Footer มีข้อความครบ: © 2026 ViralHookLab, Seventy Eight Co., Ltd. (Tax ID: 0205565023848), support@viralhooklab.com

---

## 6. Error Handling สรุป

| สถานการณ์              | การจัดการ |
|------------------------|-----------|
| ไม่ได้ล็อกอิน (401)    | ข้อความ + ลิงก์ Sign in ใน GeneratorForm |
| เครดิตหมด (403)        | เปิด CreditModal + ลิงก์ไป /pricing |
| Rate limit (429)       | ข้อความ + Retry-After (ถ้ามี) |
| เครือข่ายล้ม            | ข้อความ "Network error..." |
| 500 / อื่นๆ            | แสดง error message จาก API; ปุ่ม Sign in เมื่อเป็นเรื่อง auth |

---

## 7. ไฟล์ที่แก้ไข

- `components/GeneratorForm.tsx` – credentials, 401/429/network, sign-in CTA, ปุ่ม disabled เมื่อยังไม่ล็อกอิน
- `components/CreditsNav.tsx` – credentials ในทุก fetch
- `components/CreditModal.tsx` – ARIA สำหรับ accessibility
- `components/PricingFeedbackBanner.tsx` – **ใหม่** แบนเนอร์ success/cancel/error บนหน้า pricing
- `app/pricing/page.tsx` – ใส่ PricingFeedbackBanner
- `app/api/generate/route.ts` – ensure_profile ก่อน deduct, same-site Referer
- `app/api/credits/route.ts` – Cache-Control no-store
- `middleware.ts` – อนุญาต /api/generate เมื่อไม่มี Origin แต่ Referer same-site
- `app/global-error.tsx` – ปุ่ม reset ใช้ optional chaining
- `app/not-found.tsx` – ปุ่ม Home, flex-wrap

---

การปรับปรุงข้างต้นครอบคลุม: การ Generate ใน tools, ความปลอดภัยของ request/API, UX และ accessibility, การจัดการ error และการแสดงผลบนหน้า pricing และ not-found.
