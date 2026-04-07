import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 2 (IS2)</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าด้วยตนเอง (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20202 - I30202 การสื่อสารและการนำเสนอ (IS2) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 1 Design Outline</p>
                <p><strong>เรื่อง:</strong> บททบทวน: ค้นหาและพัฒนาหัวข้อโครงงาน (AI)</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการคิดขั้นสูง:</strong> นักเรียนสามารถประเมินหัวข้อโครงงานเดิมของตนเองตามเกณฑ์ และพัฒนาให้มีความชัดเจนยิ่งขึ้นได้</li>
            </ul>
            
            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถทบทวนและอธิบายเกณฑ์การประเมินหัวข้อโครงงานที่ดีได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถใช้ AI เพื่อช่วยทบทวน, พัฒนา, หรือสร้างสรรค์หัวข้อโครงงานที่มีความชัดเจนและเป็นไปได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของการมีหัวข้อโครงงานที่แข็งแรงก่อนเริ่มลงมือเขียนรายงาน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>หัวข้อโครงงานที่แข็งแรงเป็นรากฐานสำคัญของการเขียนรายงาน IS2 ที่ดี การทบทวนและพัฒนาหัวข้อโดยใช้เกณฑ์ความชัดเจน, ความน่าสนใจ, และความเป็นไปได้ จะช่วยให้การทำงานในขั้นตอนต่อไปราบรื่นและมีทิศทาง</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มีความคิดสร้างสรรค์</li>
            </ul>
            
            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ 5Es Inquiry-Based Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูให้นักเรียนแต่ละกลุ่มเขียนหัวข้อโครงงาน IS1 เดิมของตนเองลงบนกระดาน และชวนอภิปรายว่า "มีใครอยากปรับปรุงหรือเปลี่ยนหัวข้อเดิมของตัวเองบ้าง เพราะอะไร?" เพื่อกระตุ้นให้เกิดการทบทวน</li>
                <li><strong>ขั้นสำรวจ (Explore - 15 นาที):</strong> ให้นักเรียนศึกษาตาราง Rubric การประเมินหัวข้อโครงงานในบทเรียน เพื่อทบทวนเกณฑ์การประเมินหัวข้อที่ดี (ความชัดเจน, ความน่าสนใจ, ความเป็นไปได้)</li>
                <li><strong>ขั้นอธิบาย (Explain - 15 นาที):</strong> ครูอธิบายเพิ่มเติมเกี่ยวกับความสำคัญของแต่ละเกณฑ์ใน Rubric และยกตัวอย่างการปรับแก้หัวข้อที่กว้างเกินไปให้แคบและเฉพาะเจาะจงมากขึ้น</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 40 นาที):</strong> ให้นักเรียน (ทั้งกลุ่มที่อยากเปลี่ยนและไม่เปลี่ยนหัวข้อ) เข้าไปใช้งาน "แบบฝึกหัด: ค้นหาหัวข้อกับ AI" เพื่อให้ AI ช่วยพัฒนาหัวข้อเดิมให้คมชัดขึ้น หรือช่วยระดมสมองหาหัวข้อใหม่ที่สอดคล้องกับความสนใจ</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> นักเรียนแต่ละกลุ่มนำเสนอหัวข้อสุดท้าย (Final Topic) สำหรับทำ IS2 พร้อมให้เหตุผลว่าทำไมถึงเลือกหัวข้อนี้ และหัวข้อนี้ดีตามเกณฑ์ Rubric อย่างไร ครูประเมินความสมเหตุสมผลของนักเรียน</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS2 &gt; บททบทวน</li>
                <li>ฟีเจอร์ "ค้นหาหัวข้อกับ AI" (Topic1CardFlow)</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K: อธิบายเกณฑ์ประเมินได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตการอภิปราย</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถอธิบายเกณฑ์ประเมินได้อย่างน้อย 2 ข้อ</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">S, A: พัฒนาหัวข้อโครงงานได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ประเมินหัวข้อสุดท้ายที่นักเรียนนำเสนอ</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตารางประเมินผล (Rubric) การตั้งประเด็นปัญหา</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนเลือกหัวข้อโครงงานที่มีความชัดเจนและเป็นไปได้ในระดับ "ดี" ขึ้นไป</td>
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