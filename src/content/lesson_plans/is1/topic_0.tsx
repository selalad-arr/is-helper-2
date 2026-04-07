import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 1</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS)</p>
        </header>

        <main className="space-y-6">
            <div className="grid grid-cols-2 gap-x-8">
                <div>
                    <p><strong>รายวิชา:</strong> I20201 - I30201 การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1)</p>
                    <p><strong>หน่วยการเรียนรู้ที่:</strong> ปฐมนิเทศ</p>
                    <p><strong>เรื่อง:</strong> คำอธิบายรายวิชาและโครงสร้างหลักสูตร IS1</p>
                </div>
                <div>
                    <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย</p>
                    <p><strong>เวลา:</strong> 2 ชั่วโมง</p>
                    <p><strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
                </div>
            </div>

            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการจัดการตนเอง:</strong> นักเรียนสามารถวางแผนการเรียนของตนเองให้สอดคล้องกับโครงสร้างและเป้าหมายของรายวิชาได้</li>
                <li><strong>ด้านการสื่อสาร:</strong> นักเรียนสามารถอภิปรายและทำความเข้าใจเป้าหมายและผลการเรียนรู้ของรายวิชาได้อย่างชัดเจน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบายเป้าหมาย, ผลการเรียนรู้, และโครงสร้างของรายวิชา IS1 ได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถวางแผนการเรียนของตนเองให้สอดคล้องกับโครงสร้างรายวิชาได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญและประโยชน์ของการเรียนวิชา IS1 ต่อการพัฒนาตนเอง</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1) เป็นรายวิชาที่มุ่งเน้นให้นักเรียนฝึกทักษะกระบวนการคิด, การสืบค้น, การวิเคราะห์, และการสังเคราะห์ข้อมูลอย่างเป็นระบบ เพื่อสร้างองค์ความรู้ใหม่ด้วยตนเอง โดยมีเป้าหมายเพื่อพัฒนาทักษะที่จำเป็นสำหรับการเรียนรู้ตลอดชีวิต</p>

            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มุ่งมั่นในการทำงาน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Active Learning 5Es)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูตั้งคำถามกระตุ้นความสนใจ "นักเรียนคิดว่าทักษะอะไรสำคัญที่สุดในการเรียนมหาวิทยาลัยและการทำงานในอนาคต?" ให้นักเรียนร่วมกันอภิปราย และนำคำตอบของนักเรียนเชื่อมโยงเข้าสู่ความสำคัญของวิชา IS ซึ่งเป็นวิชาที่ฝึกทักษะเหล่านั้นโดยตรง</li>
                <li><strong>ขั้นสำรวจ (Explore - 15 นาที):</strong> ครูให้นักเรียนเข้าสู่แอปพลิเคชัน IS Helper และเปิดหน้า "คำอธิบายรายวิชา IS1" ให้นักเรียนสำรวจเนื้อหาต่างๆ ด้วยตนเอง โดยให้ความสนใจเป็นพิเศษในส่วน 'ผลการเรียนรู้' และ 'โครงสร้างรายวิชา' เพื่อทำความเข้าใจภาพรวมและเป้าหมายของวิชา</li>
                <li><strong>ขั้นอธิบาย (Explain - 20 นาที):</strong> ครูและนักเรียนร่วมกันอภิปรายเนื้อหาในแต่ละส่วน ครูใช้คำถามนำเพื่อตรวจสอบความเข้าใจ เช่น "จากผลการเรียนรู้ 9 ข้อ ข้อไหนที่นักเรียนคิดว่าน่าสนใจที่สุด?" ครูอธิบายเพิ่มเติมในประเด็นที่นักเรียนสงสัย และเน้นย้ำถึงเป้าหมายหลักของทั้ง 3 หน่วยการเรียนรู้</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 25 นาที):</strong> ครูแบ่งกลุ่มนักเรียน (3-4 คน) และมอบหมายภารกิจ "วางแผนการเรียนรู้" โดยให้แต่ละกลุ่มระดมสมองว่า "จากโครงสร้างรายวิชา กลุ่มของเราจะต้องเตรียมตัวหรือพัฒนาทักษะอะไรบ้างในแต่ละหน่วยการเรียนรู้ เพื่อให้บรรลุผลการเรียนรู้ทั้งหมด"</li>
                <li><strong>ขั้นประเมิน (Evaluate - 20 นาที):</strong> ตัวแทนกลุ่มนำเสนอผลการระดมสมอง ครูและเพื่อนกลุ่มอื่นร่วมกันให้ข้อเสนอแนะ ครูประเมินความเข้าใจของนักเรียนจากการนำเสนอและเปิดโอกาสให้ซักถามเพิ่มเติมเพื่อสรุปภาพรวมของรายวิชา</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS1 &gt; คำอธิบายรายวิชา</li>
                <li>คอมพิวเตอร์ หรืออุปกรณ์เคลื่อนที่ของนักเรียน</li>
                <li>กระดานไวท์บอร์ด หรือกระดาษ Flip Chart สำหรับกิจกรรมกลุ่ม</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K: อธิบายเป้าหมายและโครงสร้างวิชาได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตการอภิปรายและตอบคำถาม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนตอบคำถามเกี่ยวกับโครงสร้างรายวิชาได้อย่างถูกต้องร้อยละ 80</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">A: เห็นความสำคัญของวิชา IS</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ประเมินจากการนำเสนอผลการระดมสมอง</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบประเมินการนำเสนอ</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถเชื่อมโยงประโยชน์ของวิชา IS กับตนเองได้ในระดับดี</td>
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