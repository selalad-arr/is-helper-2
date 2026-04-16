import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 9</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20201 - I30201 การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 3 การสรุปองค์ความรู้</p>
                <p><strong>เรื่อง:</strong> บทที่ 8: การเขียนรายงาน IS1</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการสื่อสาร:</strong> นักเรียนสามารถเรียบเรียงและนำเสนอข้อมูลการศึกษาค้นคว้าในรูปแบบรายงานทางวิชาการที่มีโครงสร้างชัดเจนได้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถระบุองค์ประกอบหลักของรายงาน IS1 (ส่วนหน้า, เนื้อหา, ส่วนท้าย) ได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถเขียนร่างบทคัดย่อที่ครอบคลุมองค์ประกอบสำคัญ (วัตถุประสงค์, วิธี, ผล, สรุป) ได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของการเขียนรายงานอย่างเป็นระบบเพื่อการสื่อสารที่มีประสิทธิภาพ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>การเขียนรายงาน IS1 คือการรวบรวมและเรียบเรียงกระบวนการศึกษาค้นคว้าทั้งหมดให้เป็นเอกสารทางวิชาการที่มีโครงสร้างชัดเจน โดยมีบทคัดย่อเป็นหัวใจสำคัญในการสรุปภาพรวมทั้งหมดของโครงงาน</p>
            
            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>มุ่งมั่นในการทำงาน</li>
                <li>มีระเบียบวินัย</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Active Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูนำตัวอย่างรายงาน IS1 ที่สมบูรณ์ (อาจเป็นของรุ่นพี่) ให้นักเรียนเปิดดูผ่านๆ และถามว่า "ถ้าเรามีเวลาอ่านรายงานเล่มนี้แค่ 1 นาที เราควรอ่านส่วนไหนก่อนเพื่อให้เข้าใจภาพรวมทั้งหมด?" เพื่อนำเข้าสู่ความสำคัญของ "บทคัดย่อ"</li>
                <li><strong>ขั้นสำรวจและอธิบาย (Explore & Explain - 30 นาที):</strong> ครูให้นักเรียนศึกษา "องค์ประกอบสำคัญของรายงาน IS1" จากบทเรียน จากนั้นครูเน้นอธิบายองค์ประกอบ 4 ส่วนที่ต้องมีในบทคัดย่อ (วัตถุประสงค์, วิธีทำ, ผล, สรุป) และความสำคัญของแต่ละส่วน</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 40 นาที):</strong> นักเรียนทำ "แบบฝึกหัดท้ายบท" โดยลองเขียนร่างบทคัดย่อของโครงงานตนเอง แล้วส่งให้ AI ช่วยตรวจสอบความครบถ้วนและให้คำแนะนำในการปรับปรุงแก้ไข</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูประเมินความเข้าใจของนักเรียนโดยดูจากร่างบทคัดย่อและคำแนะนำที่ได้รับจาก AI นักเรียนสามารถนำคำแนะนำไปปรับปรุงบทคัดย่อของตนเองเพื่อใช้ในรายงานจริงได้</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS1 &gt; บทที่ 8</li>
                <li>ตัวอย่างรายงาน IS1 ฉบับสมบูรณ์</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: ระบุองค์ประกอบและเขียนบทคัดย่อได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจร่างบทคัดย่อจาก "แบบฝึกหัดท้ายบท"</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตารางประเมินผล (Rubric) - คุณภาพของบทคัดย่อ</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนเขียนร่างบทคัดย่อได้ครอบคลุมองค์ประกอบสำคัญอย่างน้อย 3 ใน 4 ส่วน (ระดับ "ดี" ขึ้นไป)</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">A: เห็นความสำคัญของการเขียนรายงาน</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตความตั้งใจในการปรับปรุงบทคัดย่อตามคำแนะนำของ AI</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนมีการปรับแก้ร่างบทคัดย่อของตนเอง</td>
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
