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

const Topic4 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การเขียนบทที่ 3: วิธีดำเนินการ</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"โชคเข้าข้างจิตใจที่เตรียมพร้อม"</p>
            <p className="mt-1 text-sm">- หลุยส์ ปาสเตอร์</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                บทที่ 3 หรือ "วิธีดำเนินการ" (Methodology) คือส่วนที่บอกเล่ากระบวนการทั้งหมดที่เราได้ทำในการศึกษาค้นคว้าครั้งนี้ หัวใจสำคัญของบทนี้คือต้องเขียนให้ "ละเอียดและชัดเจน" มากพอจนคนอื่นสามารถอ่านแล้วนำไปทำตาม (Replicate) ได้ทุกขั้นตอน เพื่อตรวจสอบว่าถ้าทำแบบเดียวกันแล้วจะได้ผลเหมือนกับเราหรือไม่
            </p>

            <div className="mt-6 p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-slate-800/50 rounded-r-lg">
                <p className="font-semibold text-amber-800 dark:text-amber-300">เคล็ดลับสำคัญ: เขียนในรูปอดีต (Past Tense)</p>
                <p className="mt-1 text-slate-700 dark:text-slate-300">
                   เนื่องจากรายงานเป็นการเล่าถึงสิ่งที่ "ได้ทำไปแล้ว" ดังนั้นการเขียนในบทนี้จึงต้องใช้คำในรูปอดีต เช่น "ได้ทำการศึกษา...", "นำสารละลายไปวัดค่า...", "ได้รวบรวมแบบสอบถาม..."
                </p>
            </div>
            
            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">องค์ประกอบของบทที่ 3</h4>
            <ul className="list-decimal list-outside pl-5 space-y-3">
                <li>
                    <strong>ประชากรและกลุ่มตัวอย่าง (Population and Sample):</strong>
                    <p className="font-normal text-sm pl-2">อธิบายว่ากลุ่มเป้าหมายที่เราศึกษาคือใคร (ประชากร) และเราเลือกใคร/อะไรมาศึกษาจริง (กลุ่มตัวอย่าง) จำนวนเท่าไหร่ และใช้วิธีการเลือกมาอย่างไร</p>
                </li>
                 <li>
                    <strong>เครื่องมือที่ใช้ในการศึกษา (Research Instruments):</strong>
                    <p className="font-normal text-sm pl-2">ระบุเครื่องมือที่ใช้ทั้งหมด เช่น แบบสอบถาม, แบบสัมภาษณ์, อุปกรณ์ในห้องปฏิบัติการ หากเป็นแบบสอบถาม ควรบอกด้วยว่ามีกี่ส่วน แต่ละส่วนถามเกี่ยวกับอะไร</p>
                </li>
                 <li>
                    <strong>การเก็บรวบรวมข้อมูล (Data Collection):</strong>
                    <p className="font-normal text-sm pl-2">อธิบายเป็นขั้นตอนว่าเราเก็บข้อมูลมาได้อย่างไร เช่น "1. ขออนุญาตผู้บริหาร... 2. นำแบบสอบถามไปแจกให้กับกลุ่มตัวอย่าง... 3. รวบรวมแบบสอบถามกลับคืนมา"</p>
                </li>
                <li>
                    <strong>การวิเคราะห์ข้อมูล (Data Analysis):</strong>
                    <p className="font-normal text-sm pl-2">อธิบายว่าเรานำข้อมูลที่รวบรวมได้มาวิเคราะห์ด้วยสถิติอะไรบ้าง เช่น "นำข้อมูลจากแบบสอบถามมาวิเคราะห์หาค่าความถี่, ร้อยละ, และค่าเฉลี่ย"</p>
                </li>
            </ul>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การเขียนบทที่ 3
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
                        <RubricRow criteria="1. ความละเอียดและชัดเจน" levels={[
                            'อธิบายทุกขั้นตอนอย่างละเอียด ระบุปริมาณ/หน่วยชัดเจนจนไม่เกิดข้อสงสัย',
                            'อธิบายขั้นตอนได้ชัดเจนเป็นส่วนใหญ่',
                            'อธิบายขั้นตอนได้ แต่ยังขาดรายละเอียดสำคัญบางส่วน',
                            'ขั้นตอนที่อธิบายยังมีความกำกวม',
                            'ขั้นตอนขาดความละเอียดมาก',
                            'ไม่สามารถเข้าใจขั้นตอนได้'
                        ]} />
                        <RubricRow criteria="2. ความสามารถในการทำซ้ำ" levels={[
                            'ผู้อื่นสามารถอ่านและทำตามทุกขั้นตอนได้อย่างแน่นอน',
                            'ผู้อื่นน่าจะสามารถทำตามได้ แต่ต้องมีการตีความเล็กน้อย',
                            'การทำตามอาจให้ผลที่แตกต่างกันได้เนื่องจากขาดรายละเอียด',
                            'การทำตามทำได้ยาก',
                            'ไม่สามารถทำตามได้',
                            'ไม่มีการอธิบายขั้นตอน'
                        ]} />
                        <RubricRow criteria="3. การใช้ภาษา (รูปอดีต)" levels={[
                            'ใช้กริยาในรูปอดีต (Past Tense) อย่างถูกต้องและสม่ำเสมอทั้งบท',
                            'ใช้รูปอดีตเป็นส่วนใหญ่',
                            'ใช้รูปอดีตสลับกับรูปปัจจุบัน',
                            'ใช้รูปปัจจุบันเป็นส่วนใหญ่',
                            'ใช้รูปอนาคต (จะ...)',
                            'ใช้กาลไม่ถูกต้องเลย'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท: ฝึกเขียนขั้นตอนให้ชัดเจน</h4>
            <InteractiveExercise
                context="IS2-บทที่ 3"
                question="ลองอธิบายขั้นตอนการทดลองหรือการเก็บข้อมูลของคุณมา 1 ขั้นตอน (อาจจะยังเป็นภาษาพูดก็ได้ เช่น 'เราเอาสารไปต้มประมาณ 10 นาที') แล้ว AI จะช่วยเกลาให้เป็นประโยคที่ถูกต้องตามหลักการเขียนวิธีดำเนินการ"
                rows={5}
            />
        </div>
    </div>
);

export default Topic4;
