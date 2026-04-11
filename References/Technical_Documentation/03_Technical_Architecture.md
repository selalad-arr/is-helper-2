# 03 Technical Architecture - IS Helper

## บทบรรยาย: โครงสร้างและรากฐานทางเทคโนโลยี
เอกสารนี้รวบรวม "เบื้องหลัง" ความชาญฉลาดและความรวดเร็วของเว็บแอป โดยอธิบายถึงเหตุผลที่เราเลือกใช้สถาปัตยกรรมแบบ Serverless และการจัดการ State ที่มีประสิทธิภาพ เพื่อให้มั่นใจได้ว่าแม้จะมีผู้ใช้งานจำนวนมากพร้อมกัน ระบบจะยังคงทำงานได้อย่างเสถียรและปลอดภัย


## Frontend Stack
- **Framework:** React 19 (ใช้ Functional Components และ Hooks 100%)
- **Routing:** `react-router-dom` (Version 7) สำหรับการจัดการ Single Page Application
- **State Management:** React Context API สำหรับการจัดการข้อมูลที่ใช้ร่วมกันทั้งแอป (Auth, Theme)
- **Styling:** Tailwind CSS 4 บริหารจัดการผ่านไฟล์ `index.css` และ `@tailwindcss/vite` plugin
- **Icons:** `lucide-react` เพื่อความทันสมัยและน้ำหนักเบา

## Backend Services (Serverless)
เราระบบรันบน **Firebase Environment** ทั้งหมด:
- **Authentication:** ระบบจัดการสมาชิกที่รองรับ Firebase Auth (Google Provider เป็นหลัก)
- **Firestore (NoSQL):** ใช้เก็บข้อมูลโปรเจกต์ (Nested Data Structure)
- **Hosting:** ใช้สำหรับ Deploy เว็บแอปให้เข้าถึงได้ทั่วโลก
- **Functions (Optional):** สำหรับการประมวลผลหลังบ้านที่ซับซ้อน

## ไฟล์และโครงสร้างโปรเจกต์ที่สำคัญ
- `src/App.tsx`: ประตูหลักของแอปและการทำ Routing
- `src/services/geminiService.ts`: หัวใจหลักในการเชื่อมต่อกับ Google AI
- `src/components/layout/`: ส่วนประกอบหน้าจอเช่น Header และ Bottom Navigation
- `src/contexts/AuthContext.tsx`: จัดการสิทธิ์และโควตาของผู้ใช้แต่ละคน

## Report Generation Flow
1. รวบรวมข้อมูล JSON จากทุก Chapter ใน Firestore
2. เรนเดอร์ข้อมูลลงใน Template HTML ลับ (Hidden DOM)
3. ใช้ `html2canvas` หรือ `html-to-image` แปลงเป็นรูปภาพความละเอียดสูง
4. ใช้ `jsPDF` เพื่อแพ็คภาพลงในขนาด A4 และจัดเซฟเป็นไฟล์ PDF
