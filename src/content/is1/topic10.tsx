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

const Topic10 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">คุณค่าและประโยชน์ของการทำ IS</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"ไม่มีสิ่งใดในชีวิตที่น่าหวาดกลัว มีเพียงสิ่งที่ต้องทำความเข้าใจ ตอนนี้คือเวลาที่จะต้องทำความเข้าใจให้มากขึ้น เพื่อที่เราจะได้กลัวน้อยลง"</p>
            <p className="mt-1 text-sm">- มารี คูรี</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                เมื่อเดินทางมาถึงบทสุดท้าย หลายคนอาจจะรู้สึกเหนื่อยแต่ก็ภูมิใจกับผลงานที่ทำมา แต่เคยสงสัยไหมว่า... นอกเหนือจากรายงานหนึ่งเล่มและคะแนนแล้ว เราได้อะไรจากการทำ IS จริงๆ?
            </p>
            <p>
                หัวใจสำคัญของ IS ไม่ใช่ "ผลลัพธ์" ที่เป็นชิ้นงาน แต่คือ "กระบวนการ" ที่เราได้เรียนรู้และพัฒนาทักษะต่างๆ ระหว่างทาง ซึ่งทักษะเหล่านี้คือเครื่องมือสำคัญที่จะติดตัวเราไปตลอดชีวิต
            </p>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">ทักษะสำคัญที่ได้จากการเรียนรู้ด้วยตนเอง (IS)</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">1. ทักษะการคิดเชิงวิพากษ์ (Critical Thinking)</h5>
                    <p className="mt-1 text-sm">คือการรู้จักตั้งคำถาม, ไม่เชื่ออะไรง่ายๆ, ประเมินความน่าเชื่อถือของข้อมูล, และมองเห็นความเชื่อมโยงของสิ่งต่างๆ</p>
                </div>
                 <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">2. ทักษะการแก้ปัญหา (Problem Solving)</h5>
                    <p className="mt-1 text-sm">เราได้ฝึกกระบวนการแก้ปัญหาอย่างเป็นระบบ ตั้งแต่การระบุปัญหา, หาสาเหตุ, ออกแบบวิธีการแก้, และประเมินผล</p>
                </div>
                 <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">3. ทักษะการสื่อสารและการนำเสนอ (Communication)</h5>
                    <p className="mt-1 text-sm">เราได้เรียนรู้วิธีเรียบเรียงความคิดที่ซับซ้อนให้กลายเป็นรายงานที่อ่านเข้าใจง่าย และการนำเสนอผลงานให้ผู้อื่นสนใจ</p>
                </div>
                 <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">4. ทักษะการทำงานร่วมกับผู้อื่น (Collaboration)</h5>
                    <p className="mt-1 text-sm">การทำงานกลุ่มสอนให้เรารู้จักแบ่งหน้าที่, รับฟังความคิดเห็นที่แตกต่าง, และร่วมมือกันเพื่อเป้าหมายเดียวกัน</p>
                </div>
                 <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">5. ความคิดสร้างสรรค์ (Creativity)</h5>
                    <p className="mt-1 text-sm">การคิดหาวิธีการใหม่ๆ ในการทดลอง หรือการแก้ปัญหาที่ไม่มีใครเคยทำมาก่อน คือการฝึกฝนความคิดสร้างสรรค์ชั้นดี</p>
                </div>
                 <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">6. ความรับผิดชอบและการบริหารจัดการ (Responsibility)</h5>
                    <p className="mt-1 text-sm">การวางแผน, การบริหารเวลา, และการทำงานให้สำเร็จตามกำหนด คือทักษะการเป็นผู้ใหญ่ที่สำคัญมาก</p>
                </div>
            </div>

            <div className="mt-6 p-4 border-l-4 border-emerald-500 bg-emerald-50 dark:bg-slate-800/50 rounded-r-lg">
                <p className="font-semibold text-emerald-800 dark:text-emerald-300">สรุป</p>
                <p className="mt-1 text-slate-700 dark:text-slate-300">
                   การศึกษาค้นคว้าด้วยตนเอง (IS) ไม่ใช่แค่วิชาเรียน แต่เป็น "สนามฝึกซ้อม" ที่เตรียมความพร้อมให้เราสำหรับโลกแห่งการเรียนรู้ในระดับมหาวิทยาลัยและการทำงานในอนาคต ซึ่งเต็มไปด้วยปัญหาที่ไม่มีคำตอบสำเร็จรูปในตำรา
                </p>
            </div>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การสะท้อนคิดการเรียนรู้
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
                        <RubricRow criteria="1. การระบุทักษะ" levels={[
                            'ระบุทักษะที่ได้เรียนรู้ได้หลากหลายและเชื่อมโยงกับประสบการณ์ได้อย่างลึกซึ้ง',
                            'ระบุทักษะที่ได้เรียนรู้ได้หลายอย่างพร้อมยกตัวอย่างได้',
                            'ระบุทักษะที่ได้เรียนรู้ได้ชัดเจน',
                            'ระบุทักษะที่ได้เรียนรู้ได้บ้าง',
                            'ระบุทักษะได้ แต่ไม่ชัดเจน',
                            'ไม่สามารถระบุทักษะที่ได้เรียนรู้ได้'
                        ]} />
                        <RubricRow criteria="2. การยอมรับความท้าทาย" levels={[
                            'ยอมรับความท้าทายและอธิบายวิธีที่ตนเองก้าวข้ามผ่านได้อย่างน่าชื่นชม',
                            'ยอมรับและอธิบายถึงอุปสรรคที่พบเจอได้ดี',
                            'อธิบายอุปสรรคที่พบเจอได้',
                            'กล่าวถึงอุปสรรคเล็กน้อย',
                            'ไม่ได้กล่าวถึงอุปสรรค',
                            'มองไม่เห็นคุณค่าของการเจออุปสรรค'
                        ]} />
                        <RubricRow criteria="3. การมองเห็นคุณค่า" levels={[
                            'แสดงความเข้าใจอย่างถ่องแท้ว่าประสบการณ์ IS มีคุณค่าต่ออนาคตของตนเองอย่างไร',
                            'เห็นคุณค่าของการทำ IS และเชื่อมโยงกับอนาคตได้',
                            'เห็นคุณค่าของการทำ IS',
                            'มองเห็นประโยชน์ของการทำ IS อยู่บ้าง',
                            'ยังไม่ค่อยเห็นประโยชน์ของการทำ IS',
                            'มองไม่เห็นประโยชน์ของการทำ IS'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท (AI ช่วย)</h4>
            <InteractiveExercise
                context="บทที่ 10: คุณค่าและประโยชน์ของการทำ IS"
                question="ตลอดการทำ IS ตั้งแต่ต้นจนจบ 'ส่วนไหน' ที่คุณรู้สึกว่าท้าทายที่สุด และคุณได้เรียนรู้อะไรจากความท้าทายนั้นบ้าง? ลองเล่าให้ AI ฟัง"
                rows={6}
            />
        </div>
    </div>
);

export default Topic10;
