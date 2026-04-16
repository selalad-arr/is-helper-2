import React from 'react';

const LessonPlan = () => (
    <>
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold">แผนการจัดการเรียนรู้ฐานสมรรถนะ ที่ 12 (IS2)</h1>
            <p>กลุ่มสาระการเรียนรู้ การศึกษาค้นคว้าด้วยตนเอง (IS)</p>
        </header>

        <main className="space-y-6">
            <div>
                <p><strong>รายวิชา:</strong> I20202 - I30202 การสื่อสารและการนำเสนอ (IS2) <strong>เวลา:</strong> 2 ชั่วโมง</p>
                <p><strong>หน่วยการเรียนรู้ที่:</strong> 3 Show and Share</p>
                <p><strong>เรื่อง:</strong> บทที่ 10: การเผยแพร่ผลงานสู่สาธารณะ</p>
                <p><strong>ชั้น:</strong> มัธยมศึกษาตอนต้น-ปลาย <strong>ครูผู้สอน:</strong> นายสิลารัฐ อรุณธัญญา</p>
            </div>
            
            <h3 className="text-lg font-bold mt-4">2. หลักสูตรฐานสมรรถนะ (สมรรถนะหลัก)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านการสื่อสาร:</strong> นักเรียนสามารถปรับเปลี่ยนและย่อยเนื้อหาเชิงวิชาการเพื่อสื่อสารกับกลุ่มเป้าหมายที่หลากหลายได้อย่างมีประสิทธิภาพ</li>
                <li><strong>ด้านการเป็นพลเมืองที่เข้มแข็ง:</strong> นักเรียนเห็นคุณค่าของการแบ่งปันองค์ความรู้ให้เป็นประโยชน์ต่อสังคม</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">3. จุดประสงค์การเรียนรู้ (KSA)</h3>
            <ul className="list-disc list-inside">
                <li><strong>ด้านความรู้ (K):</strong> นักเรียนสามารถบอกช่องทางและเทคนิคการปรับเนื้อหาเพื่อเผยแพร่ผลงานสู่สาธารณะได้</li>
                <li><strong>ด้านทักษะ (S):</strong> นักเรียนสามารถย่อยเนื้อหาเชิงวิชาการของโครงงานตนเองให้เป็นภาษาที่คนทั่วไปเข้าใจง่ายได้</li>
                <li><strong>ด้านเจตคติ (A):</strong> นักเรียนเห็นคุณค่าของการแบ่งปันองค์ความรู้ให้เป็นประโยชน์ต่อสังคม</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">4. สาระการเรียนรู้/ความคิดรวบยอด</h3>
            <p>การเผยแพร่ผลงานสู่สาธารณะคือการต่อยอดคุณค่าของโครงงานโดยการแบ่งปันความรู้ให้แก่สังคม ซึ่งต้องอาศัยทักษะในการปรับและย่อยเนื้อหาที่ซับซ้อนให้เหมาะสมกับช่องทางและกลุ่มเป้าหมายที่หลากหลาย</p>
            
            <h3 className="text-lg font-bold mt-4">5. คุณลักษณะอันพึงประสงค์</h3>
            <ul className="list-disc list-inside">
                <li>มีจิตสาธารณะ</li>
                <li>มีความคิดสร้างสรรค์</li>
            </ul>

            <h3 className="text-lg font-bold mt-4">7. กระบวนการจัดการเรียนรู้ (รูปแบบ Active Learning)</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li><strong>ขั้นนำ (Engage - 10 นาที):</strong> ครูเปิดคลิปวิดีโอวิทยาศาสตร์สั้นๆ จาก TikTok หรือ Reels ที่สามารถอธิบายเรื่องยากๆ ให้สนุกได้ แล้วถามนักเรียนว่า "ทำไมคลิปแบบนี้ถึงมีคนดูเยอะและเข้าใจง่าย?"</li>
                <li><strong>ขั้นสำรวจและอธิบาย (Explore & Explain - 30 นาที):</strong> ให้นักเรียนศึกษา "ช่องทางการเผยแพร่ผลงาน" และ "ตัวอย่างการปรับเนื้อหา" จากบทเรียนในแอป ครูอธิบายเพิ่มเติมถึงความสำคัญของการหา "แก่นของเรื่อง" (Core Message) และการเปลี่ยนศัพท์เทคนิคให้เป็นภาษาทั่วไป</li>
                <li><strong>ขั้นขยายความรู้ (Elaborate - 40 นาที):</strong> นักเรียนทำ "แบบฝึกหัดท้ายบท" โดยลองสรุปโครงงานของตนเองให้เพื่อนที่ไม่ได้เรียนสายวิทย์ฟังภายใน 3 ประโยค แล้วให้ AI ช่วยตรวจสอบและแนะนำการปรับใช้คำให้กระชับและดึงดูดใจยิ่งขึ้น</li>
                <li><strong>ขั้นประเมิน (Evaluate - 10 นาที):</strong> ครูให้นักเรียนนำเสนอ "3 ประโยคสรุปโครงงาน" ของตนเองหน้าชั้นเรียน และให้เพื่อนๆ ช่วยกันโหวตว่าของใครน่าสนใจและเข้าใจง่ายที่สุด เพื่อประเมินทักษะการสื่อสารกับคนทั่วไป</li>
            </ol>
            
            <h3 className="text-lg font-bold mt-4">8. สื่อและแหล่งเรียนรู้</h3>
            <ul className="list-disc list-inside">
                <li>แอปพลิเคชัน IS Helper หัวข้อ IS2 &gt; บทที่ 10</li>
                <li>ตัวอย่างคลิปวิดีโอวิทยาศาสตร์สั้นๆ (TikTok/Reels)</li>
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
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">K, S: บอกเทคนิคและย่อยเนื้อหาได้</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ประเมิน "3 ประโยคสรุปโครงงาน" ที่นักเรียนนำเสนอ</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">ตารางประเมินผล (Rubric) การเผยแพร่ผลงาน - เกณฑ์ความชัดเจนในการสื่อสาร</td>
                            <td className="border border-slate-300 dark:border-slate-600 p-2 align-top">นักเรียนสามารถสรุปโครงงานได้เข้าใจง่ายและน่าสนใจในระดับ "ดี" ขึ้นไป</td>
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
