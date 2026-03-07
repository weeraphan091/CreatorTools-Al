# รายงานการตรวจสอบความพร้อม Google AdSense — ViralHookLab.com

**วันที่ตรวจสอบ:** มีนาคม 2026  
**สถานะ:** ส่งสมัคร AdSense แล้ว รอการตรวจสอบ  
**หมายเหตุ:** รายงานนี้เป็นการตรวจสอบเท่านั้น ไม่มีการแก้ไขโค้ดใดๆ

---

## 1. สรุปผลการตรวจสอบ

| หัวข้อ | สถานะ | หมายเหตุ |
|--------|--------|----------|
| นโยบายความเป็นส่วนตัว (Privacy Policy) | ✅ ผ่าน | มีข้อความ AdSense, DART cookie, opt-out |
| การเปิดเผยโฆษณา (Disclosure) | ✅ ผ่าน | มีหน้า Disclosure และลิงก์ใน Footer |
| Cookie Consent | ✅ ผ่าน | มีแบนเนอร์ Accept/Reject + ลิงก์ Privacy |
| AdSense script ใน head | ✅ ผ่าน | โหลดในทุกหน้า (ca-pub-5559114140108157) |
| ads.txt | ⚠️ ต้องตั้งค่า env | ต้องตั้งค่าใน Vercel เพื่อให้แสดงบรรทัดที่ถูกต้อง |
| CSP / Security Headers | ✅ ผ่าน | อนุญาต domain AdSense/Google แล้ว |
| เนื้อหา (Content) | ✅ ผ่าน | Blog/About/Contact ขยายแล้ว ไม่ใช่ thin content |
| โครงสร้างเว็บ / Sitemap / Robots | ✅ ผ่าน | อนุญาต crawl, มี sitemap |
| การวางโฆษณา (Ad placements) | ✅ พร้อม | ใช้ AdSlot/AdBanner ผ่าน env เมื่อมี slot ID |

---

## 2. รายละเอียดตามหัวข้อ

### 2.1 Privacy Policy (`/privacy-policy`)

