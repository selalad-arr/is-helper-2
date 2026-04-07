import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 4</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20201 - I30201 การศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 1 การตั้งประเด็นคำถาม/สมมุติฐาน</p>
                <p><strong>เรื่อง:</strong> บทที่ 3: การออกแบบการค้นคว้า</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการคิดขั้นสูง:</strong> นักเรียนสามารถออกแบบกระบวนการค้นคว้าที่สอดคล้องกับวัตถุประสงค์และสมมติฐานได้อย่างเป็นระบบ</li>
                <li><strong>ด้านการจัดการตนเอง:</strong> นักเรียนสามารถวางแผนการดำเนินงานและกำหนดขั้นตอนการทำงานได้อย่างมีประสิทธิภาพ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบายประเภทของการศึกษาค้นคว้าและบอกความแตกต่างของประชากรและกลุ่มตัวอย่างได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถร่างขั้นตอนการดำเนินงานเบื้องต้นสำหรับโครงงานของตนเองได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของการวางแผนก่อนลงมือปฏิบัติจริง</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>การออกแบบการค้นคว้าเปรียบเสมือนการวาดแผนที่ ที่ช่วยให้การเดินทางไปสู่คำตอบของปัญหามีทิศทางและประสิทธิภาพ โดยต้องกำหนดประเภทการศึกษา, กลุ่มตัวอย่าง, และขั้นตอนการดำเนินงานให้ชัดเจนและสอดคล้องกับวัตถุประสงค์</p>
            
            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>ใฝ่เรียนรู้</li>
                <li>มีระเบียบวินัยในการวางแผน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Problem-Based Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นกำหนดปัญหา (15 นาที):</strong> ครูยกตัวอย่างโจทย์โครงงาน "การศึกษาพฤติกรรมการทิ้งขยะของนักเรียนในโรงเรียน" และให้นักเรียนระดมสมองเป็นกลุ่มย่อยว่า "ถ้าเราจะทำเรื่องนี้ เราต้องทำอะไรบ้าง? จะเริ่มจากตรงไหน? จะเก็บข้อมูลจากใคร?"</li>
                <li><strong>ขั้นทำความเข้าใจปัญหา (20 นาที):</strong> นักเรียนศึกษาเนื้อหาในบทที่ 3 เพื่อหาคำศัพท์และแนวคิดที่เกี่ยวข้องกับคำถามในขั้นกำหนดปัญหา เช่น ประเภทการศึกษา, ประชากร, กลุ่มตัวอย่าง, และขั้นตอนการดำเนินงาน</li>
                <li><strong>ขั้นดำเนินการศึกษาค้นคว้า (25 นาที):</strong> ครูให้นักเรียนแต่ละกลุ่มนำความรู้ที่ได้มาลอง "ออกแบบการค้นคว้า" สำหรับโจทย์โครงงานเรื่องขยะ โดยให้ร่างเป็นแผนผังความคิด (Mind Map) ที่ประกอบด้วยประเภท, กลุ่มตัวอย่าง และขั้นตอนหลักๆ</li>
                <li><strong>ขั้นสังเคราะห์ความรู้ (20 นาที):</strong> แต่ละกลุ่มนำเสนอแผนผังความคิดของตนเองหน้าชั้นเรียน และร่วมกันอภิปรายข้อดีข้อเสียของแต่ละแผน เพื่อสร้างความเข้าใจร่วมกัน</li>
                <li><strong>ขั้นสรุปและประเมินผล (10 นาที):</strong> ให้นักเรียนทำ "แบบฝึกหัดท้ายบท" โดยนำวัตถุประสงค์และสมมติฐานของ "โครงงานตนเอง" มาให้ AI ช่วยแนะนำการออกแบบการค้นคว้า เพื่อนำความรู้ไปประยุกต์ใช้กับงานของตนเอง</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS1 &gt; บทที่ 3</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: อธิบายและร่างขั้นตอนได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ประเมินคำตอบใน "แบบฝึกหัดท้ายบท"</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบประเมินคำตอบจาก AI</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถระบุประเภทและขั้นตอนเบื้องต้นที่สอดคล้องกับวัตถุประสงค์ของตนเองได้</td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">A: เห็นความสำคัญของการวางแผน</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">สังเกตการมีส่วนร่วมในการอภิปรายกลุ่มย่อย</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">แบบสังเกตพฤติกรรมกลุ่ม</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนให้เหตุผลสนับสนุนการวางแผนการทำงานได้</td>
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