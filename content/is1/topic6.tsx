

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

const Topic6 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การวิเคราะห์ข้อมูลเบื้องต้น</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"เป็นความผิดพลาดมหันต์ที่จะสร้างทฤษฎีก่อนที่จะมีข้อมูล"</p>
            <p className="mt-1 text-sm">- เชอร์ล็อก โฮมส์ (อาร์เธอร์ โคนัน ดอยล์)</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                หลังจากที่เราเก็บรวบรวมข้อมูลมาแล้ว ขั้นตอนต่อไปที่สำคัญมากคือ "การวิเคราะห์ข้อมูล" เพื่อแปลงข้อมูลดิบ (Raw Data) ให้กลายเป็นสารสนเทศ (Information) ที่มีความหมายและสามารถตอบคำถามของโครงงานเราได้
            </p>
            <p>
                สำหรับโครงงานในระดับมัธยมศึกษา การวิเคราะห์ข้อมูลเบื้องต้นด้วยสถิติอย่างง่ายก็เพียงพอที่จะทำให้รายงานของเราดูน่าเชื่อถือและเป็นระบบมากขึ้นแล้วครับ
            </p>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">สถิติพื้นฐานที่ควรรู้จัก</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">1. ร้อยละ (Percentage)</h5>
                    <p className="mt-1">เป็นการนำเสนอข้อมูลโดยเปรียบเทียบจำนวนที่สนใจกับจำนวนทั้งหมด แล้วคิดเป็นส่วนใน 100 ส่วน ใช้ได้ดีกับการสำรวจความคิดเห็นหรือข้อมูลที่มีการแบ่งกลุ่มชัดเจน</p>
                    <p className="mt-2 text-sm text-sky-700 dark:text-sky-300 italic">ตัวอย่าง: จากผู้ตอบแบบสอบถาม 50 คน มี 35 คนพึงพอใจ คิดเป็น (35 / 50) * 100 = 70%</p>
                </div>
                 <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">2. ค่าเฉลี่ย (Mean)</h5>
                    <p className="mt-1">คือผลรวมของข้อมูลทั้งหมดหารด้วยจำนวนข้อมูล ใช้เพื่อหาค่ากลางของชุดข้อมูลที่เป็นตัวเลข</p>
                     <p className="mt-2 text-sm text-sky-700 dark:text-sky-300 italic">ตัวอย่าง: ต้นพืช 5 ต้นสูง 10, 12, 11, 13, 9 ซม. ค่าเฉลี่ยความสูงคือ (10+12+11+13+9) / 5 = 11 ซม.</p>
                </div>
            </div>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">การนำเสนอข้อมูลให้น่าสนใจ</h4>
            <p>
                การนำเสนอผลวิเคราะห์ในรูปแบบตารางหรือแผนภูมิ จะช่วยให้ผู้อ่านเข้าใจข้อมูลได้รวดเร็วกว่าการอ่านจากข้อความยาวๆ
            </p>
             <div className="space-y-4">
                <p><b>ตาราง (Table):</b> เหมาะสำหรับการแสดงข้อมูลดิบหรือผลการวิเคราะห์ที่ต้องการแสดงตัวเลขที่แม่นยำ ทุกตารางต้องมีหมายเลขและชื่อตารางกำกับอยู่ด้านบน</p>
                <div className="overflow-x-auto">
                     <table className="w-full text-sm text-left border-collapse border border-slate-300 dark:border-slate-600">
                        <caption className="p-2 text-sm font-semibold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                            ตารางที่ 1 แสดงจำนวนผู้ตอบแบบสอบถามจำแนกตามเพศ
                        </caption>
                        <thead className="bg-slate-200 dark:bg-slate-800">
                            <tr>
                                <th className="p-2 border border-slate-300 dark:border-slate-600">เพศ</th>
                                <th className="p-2 border border-slate-300 dark:border-slate-600 text-center">จำนวน (คน)</th>
                                <th className="p-2 border border-slate-300 dark:border-slate-600 text-center">ร้อยละ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white dark:bg-slate-800/50">
                                <td className="p-2 border border-slate-300 dark:border-slate-600">ชาย</td>
                                <td className="p-2 border border-slate-300 dark:border-slate-600 text-center">20</td>
                                <td className="p-2 border border-slate-300 dark:border-slate-600 text-center">40.0</td>
                            </tr>
                             <tr className="bg-slate-50 dark:bg-slate-800">
                                <td className="p-2 border border-slate-300 dark:border-slate-600">หญิง</td>
                                <td className="p-2 border border-slate-300 dark:border-slate-600 text-center">30</td>
                                <td className="p-2 border border-slate-300 dark:border-slate-600 text-center">60.0</td>
                            </tr>
                            <tr className="bg-slate-200 dark:bg-slate-700 font-bold">
                                <td className="p-2 border border-slate-300 dark:border-slate-600 text-center">รวม</td>
                                <td className="p-2 border border-slate-300 dark:border-slate-600 text-center">50</td>
                                <td className="p-2 border border-slate-300 dark:border-slate-600 text-center">100.0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                 <p><b>แผนภูมิ (Chart/Graph):</b> เหมาะสำหรับการเปรียบเทียบข้อมูลให้เห็นภาพชัดเจน เช่น แผนภูมิแท่ง (Bar Chart) สำหรับเปรียบเทียบปริมาณ, กราฟเส้น (Line Graph) สำหรับดูแนวโน้มการเปลี่ยนแปลงตามเวลา ทุกแผนภูมิต้องมีหมายเลขและชื่อกำกับอยู่ด้านล่าง</p>
            </div>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การวิเคราะห์ข้อมูล
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
                        <RubricRow criteria="1. การเลือกใช้สถิติ" levels={[
                            'เลือกใช้สถิติได้เหมาะสมกับวัตถุประสงค์และลักษณะของข้อมูลอย่างยิ่ง',
                            'เลือกใช้สถิติได้เหมาะสมกับข้อมูล',
                            'เลือกใช้สถิติได้ค่อนข้างเหมาะสม',
                            'เลือกใช้สถิติพื้นฐานได้ แต่มีวิธีที่ดีกว่า',
                            'เลือกใช้สถิติไม่ค่อยเหมาะสม',
                            'เลือกใช้สถิติผิดประเภท'
                        ]} />
                        <RubricRow criteria="2. การนำเสนอข้อมูล" levels={[
                            'เลือกใช้ตาราง/แผนภูมิได้เหมาะสม สวยงาม สื่อความหมายได้ดีเยี่ยม',
                            'นำเสนอข้อมูลในรูปแบบตาราง/แผนภูมิได้เหมาะสม',
                            'นำเสนอข้อมูลได้ชัดเจน แต่รูปแบบยังไม่เหมาะสมที่สุด',
                            'นำเสนอข้อมูลเป็นข้อความยาวๆ ขาดการสรุปเป็นภาพ',
                            'รูปแบบการนำเสนอทำให้เข้าใจผิดได้',
                            'นำเสนอข้อมูลไม่เป็นระบบ'
                        ]} />
                        <RubricRow criteria="3. ความถูกต้อง" levels={[
                            'ข้อมูล ตัวเลข และการคำนวณถูกต้องทั้งหมด ไม่มีข้อผิดพลาด',
                            'การคำนวณส่วนใหญ่ถูกต้อง',
                            'มีข้อผิดพลาดเล็กน้อยในการคำนวณ',
                            'มีข้อผิดพลาดในการคำนวณที่เห็นได้ชัด',
                            'ข้อมูลและการคำนวณผิดพลาดหลายจุด',
                            'ข้อมูลไม่ถูกต้องทั้งหมด'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>
        
        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท: ปรึกษา AI เรื่องสถิติสำหรับโครงงานของคุณ</h4>
            <InteractiveExercise
                context="บทที่ 6: การวิเคราะห์ข้อมูลเบื้องต้น"
                question="อธิบายวิธีการทดลองหรือเก็บข้อมูลของโครงงานคุณมาโดยสรุป แล้ว AI จะช่วยแนะนำว่าควรใช้สถิติอะไรในการวิเคราะห์ข้อมูล และมีขั้นตอนอย่างไรบ้าง"
                rows={8}
            />
        </div>
    </div>
);

export default Topic6;
