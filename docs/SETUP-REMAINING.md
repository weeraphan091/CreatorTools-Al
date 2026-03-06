# สิ่งที่เหลือตั้งค่า (ViralHookLab.com)

โค้ดพร้อมแล้ว เหลือเฉพาะตั้งค่าใน Dashboard + Environment variables บน Vercel

---

## 1. Clerk Webhook (สร้าง profile ใน Supabase ตอนสมัคร)

- ไปที่ **Clerk Dashboard** → โปรเจกต์ของคุณ → **Webhooks**
- กด **Add Endpoint**
- **Endpoint URL:** `https://viralhooklab.com/api/webhooks/clerk`
- **Subscribe to events:** เลือก `user.created`
- Save แล้ว copy ค่า **Signing Secret**
- ไปที่ **Vercel** → โปรเจกต์ → **Settings** → **Environment Variables**
  - เพิ่ม `CLERK_WEBHOOK_SECRET` = ค่า Signing Secret ที่ copy มา
- **Redeploy** หนึ่งครั้ง

หลังตั้งค่า: เมื่อมีคนสมัครใหม่ Clerk จะส่ง webhook มา แล้ว backend จะสร้างแถวในตาราง `profiles` ของ Supabase ให้อัตโนมัติ

**ถ้ามี user สมัครก่อนตั้ง webhook (ตาราง profiles ว่าง):** ผู้ใช้ที่ล็อกอินแล้วเมื่อโหลดหน้าใดก็ตาม ระบบจะเรียก `POST /api/profile/ensure` ให้อัตโนมัติเพื่อสร้างแถวใน `profiles` ให้ หรือให้ user ลอง refresh หน้า/เปิดเว็บใหม่หนึ่งครั้ง

---

## 2. Stripe – สร้าง Products & Prices

- ไปที่ **Stripe Dashboard** → **Products** → **Add product**

สร้าง 3 รายการ:

| Product name     | Price     | Type      | ใช้ env variable              |
|------------------|-----------|-----------|--------------------------------|
| Starter (500/mo) | $9/month  | Recurring | `STRIPE_PRICE_STARTER_MONTHLY` |
| Agency (2000/mo) | $29/month | Recurring | `STRIPE_PRICE_AGENCY_MONTHLY`  |
| Top-up 100       | $2.99 once | One-time | `STRIPE_PRICE_TOPUP_100`      |

- แต่ละรายการ: สร้าง Product → Add price → copy **Price ID** (ขึ้นต้น `price_xxx`)

---

## 3. Stripe – Environment Variables บน Vercel

ใน **Vercel** → โปรเจกต์ → **Settings** → **Environment Variables** เพิ่ม:

| Name                         | Value                    | หมายเหตุ                    |
|-----------------------------|--------------------------|-----------------------------|
| `STRIPE_SECRET_KEY`         | sk_live_... หรือ sk_test_... | จาก Stripe Dashboard → API Keys |
| `STRIPE_WEBHOOK_SECRET`     | whsec_...                | จากขั้นตอน 4 ด้านล่าง      |
| `STRIPE_PRICE_STARTER_MONTHLY` | price_xxx             | Price ID ของ Starter        |
| `STRIPE_PRICE_AGENCY_MONTHLY`  | price_xxx             | Price ID ของ Agency         |
| `STRIPE_PRICE_TOPUP_100`       | price_xxx             | Price ID ของ Top-up 100     |

---

## 4. Stripe Webhook

- ไปที่ **Stripe Dashboard** → **Developers** → **Webhooks** → **Add endpoint**
- **Endpoint URL:** `https://viralhooklab.com/api/webhooks/stripe`
- **Events to send:** เลือก
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `customer.subscription.deleted`
- Save แล้วเปิด endpoint นั้น → **Reveal** **Signing secret** → copy ไปใส่ใน Vercel เป็น `STRIPE_WEBHOOK_SECRET` (ขั้นตอน 3)
- **Redeploy** หนึ่งครั้ง

หลังตั้งค่า: เมื่อลูกค้าชำระหรือยกเลิก subscription Stripe จะส่ง event มา แล้ว backend จะอัปเดต tier / credits ใน Supabase ให้

---

## 5. สรุป env ที่ต้องมีบน Vercel (Production)

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_STARTER_MONTHLY`, `STRIPE_PRICE_AGENCY_MONTHLY`, `STRIPE_PRICE_TOPUP_100`

ถ้าตั้งครบแล้ว กด Redeploy ครั้งเดียว แล้วทดสอบ:

1. สมัครใหม่ → ดูใน Supabase ว่ามีแถวใน `profiles`
2. กด Upgrade / Top-up ที่หน้า Pricing → ไป Stripe Checkout → ชำระ (หรือใช้ test card)
3. หลังชำระ → ดูใน Supabase ว่า tier / monthly_credits หรือ lifetime_credits อัปเดต

---

*ไฟล์นี้เป็น checklist สำหรับทีม ไม่ต้อง deploy ขึ้น production ก็ได้ (หรือจะเอาไปไว้ใน repo ก็ได้)*
