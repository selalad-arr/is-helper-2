import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 5 (IS2)</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าด้วยตนเอง (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20202 - I30202 การสื่อสารและการนำเสนอ (IS2) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 2 Writing Report</p>
                <p><strong>เรื่อง:</strong> บทที่ 3: การเขียนบทที่ 2 (เอกสารที่เกี่ยวข้อง)</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการคิดขั้นสูง:</strong> นักเรียนสามารถสังเคราะห์ข้อมูลจากหลายแหล่ง และเรียบเรียงเป็นองค์ความรู้ใหม่ได้อย่างเป็นระบบ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบายองค์ประกอบของบทที่ 2 และความสำคัญของการสังเคราะห์ข้อมูลได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถสรุปและสังเคราะห์ข้อมูลจากแหล่งข้อมูล 2 แหล่งในเรื่องเดียวกันเบื้องต้นได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นคุณค่าของการสืบค้นข้อมูลที่รอบด้านเพื่อสร้างความน่าเชื่อถือให้กับโครงงาน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>บทที่ 2 (เอกสารที่เกี่ยวข้อง) คือการแสดงภูมิความรู้ของผู้จัดทำผ่านการสืบค้นและสังเคราะห์ข้อมูลเกี่ยวกับทฤษฎีและงานวิจัยที่เกี่ยวข้องทั้งหมด เพื่อสร้างรากฐานทางวิชาการที่แข็งแรงให้กับโครงงาน</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มีความรับผิดชอบ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Active Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูให้นักเรียนดูตัวอย่างบทที่ 2 ที่ "ไม่ดี" (คัดลอกมาวางต่อๆ กัน) และ "ดี" (มีการเรียบเรียงและสังเคราะห์ใหม่) แล้วถามว่า "2 แบบนี้ต่างกันอย่างไร และแบบไหนแสดงให้เห็นว่าผู้เขียนมีความเข้าใจในเรื่องที่เขียนมากกว่ากัน?"</li>
                <li><strong>ขั้นสำรวจและอธิบาย (Explore & Explain - 30 นาที):</strong> ครูให้นักเรียนศึกษาเนื้อหาในบทที่ 3 เกี่ยวกับองค์ประกอบของบทที่ 2 และหัวใจสำคัญคือ "การสังเคราะห์" จากนั้นครูอธิบายเพิ่มเติมพร้อมยกตัวอย่างการเขียนที่แสดงการสังเคราะห์เปรียบเทียบข้อมูลจากหลายแหล่ง</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 40 นาที):</strong> ให้นักเรียนทำ "แบบฝึกหัดท้ายบท" โดยลองสรุปข้อมูลจาก 2 แหล่งที่หามา แล้วให้ AI ช่วยแสดงตัวอย่างการ "สังเคราะห์" ข้อมูลสองส่วนนั้นเข้าด้วยกันเป็นย่อหน้าเดียวที่ต่อเนื่อง</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูสุ่มให้นักเรียนนำเสนอตัวอย่างการสังเคราะห์ที่ได้จาก AI และร่วมกันอภิปรายว่าการเขียนแบบสังเคราะห์ดีกว่าการสรุปเรียงต่อกันอย่างไร เพื่อประเมินความเข้าใจ</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS2 &gt; บทที่ 3</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: อธิบายและสังเคราะห์ข้อมูลได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจคำตอบใน "แบบฝึกหัดท้ายบท" และสังเกตการอภิปราย</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตารางประเมินผล (Rubric) การเขียนบทที่ 2 - เกณฑ์การสังเคราะห์ข้อมูล</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถอธิบายความแตกต่างระหว่างการสรุปและการสังเคราะห์ได้ในระดับ "ดี" ขึ้นไป</td>
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