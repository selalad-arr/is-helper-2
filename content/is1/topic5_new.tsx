import React from 'react';
import InteractiveExercise from '../../components/InteractiveExercise';

const RubricRow = ({ criteria, levels }: { criteria: string, levels: string[] }) => (
    <tr className="bg-white dark:bg-slate-800/50">
        <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">{criteria}</td>
        {levels.map((level, index) => (
            <td key={index} className={`p-2 border border-slate-300 dark:border-slate-600`}>{level}</td>
        ))}
    </tr>
);

const Topic5_Tools = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การสร้างเครื่องมือและการรวบรวมข้อมูล</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"จงวัดในสิ่งที่วัดได้ และทำให้สิ่งที่วัดไม่ได้สามารถวัดได้"</p>
            <p className="mt-1 text-sm">- กาลิเลโอ กาลิเลอี</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                หลังจากที่เราออกแบบการค้นคว้าแล้ว ขั้นตอนต่อไปคือการลงมือ "เก็บข้อมูล" ซึ่งจำเป็นต้องมี "เครื่องมือ" ที่เหมาะสมในการเก็บข้อมูลนั้นๆ เครื่องมือที่ดีจะช่วยให้เราได้ข้อมูลที่ถูกต้องและน่าเชื่อถือ
            </p>
            <p>
                นอกจากการสืบค้นข้อมูลจากเอกสารแล้ว การรวบรวมข้อมูลจากคน (เช่น กลุ่มตัวอย่าง, ผู้เชี่ยวชาญ) ก็เป็นสิ่งสำคัญ เครื่องมือที่นิยมใช้คือแบบสอบถามและการสัมภาษณ์
            </p>

            <div className="space-y-6 mt-6">
                <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-lg text-sky-700 dark:text-sky-400">1. การสร้างแบบสอบถาม (Questionnaire Design)</h4>
                    <p className="mt-2">แบบสอบถามที่ดีควรมีคำถามที่ชัดเจน ไม่กำกวม และวัดในสิ่งที่ต้องการรู้จริงๆ</p>
                    <ul className="list-disc list-outside pl-5 mt-2 space-y-2">
                        <li><b>คำถามปลายปิด (Closed-ended):</b> มีตัวเลือกคำตอบให้เลือกชัดเจน เช่น ใช่/ไม่ใช่, ระดับความพึงพอใจ (น้อยที่สุด, น้อย, ปานกลาง, มาก, มากที่สุด) เหมาะสำหรับการเก็บข้อมูลเชิงปริมาณและนำไปวิเคราะห์สถิติได้ง่าย</li>
                        <li><b>คำถามปลายเปิด (Open-ended):</b> ให้ผู้ตอบเขียนบรรยายความคิดเห็นได้อย่างอิสระ เช่น "ท่านมีข้อเสนอแนะเพิ่มเติมอย่างไร" เหมาะสำหรับเก็บข้อมูลเชิงลึก แต่จะวิเคราะห์ได้ยากกว่า</li>
                        <li><b>ข้อควรระวัง:</b>
                            <ul className="list-circle list-outside pl-6 mt-1">
                                <li>หลีกเลี่ยงคำถามนำ (Leading question) ที่ชี้นำคำตอบ</li>
                                <li>ถามทีละประเด็น อย่าถามหลายอย่างในคำถามเดียว</li>
                                <li>ใช้ภาษาง่ายๆ ที่กลุ่มเป้าหมายเข้าใจ</li>
                                <li>ทดลองใช้แบบสอบถาม (Try-out) กับกลุ่มเล็กๆ ก่อนนำไปใช้จริงเพื่อหาข้อผิดพลาด</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-lg text-sky-700 dark:text-sky-400">2. เทคนิคการสัมภาษณ์ (Interview Techniques)</h4>
                    <p className="mt-2">การสัมภาษณ์ช่วยให้ได้ข้อมูลเชิงลึกและเห็นมุมมองที่อาจไม่ได้จากแบบสอบถาม</p>
                     <ul className="list-disc list-outside pl-5 mt-2 space-y-2">
                        <li><b>เตรียมตัวล่วงหน้า:</b> กำหนดวัตถุประสงค์และร่างประเด็นคำถามหลักๆ ไว้ก่อน แต่ก็พร้อมที่จะถามคำถามต่อยอดจากคำตอบของผู้ให้สัมภาษณ์</li>
                        <li><b>สร้างบรรยากาศที่เป็นกันเอง:</b> เริ่มต้นด้วยการแนะนำตัวและวัตถุประสงค์อย่างสุภาพ ทำให้ผู้ให้สัมภาษณ์รู้สึกผ่อนคลาย</li>
                        <li><b>ทักษะการฟัง:</b> ตั้งใจฟังสิ่งที่เขาพูดและไม่ได้พูด (เช่น ภาษาท่าทาง) อย่าขัดจังหวะโดยไม่จำเป็น</li>
                        <li><b>การจดบันทึกและขออนุญาตบันทึกเสียง:</b> ควรขออนุญาตก่อนหากต้องการบันทึกเสียงเพื่อนำมาถอดความภายหลัง การจดบันทึกควรเน้นประเด็นสำคัญ ไม่ใช่จดทุกคำพูด</li>
                        <li><b>กล่าวขอบคุณเมื่อจบการสัมภาษณ์:</b> แสดงความขอบคุณสำหรับเวลาและข้อมูลที่เป็นประโยชน์</li>
                    </ul>
                </div>
                 <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-lg text-sky-700 dark:text-sky-400">3. การสังเกต (Observation)</h4>
                    <p className="mt-2">เป็นการเก็บข้อมูลโดยการเฝ้าดูพฤติกรรมหรือปรากฏการณ์ที่เกิดขึ้นจริงในสถานการณ์ธรรมชาติ เหมาะสำหรับศึกษาพฤติกรรมที่ไม่สามารถสอบถามได้โดยตรง</p>
                     <ul className="list-disc list-outside pl-5 mt-2 space-y-2">
                        <li><b>การสังเกตแบบมีส่วนร่วม:</b> ผู้ศึกษาเข้าไปเป็นส่วนหนึ่งของกลุ่มที่สังเกต</li>
                        <li><b>การสังเกตแบบไม่มีส่วนร่วม:</b> ผู้ศึกษาสังเกตการณ์จากภายนอก</li>
                        <li><b>สิ่งสำคัญ:</b> ต้องมีแบบบันทึกการสังเกตที่ชัดเจนว่าต้องการจะดูและบันทึกพฤติกรรมอะไรบ้าง</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การสร้างเครื่องมือเก็บข้อมูล
                    </caption>
                    <thead className="text-xs text-slate-700 uppercase bg-slate-200 dark:text-slate-300 dark:bg-slate-800">
                        <tr>
                            <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 w-1/5">เกณฑ์การประเมิน</th>
                            <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 bg-emerald-100 dark:bg-emerald-900/50">6 (ดีเลิศ)</th>
                            <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 bg-teal-100 dark:bg-teal-900/50">5 (ดีมาก)</th>
                            <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 bg-cyan-100 dark:bg-cyan-900/50">4 (ดี)</th>
                            <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 bg-sky-100 dark:bg-sky-900/50">3 (พอใช้)</th>
                            <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 bg-amber-100 dark:bg-amber-900/50">2 (ควรปรับปรุง)</th>
                            <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 bg-rose-100 dark:bg-rose-900/50">1 (ต้องปรับปรุง)</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-700 dark:text-slate-300">
                        <RubricRow criteria="1. ความเหมาะสม" levels={[
                            'เครื่องมือที่เลือกเหมาะสมกับข้อมูลที่ต้องการเก็บอย่างยิ่ง',
                            'เครื่องมือที่เลือกเหมาะสมกับข้อมูล',
                            'เครื่องมือที่เลือกค่อนข้างเหมาะสม',
                            'พอใช้ได้ แต่มีเครื่องมืออื่นที่เหมาะสมกว่า',
                            'เลือกเครื่องมือไม่ค่อยเหมาะสม',
                            'เลือกเครื่องมือไม่เหมาะสมเลย'
                        ]} />
                        <RubricRow criteria="2. ความชัดเจนของคำถาม" levels={[
                            'คำถามทุกข้อชัดเจน วัดได้ตรงประเด็น และใช้ภาษายอดเยี่ยม',
                            'คำถามส่วนใหญ่ชัดเจนและเข้าใจง่าย',
                            'คำถามส่วนใหญ่ชัดเจน แต่อาจมีบางข้อกำกวม',
                            'มีคำถามที่กำกวมหรือถามนำหลายข้อ',
                            'คำถามส่วนใหญ่กำกวม',
                            'คำถามไม่สามารถใช้วัดสิ่งที่ต้องการได้'
                        ]} />
                        <RubricRow criteria="3. ความครอบคลุม" levels={[
                            'เครื่องมือครอบคลุมทุกวัตถุประสงค์ของการเก็บข้อมูล',
                            'เครื่องมือครอบคลุมวัตถุประสงค์หลักๆ ได้ดี',
                            'เครื่องมือครอบคลุมวัตถุประสงค์ได้ส่วนใหญ่',
                            'ยังขาดประเด็นสำคัญที่ต้องเก็บข้อมูล',
                            'ขาดประเด็นที่ต้องเก็บข้อมูลไปหลายส่วน',
                            'ไม่ครอบคลุมวัตถุประสงค์เลย'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท (AI ช่วย)</h4>
            <InteractiveExercise
                context="บทที่ 5: การสร้างเครื่องมือและการรวบรวมข้อมูล"
                question="อธิบายว่าคุณต้องการเก็บข้อมูล 'อะไร' และจาก 'ใคร' (เช่น ต้องการทราบความพึงพอใจต่อโรงอาหารจากนักเรียน ม.5) แล้ว AI จะช่วยออกแบบคำถามตัวอย่างให้"
                rows={6}
            />
        </div>
    </div>
);

export default Topic5_Tools;
