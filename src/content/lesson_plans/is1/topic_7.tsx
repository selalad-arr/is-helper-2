import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 8</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20201 - I30201 การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 3 การสรุปองค์ความรู้</p>
                <p><strong>เรื่อง:</strong> บทที่ 7: การสังเคราะห์และสรุปองค์ความรู้</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการคิดขั้นสูง:</strong> นักเรียนสามารถสังเคราะห์ข้อค้นพบ, เปรียบเทียบกับทฤษฎี, และตีความเพื่อสร้างเป็นองค์ความรู้ใหม่ได้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบายขั้นตอนการสังเคราะห์ความรู้ 6 ขั้นตอนได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถเชื่อมโยงผลการศึกษาเข้ากับสมมติฐานและเอกสารที่เกี่ยวข้องเพื่ออภิปรายผลเบื้องต้นได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของการตีความข้อมูลมากกว่าแค่การสรุปย่อ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>การสังเคราะห์องค์ความรู้คือการสร้างความหมายจากข้อค้นพบ โดยการนำผลที่ได้มาตีความ, เปรียบเทียบกับสมมติฐานและงานวิจัยอื่น, เพื่อสร้างเป็นข้อสรุปและข้อเสนอแนะที่เป็นองค์ความรู้ใหม่ในภาษาของผู้ศึกษาเอง</p>
            
            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มีเหตุผลและคิดอย่างเป็นระบบ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ 5Es Inquiry-Based Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูนำเสนอ "ข้อค้นพบ" 2-3 ข้อที่ดูไม่เกี่ยวข้องกัน (เช่น 1. ไอศกรีมขายดีขึ้น 2. อัตราการจมน้ำสูงขึ้น) แล้วให้นักเรียนลอง "เชื่อมโยง" ข้อค้นพบเหล่านั้นให้เป็นเรื่องราวเดียวกัน (เช่น ทั้งสองอย่างเกิดในฤดูร้อน) เพื่อนำเข้าสู่แนวคิดของการสังเคราะห์หาความสัมพันธ์</li>
                <li><strong>ขั้นสำรวจและอธิบาย (Explore & Explain - 30 นาที):</strong> ครูให้นักเรียนศึกษา "ขั้นตอนการสังเคราะห์ความรู้" 6 ขั้นตอนจากบทเรียน จากนั้นครูอธิบายขยายความแต่ละขั้นตอน โดยเน้นความแตกต่างระหว่าง "การสรุปย่อ" (Summary) กับ "การสังเคราะห์" (Synthesis) ซึ่งคือการสร้างความหมายใหม่</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 40 นาที):</strong> นักเรียนทำ "แบบฝึกหัดท้ายบท" โดยนำข้อค้นพบหลักและสมมติฐานของโครงงานตนเองมาให้ AI ช่วยตั้งคำถามชี้นำในการสังเคราะห์และสร้างข้อสรุป (เช่น ผลสอดคล้องกับสมมติฐานหรือไม่, เหมือนหรือต่างจากงานวิจัยอื่นอย่างไร)</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูประเมินความเข้าใจของนักเรียนจากการตอบคำถามชี้นำของ AI และความสามารถในการร่างข้อสรุปเบื้องต้นของตนเอง ครูให้ข้อเสนอแนะเพื่อนำไปปรับปรุงในรายงานจริง</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS1 &gt; บทที่ 7</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: อธิบายและเชื่อมโยงผลได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจคำตอบจากการทำแบบฝึกหัดท้ายบท</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">เกณฑ์ Rubric ในบทเรียน</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถตอบคำถามชี้นำของ AI เพื่อเชื่อมโยงผลกับสมมติฐานได้ (ระดับ "ดี" ขึ้นไป)</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">A: เห็นความสำคัญของการตีความ</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตการอภิปรายในชั้นเรียน</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนพยายามตีความหมายของข้อมูลมากกว่าแค่การบอกว่าเจออะไร</td>
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