import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 7 (IS2)</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าด้วยตนเอง (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20202 - I30202 การสื่อสารและการนำเสนอ (IS2) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 2 Writing Report</p>
                <p><strong>เรื่อง:</strong> บทที่ 5: การเขียนบทที่ 4 (ผลการศึกษา)</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
             <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการคิดขั้นสูง:</strong> นักเรียนสามารถแยกแยะระหว่างข้อเท็จจริง (Fact) และการตีความ (Interpretation) ได้</li>
                <li><strong>ด้านการสื่อสาร:</strong> นักเรียนสามารถนำเสนอข้อมูลที่ค้นพบได้อย่างเป็นกลางและตรงไปตรงมา</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบาย "กฎเหล็ก" ของบทที่ 4 คือการรายงานผลโดยไม่ตีความได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถเขียนบรรยายผลจากข้อมูลที่กำหนดให้ได้อย่างเป็นกลาง</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของการแยกข้อเท็จจริงออกจากการตีความในการเขียนรายงาน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>บทที่ 4 (ผลการศึกษา) คือการนำเสนอข้อค้นพบตามความเป็นจริง โดยปราศจากการตีความหรือใส่ความคิดเห็นส่วนตัว เพื่อให้ผู้อ่านได้รับทราบข้อเท็จจริงที่ได้จากการศึกษาก่อนจะนำไปสู่การอภิปรายในบทต่อไป</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ซื่อสัตย์สุจริต (ต่อข้อมูล)</li>
                <li>มีเหตุผล</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Active Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูแสดงภาพข่าว 1 ภาพ พร้อมพาดหัวข่าว 2 แบบ แบบแรกคือพาดหัวตามจริง (เช่น "เกิดเหตุไฟไหม้ที่อาคาร A") แบบที่สองคือพาดหัวแบบใส่ความเห็นชี้นำ (เช่น "ไฟไหม้ปริศนา คาดอาจเป็นการลอบวางเพลิง!") แล้วถามนักเรียนว่า "พาดหัวแบบไหนคือการรายงานข้อเท็จจริง แบบไหนคือการแสดงความเห็น?" เพื่อนำเข้าสู่การแยกข้อเท็จจริงและความเห็น</li>
                <li><strong>ขั้นสำรวจและอธิบาย (Explore & Explain - 30 นาที):</strong> ให้นักเรียนศึกษาเนื้อหาในบทที่ 5 โดยเฉพาะ "กฎเหล็กของบทที่ 4" และ "วิธีการนำเสนอผล" จากนั้นครูอธิบายย้ำถึงความสำคัญของการรายงานผลตามจริง และความแตกต่างระหว่างการบรรยายใต้ตาราง/ภาพในบทที่ 4 กับการอภิปรายในบทที่ 5</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 40 นาที):</strong> นักเรียนทำ "แบบฝึกหัดท้ายบท" โดยลองเขียนประโยครายงานผลจากข้อมูลที่กำหนดให้ แล้วให้ AI ช่วยตรวจและแนะนำการเขียนให้เป็นกลางและปราศจากการตีความ</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูประเมินความเข้าใจของนักเรียนจากคำตอบในแบบฝึกหัดและความสามารถในการแยกแยะระหว่างการรายงานผลกับการตีความ ผ่านการอภิปรายร่วมกันในชั้นเรียน</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS2 &gt; บทที่ 5</li>
                <li>ตัวอย่างภาพข่าวและพาดหัวข่าว</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: อธิบายและเขียนบรรยายผลได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจคำตอบใน "แบบฝึกหัดท้ายบท"</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตารางประเมินผล (Rubric) การเขียนบทที่ 4</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถเขียนบรรยายผลโดยไม่ใส่การตีความได้ถูกต้อง (ระดับ "ดีมาก" ขึ้นไป)</td>
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
