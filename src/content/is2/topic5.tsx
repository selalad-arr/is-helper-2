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

const Topic5 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การเขียนบทที่ 4: ผลการศึกษา</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"เป็นความผิดพลาดมหันต์ที่จะสร้างทฤษฎีก่อนที่จะมีข้อมูล"</p>
            <p className="mt-1 text-sm">- เชอร์ล็อก โฮมส์ (อาร์เธอร์ โคนัน ดอยล์)</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                บทที่ 4 หรือ "ผลการศึกษา" (Results) คือส่วนที่เราจะนำเสนอ "ข้อค้นพบ" ทั้งหมดที่ได้จากการทดลองหรือการเก็บรวบรวมข้อมูล บทนี้มีกฎเหล็กที่สำคัญที่สุดเพียงข้อเดียวคือ:
            </p>
            
            <div className="mt-6 p-4 border-l-4 border-red-500 bg-red-50 dark:bg-slate-800/50 rounded-r-lg">
                <p className="font-semibold text-red-800 dark:text-red-300">กฎเหล็กของบทที่ 4: รายงานผลเท่านั้น, ห้ามตีความ!</p>
                <p className="mt-1 text-slate-700 dark:text-slate-300">
                   ในบทนี้ เราจะทำหน้าที่เป็นเพียง "ผู้รายงานข่าว" ที่บอกว่าเราเจออะไรบ้างตามความเป็นจริง (เช่น ตัวเลข, ค่าที่วัดได้, สิ่งที่สังเกตเห็น) โดยจะยัง "ไม่ใส่ความคิดเห็น" หรือ "ไม่อธิบาย" ว่าผลนั้นหมายความว่าอย่างไร การอภิปรายและตีความทั้งหมดจะถูกเก็บไว้ในบทที่ 5
                </p>
            </div>
            
            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">วิธีการนำเสนอผลการศึกษา</h4>
            <p>เพื่อให้ผู้อ่านเข้าใจง่าย เราควรนำเสนอผลในรูปแบบที่หลากหลายผสมผสานกัน:</p>
            <ul className="list-decimal list-outside pl-5 space-y-3">
                <li>
                    <strong>ตาราง (Table):</strong>
                    <p className="font-normal text-sm pl-2">เหมาะสำหรับการแสดงข้อมูลตัวเลขที่แม่นยำ ทุกตารางต้องมี "ตารางที่" และ "ชื่อตาราง" กำกับอยู่ด้านบนเสมอ</p>
                </li>
                 <li>
                    <strong>แผนภูมิและกราฟ (Charts and Graphs):</strong>
                    <p className="font-normal text-sm pl-2">เหมาะสำหรับการเปรียบเทียบข้อมูลให้เห็นภาพชัดเจน เช่น แผนภูมิแท่ง, กราฟเส้น, แผนภูมิวงกลม ทุกแผนภูมิต้องมี "รูปที่" และ "ชื่อรูป" กำกับอยู่ด้านล่างเสมอ</p>
                </li>
                 <li>
                    <strong>รูปภาพ (Images):</strong>
                    <p className="font-normal text-sm pl-2">ใช้แสดงผลลัพธ์ที่ไม่สามารถบรรยายเป็นตัวเลขได้ เช่น ภาพถ่ายการเปลี่ยนแปลงของตัวอย่าง, ภาพจากกล้องจุลทรรศน์</p>
                </li>
                <li>
                    <strong>คำบรรยายประกอบ (Descriptive Text):</strong>
                    <p className="font-normal text-sm pl-2">หลังจากนำเสนอตารางหรือแผนภูมิแล้ว ควรมีย่อหน้าที่คอยบรรยายสรุปสิ่งที่เห็นจากตาราง/แผนภูมินั้นๆ โดยไม่ต้องตีความ เช่น "จากตารางที่ 1 พบว่า กลุ่มตัวอย่างส่วนใหญ่เป็นเพศหญิง คิดเป็นร้อยละ 60"</p>
                </li>
            </ul>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การเขียนบทที่ 4
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
                        <RubricRow criteria="1. การรายงานตามข้อเท็จจริง" levels={[
                            'นำเสนอข้อมูลตามจริงโดยสมบูรณ์ ปราศจากการตีความหรือใส่ความคิดเห็นใดๆ',
                            'นำเสนอข้อมูลตามจริงเป็นส่วนใหญ่',
                            'นำเสนอข้อมูลจริง แต่เริ่มมีการตีความปะปนเล็กน้อย',
                            'มีการตีความผลลัพธ์ปะปนกับการรายงานผลอย่างชัดเจน',
                            'ส่วนใหญ่เป็นการตีความมากกว่าการรายงานผล',
                            'ไม่ได้รายงานผล แต่เป็นการอภิปรายผล'
                        ]} />
                        <RubricRow criteria="2. การเลือกใช้ตาราง/แผนภูมิ" levels={[
                            'เลือกใช้รูปแบบการนำเสนอ (ตาราง/แผนภูมิ) ได้เหมาะสมกับข้อมูล สื่อความหมายได้ดีเยี่ยม และมีคำอธิบายครบถ้วน',
                            'เลือกใช้ตาราง/แผนภูมิได้เหมาะสมกับข้อมูล',
                            'เลือกใช้ตาราง/แผนภูมิได้ แต่มีรูปแบบอื่นที่เหมาะสมกว่า',
                            'รูปแบบที่เลือกใช้ไม่ค่อยสื่อความหมาย',
                            'รูปแบบที่เลือกทำให้เข้าใจผิดได้',
                            'ไม่มีการใช้ตาราง/แผนภูมิ'
                        ]} />
                        <RubricRow criteria="3. ความถูกต้องของข้อมูล" levels={[
                            'ข้อมูล ตัวเลข และคำอธิบายประกอบถูกต้องทั้งหมด',
                            'ข้อมูลส่วนใหญ่ถูกต้อง',
                            'มีข้อผิดพลาดเล็กน้อยในข้อมูลหรือคำอธิบาย',
                            'ข้อมูลที่นำเสนอมีข้อผิดพลาดที่เห็นได้ชัด',
                            'ข้อมูลผิดพลาดหลายจุด',
                            'ข้อมูลไม่ถูกต้องทั้งหมด'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท: ฝึกบรรยายผลอย่างเป็นกลาง</h4>
            <InteractiveExercise
                context="IS2-บทที่ 4"
                question="สมมติว่าคุณได้ข้อมูลมาว่า 'กลุ่มที่ใช้ปุ๋ย A ต้นพืชสูงเฉลี่ย 15 ซม. ส่วนกลุ่มที่ไม่ใช้ปุ๋ยสูงเฉลี่ย 10 ซม.' ลองเขียนประโยคเพื่อ 'รายงาน' ข้อเท็จจริงนี้สำหรับบทที่ 4 โดยไม่ใส่การตีความ (เช่น ไม่ต้องบอกว่าปุ๋ย A ดีกว่า) แล้ว AI จะช่วยตรวจและแนะนำ"
                rows={5}
            />
        </div>
    </div>
);

export default Topic5;
