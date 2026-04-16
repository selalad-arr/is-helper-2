import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 11 (IS2)</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าด้วยตนเอง (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20202 - I30202 การสื่อสารและการนำเสนอ (IS2) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 3 Show and Share</p>
                <p><strong>เรื่อง:</strong> บทที่ 9: เทคนิคการนำเสนออย่างมีประสิทธิภาพ</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการสื่อสาร:</strong> นักเรียนสามารถใช้ทักษะการสื่อสารทั้งวัจนภาษาและอวัจนภาษา (การพูด, ภาษาท่าทาง) เพื่อนำเสนอผลงานได้อย่างมีประสิทธิภาพ</li>
                <li><strong>ด้านการจัดการตนเอง:</strong> นักเรียนสามารถบริหารความประหม่าและสร้างความมั่นใจผ่านการเตรียมตัวและฝึกซ้อมได้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบายเทคนิคการพูด, การใช้ภาษาท่าทาง, และการบริหารเวลาในการนำเสนอได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถฝึกซ้อมการนำเสนอโดยใช้สคริปต์และให้ข้อเสนอแนะแก่เพื่อนได้ (Peer Feedback)</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของการเตรียมตัวและฝึกซ้อมเพื่อลดความประหม่าและสร้างความมั่นใจ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>การนำเสนอที่มีประสิทธิภาพประกอบด้วยเนื้อหาที่ดีและวิธีการนำเสนอที่น่าสนใจ ซึ่งต้องอาศัยการเตรียมตัว, การฝึกซ้อมทักษะการพูดและภาษาท่าทาง, และการบริหารเวลา เพื่อสื่อสารประเด็นสำคัญของโครงงานให้ผู้ฟังเข้าใจและจดจำได้</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>กล้าแสดงออก</li>
                <li>ใฝ่เรียนรู้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Role Play & Peer Feedback)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูถามนักเรียนว่า "ใครเคยรู้สึกประหม่าเวลาต้องพูดหน้าชั้นบ้าง?" และชวนคุยถึงสาเหตุของความประหม่า เพื่อนำเข้าสู่หัวข้อการเตรียมตัวเพื่อสร้างความมั่นใจ</li>
                <li><strong>ขั้นสำรวจและอธิบาย (Explore & Explain - 30 นาที):</strong> ครูให้นักเรียนศึกษาเนื้อหาในบทที่ 9 เกี่ยวกับเทคนิคการนำเสนอ 5 ด้าน (เตรียมตัว, พูด, ภาษาท่าทาง, เนื้อหา, การทำงานกลุ่ม) และครูอธิบายเพิ่มเติมพร้อมสาธิตภาษาท่าทางที่ดี (เช่น การสบตา, การยืน) และไม่ดี (เช่น การหลบตา, การโยกตัว)</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 40 นาที):</strong> 
                    <ul className="list-disc list-inside mt-2">
                        <li>นักเรียนทำ "แบบฝึกหัดท้ายบท" เพื่อให้ AI Coach ช่วยเกลาสคริปต์การเปิดเรื่องให้น่าสนใจ</li>
                        <li>นักเรียนจับคู่กับเพื่อน นำสคริปต์ที่ปรับแก้แล้วมาฝึกซ้อมนำเสนอ (แค่ 1-2 สไลด์) โดยให้เพื่อนทำหน้าที่เป็นผู้ฟังและให้ Feedback ตามเกณฑ์ Rubric ในบทเรียน (Peer Feedback)</li>
                    </ul>
                </li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูสังเกตการณ์กิจกรรมคู่ ประเมินทักษะการให้ Feedback ของนักเรียน และสุ่มถามนักเรียนว่าได้เรียนรู้อะไรจากการฝึกซ้อมและรับฟังความคิดเห็นจากเพื่อน</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS2 &gt; บทที่ 9</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: อธิบายและฝึกซ้อมได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตกิจกรรมการฝึกซ้อมเป็นคู่ (Peer Feedback)</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตารางประเมินผล (Rubric) ทักษะการนำเสนอ</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถให้ Feedback แก่เพื่อนโดยอ้างอิงจากเทคนิคที่เรียนไปได้ในระดับ "ดี" ขึ้นไป</td>
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
