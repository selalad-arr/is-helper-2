import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 11</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20201 - I30201 การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 3 การสรุปองค์ความรู้</p>
                <p><strong>เรื่อง:</strong> บทที่ 10: คุณค่าและประโยชน์ของการทำ IS</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการจัดการตนเอง:</strong> นักเรียนสามารถสะท้อนคิดเกี่ยวกับกระบวนการเรียนรู้และพัฒนาการของตนเองได้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถระบุทักษะที่ตนเองได้รับจากการทำโครงงาน IS ได้อย่างน้อย 3 ทักษะ</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถเขียนสะท้อนคิด (Reflection) เกี่ยวกับประสบการณ์การเรียนรู้และความท้าทายของตนเองได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นคุณค่าของกระบวนการเรียนรู้ด้วยตนเองและสามารถเชื่อมโยงไปสู่อนาคตได้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>หัวใจสำคัญของการทำ IS ไม่ใช่แค่ผลงานที่สำเร็จ แต่คือ "กระบวนการ" ที่ช่วยพัฒนาทักษะที่จำเป็นสำหรับศตวรรษที่ 21 เช่น การคิดเชิงวิพากษ์, การแก้ปัญหา, และการสื่อสาร ซึ่งเป็นประโยชน์ต่อการเรียนรู้ตลอดชีวิต</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มุ่งมั่นในการทำงาน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Reflection-Based Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 15 นาที):</strong> ครูให้นักเรียนแต่ละคนเขียนลงในกระดาษ 1 ประโยค "สิ่งที่ยากที่สุดในการทำ IS คือ..." แล้วรวบรวมมาอ่านหน้าชั้นเรียนโดยไม่ระบุชื่อ เพื่อให้นักเรียนเห็นว่าทุกคนต่างก็เจอกับความท้าทาย และไม่ใช่เรื่องแปลก</li>
                <li><strong>ขั้นสำรวจและอธิบาย (Explore & Explain - 25 นาที):</strong> ครูให้นักเรียนศึกษา "ทักษะสำคัญที่ได้จากการเรียนรู้ด้วยตนเอง (IS)" ทั้ง 6 ข้อในบทเรียน จากนั้นครูเชื่อมโยง "ความท้าทาย" ที่นักเรียนเขียนในขั้นนำ ว่ามันสัมพันธ์กับการพัฒนาทักษะข้อไหนบ้าง เช่น "การที่หาข้อมูลยาก ทำให้เราได้ฝึกทักษะการสืบค้น"</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 30 นาที):</strong> นักเรียนทำ "แบบฝึกหัดท้ายบท" โดยเขียนสะท้อนคิดเกี่ยวกับความท้าทายที่ตนเองเจอและสิ่งที่ได้เรียนรู้จากมัน แล้วให้ AI ช่วยให้ Feedback ที่สร้างสรรค์และให้กำลังใจ เพื่อช่วยให้นักเรียนเห็นทักษะที่ซ่อนอยู่ในประสบการณ์ของตน</li>
                <li><strong>ขั้นประเมิน (Evaluate - 20 นาที):</strong> ครูให้นักเรียนจับกลุ่ม 3-4 คน แลกเปลี่ยนสิ่งที่ได้เรียนรู้จากประสบการณ์ของตนเองและจากคำแนะนำของ AI เป็นการสรุปบทเรียนและสร้างความภาคภูมิใจในตนเองร่วมกัน ครูประเมินโดยการสังเกตการสนทนาในกลุ่ม</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS1 &gt; บทที่ 10</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: ระบุทักษะและเขียนสะท้อนคิดได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจการตอบใน "แบบฝึกหัดท้ายบท"</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตารางประเมินผล (Rubric) การสะท้อนคิด</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถระบุทักษะและอธิบายการเรียนรู้จากความท้าทายได้ในระดับ "ดี" ขึ้นไป</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">A: เห็นคุณค่าของกระบวนการ</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตการอภิปรายในกลุ่มย่อย</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนแสดงทัศนคติเชิงบวกต่อประสบการณ์การทำ IS ของตนเอง</td>
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