import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 3 (IS2)</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าด้วยตนเอง (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20202 - I30202 การสื่อสารและการนำเสนอ (IS2) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 1 Design Outline</p>
                <p><strong>เรื่อง:</strong> บทที่ 1: หลักการเขียนรายงานเชิงวิชาการ</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการสื่อสาร:</strong> นักเรียนสามารถใช้ภาษาเขียนเชิงวิชาการและจัดโครงสร้างการเขียนได้อย่างเป็นระบบ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบายหัวใจสำคัญของการเขียนเชิงวิชาการได้ (ภาษาทางการ, โครงสร้าง, การอ้างอิง)</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถปรับแก้ประโยคภาษาพูดให้เป็นภาษาเขียนเชิงวิชาการเบื้องต้นได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนตระหนักถึงความสำคัญของการอ้างอิงแหล่งที่มาเพื่อหลีกเลี่ยงการคัดลอกผลงาน (Plagiarism)</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>การเขียนรายงานเชิงวิชาการเป็นการสื่อสารองค์ความรู้ที่เป็นระบบและน่าเชื่อถือ โดยมีหัวใจสำคัญคือการใช้ภาษาที่เป็นทางการ, การมีโครงสร้างที่ชัดเจน, และการอ้างอิงแหล่งที่มาของข้อมูลทุกครั้งเพื่อให้เกียรติเจ้าของผลงานและสร้างความน่าเชื่อถือ</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มีความรับผิดชอบและซื่อสัตย์</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Active Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูให้นักเรียนดูตัวอย่างข้อความ 2 แบบ แบบแรกเป็นภาษาพูด (เช่น รีวิวสินค้าในโซเชียลมีเดีย) แบบที่สองเป็นภาษาเขียนเชิงวิชาการ (เช่น บทคัดย่องานวิจัย) แล้วถามว่า "ข้อความสองแบบนี้ต่างกันอย่างไร? และมีจุดประสงค์ในการสื่อสารต่างกันอย่างไร?"</li>
                <li><strong>ขั้นสำรวจและอธิบาย (Explore & Explain - 30 นาที):</strong> ให้นักเรียนศึกษาเนื้อหาในบทที่ 1 หัวข้อ "หัวใจสำคัญของการเขียนเชิงวิชาการ" จากนั้นครูอธิบายขยายความในแต่ละประเด็น โดยเน้นย้ำเรื่อง "การอ้างอิง" และยกตัวอย่างการเขียน In-text Citation และบรรณานุกรมรูปแบบ APA ที่ถูกต้อง</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 40 นาที):</strong> นักเรียนทำ "แบบฝึกหัดท้ายบท: ฝึกใช้ภาษาเขียนเชิงวิชาการ" โดยลองเปลี่ยนประโยคภาษาพูดของตนเองให้เป็นภาษาเขียนเชิงวิชาการ แล้วให้ AI ช่วยตรวจสอบและให้คำแนะนำในการปรับแก้</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูประเมินความเข้าใจของนักเรียนจากผลงานในแบบฝึกหัด และการอภิปรายคำแนะนำที่ได้รับจาก AI ร่วมกันในชั้นเรียน</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS2 &gt; บทที่ 1</li>
                <li>ฟีเจอร์ "แบบฝึกหัดท้ายบท" (InteractiveExercise)</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: อธิบายและปรับแก้ประโยคได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจคำตอบใน "แบบฝึกหัดท้ายบท"</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตารางประเมินผล (Rubric) - เกณฑ์การใช้ภาษา</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถปรับแก้ประโยคให้มีความเป็นทางการมากขึ้นได้ในระดับ "ดี" ขึ้นไป</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">A: ตระหนักถึงความสำคัญของการอ้างอิง</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตการอภิปรายในชั้นเรียน</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถบอกเหตุผลที่ต้องมีการอ้างอิงเพื่อหลีกเลี่ยง Plagiarism ได้</td>
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
