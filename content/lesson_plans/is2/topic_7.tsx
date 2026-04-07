import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 8 (IS2)</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าด้วยตนเอง (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20202 - I30202 การสื่อสารและการนำเสนอ (IS2) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 2 Writing Report</p>
                <p><strong>เรื่อง:</strong> บทที่ 6: การเขียนบทที่ 5 (สรุปและอภิปรายผล)</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>

            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการคิดขั้นสูง:</strong> นักเรียนสามารถตีความผลการศึกษา, เปรียบเทียบกับองค์ความรู้เดิม, และสังเคราะห์เป็นข้อสรุปและข้อเสนอแนะใหม่ได้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบายองค์ประกอบของบทที่ 5 (สรุป, อภิปรายผล, ข้อเสนอแนะ) ได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถเชื่อมโยงผลการศึกษาเข้ากับสมมติฐานและงานวิจัยที่เกี่ยวข้องเพื่ออภิปรายผลเบื้องต้นได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของการอภิปรายผลในการสร้างความหมายและคุณค่าให้กับงานวิจัย</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>บทที่ 5 (สรุปและอภิปรายผล) คือส่วนที่ตีความและสร้างความหมายให้กับผลการศึกษา โดยการเชื่อมโยงข้อค้นพบเข้ากับสมมติฐานและองค์ความรู้เดิม เพื่อสรุปเป็นองค์ความรู้ใหม่และให้ข้อเสนอแนะที่นำไปสู่การต่อยอด</p>
            
            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มีเหตุผลและคิดอย่างเป็นระบบ</li>
            </ul>
            
            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Active Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูนำเสนอ "ผลการศึกษา" จากบทที่แล้ว (เช่น กลุ่ม A สูงกว่ากลุ่ม B) แล้วถามนักเรียนว่า "แล้วไงต่อ? ผลนี้บอกอะไรเรา? มันเป็นไปตามที่เราคาดไว้ไหม?" เพื่อนำเข้าสู่ความจำเป็นของการ "ตีความ" หรือ "อภิปรายผล"</li>
                <li><strong>ขั้นสำรวจและอธิบาย (Explore & Explain - 30 นาที):</strong> ให้นักเรียนศึกษาองค์ประกอบสำคัญของบทที่ 5 จากในแอป จากนั้นครูอธิบายเพิ่มเติม โดยเน้นส่วน "อภิปรายผล" ว่าต้องมีการเปรียบเทียบทั้งกับ "สมมติฐาน" ของเราเอง และ "งานวิจัยของคนอื่น" ในบทที่ 2 เพื่อสร้างความน่าเชื่อถือ</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 40 นาที):</strong> นักเรียนทำ "แบบฝึกหัดท้ายบท" โดยนำผลการศึกษาหลักและสมมติฐานของตนเองมาให้ AI ช่วยตั้งคำถามชี้นำ 3 ข้อ (เชื่อมกับสมมติฐาน, เชื่อมกับบทที่ 2, แล้วไงต่อ?) เพื่อฝึกกระบวนการคิดในการอภิปรายผล</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูประเมินความเข้าใจของนักเรียนโดยดูจากความสามารถในการตอบคำถามชี้นำของ AI และการร่างแนวทางการอภิปรายผลของตนเอง</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS2 &gt; บทที่ 6</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจคำตอบใน "แบบฝึกหัดท้ายบท"</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตารางประเมินผล (Rubric) การเขียนบทที่ 5</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถตอบคำถามชี้นำเพื่อเชื่อมโยงผลการศึกษากับสมมติฐานได้ในระดับ "ดี" ขึ้นไป</td>
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