- **มีหน้าพร้อม canonical และ Open Graph**
- **มีข้อมูลผู้ดำเนินการ:** Seventy Eight Co., Ltd., Tax ID: 0205565023848, support@viralhooklab.com
- **มีส่วน Google AdSense และโฆษณาแบบกำหนดเป้าหมาย:** ระบุการใช้ Google AdSense, third-party cookies
- **มีข้อความ DoubleClick DART cookie:** ระบุการใช้งาน DART cookie
- **มี Opt-out:** ลิงก์ไปที่ Google Ads Settings (https://www.google.com/settings/ads) และ Google Advertising Technologies
- **มีหัวข้อ Cookies, Third-Party Services, Your Choices and Controls, Contact**

สอดคล้องกับข้อกำหนดของ AdSense ด้านการเปิดเผยข้อมูลและ cookies

---

### 2.2 Advertising & Affiliate Disclosure (`/disclosure`)

- **มีหน้าพร้อม canonical**
- **ระบุชัดเจน:** เว็บอาจมีรายได้จากโฆษณาและ affiliate
- **ระบุการใช้บริการเช่น Google AdSense**
- **ระบุ editorial independence และลิงก์ไป Editorial Policy**
- **มีช่องทางติดต่อ:** support@viralhooklab.com

เพียงพอสำหรับการเปิดเผยโฆษณาและ affiliate ตามแนวทาง AdSense

---

### 2.3 Cookie Consent

- **Component:** `CookieConsent.tsx` แสดงแบนเนอร์เมื่อผู้ใช้ยังไม่เคยเลือก
- **ตัวเลือก:** "Accept all cookies" และ "Reject non-essential"
- **เก็บการเลือกใน localStorage** (key: `viralhooklab_cookie_consent`)
- **มีลิงก์ไป Privacy Policy**
- **ข้อความระบุ:** การใช้ cookies เพื่อโฆษณาแบบกำหนดเป้าหมาย (Google AdSense) และวิเคราะห์การเข้าชม

สอดคล้องกับแนวทาง GDPR/ความยินยอมสำหรับโฆษณา

---

### 2.4 AdSense Script และการโหลด

- **Script ใน `<head>`:**  
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5559114140108157`  
  โหลดแบบ `async` และ `crossOrigin="anonymous"` ใน `app/layout.tsx`
- **ผลลัพธ์:** สคริปต์ AdSense โหลดในทุกหน้าที่ใช้ root layout

---

### 2.5 ads.txt

- **Route:** `app/ads.txt/route.ts` ให้บริการที่ `https://viralhooklab.com/ads.txt`
- ** logic ปัจจุบัน:**  
  - ถ้ามี `ADSENSE_PUBLISHER_ID` หรือ `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` หรือ `NEXT_PUBLIC_ADSENSE_CLIENT` (รูปแบบ ca-pub-xxx หรือ pub-xxx) จะสร้างบรรทัด `google.com, pub-XXXX, DIRECT, f08c47fec0942fa0`  
  - ถ้าไม่มี จะส่งเฉพาะข้อความคอมเมนต์ "# ads.txt is not configured yet."

**ข้อแนะนำ:** เพื่อให้ AdSense ตรวจสอบได้ถูกต้อง ควรตั้งค่าใน Vercel อย่างน้อยหนึ่งใน:

- `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-5559114140108157`  
  หรือ  
- `ADSENSE_PUBLISHER_ID=pub-5559114140108157`  

แล้ว redeploy เพื่อให้ `https://viralhooklab.com/ads.txt` แสดงบรรทัดที่ถูกต้อง

---

### 2.6 Content Security Policy (CSP)

- **ไฟล์:** `next.config.js` (ใช้ใน production)
- **อนุญาตแล้ว:**  
  - script-src / script-src-elem: pagead2.googlesyndication.com, tpc.googlesyndication.com  
  - img-src: pagead2.googlesyndication.com, tpc.googlesyndication.com, *.g.doubleclick.net  
  - connect-src: pagead2.googlesyndication.com  
  - frame-src: googleads.g.doubleclick.net, tpc.googlesyndication.com, *.googlesyndication.com  

ไม่พบการบล็อก domain ที่จำเป็นสำหรับ AdSense

---

### 2.7 เนื้อหาและคุณภาพ (Content Quality)

- **Blog (`lib/blog.ts`):** จำนวนมากกว่า 32 บทความ แต่ละบทขยายเป็นหลายย่อหน้า (ประมาณ 500–800+ คำ) มีโครงสร้างชัดเจน มีคำแนะนำและลิงก์ไปเครื่องมือ
- **About, Contact, Editorial Policy:** มีเนื้อหาเพียงพอ ไม่ใช่หน้าเปล่า
- **เครื่องมือ (Tools):** 50 เครื่องมือ แต่ละหน้ามีคำอธิบาย, ตัวอย่าง, FAQ
- **ประเภทเนื้อหา:** เน้นเครื่องมือและบทความสำหรับ creators/marketers ไม่มีเนื้อหาต้องห้าม (ผู้ใหญ่ ความรุนแรง แฮ็ก ฯลฯ) ตามนโยบาย AdSense

โดยรวมเพียงพอสำหรับหลัก “substantial, unique content” ของ AdSense

---

### 2.8 โครงสร้างเว็บและ SEO

- **Sitemap:** `app/sitemap.ts` มี static routes, tools, blog, templates, use-cases
- **Robots:** `app/robots.ts` อนุญาต `User-agent: *` ให้ `allow: /` และมี `sitemap` + `host`
- **Footer:** มีลิงก์ไป Privacy, Disclosure, Terms, About, Contact

เหมาะสมสำหรับการ crawl และการตรวจสอบโดย Google/AdSense

---

### 2.9 การวางโฆษณา (Ad Placements)

- **Ad Slot (layout):** Mobile Sticky Footer — ใช้ `siteConfig.ads.mobileStickyFooter` (จาก env) แสดงเฉพาะเมื่อมี `NEXT_PUBLIC_ADSENSE_CLIENT` และ slot ID
- **AdBanner / AdSlot อื่นๆ:** ใช้ในหน้า Tools, Blog, Templates, Use Cases, About, Tool detail ฯลฯ ผ่าน `siteConfig.ads.*` (ทุกตัวมาจาก env)
- **การแสดงผล:** ทุก unit แสดงเฉพาะเมื่อมีทั้ง client ID และ slot ID ดังนั้นหลัง AdSense อนุมัติ และสร้าง ad units แล้ว ต้องตั้งค่าใน Vercel:
  - `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-5559114140108157`
  - `NEXT_PUBLIC_ADSENSE_SLOT_*` ตามที่สร้างใน AdSense

ไม่มีการวางโฆษณาที่ผิดกฎ (เช่น ใกล้ปุ่ม CTA เกินไป หรือหลอกให้คลิก) ในโค้ดที่ตรวจ

---

## 3. สิ่งที่ควรทำหลัง AdSense อนุมัติ (ไม่บังคับในรายงาน)

1. **ตั้งค่า ads.txt:** ตั้ง `NEXT_PUBLIC_ADSENSE_CLIENT` หรือ `ADSENSE_PUBLISHER_ID` ใน Vercel แล้ว redeploy ให้ `/ads.txt` แสดงบรรทัด google.com, pub-5559114140108157, DIRECT, ...
2. **สร้าง Ad units ใน AdSense** แล้วนำ slot IDs ไปใส่ใน env เช่น `NEXT_PUBLIC_ADSENSE_SLOT_HOME_HERO`, `NEXT_PUBLIC_ADSENSE_SLOT_TOOL_DETAIL`, `NEXT_PUBLIC_ADSENSE_SLOT_MOBILE_STICKY_FOOTER` ฯลฯ
3. **ตรวจสอบ Google Search Console:** ว่ามีการยืนยันตัวตนและส่ง sitemap แล้ว (ถ้ามีการตั้งค่า `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` ใน env จะช่วยการยืนยัน)

---

## 4. สรุปท้ายรายงาน

- **ความพร้อมสำหรับการตรวจสอบ AdSense:** อยู่ในระดับดี  
  มี Privacy Policy (รวม AdSense/DART/opt-out), Disclosure, Cookie Consent, AdSense script ใน head, CSP อนุญาต domain โฆษณา, เนื้อหาเพียงพอ และโครงสร้างเว็บ/การวางโฆษณาที่ไม่ขัดนโยบาย

- **จุดที่ควรตั้งค่าเพื่อให้ครบ:**  
  - ตั้ง env สำหรับ ads.txt ให้แสดงบรรทัดที่ถูกต้อง (แนะนำก่อนหรือหลังอนุมัติ)  
  - หลังอนุมัติ ตั้งค่า slot IDs ใน env เพื่อให้บล็อกโฆษณาแสดงจริง

**รายงานนี้จัดทำเพื่อใช้ประกอบการรอผลตรวจสอบจาก Google AdSense เท่านั้น ไม่มีการแก้ไขไฟล์หรือโค้ดใดๆ ตามที่กำหนด**
