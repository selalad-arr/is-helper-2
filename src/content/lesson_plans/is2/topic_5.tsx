import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 6 (IS2)</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าด้วยตนเอง (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20202 - I30202 การสื่อสารและการนำเสนอ (IS2) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 2 Writing Report</p>
                <p><strong>เรื่อง:</strong> บทที่ 4: การเขียนบทที่ 3 (วิธีดำเนินการ)</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>

            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการสื่อสาร:</strong> นักเรียนสามารถอธิบายขั้นตอนการดำเนินงานที่ซับซ้อนให้ผู้อื่นเข้าใจได้อย่างชัดเจนและเป็นลำดับ</li>
            </ul>
            
            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบายองค์ประกอบของบทที่ 3 และบอกเหตุผลที่ต้องเขียนในรูปอดีต (Past Tense) ได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถเขียนขั้นตอนการดำเนินงานของตนเองได้อย่างละเอียดและใช้ภาษาที่เหมาะสม</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของความชัดเจนและความละเอียดในการเขียนวิธีดำเนินการเพื่อให้ผู้อื่นสามารถทำซ้ำได้ (Replicability)</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>บทที่ 3 (วิธีดำเนินการ) คือการบันทึกกระบวนการศึกษาค้นคว้าทั้งหมดที่ได้ทำไปแล้ว โดยต้องเขียนให้ละเอียดและชัดเจนในรูปอดีต (Past Tense) มากพอที่ผู้อื่นจะสามารถนำไปทำซ้ำได้ เพื่อเป็นการยืนยันความน่าเชื่อถือของผลการศึกษา</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>มีระเบียบวินัย</li>
                <li>มีความรับผิดชอบ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Active Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูให้นักเรียนอ่าน "สูตรอาหาร" ที่มีขั้นตอนไม่ละเอียด (เช่น ใส่เกลือเล็กน้อย, อบจนสุก) แล้วถามว่า "ถ้าทำตามนี้ คิดว่าจะได้เค้กที่เหมือนต้นฉบับไหม เพราะอะไร?" เพื่อนำเข้าสู่ความสำคัญของ "ความละเอียด" และการทำซ้ำได้</li>
                <li><strong>ขั้นสำรวจและอธิบาย (Explore & Explain - 30 นาที):</strong> ให้นักเรียนศึกษาองค์ประกอบของบทที่ 3 และ "เคล็ดลับสำคัญ: เขียนในรูปอดีต" จากเนื้อหาในแอป จากนั้นครูอธิบายเพิ่มเติมถึงเหตุผลที่ต้องเขียนอย่างละเอียดเพื่อให้สามารถทำซ้ำ (Replicable) ได้ และความสำคัญของการใช้ Past Tense ในการรายงานสิ่งที่ทำไปแล้ว</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 40 นาที):</strong> นักเรียนทำ "แบบฝึกหัดท้ายบท" โดยลองอธิบายขั้นตอนการทดลองของตนเองมา 1 ขั้นตอน (อาจยังเป็นภาษาพูด) แล้วให้ AI ช่วยเกลาประโยคให้ถูกต้องตามหลักการเขียนวิธีดำเนินการ (ละเอียด, เป็นทางการ, Past Tense)</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูประเมินความเข้าใจของนักเรียนจากความสามารถในการปรับแก้ประโยคตามคำแนะนำของ AI และการอภิปรายในชั้นเรียนว่าทำไมประโยคที่ AI ปรับแก้จึงเหมาะสมกว่า</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS2 &gt; บทที่ 4</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: อธิบายและเขียนขั้นตอนได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจคำตอบใน "แบบฝึกหัดท้ายบท"</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตารางประเมินผล (Rubric) การเขียนบทที่ 3</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถปรับแก้ขั้นตอนของตนเองให้มีความชัดเจนและใช้ Past Tense ได้ในระดับ "ดี" ขึ้นไป</td>
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