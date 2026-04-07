import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 5</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20201 - I30201 การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 2 การสืบค้นความรู้จากแหล่งเรียนรู้และสารสนเทศ</p>
                <p><strong>เรื่อง:</strong> บทที่ 4: การสืบค้นและประเมินแหล่งข้อมูล</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>

            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการคิดขั้นสูง:</strong> นักเรียนสามารถประเมินความน่าเชื่อถือของแหล่งข้อมูลโดยใช้เกณฑ์ที่หลากหลายได้</li>
                <li><strong>ด้านการจัดการตนเอง:</strong> นักเรียนสามารถเลือกใช้แหล่งข้อมูลที่เหมาะสมกับประเด็นที่ตนเองสนใจศึกษาได้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถบอกแหล่งข้อมูลที่น่าเชื่อถือและอธิบายเกณฑ์การประเมินความน่าเชื่อถือ (ผู้แต่ง, ความเป็นกลาง, ความทันสมัย) ได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถใช้เครื่องมือ AI เพื่อช่วยประเมินความน่าเชื่อถือของแหล่งข้อมูลที่ตนเองสนใจได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนตระหนักถึงความสำคัญของการเลือกใช้แหล่งข้อมูลที่น่าเชื่อถือในการทำโครงงาน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>ความน่าเชื่อถือของโครงงานขึ้นอยู่กับคุณภาพของข้อมูลที่นำมาอ้างอิง การเลือกใช้แหล่งข้อมูลทางวิชาการที่ได้มาตรฐานและการประเมินแหล่งข้อมูลตามหลักการ (ผู้แต่ง, ความเป็นกลาง, ความทันสมัย) เป็นทักษะที่จำเป็นอย่างยิ่งสำหรับผู้ศึกษาค้นคว้า</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มีวิจารณญาณ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Active Learning 5Es)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูนำเสนอข่าวปลอม (Fake News) ที่เคยเป็นกระแส ให้นักเรียนดู และตั้งคำถามว่า "นักเรียนจะรู้ได้อย่างไรว่าข้อมูลไหนจริง ข้อมูลไหนปลอม?" เพื่อนำเข้าสู่เรื่องความสำคัญของการประเมินความน่าเชื่อถือของข้อมูล</li>
                <li><strong>ขั้นสำรวจ (Explore - 20 นาที):</strong> ให้นักเรียนสำรวจ "แหล่งการหาข้อมูลอ้างอิงที่ดีและได้มาตรฐาน" ทั้งภาษาไทยและอังกฤษจากตารางในบทเรียน ครูอาจสาธิตการเข้าใช้งานและสืบค้นข้อมูลจากฐานข้อมูล ThaiLIS ให้นักเรียนดูเป็นตัวอย่าง</li>
                <li><strong>ขั้นอธิบาย (Explain - 20 นาที):</strong> ครูอธิบายเกณฑ์การประเมินความน่าเชื่อถือของแหล่งข้อมูล โดยใช้ตาราง Rubric ในบทเรียนเป็นแนวทางในการอธิบายแต่ละเกณฑ์ (ผู้แต่ง, อคติ, ความทันสมัย) และยกตัวอย่างเว็บไซต์ที่ดีและไม่ดีประกอบ</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 30 นาที):</strong> ให้นักเรียนทำ "แบบฝึกหัดท้ายบท: วิเคราะห์แหล่งข้อมูล" โดยให้นักเรียนนำเว็บไซต์หรือบทความที่ตนเองสนใจมาให้ AI ช่วยวิเคราะห์ความน่าเชื่อถือตามเกณฑ์ที่เรียนไป</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูสุ่มนักเรียน 2-3 คน มานำเสนอผลการวิเคราะห์จาก AI และอภิปรายร่วมกันในชั้นเรียนว่าเห็นด้วยหรือไม่เห็นด้วยกับ AI เพราะเหตุใด เพื่อประเมินความเข้าใจของนักเรียน</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS1 &gt; บทที่ 4</li>
                <li>ฐานข้อมูล ThaiLIS หรือ Google Scholar (สำหรับการสาธิต)</li>
                <li>ฟีเจอร์ "แบบฝึกหัดท้ายบท: วิเคราะห์แหล่งข้อมูล" (SourceAnalysisExercise)</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K: บอกแหล่งข้อมูลและเกณฑ์ประเมินได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">การตอบคำถามในชั้นเรียน</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตการตอบคำถาม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถบอกชื่อฐานข้อมูลที่น่าเชื่อถือได้ และอธิบายเกณฑ์ประเมินได้อย่างน้อย 2 เกณฑ์</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">S, A: ประเมินแหล่งข้อมูลได้ และตระหนักถึงความสำคัญ</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ประเมินผลจากการทำแบบฝึกหัดท้ายบทและการอภิปราย</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">เกณฑ์ Rubric ในบทเรียน</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถให้เหตุผลประกอบการตัดสินความน่าเชื่อถือของแหล่งข้อมูลที่ตนเลือกมาได้ (ระดับ "ดี" ขึ้นไป)</td>
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