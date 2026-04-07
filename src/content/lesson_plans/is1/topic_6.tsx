import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 7</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20201 - I30201 การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 2 การสืบค้นความรู้จากแหล่งเรียนรู้และสารสนเทศ</p>
                <p><strong>เรื่อง:</strong> บทที่ 6: การวิเคราะห์ข้อมูล</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการคิดขั้นสูง:</strong> นักเรียนสามารถเลือกใช้สถิติที่เหมาะสมกับลักษณะของข้อมูลและวัตถุประสงค์ของโครงงานได้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบายความแตกต่างและการใช้งานของสถิติพื้นฐาน (ร้อยละ, ค่าเฉลี่ย) ได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถเลือกใช้สถิติพื้นฐานและรูปแบบการนำเสนอ (ตาราง, แผนภูมิ) ที่เหมาะสมกับข้อมูลเบื้องต้นได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของการวิเคราะห์ข้อมูลอย่างเป็นระบบเพื่อสร้างความน่าเชื่อถือให้กับโครงงาน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>การวิเคราะห์ข้อมูลเป็นการแปลงข้อมูลดิบให้เป็นสารสนเทศที่มีความหมาย โดยใช้สถิติพื้นฐานอย่างร้อยละและค่าเฉลี่ย พร้อมทั้งนำเสนอในรูปแบบตารางหรือแผนภูมิที่เข้าใจง่าย เพื่อตอบวัตถุประสงค์ของโครงงานได้อย่างชัดเจน</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มีเหตุผลและคิดอย่างเป็นระบบ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Active Learning 5Es)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูแสดงชุดข้อมูลตัวเลขดิบ (เช่น คะแนนสอบของนักเรียน 20 คน) ให้นักเรียนดู แล้วถามว่า "จากตัวเลขกองนี้ เรารู้อะไรเกี่ยวกับผลการสอบของห้องนี้บ้าง?" เพื่อให้นักเรียนเห็นความจำเป็นของการ "จัดการ" กับข้อมูล</li>
                <li><strong>ขั้นสำรวจ (Explore - 15 นาที):</strong> ให้นักเรียนศึกษาเนื้อหาในบทที่ 6 เกี่ยวกับสถิติพื้นฐาน (ร้อยละ, ค่าเฉลี่ย) และรูปแบบการนำเสนอข้อมูล (ตาราง, แผนภูมิ) ด้วยตนเอง</li>
                <li><strong>ขั้นอธิบาย (Explain - 25 นาที):</strong> ครูอธิบายเพิ่มเติมว่าเมื่อไหร่ควรใช้ "ร้อยละ" (ข้อมูลแบ่งกลุ่ม) และเมื่อไหร่ควรใช้ "ค่าเฉลี่ย" (ข้อมูลตัวเลข) โดยใช้ตัวอย่างตารางและแผนภูมิในบทเรียนประกอบ เพื่อให้นักเรียนเห็นภาพการใช้งานจริง</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 30 นาที):</strong> นักเรียนทำ "แบบฝึกหัดท้ายบท: ปรึกษา AI เรื่องสถิติ" โดยกรอกชื่อโครงงานและอธิบายวิธีการเก็บข้อมูลของตนเอง จากนั้นให้ AI ช่วยแนะนำสถิติที่เหมาะสม พร้อมเปิด "คลินิกให้คำปรึกษาสถิติ" ให้นักเรียนได้ถาม-ตอบข้อสงสัยเพิ่มเติมกับ AI เกี่ยวกับแผนการวิเคราะห์ของตนเอง</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูประเมินความเข้าใจจากการที่นักเรียนสามารถเลือกใช้คำแนะนำของ AI และถามคำถามต่อยอดใน "คลินิก" ได้อย่างสมเหตุสมผล ครูเดินสังเกตและให้คำแนะนำรายบุคคล/กลุ่ม</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS1 &gt; บทที่ 6</li>
                <li>ฟีเจอร์ "แบบฝึกหัดท้ายบท" และ "คลินิกให้คำปรึกษาสถิติ" (InteractiveExercise)</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: อธิบายและเลือกใช้สถิติพื้นฐานได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตผลลัพธ์จากแบบฝึกหัดท้ายบท</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถบอกได้ว่าข้อมูลของตนควรใช้ร้อยละหรือค่าเฉลี่ยในการวิเคราะห์</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">A: เห็นความสำคัญของการวิเคราะห์ข้อมูล</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ประเมินจากการมีส่วนร่วมในกิจกรรม "คลินิกให้คำปรึกษาสถิติ"</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนตั้งคำถามเพิ่มเติมเพื่อทำความเข้าใจการวิเคราะห์ข้อมูลของตนเอง</td>
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