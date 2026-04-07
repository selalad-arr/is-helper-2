import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 10 (IS2)</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าด้วยตนเอง (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20202 - I30202 การสื่อสารและการนำเสนอ (IS2) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 3 Show and Share</p>
                <p><strong>เรื่อง:</strong> บทที่ 8: เครื่องมือช่วยออกแบบสไลด์ (AI)</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการคิดขั้นสูง:</strong> นักเรียนสามารถสังเคราะห์และย่อยข้อมูลจากรายงานฉบับเต็ม ให้เป็นประเด็นสำคัญสำหรับนำเสนอได้</li>
                <li><strong>ด้านการใช้เทคโนโลยีดิจิทัล:</strong> นักเรียนสามารถใช้เครื่องมือ AI เพื่อช่วยในการสร้างสรรค์และออกแบบสื่อประกอบการนำเสนอได้</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถอธิบายหลักการย่อยเนื้อหาจากรายงานมาสู่สไลด์ได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถใช้เครื่องมือ AI เพื่อสร้างโครงร่างเนื้อหาสำหรับสไลด์นำเสนอจากข้อมูลสรุปของโครงงานตนเองได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นความสำคัญของการออกแบบสื่อที่กระชับและเข้าใจง่ายเพื่อการนำเสนอที่มีประสิทธิภาพ</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>สื่อประกอบการนำเสนอที่ดีต้องมีความกระชับ, ชัดเจน, และน่าสนใจ โดยการย่อยข้อมูลจากรายงานฉบับเต็มให้เหลือแต่ประเด็นสำคัญในรูปแบบ bullet point ซึ่งสามารถใช้ AI เป็นเครื่องมือช่วยในการสรุปและวางโครงสร้างเนื้อหาได้</p>
            
            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>มีความคิดสร้างสรรค์</li>
                <li>มุ่งมั่นในการทำงาน</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Project-Based Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นกำหนดโปรเจกต์ (10 นาที):</strong> ครูประกาศโปรเจกต์ "สร้างโครงร่างสไลด์นำเสนอด้วย AI" โดยให้นักเรียนแต่ละกลุ่มเตรียมสรุปเนื้อหาจากรายงาน 5 บทของตนเอง (อาจใช้บทคัดย่อเป็นพื้นฐาน)</li>
                <li><strong>ขั้นวางแผน (15 นาที):</strong> ครูสาธิตการใช้งาน "เครื่องมือช่วยออกแบบการนำเสนอด้วย AI" โดยกรอกข้อมูลตัวอย่าง และแสดงผลลัพธ์ที่ AI สร้างขึ้นเป็นโครงร่างเนื้อหาสำหรับแต่ละสไลด์</li>
                <li><strong>ขั้นลงมือปฏิบัติ (50 นาที):</strong> นักเรียนแต่ละกลุ่มนำข้อมูลสรุปของตนเองมากรอกลงในเครื่องมือ และให้ AI สร้างโครงร่างเนื้อหา จากนั้นคัดลอกเนื้อหาที่ได้ไปวางในโปรแกรมสร้างสไลด์ (เช่น Google Slides) และเริ่มออกแบบตกแต่งสไลด์เบื้องต้น</li>
                <li><strong>ขั้นนำเสนอและสรุป (15 นาที):</strong> แต่ละกลุ่มนำเสนอผลงานสไลด์ฉบับร่างของตนเอง (อาจจะแค่ 2-3 สไลด์) และร่วมกันอภิปรายว่าเนื้อหาที่ AI สรุปให้มีความเหมาะสมและต้องปรับปรุงเพิ่มเติมอย่างไร</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS2 &gt; บทที่ 8</li>
                <li>เครื่องมือ "ช่วยออกแบบการนำเสนอด้วย AI" (PresentationGenerator)</li>
                <li>โปรแกรมสร้างสไลด์ เช่น Google Slides, PowerPoint</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: อธิบายและใช้เครื่องมือได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตรวจโครงร่างเนื้อหาสไลด์ของนักเรียน</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตารางประเมินผล (Rubric) การออกแบบเนื้อหาสไลด์</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">เนื้อหาในสไลด์ของนักเรียนมีความกระชับและเรียงลำดับอย่างสมเหตุสมผล (ระดับ "ดี" ขึ้นไป)</td>
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