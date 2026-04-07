import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 4 (IS2)</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าด้วยตนเอง (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20202 - I30202 การสื่อสารและการนำเสนอ (IS2) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 1 Design Outline</p>
                <p><strong>เรื่อง:</strong> บทที่ 2: การเขียนบทที่ 1 (บทนำ)</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการคิดขั้นสูง:</strong> นักเรียนสามารถสังเคราะห์ข้อมูลเพื่อเขียนความเป็นมาและความสำคัญของปัญหาได้อย่างเป็นเหตุเป็นผล</li>
                <li><strong>ด้านการสื่อสาร:</strong> นักเรียนสามารถเรียบเรียงและนำเสนอองค์ประกอบของบทนำได้อย่างชัดเจนและเป็นระบบ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถระบุและอธิบายองค์ประกอบต่างๆ ของบทที่ 1 ได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถเขียนร่าง "ความเป็นมาและความสำคัญ" ของโครงงานตนเองได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของบทนำในการสร้างความน่าสนใจให้กับรายงาน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>บทนำ (บทที่ 1) คือส่วนที่ปูพื้นฐานและสร้างความน่าสนใจให้กับรายงานทั้งหมด โดยมีองค์ประกอบสำคัญคือ ความเป็นมาและความสำคัญ, วัตถุประสงค์, สมมติฐาน, ขอบเขต, นิยามศัพท์, และประโยชน์ที่คาดว่าจะได้รับ เพื่อตอบคำถามว่า ทำไม, ทำเพื่ออะไร, และทำอย่างไร</p>
            
            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มุ่งมั่นในการทำงาน</li>
            </ul>
            
            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Active Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูเปิดตัวอย่างบทนำของโครงงานที่ได้รับรางวัล และให้นักเรียนช่วยกันวิเคราะห์ว่า "อะไรในบทนำนี้ที่ทำให้น่าอ่านต่อ? ผู้เขียนใช้วิธีเล่าเรื่องอย่างไร?"</li>
                <li><strong>ขั้นสำรวจและอธิบาย (Explore & Explain - 30 นาที):</strong> ครูให้นักเรียนศึกษา "องค์ประกอบของบทที่ 1" ทั้ง 6 ข้อจากเนื้อหาในแอป จากนั้นครูอธิบายเพิ่มเติม โดยเน้นที่โครงสร้าง 3 ส่วนของ "ความเป็นมาและความสำคัญ" ว่าเป็นการเล่าเรื่องจากภาพใหญ่มาสู่จุดเล็กๆ ที่เราสนใจ</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 40 นาที):</strong> นักเรียนทำ "แบบฝึกหัดท้ายบท" โดยลงมือเขียนร่าง "ความเป็นมาและความสำคัญ" ของโครงงานตนเอง แล้วให้ AI ช่วยตรวจสอบโครงสร้าง 3 ส่วน และให้คำแนะนำในการปรับปรุงการเชื่อมโยงเนื้อหา</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูประเมินความเข้าใจของนักเรียนจากร่างที่นักเรียนเขียน และความสามารถในการนำคำแนะนำของ AI ไปปรับปรุงชิ้นงานของตนเอง โดยอาจสุ่มนักเรียน 1-2 คนมาแชร์ผลลัพธ์</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS2 &gt; บทที่ 2</li>
                <li>ตัวอย่างบทนำของโครงงานรุ่นพี่</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: อธิบายองค์ประกอบและเขียนร่างได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจร่าง "ความเป็นมาและความสำคัญ" จากแบบฝึกหัดท้ายบท</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตารางประเมินผล (Rubric) การเขียนบทที่ 1</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนเขียนร่างได้มีโครงสร้าง 3 ส่วนเบื้องต้น และมีความสอดคล้องกับชื่อเรื่อง (ระดับ "ดี" ขึ้นไป)</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">A: เห็นความสำคัญของบทนำ</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตความกระตือรือร้นในการปรับปรุงงานตามคำแนะนำ</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนมีการปรับแก้ร่างของตนเองให้ดีขึ้น</td>
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