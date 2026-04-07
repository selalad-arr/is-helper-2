import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ (คาบอิสระ)</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าด้วยตนเอง (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20202 - I30202 การสื่อสารและการนำเสนอ (IS2) <strong>เวลา:</strong> 1-2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> คาบอิสระ/ให้คำปรึกษา</p>
                <p><strong>เรื่อง:</strong> ผู้ช่วย AI ทั่วไป (คลินิก IS2)</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการจัดการตนเอง:</strong> นักเรียนสามารถระบุปัญหาหรือข้อสงสัยในการเขียนรายงานหรือการนำเสนอของตนเอง และแสวงหาคำตอบได้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถทบทวนความรู้เกี่ยวกับการเขียนรายงานและการนำเสนอที่ยังไม่เข้าใจได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถใช้ AI เป็นเครื่องมือในการขอคำแนะนำเกี่ยวกับการเขียนรายงาน, ออกแบบสไลด์, หรือฝึกซ้อมการนำเสนอได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเปิดรับการใช้เทคโนโลยีเพื่อพัฒนาทักษะการสื่อสารและการนำเสนอของตนเอง</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>ผู้ช่วย AI เป็นเครื่องมือเสริมที่ช่วยให้นักเรียนสามารถขอคำปรึกษาเฉพาะจุดเกี่ยวกับปัญหาในการเขียนรายงานหรือการนำเสนอที่ตนเองกำลังเผชิญอยู่ ช่วยส่งเสริมการเรียนรู้รายบุคคลและแก้ปัญหาได้ตรงจุด</p>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Self-Directed Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 5 นาที):</strong> ครูแจ้งให้นักเรียนทราบว่าคาบนี้เป็น "คลินิก IS2" ที่เปิดโอกาสให้นักเรียนทำงานและขอคำปรึกษาได้ตามความต้องการของแต่ละกลุ่ม</li>
                <li><strong>ขั้นดำเนินการ (Explore & Elaborate - 75 นาที):</strong>
                    <ul className="list-disc list-inside mt-2">
                        <li>นักเรียนที่มีข้อสงสัยทั่วไป สามารถใช้ฟีเจอร์ "ผู้ช่วย AI ทั่วไป" เพื่อถามคำถามที่เกี่ยวข้องกับรายวิชา IS2</li>
                        <li>นักเรียนที่ต้องการคำปรึกษาเฉพาะจุด เช่น "บทนำแบบนี้ดีหรือยัง?" หรือ "สไลด์แบบนี้ข้อมูลเยอะไปไหม?" สามารถปรึกษาครูผู้สอนโดยตรง หรือใช้เครื่องมือ AI ในบทต่างๆ เพื่อขอ Feedback เบื้องต้น</li>
                        <li>นักเรียนที่ทำงานไปไกลแล้ว สามารถใช้เวลานี้ในการเขียนรายงานต่อ, ออกแบบสไลด์, หรือฝึกซ้อมการนำเสนอ</li>
                    </ul>
                </li>
                <li><strong>ขั้นสรุป (Evaluate - 10 นาที):</strong> 10 นาทีก่อนหมดคาบ ครูสุ่มถามนักเรียน 2-3 กลุ่มว่า "วันนี้ได้แก้ปัญหาหรือพัฒนาส่วนไหนของรายงาน/การนำเสนอไปบ้าง?" เพื่อเป็นการสรุปและแชร์การเรียนรู้</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS2 &gt; ผู้ช่วย AI ทั่วไป และเครื่องมือในบทต่างๆ</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">S: ใช้ AI ขอคำแนะนำได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตการใช้งานเครื่องมือ AI และการตั้งคำถามของนักเรียน</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถใช้ AI เพื่อแก้ปัญหาเบื้องต้นในการทำงานของตนเองได้</td>
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