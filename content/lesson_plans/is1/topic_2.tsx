import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 3</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20201 - I30201 การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 1 การตั้งประเด็นคำถาม/สมมุติฐาน</p>
                <p><strong>เรื่อง:</strong> บทที่ 2: การตั้งสมมติฐาน</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการคิดขั้นสูง:</strong> นักเรียนสามารถวิเคราะห์ความสัมพันธ์เชิงเหตุและผลเพื่อระบุตัวแปรต้น ตัวแปรตาม และเขียนเป็นสมมติฐานที่ทดสอบได้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถระบุตัวแปรต้น ตัวแปรตาม และตัวแปรควบคุมจากสถานการณ์ที่กำหนดได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถเขียนสมมติฐานตามโครงสร้าง "ถ้า...ดังนั้น..." ได้อย่างถูกต้อง</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนตระหนักถึงความสำคัญของการตั้งสมมติฐานในการชี้นำทิศทางการทดลอง</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>สมมติฐานคือการคาดคะเนคำตอบอย่างมีเหตุผล โดยแสดงความสัมพันธ์ระหว่างตัวแปรต้น (สิ่งที่จัดให้ต่างกัน) และตัวแปรตาม (ผลที่วัด) ซึ่งเป็นเครื่องมือนำทางในการออกแบบการทดลองและเก็บข้อมูลอย่างเป็นระบบ</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มีเหตุผลและคิดอย่างเป็นระบบ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Active Learning 5Es)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูยกตัวอย่างสถานการณ์ง่ายๆ เช่น "ทำไมเค้กที่อบสองครั้งถึงฟูไม่เท่ากัน?" ให้นักเรียนช่วยกันคาดเดาสาเหตุที่เป็นไปได้ เพื่อนำเข้าสู่แนวคิดของการคาดเดาอย่างมีเหตุผล (สมมติฐาน)</li>
                <li><strong>ขั้นสำรวจ (Explore - 15 นาที):</strong> ให้นักเรียนศึกษาเนื้อหาในบทที่ 2 ด้วยตนเอง โดยเน้นทำความเข้าใจองค์ประกอบของสมมติฐาน (ตัวแปรต้น, ตาม, ควบคุม) และโครงสร้างการเขียน "ถ้า...ดังนั้น..."</li>
                <li><strong>ขั้นอธิบาย (Explain - 25 นาที):</strong> ครูใช้ "ตัวอย่างการวิเคราะห์สมมติฐาน" ในบทเรียนเพื่ออธิบายให้นักเรียนเห็นภาพชัดเจนยิ่งขึ้น ครูเน้นย้ำถึงความสำคัญของ "ชุดควบคุม" และชวนนักเรียนอภิปรายเกี่ยวกับ "ตัวแปรควบคุม" ที่ต้องคำนึงถึงในการทดลองนั้น</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 30 นาที):</strong>
                    <ul className="list-disc list-inside mt-2">
                        <li>นักเรียนทำ "ใบกิจกรรมที่ 3: ฝึกตั้งสมมติฐานกับ AI" โดยให้ AI ช่วยตรวจสอบความถูกต้องของสมมติฐานที่ตนเองเขียนจากโจทย์ที่กำหนด</li>
                        <li>นักเรียนทำ "แบบฝึกหัดท้ายบท" โดยอธิบายแผนการทดลองของโครงงานตนเอง แล้วให้ AI ช่วยออกแบบสมมติฐานที่ถูกต้องตามหลักการ</li>
                    </ul>
                </li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูประเมินความเข้าใจของนักเรียนจากคำตอบในใบกิจกรรมและแบบฝึกหัดท้ายบท โดยใช้เกณฑ์ Rubric การตั้งสมมติฐานในบทเรียนเป็นแนวทาง และให้ข้อเสนอแนะเพิ่มเติม</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS1 &gt; บทที่ 2</li>
                <li>ฟีเจอร์ "ใบกิจกรรมที่ 3" และ "แบบฝึกหัดท้ายบท" (InteractiveExercise)</li>
            </ul>
            
            <h3 className="text-lg font-bold mt-4">9. การวัดและประเมินผล</h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                         <tr className="bg-slate-100 dark:bg-slate-700">
                            <th className="border border-slate-300 dark:border-slate-600 p-2 align-top">จุดประสงค์</th>
                            <th className="border border-slate-300 dark:border-slate-600 p-2 align-top">วิธีการวัดผล</th>
                            <th className="border border-slate-300 dark:border-slate-600 p-2 align-top">เครื่องมือ</th>
                            <th className="border border-slate-300 dark:border-slate-600 p-2 align-top">เกณฑ์การประเมิน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: ระบุตัวแปรและเขียนสมมติฐานได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจคำตอบใน "ใบกิจกรรมที่ 3"</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">เกณฑ์ Rubric ในบทเรียน</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนเขียนสมมติฐานได้ถูกต้องตามโครงสร้างและระบุตัวแปรได้ชัดเจนอย่างน้อย 1 ข้อ (ระดับ "ดี" ขึ้นไป)</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">A: ตระหนักถึงความสำคัญของสมมติฐาน</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตการใช้ AI เพื่อปรับปรุงสมมติฐานของตนเอง</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนมีความกระตือรือร้นในการปรับปรุงสมมติฐานของตนเองให้ชัดเจนขึ้น</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-12">
                <h3 className="text-lg font-bold mb-2">บันทึกผลหลังการสอน</h3>
                <p><strong>ผลการจัดการเรียนรู้:</strong> .......................................................................................................................................................</p>
                <p><strong>ปัญหาและอุปสรรค:</strong> .......................................................................................................................................................</p>
                <p><strong>ข้อเสนอแนะ/แนวทางแก้ไข:</strong> .......................................................................................................................................................</p>
                <div className="text-right mt-8">
                    <p>ลงชื่อ ..................................................</p>
                    <p>( นายสิลารัฐ อรุณธัญญา )</p>
                    <p>ครูผู้สอน</p>
                </div>
            </div>
        </main>
    </>
);

export default LessonPlan;