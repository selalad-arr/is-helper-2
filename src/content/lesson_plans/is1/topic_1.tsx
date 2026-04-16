import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 2</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20201 - I30201 การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 1 การตั้งประเด็นคำถาม/สมมุติฐาน</p>
                <p><strong>เรื่อง:</strong> บทที่ 1: การตั้งประเด็นปัญหาและความสำคัญ</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการคิดขั้นสูง:</strong> นักเรียนสามารถวิเคราะห์และสังเคราะห์ข้อมูลจากความสนใจของตนเอง เพื่อตั้งเป็นประเด็นปัญหาที่สามารถศึกษาค้นคว้าได้</li>
                <li><strong>ด้านการสื่อสาร:</strong> นักเรียนสามารถใช้ AI เป็นเครื่องมือในการสื่อสาร แลกเปลี่ยนความคิด เพื่อพัฒนาหัวข้อโครงงานของตนเองได้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบายหลักการเขียน "ความเป็นมาและความสำคัญ" ที่มีโครงสร้าง 3 ส่วนได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถตั้งประเด็นปัญหาที่สนใจและมีความเป็นไปได้ในการศึกษาค้นคว้าโดยใช้เครื่องมือ AI ช่วยเหลือ</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นคุณค่าของการตั้งประเด็นปัญหาจากความสนใจใคร่รู้ของตนเอง</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>จุดเริ่มต้นของโครงงานที่ดีมาจากการตั้งประเด็นปัญหาที่ชัดเจนและมาจากความสนใจของผู้เรียน ซึ่งสะท้อนผ่านการเขียน "ความเป็นมาและความสำคัญ" ที่มีโครงสร้าง 3 ส่วน (ภาพใหญ่, เจาะลึก, ที่มาจริง) เพื่อแสดงให้เห็นถึงความสำคัญและความเป็นไปได้ในการศึกษา</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มีความคิดสร้างสรรค์</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ 5Es Inquiry-Based Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 15 นาที):</strong> ครูถามคำถามสำคัญว่า "ทำไมนักเรียนถึงอยากทำโครงงานนี้?" และให้นักเรียนดูตัวอย่างคำตอบที่ดีและไม่ดีจากตารางในบทเรียน เพื่อกระตุ้นให้นักเรียนคิดถึงที่มาของโครงงานอย่างลึกซึ้งและเป็นรูปธรรม</li>
                <li><strong>ขั้นสำรวจ (Explore - 25 นาที):</strong> ให้นักเรียนใช้งานฟีเจอร์ "แบบฝึกหัด: ค้นหาหัวข้อกับ AI" ในแอป IS Helper เพื่อระดมสมองและพัฒนาแนวคิดโครงงานของตนเอง โดยมี AI เป็นคู่สนทนาชี้นำตามขั้นตอนที่ออกแบบไว้</li>
                <li><strong>ขั้นอธิบาย (Explain - 20 นาที):</strong> ครูอธิบายหลักการเขียน "ความเป็นมาและความสำคัญ" ที่มีโครงสร้าง 3 ส่วน (ส่วนต้น-กลาง-ปลาย) โดยใช้ตัวอย่างจากบทเรียนประกอบ และเชื่อมโยงกับการสนทนาที่นักเรียนได้คุยกับ AI เพื่อให้นักเรียนเห็นภาพการนำความสนใจมาเขียนอย่างเป็นระบบ</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 20 นาที):</strong> ให้นักเรียนทำ "ใบกิจกรรมที่ 2: ระดมสมองกับ AI" โดยให้นักเรียนตั้งประเด็นปัญหาที่คิดว่าดีที่สุด 3 ประเด็นพร้อมเหตุผล แล้วส่งให้ AI ช่วยประเมินตามเกณฑ์ Rubric ในบทเรียน เพื่อฝึกฝนการประเมินและคัดเลือกหัวข้อ</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูประเมินความเข้าใจของนักเรียนจากคำตอบในใบกิจกรรม และประเมินทักษะการตั้งประเด็นปัญหาจากการสนทนากับ AI และผลลัพธ์ที่ได้</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS1 &gt; บทที่ 1</li>
                <li>ฟีเจอร์ "ค้นหาหัวข้อกับ AI" (Topic1CardFlow)</li>
                <li>ฟีเจอร์ "ใบกิจกรรมที่ 2" (InteractiveExercise)</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K: อธิบายหลักการเขียนความเป็นมาฯ</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจคำตอบในใบกิจกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบประเมินใบกิจกรรม (AI)</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนอธิบายเหตุผลของประเด็นที่สนใจได้สอดคล้องกับหลักการ</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">S: ตั้งประเด็นปัญหาได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ประเมินผลลัพธ์จากกิจกรรม "ค้นหาหัวข้อกับ AI"</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตารางประเมินผล (Rubric) การตั้งประเด็นการสืบค้น</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนได้หัวข้อที่มีความเป็นไปได้ในการศึกษาในระดับ "ดี" ขึ้นไป</td>
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
