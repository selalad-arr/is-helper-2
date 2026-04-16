import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 1 (IS2)</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าด้วยตนเอง (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20202 - I30202 การสื่อสารและการนำเสนอ (IS2) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> ปฐมนิเทศ</p>
                <p><strong>เรื่อง:</strong> คำอธิบายรายวิชาและโครงสร้างหลักสูตร IS2</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                 <li><strong>ด้านการจัดการตนเอง:</strong> นักเรียนสามารถวางแผนการทำงานเพื่อเขียนรายงานและเตรียมการนำเสนอให้สอดคล้องกับเป้าหมายของรายวิชาได้</li>
                <li><strong>ด้านการสื่อสาร:</strong> นักเรียนสามารถอภิปรายและทำความเข้าใจเป้าหมายและผลการเรียนรู้ของรายวิชาได้อย่างชัดเจน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบายเป้าหมาย, ผลการเรียนรู้, และความแตกต่างระหว่าง IS1 และ IS2 ได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถวางแผนการทำงานเพื่อเขียนรายงานและเตรียมการนำเสนอให้สอดคล้องกับโครงสร้างรายวิชาได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของการสื่อสารและนำเสนอผลงานอย่างมีประสิทธิภาพ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>การสื่อสารและการนำเสนอ (IS2) เป็นรายวิชาที่ต่อยอดจาก IS1 โดยมุ่งเน้นการเรียบเรียงองค์ความรู้ที่ได้มาสู่รูปแบบรายงานเชิงวิชาการที่สมบูรณ์ และฝึกฝนทักษะการสื่อสารผ่านการนำเสนอผลงานสู่สาธารณะอย่างมีประสิทธิภาพ</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มุ่งมั่นในการทำงาน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Active Learning 5Es)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูให้นักเรียนสะท้อนคิดจาก IS1 ว่า "ถ้าให้เล่าโครงงาน IS1 ของเราให้คนอื่นที่ไม่ใช่ครูวิทยาศาสตร์ฟังใน 1 นาที จะเล่าอะไรบ้าง?" เพื่อนำเข้าสู่ความสำคัญของการ "สื่อสาร" องค์ความรู้ให้เข้าใจง่าย</li>
                <li><strong>ขั้นสำรวจ (Explore - 15 นาที):</strong> ครูให้นักเรียนเข้าสู่แอปพลิเคชัน IS Helper และเปิดหน้า "คำอธิบายรายวิชา IS2" ให้นักเรียนสำรวจเนื้อหา โดยเฉพาะส่วน 'คำอธิบายรายวิชา' และ 'ผลการเรียนรู้'</li>
                <li><strong>ขั้นอธิบาย (Explain - 25 นาที):</strong> ครูอธิบายความเชื่อมโยงและความแตกต่างระหว่าง IS1 และ IS2 โดยชี้ให้เห็นว่า IS2 คือการนำผลลัพธ์จาก IS1 มา "จัดรูปแบบ" (เขียนรายงาน 5 บท) และ "นำเสนอ" ในรูปแบบที่เป็นทางการมากขึ้น ครูอธิบายภาพรวมของ 3 หน่วยการเรียนรู้ใน IS2</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 30 นาที):</strong> ให้นักเรียนจับกลุ่มเดิมจาก IS1 และระดมสมองว่า "เราจะนำโครงงาน IS1 ของเรามาพัฒนาต่อใน IS2 ได้อย่างไรบ้าง? มีส่วนไหนที่ต้องทำเพิ่มเติมเพื่อให้เป็นรายงานที่สมบูรณ์?"</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ตัวแทนกลุ่มนำเสนอผลการระดมสมอง และครูประเมินความเข้าใจของนักเรียนเกี่ยวกับเป้าหมายของ IS2 ผ่านการซักถามและให้ข้อเสนอแนะ</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS2 &gt; คำอธิบายรายวิชา</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K: อธิบายเป้าหมายและความแตกต่างของ IS1/IS2</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตการอภิปรายและตอบคำถาม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนอธิบายได้ว่า IS2 เน้นการเขียนรายงาน 5 บท และการนำเสนอ</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">A: เห็นความสำคัญของการสื่อสาร</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ประเมินจากการนำเสนอผลการระดมสมอง</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบประเมินการนำเสนอ</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถบอกได้ว่าทำไมการสื่อสารผลงานจึงสำคัญ</td>
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
