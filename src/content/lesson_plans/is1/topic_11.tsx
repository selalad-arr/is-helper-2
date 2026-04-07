import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ (คาบอิสระ)</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20201 - I30201 การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1) <strong>เวลา:</strong> 1-2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> คาบอิสระ/ให้คำปรึกษา</p>
                <p><strong>เรื่อง:</strong> ผู้ช่วย AI ทั่วไป (คลินิก IS1)</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการจัดการตนเอง:</strong> นักเรียนสามารถระบุปัญหาหรือข้อสงสัยในการเรียนรู้ของตนเองและแสวงหาคำตอบได้</li>
                <li><strong>ด้านการสื่อสาร:</strong> นักเรียนสามารถตั้งคำถามที่ชัดเจนเพื่อสื่อสารกับ AI หรือครูผู้สอนได้อย่างมีประสิทธิภาพ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถทบทวนความรู้ในบทเรียนต่างๆ ที่ยังไม่เข้าใจได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถใช้ AI เป็นเครื่องมือในการสืบค้นข้อมูลและขอคำแนะนำเพิ่มเติมเกี่ยวกับโครงงานของตนเองได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนมีเจตคติที่ดีต่อการใช้เทคโนโลยีเพื่อการเรียนรู้ด้วยตนเอง</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>ผู้ช่วย AI เป็นเครื่องมือเสริมที่ช่วยให้นักเรียนสามารถทบทวนบทเรียนและขอคำปรึกษาเบื้องต้นได้ตามความต้องการของแต่ละบุคคล ส่งเสริมการเรียนรู้ที่แตกต่าง (Differentiated Learning) และเปิดโอกาสให้นักเรียนได้ฝึกฝนทักษะการตั้งคำถามและสืบค้นข้อมูล</p>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Self-Directed Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 5 นาที):</strong> ครูแจ้งให้นักเรียนทราบว่าคาบนี้เป็น "คลินิก IS1" ที่เปิดโอกาสให้นักเรียนแต่ละคนหรือแต่ละกลุ่มทำงานของตนเองและปรึกษาข้อสงสัยได้อิสระ โดยมีทั้งครูและ AI เป็นผู้ช่วย</li>
                <li><strong>ขั้นดำเนินการ (Explore & Elaborate - 75 นาที):</strong>
                    <ul className="list-disc list-inside mt-2">
                        <li>ครูแนะนำให้นักเรียนที่มีข้อสงสัยหรือต้องการทบทวนบทเรียน สามารถใช้ฟีเจอร์ "ผู้ช่วย AI ทั่วไป" เพื่อถามคำถามที่เกี่ยวข้องกับเนื้อหาในรายวิชา IS1</li>
                        <li>นักเรียนที่ต้องการคำปรึกษาเฉพาะเจาะจงเกี่ยวกับโครงงานของตนเอง สามารถปรึกษาครูผู้สอนได้โดยตรง</li>
                        <li>นักเรียนกลุ่มที่ทำงานไปได้ไกลแล้ว สามารถใช้เวลานี้ในการสืบค้นข้อมูลเพิ่มเติมหรือทำงานตามแผนของตนเองต่อได้ ครูเดินสังเกตและให้คำแนะนำตามความเหมาะสม</li>
                    </ul>
                </li>
                <li><strong>ขั้นสรุป (Evaluate - 10 นาที):</strong> 10 นาทีก่อนหมดคาบ ครูให้นักเรียนแต่ละคนเขียน Post-it สรุปสั้นๆ ว่า "วันนี้ได้เรียนรู้อะไรใหม่ หรือ แก้ปัญหาอะไรได้บ้าง" แล้วนำมาติดบนกระดาน เพื่อเป็นการสรุปและแชร์การเรียนรู้ร่วมกัน</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS1 &gt; ผู้ช่วย AI ทั่วไป</li>
                <li>คอมพิวเตอร์ หรืออุปกรณ์เคลื่อนที่ของนักเรียน</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: ทบทวนและใช้ AI ได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตการใช้งานฟีเจอร์ AI และการตั้งคำถามของนักเรียน</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถตั้งคำถามที่เกี่ยวข้องกับบทเรียนและโครงงานของตนเองได้</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">A: มีเจตคติที่ดีต่อเทคโนโลยี</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ประเมินจากการสรุปบทเรียนท้ายคาบ (Post-it)</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">การตอบคำถาม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถบอกประโยชน์ของการใช้ AI ช่วยในการเรียนรู้ได้</td>
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