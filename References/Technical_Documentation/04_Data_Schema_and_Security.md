# 04 Data Schema & Security - IS Helper

## บทบรรยาย: ความเชื่อมั่นในข้อมูลและการดูแลความปลอดภัย
เอกสารส่วนนี้มีไว้เพื่ออธิบายวิธีการที่ระบบจัดเก็บ "สมบัติทางปัญญา" หรือผลงานการทำ IS ของนักเรียนไว้อย่างเป็นระบบ โดยให้ความสำคัญสูงสุดกับความเป็นส่วนตัว (Privacy) และการเข้าถึงข้อมูลที่ถูกต้องตามบทบาทเพื่อให้งานวิจัยของนักเรียนไม่ถูกละเมิดหรือสูญหาย


## Firestore Collections

### 1. `users` (Document ID = UID)
- `displayName`, `email`, `photoURL` (จาก Auth)
- `role`: "student", "teacher", หรือ "admin"
- `isPremium`: boolean (สถานะการจ่ายเงิน)
- `aiUsageCount`: จำนวนครั้งที่ใช้ AI ไปแล้วในวันนั้น
- `projectCount`: จำนวนโปรเจกต์ที่สร้าง
- `classId`: ID ของห้องเรียนที่สังกัดอยู่ปัจจุบัน

### 2. `projects` (Document ID = Random)
- `ownerId`: UID ของนักเรียนเจ้าของ
- `title`: ชื่อโครงงาน
- `chapters`: object ที่เก็บเนื้อหาบทที่ 1-5 (เช่น `chapter1: { intro: "...", objectve: "..." }`)
- `status`: "draft" หรือ "completed"
- `updatedAt`: timestamp ล่าสุด

### 3. `classrooms` (Document ID = Random)
- `teacherId`: UID ของครูผู้สร้าง
- `className`: ชื่อห้อง
- `classCode`: รหัส 6 ตัวสำหรับให้นักเรียนเข้าห้อง
- `students`: รายชื่อ UID ของนักเรียนในห้อง

## ความปลอดภัย (Security Policies)
- **Firebase Security Rules:** ตั้งค่าให้นักเรียนอ่านและเขียนได้เฉพาะโปรเจกต์ของตัวเอง (`auth.uid == resource.data.ownerId`)
- **Teacher View:** อนุญาตให้คุณครูอ่านข้อมูลโปรเจกต์ของนักเรียนที่มี `classId` ตรงกับห้องเรียนที่ครูดูแล
- **Input Validation:** มีการกรองข้อมูลส่วนบุคคลก่อนที่จะส่งไปประมวลผลผ่าน AI
- **Founder Protection:** อีเมล `selalad@gmail.com` ถูก Hard-coded ให้ได้รับสิทธิ์ Admin โดยอัตโนมัติในระดับ Code Logic
