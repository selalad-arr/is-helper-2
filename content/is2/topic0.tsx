import React from 'react';
import IS2Topic1CardFlow from '../../components/IS2Topic1CardFlow';
import { useProjectData } from '../../hooks/useProjectData';

const RubricRow = ({ criteria, levels }: { criteria: string, levels: string[] }) => (
    <tr className="bg-white dark:bg-slate-800/50">
        <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">{criteria}</td>
        {levels.map((level, index) => (
            <td key={index} className={`p-2 border border-slate-300 dark:border-slate-600`}>{level}</td>
        ))}
    </tr>
);

const Topic0 = () => {
    const { is2ProjectTitle, setIs2ProjectTitle } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ทบทวนและพัฒนาหัวข้อโครงงาน</h3>
            <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
                <p>"สิ่งสำคัญคืออย่าหยุดตั้งคำถาม ความอยากรู้อยากเห็นมีเหตุผลในการดำรงอยู่ของมันเอง"</p>
                <p className="mt-1 text-sm">- อัลเบิร์ต ไอน์สไตน์</p>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p>
                    ก่อนที่จะเริ่มต้นเขียนรายงานฉบับสมบูรณ์ใน IS2 สิ่งสำคัญคือการมีหัวข้อโครงงานที่แข็งแรงและชัดเจน บทนี้เป็นโอกาสในการทบทวนหัวข้อเดิมจาก IS1 หรือพัฒนาหัวข้อใหม่ให้ดียิ่งขึ้น โดยมี AI เป็นผู้ช่วยในการระดมสมอง
                </p>
                 <p>
                    หัวข้อที่ดีควรมีความชัดเจน, น่าสนใจ, สามารถทำได้จริง, และมีแหล่งข้อมูลให้ศึกษาค้นคว้าต่อได้ มาทบทวนเกณฑ์การประเมินหัวข้อที่ดีกันอีกครั้ง
                </p>
            </div>
            
            <div className="my-8">
                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-sm text-left border-collapse">
                        <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                            📊 ตารางประเมินผล (Rubric) การตั้งประเด็นปัญหา/หัวข้อโครงงาน
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
                            <RubricRow criteria="1. ความชัดเจนของประเด็น" levels={[
                                'ประเด็นปัญหา/คำถามชัดเจนมาก เฉพาะเจาะจง ไม่กำกวม รู้ทันทีว่าต้องการศึกษาอะไร',
                                'ประเด็นชัดเจนและเฉพาะเจาะจง',
                                'ประเด็นค่อนข้างชัดเจน แต่อาจต้องปรับภาษาเล็กน้อยเพื่อให้คมขึ้น',
                                'ประเด็นยังกว้างหรือแคบเกินไป ขาดความเฉพาะเจาะจง',
                                'ประเด็นยังกำกวม หรือเป็นแค่หัวข้อกว้างๆ',
                                'ประเด็นกำกวมมาก ไม่ใช่ประเด็นที่จะสืบค้น'
                            ]} />
                             <RubricRow criteria="2. ความน่าสนใจและความสำคัญ" levels={[
                                'ประเด็นมีความน่าสนใจสูง สร้างสรรค์ สะท้อนปัญหาที่สำคัญและมีคุณค่าต่อยอด',
                                'ประเด็นน่าสนใจและเห็นความสำคัญชัดเจน',
                                'ประเด็นน่าสนใจ สอดคล้องกับความสนใจของผู้เรียน หรือบริบทปัจจุบัน',
                                'ประเด็นค่อนข้างทั่วไป ขาดความน่าสนใจ',
                                'ยังไม่เห็นความสำคัญของประเด็นชัดเจน',
                                'ประเด็นไม่น่าสนใจ'
                            ]} />
                             <RubricRow criteria="3. ความเป็นไปได้ในการสืบค้น" levels={[
                                'ขอบเขตเหมาะสมอย่างยิ่ง สามารถสืบค้น/เก็บข้อมูลและสรุปผลได้จริงภายในเวลาและทรัพยากรที่กำหนด',
                                'ขอบเขตเหมาะสม สามารถทำได้จริง',
                                'ขอบเขตค่อนข้างเหมาะสม แต่อาจต้องปรับเล็กน้อยเพื่อให้ทำได้จริง',
                                'ขอบเขตยังกว้างหรือแคบเกินไป อาจทำให้หาข้อมูลยาก',
                                'ขอบเขตกว้างหรือแคบเกินไปมาก ทำให้ทำได้ยาก',
                                'ไม่สามารถสืบค้นได้จริง'
                            ]} />
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
                <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัด: ค้นหาหัวข้อกับ AI</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    มาลองใช้ AI ผู้ช่วยในการค้นหาและพัฒนาแนวคิดโครงงานการสื่อสารและการนำเสนอของคุณกันเถอะ! AI จะถามคำถามเพื่อนำทางคุณไปสู่รูปแบบการนำเสนอที่น่าสนใจและทำได้จริง
                </p>
                <IS2Topic1CardFlow projectTitle={is2ProjectTitle} setProjectTitle={setIs2ProjectTitle} />
            </div>
        </div>
    );
};

export default Topic0;
