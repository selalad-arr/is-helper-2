import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 6</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20201 - I30201 การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 2 การสืบค้นความรู้จากแหล่งเรียนรู้และสารสนเทศ</p>
                <p><strong>เรื่อง:</strong> บทที่ 5: การสร้างเครื่องมือและการรวบรวมข้อมูล</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการคิดขั้นสูง:</strong> นักเรียนสามารถออกแบบคำถามในเครื่องมือรวบรวมข้อมูลที่สามารถวัดผลสิ่งที่ต้องการศึกษาได้อย่างตรงประเด็น</li>
                <li><strong>ด้านการสื่อสาร:</strong> นักเรียนสามารถใช้ภาษาในการสร้างคำถามที่ชัดเจน ไม่กำกวม และเหมาะสมกับกลุ่มเป้าหมาย</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบายความแตกต่างของเครื่องมือรวบรวมข้อมูลประเภทต่างๆ (แบบสอบถาม, สัมภาษณ์, สังเกต) ได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถออกแบบคำถามเบื้องต้นสำหรับเครื่องมือที่สอดคล้องกับโครงงานของตนเองได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของการสร้างเครื่องมือที่มีคุณภาพเพื่อให้ได้ข้อมูลที่น่าเชื่อถือ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>การเก็บข้อมูลที่มีคุณภาพต้องอาศัยเครื่องมือที่เหมาะสมและออกแบบมาอย่างดี ไม่ว่าจะเป็นแบบสอบถาม การสัมภาษณ์ หรือการสังเกต ซึ่งแต่ละชนิดมีจุดเด่นและข้อควรระวังในการสร้างที่แตกต่างกันไป</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มุ่งมั่นในการทำงาน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Jigsaw)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูสมมติสถานการณ์ "ต้องการสำรวจความพึงพอใจต่ออาหารกลางวันของโรงเรียน" แล้วให้นักเรียนช่วยกันคิดว่าจะ "เก็บข้อมูลด้วยวิธีไหนได้บ้าง" เพื่อนำเข้าสู่เครื่องมือประเภทต่างๆ</li>
                <li><strong>ขั้นสำรวจ (Explore - 25 นาที):</strong> 
                    <ul className="list-disc list-inside mt-2">
                        <li>ครูแบ่งนักเรียนเป็นกลุ่มผู้เชี่ยวชาญ 3 กลุ่ม (Home Group)</li>
                        <li>กลุ่มที่ 1 ศึกษาเรื่อง "การสร้างแบบสอบถาม"</li>
                        <li>กลุ่มที่ 2 ศึกษาเรื่อง "เทคนิคการสัมภาษณ์"</li>
                        <li>กลุ่มที่ 3 ศึกษาเรื่อง "การสังเกต"</li>
                        <li>แต่ละกลุ่มศึกษาเนื้อหาที่ได้รับมอบหมายจากบทที่ 5 ในแอปฯ และสรุปประเด็นสำคัญ</li>
                    </ul>
                </li>
                <li><strong>ขั้นอธิบาย (Explain - 30 นาที):</strong> 
                    <ul className="list-disc list-inside mt-2">
                        <li>นักเรียนย้ายไปกลุ่มใหม่ (Expert Group) ที่มีสมาชิกจากแต่ละกลุ่มผู้เชี่ยวชาญมารวมกัน</li>
                        <li>ผู้เชี่ยวชาญแต่ละคนผลัดกันอธิบายหลักการสำคัญของเครื่องมือที่ตนเองศึกษามาให้เพื่อนในกลุ่มฟัง</li>
                    </ul>
                </li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 15 นาที):</strong> นักเรียนแต่ละคนทำ "แบบฝึกหัดท้ายบท" โดยระบุว่าตนเองต้องการเก็บข้อมูลอะไร จากใคร แล้วให้ AI ช่วยออกแบบคำถามตัวอย่างสำหรับเครื่องมือที่เหมาะสมกับโครงงานของตนเอง</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูสุ่มนักเรียน 2-3 คน ให้อ่านคำแนะนำที่ได้จาก AI และอภิปรายร่วมกันในชั้นเรียนถึงความเหมาะสมของคำถามที่ AI แนะนำ เพื่อประเมินความเข้าใจของนักเรียน</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS1 &gt; บทที่ 5</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K: อธิบายความแตกต่างของเครื่องมือ</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตการอธิบายในกิจกรรม Jigsaw</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรมกลุ่ม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถอธิบายหลักการของเครื่องมือที่ได้รับมอบหมายให้เพื่อนฟังได้ถูกต้อง</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">S: ออกแบบคำถามเบื้องต้นได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจคำตอบใน "แบบฝึกหัดท้ายบท" และการอภิปราย</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบประเมินคำตอบ (AI)</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถระบุสิ่งที่ต้องการเก็บข้อมูล และได้รับคำแนะนำจาก AI ที่สอดคล้องกับโครงงานของตน</td>
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