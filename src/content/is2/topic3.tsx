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

const Topic3 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การเขียนบทที่ 2: เอกสารและงานวิจัยที่เกี่ยวข้อง</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"ถ้าข้าพเจ้ามองเห็นได้ไกลกว่าคนอื่น นั่นเป็นเพราะข้าพเจ้ายืนอยู่บนบ่าของยักษ์"</p>
            <p className="mt-1 text-sm">- ไอแซก นิวตัน</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                บทที่ 2 หรือ "การทบทวนวรรณกรรม" (Literature Review) คือส่วนที่เราจะแสดงให้ผู้อ่านเห็นว่าเราได้ไปศึกษาค้นคว้าข้อมูลมาอย่างดีและรอบด้านแล้ว ไม่ได้คิดทำโครงงานนี้ขึ้นมาลอยๆ บทนี้ไม่ใช่แค่การนำข้อมูลที่หามาได้มาแปะต่อๆ กัน แต่คือการ "สังเคราะห์" ให้เห็นภาพรวมขององค์ความรู้ในเรื่องที่เราสนใจ
            </p>
            
            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">เขียนอะไรบ้างในบทที่ 2?</h4>
            <p>ควรแบ่งเนื้อหาเป็นหัวข้อใหญ่ๆ ตามตัวแปรหรือประเด็นสำคัญของโครงงานเรา โดยในแต่ละหัวข้อควรประกอบด้วย:</p>
            <ul className="list-decimal list-outside pl-5 space-y-3">
                <li>
                    <strong>ทฤษฎีและหลักการที่เกี่ยวข้อง:</strong>
                    <p className="font-normal text-sm pl-2">อธิบายหลักการทางวิทยาศาสตร์หรือทฤษฎีที่เป็นพื้นฐานของโครงงานเรา เช่น ถ้าทำเรื่องการสกัดสาร ก็ต้องอธิบายว่าการสกัดคืออะไร มีกี่วิธี แต่ละวิธีมีหลักการอย่างไร</p>
                </li>
                 <li>
                    <strong>ข้อมูลพื้นฐานของสิ่งที่ศึกษา:</strong>
                    <p className="font-normal text-sm pl-2">ให้ข้อมูลเกี่ยวกับสิ่งที่เราศึกษา เช่น ถ้าทำเรื่อง "ใบบัวบก" ก็ต้องมีหัวข้อที่ให้ข้อมูลว่าใบบัวบกคืออะไร มีสารสำคัญอะไรบ้าง มีสรรพคุณอะไร เป็นต้น</p>
                </li>
                 <li>
                    <strong>งานวิจัยที่เกี่ยวข้อง:</strong>
                    <p className="font-normal text-sm pl-2">ส่วนที่สำคัญที่สุด คือการไปค้นคว้าว่าเคยมีใครทำวิจัยในเรื่องที่คล้ายๆ กับเราบ้างหรือไม่ เขาทำอย่างไร ได้ผลเป็นอย่างไร และมีส่วนไหนที่เขายังไม่ได้ทำ ซึ่งกลายเป็น "ช่องว่าง" (Research Gap) ให้เราเข้ามาศึกษาต่อ</p>
                </li>
            </ul>

            <div className="mt-6 p-4 border-l-4 border-sky-500 bg-sky-50 dark:bg-slate-800/50 rounded-r-lg">
                <p className="font-semibold text-sky-800 dark:text-sky-300">หัวใจสำคัญ: การสังเคราะห์ (Synthesis)</p>
                <p className="mt-1 text-slate-700 dark:text-slate-300">
                   อย่านำเสนอข้อมูลทีละแหล่ง (เช่น "นาย ก. กล่าวว่า...", "จากเว็บ ข. กล่าวว่า...") แต่ควรอ่านข้อมูลทั้งหมดในหัวข้อนั้น แล้วนำมาเรียบเรียงและสรุปใหม่ด้วยภาษาของเราเอง โดยมีการอ้างอิงท้ายข้อความว่าข้อมูลส่วนนี้มาจากแหล่งใดบ้าง
                </p>
            </div>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การเขียนบทที่ 2
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
                        <RubricRow criteria="1. ความครอบคลุมของเนื้อหา" levels={[
                            'ครอบคลุมทฤษฎีและงานวิจัยที่เกี่ยวข้องกับทุกตัวแปรอย่างครบถ้วนและลึกซึ้ง',
                            'ครอบคลุมทฤษฎีและงานวิจัยที่เกี่ยวข้องกับประเด็นหลักได้ดี',
                            'มีเนื้อหาเกี่ยวกับทฤษฎีและงานวิจัย แต่ยังไม่ครอบคลุมทั้งหมด',
                            'มีเนื้อหา แต่ส่วนใหญ่เป็นข้อมูลทั่วไป ไม่ใช่ทฤษฎี/งานวิจัย',
                            'เนื้อหาไม่ค่อยเกี่ยวข้องกับหัวข้อโครงงาน',
                            'ไม่มีเนื้อหาที่เกี่ยวข้อง'
                        ]} />
                        <RubricRow criteria="2. การสังเคราะห์ข้อมูล" levels={[
                            'สังเคราะห์ข้อมูลจากหลายแหล่งได้อย่างยอดเยี่ยม มีการวิเคราะห์และเรียบเรียงใหม่เป็นอย่างดี',
                            'มีการสังเคราะห์ข้อมูลที่ดี ไม่ใช่แค่การสรุปจากทีละแหล่ง',
                            'พยายามสังเคราะห์ข้อมูล แต่ส่วนใหญ่ยังเป็นการสรุปเรียงต่อกัน',
                            'เป็นการสรุปข้อมูลจากแต่ละแหล่งมาวางต่อกัน',
                            'เป็นการคัดลอกข้อความมาวาง',
                            'ไม่มีการสรุปหรือสังเคราะห์'
                        ]} />
                        <RubricRow criteria="3. การอ้างอิง" levels={[
                            'มีการอ้างอิงแหล่งที่มาทุกครั้งที่นำข้อมูลมาใช้อย่างถูกต้องและสม่ำเสมอ',
                            'มีการอ้างอิงแหล่งที่มาส่วนใหญ่',
                            'มีการอ้างอิง แต่ยังไม่สม่ำเสมอ หรือรูปแบบผิด',
                            'มีการอ้างอิงน้อยมาก',
                            'มีเพียงรายชื่อเอกสารอ้างอิงท้ายบท แต่ไม่มีการอ้างอิงในเนื้อหา',
                            'ไม่มีการอ้างอิง'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท: ฝึกการสังเคราะห์ข้อมูล</h4>
            <InteractiveExercise
                context="IS2-บทที่ 2"
                question="ลองสรุปข้อมูลที่สำคัญจากแหล่งข้อมูล 2 แหล่งที่คุณหามาเกี่ยวกับเรื่องเดียวกัน (เช่น แหล่งที่ 1 บอกว่าใบบัวบกช่วยเรื่อง A, แหล่งที่ 2 บอกว่าช่วยเรื่อง B) แล้ว AI จะช่วยแสดงตัวอย่างการ 'สังเคราะห์' ข้อมูลสองส่วนนี้เข้าด้วยกันเป็นย่อหน้าเดียว"
                rows={8}
            />
        </div>
    </div>
);

export default Topic3;
