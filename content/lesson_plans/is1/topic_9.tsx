import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 10</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20201 - I30201 การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 3 การสรุปองค์ความรู้</p>
                <p><strong>เรื่อง:</strong> บทที่ 9: การนำเสนอผลงาน</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการสื่อสาร:</strong> นักเรียนสามารถวางโครงสร้างและนำเสนอผลงานของตนเองด้วยวาจาได้อย่างชัดเจนและน่าสนใจ</li>
                <li><strong>ด้านการจัดการตนเอง:</strong> นักเรียนสามารถบริหารเวลาและฝึกซ้อมการนำเสนอเพื่อสร้างความมั่นใจได้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถบอกโครงสร้างและเคล็ดลับการนำเสนอผลงานที่ดีได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถเขียนสคริปต์การนำเสนอส่วนที่มาและความสำคัญเบื้องต้น และฝึกซ้อมการนำเสนอได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของการฝึกซ้อมเพื่อการนำเสนอที่มีประสิทธิภาพ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>การนำเสนอผลงานคือการสื่อสารเรื่องราวและข้อค้นพบของโครงงานให้ผู้อื่นเข้าใจ โดยต้องมีการวางโครงสร้างเนื้อหาที่ชัดเจน, สื่อประกอบที่กระชับ, และการฝึกซ้อมทักษะการพูดเพื่อสร้างความน่าสนใจและความน่าเชื่อถือ</p>
            
            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>มุ่งมั่นในการทำงาน</li>
                <li>กล้าแสดงออก</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Role Play & Peer Feedback)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูเปิดวิดีโอตัวอย่างการนำเสนอที่ดี (เช่น TED Talk) และไม่ดี (เช่น คนที่อ่านสไลด์ตลอดเวลา) อย่างละ 1 นาที แล้วให้นักเรียนร่วมกันอภิปรายว่า "อะไรคือความแตกต่างที่สำคัญที่สุดระหว่างสองคนนี้?"</li>
                <li><strong>ขั้นสำรวจและอธิบาย (Explore & Explain - 30 นาที):</strong> ครูให้นักเรียนศึกษา "โครงสร้างการนำเสนอที่แนะนำ" และ "เคล็ดลับการนำเสนอให้น่าสนใจ" จากบทเรียน จากนั้นครูอธิบายเพิ่มเติมในแต่ละประเด็น โดยเฉพาะความสำคัญของการซ้อม และการใช้ภาษาท่าทาง</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 40 นาที):</strong> 
                    <ul className="list-disc list-inside mt-2">
                        <li>นักเรียนทำ "แบบฝึกหัดท้ายบท" เพื่อให้ AI Coach ช่วยเกลาสคริปต์การเปิดเรื่องให้น่าสนใจ</li>
                        <li>นักเรียนจับคู่กับเพื่อน นำสคริปต์ที่ปรับแก้แล้วมาฝึกซ้อมนำเสนอ (แค่ 1-2 สไลด์) โดยให้เพื่อนทำหน้าที่เป็นผู้ฟังและให้ Feedback ตามเกณฑ์ Rubric ในบทเรียน</li>
                    </ul>
                </li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูสังเกตการณ์กิจกรรมคู่ ประเมินทักษะการให้ Feedback ของนักเรียน และสุ่มถามนักเรียนว่าได้เรียนรู้อะไรจากการฝึกซ้อมและรับฟังความคิดเห็นจากเพื่อน</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS1 &gt; บทที่ 9</li>
                <li>วิดีโอตัวอย่างการนำเสนอ (TED Talk หรืออื่นๆ)</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: บอกโครงสร้างและเขียนสคริปต์ได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจสคริปต์จาก "แบบฝึกหัดท้ายบท"</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบประเมินสคริปต์ (AI)</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถเขียนสคริปต์ที่สื่อถึงที่มาของโครงงานได้ชัดเจนและน่าสนใจ</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">A: เห็นความสำคัญของการซ้อม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตกิจกรรมฝึกพูดเป็นคู่ (Peer Feedback)</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนมีความตั้งใจในการฝึกซ้อมและให้ข้อเสนอแนะเพื่อนอย่างสร้างสรรค์</td>
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