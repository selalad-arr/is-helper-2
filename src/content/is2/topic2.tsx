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

const Topic2 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การเขียนบทที่ 1: บทนำ</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"สิ่งสำคัญคืออย่าหยุดตั้งคำถาม ความอยากรู้อยากเห็นมีเหตุผลในการดำรงอยู่ของมันเอง"</p>
            <p className="mt-1 text-sm">- อัลเบิร์ต ไอน์สไตน์</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                บทนำ คือส่วนแรกที่ผู้อ่านจะได้พบและเป็นส่วนที่สำคัญที่สุดในการสร้างความน่าสนใจและปูพื้นฐานให้ผู้อ่านเข้าใจภาพรวมทั้งหมดของโครงงานของเรา บทที่ดีจะสามารถตอบคำถามสำคัญได้ทั้งหมด: ทำเรื่องอะไร? ทำไมต้องทำ? ทำเพื่ออะไร? และคาดว่าผลจะเป็นอย่างไร?
            </p>
            <p>
                ในบทนี้ เราจะมาลงรายละเอียดการเขียนองค์ประกอบต่างๆ ของบทที่ 1 ให้สมบูรณ์
            </p>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">องค์ประกอบของบทที่ 1</h4>
            <ul className="list-decimal list-outside pl-5 space-y-3">
                <li>
                    <strong>ความเป็นมาและความสำคัญ (Background and Significance):</strong>
                    <p className="font-normal text-sm pl-2">ส่วนที่ต้องเขียนยาวและละเอียดที่สุดในบทนี้ ควรมีโครงสร้าง 3 ส่วนชัดเจน: 1) กล่าวถึงปัญหาในภาพกว้าง, 2) นำเสนอทฤษฎี/ข้อมูลที่เกี่ยวข้องกับตัวแปร, 3) สรุปและเชื่อมโยงมาสู่ที่มาของโครงงานเรา</p>
                </li>
                 <li>
                    <strong>วัตถุประสงค์ (Objectives):</strong>
                    <p className="font-normal text-sm pl-2">เขียนเป็นข้อๆ ให้ชัดเจน ขึ้นต้นด้วยคำว่า "เพื่อ..." และต้องสอดคล้องกับชื่อเรื่อง สามารถวัดผลได้จริง</p>
                </li>
                 <li>
                    <strong>สมมติฐาน (Hypothesis):</strong>
                    <p className="font-normal text-sm pl-2">เขียนในโครงสร้าง "ถ้า... ดังนั้น..." เพื่อแสดงการคาดเดาผลอย่างมีเหตุผล</p>
                </li>
                 <li>
                    <strong>ขอบเขตการศึกษา (Scope):</strong>
                    <p className="font-normal text-sm pl-2">ระบุให้ชัดเจนว่าเราศึกษา 'อะไร' (ตัวแปร), 'กับใคร' (ประชากร/กลุ่มตัวอย่าง), 'ที่ไหน' (สถานที่), และ 'เมื่อไหร่' (ระยะเวลา)</p>
                </li>
                <li>
                    <strong>นิยามศัพท์เฉพาะ (Operational Definitions):</strong>
                    <p className="font-normal text-sm pl-2">อธิบายคำศัพท์สำคัญในโครงงานในเชิงปฏิบัติการ เช่น คำว่า "ความพึงพอใจ" หมายถึง "คะแนนเฉลี่ยที่ได้จากแบบสอบถาม..."</p>
                </li>
                 <li>
                    <strong>ประโยชน์ที่คาดว่าจะได้รับ (Expected Benefits):</strong>
                     <p className="font-normal text-sm pl-2">บอกว่าผลจากการทำโครงงานนี้จะก่อให้เกิดประโยชน์ต่อใครหรือด้านใดบ้าง</p>
                </li>
            </ul>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การเขียนบทที่ 1
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
                        <RubricRow criteria="1. ความเป็นมาและความสำคัญ" levels={[
                            'มีโครงสร้าง 3 ส่วนชัดเจน (ต้น-กลาง-ปลาย) เชื่อมโยงกันอย่างสมเหตุสมผลและน่าสนใจ',
                            'มีโครงสร้าง 3 ส่วนชัดเจน แต่การเชื่อมโยงยังไม่ราบรื่น',
                            'มีเนื้อหาครบ 3 ส่วน แต่ไม่ได้เรียงลำดับหรือเชื่อมโยงกัน',
                            'ขาดส่วนใดส่วนหนึ่งไป (เช่น ขาดภาพใหญ่)',
                            'มีเพียงที่มาของโครงงาน แต่ไม่มีความสำคัญ',
                            'ไม่ได้เขียนความเป็นมาฯ'
                        ]} />
                        <RubricRow criteria="2. ความชัดเจนของวัตถุประสงค์" levels={[
                            'วัตถุประสงค์ทุกข้อชัดเจน, วัดผลได้, สอดคล้องกับชื่อเรื่อง และใช้คำขึ้นต้นเหมาะสม',
                            'วัตถุประสงค์ส่วนใหญ่ชัดเจนและสอดคล้องกับชื่อเรื่อง',
                            'วัตถุประสงค์ชัดเจน แต่ยังไม่สอดคล้องกับชื่อเรื่องทั้งหมด',
                            'วัตถุประสงค์ยังมีความกำกวม',
                            'วัตถุประสงค์กว้างเกินไป ไม่สามารถวัดผลได้',
                            'ไม่มีวัตถุประสงค์'
                        ]} />
                        <RubricRow criteria="3. ความครบถ้วนขององค์ประกอบ" levels={[
                            'มีองค์ประกอบของบทที่ 1 ครบถ้วนทุกหัวข้อ (ความเป็นมา, วัตถุประสงค์, สมมติฐาน, ขอบเขต, นิยามศัพท์, ประโยชน์)',
                            'มีองค์ประกอบหลักครบถ้วน แต่อาจขาดหัวข้อย่อยบางส่วน',
                            'ขาดองค์ประกอบสำคัญไป 1 หัวข้อ',
                            'ขาดองค์ประกอบสำคัญไป 2 หัวข้อ',
                            'ขาดองค์ประกอบสำคัญหลายหัวข้อ',
                            'มีเนื้อหาไม่ครบถ้วนอย่างยิ่ง'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท: ร่าง "ความเป็นมาและความสำคัญ"</h4>
            <InteractiveExercise
                context="IS2-บทที่ 1"
                question="ลองเขียนร่าง 'ความเป็นมาและความสำคัญ' ของโครงงานคุณ (อาจจะยังไม่สมบูรณ์ก็ได้) แล้ว AI จะช่วยตรวจสอบโครงสร้าง 3 ส่วนและให้คำแนะนำในการปรับปรุง"
                rows={10}
            />
        </div>
    </div>
);

export default Topic2;
