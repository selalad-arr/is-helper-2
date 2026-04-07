import React from 'react';
import Topic1CardFlow from '../../components/Topic1CardFlow';
import InteractiveExercise from '../../components/InteractiveExercise';
import { useProjectData } from '../../hooks/useProjectData';

const Topic1 = () => {
    const { is1ProjectTitle, setIs1ProjectTitle } = useProjectData();

    return (
        <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การตั้งประเด็นปัญหาและความสำคัญ</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"สิ่งสำคัญคืออย่าหยุดตั้งคำถาม ความอยากรู้อยากเห็นมีเหตุผลในการดำรงอยู่ของมันเอง"</p>
            <p className="mt-1 text-sm">- อัลเบิร์ต ไอน์สไตน์</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                จุดเริ่มต้นที่สำคัญที่สุดของโครงงานคือการหา "ประเด็นปัญหา" หรือ "คำถาม" ที่เราสนใจและอยากจะหาคำตอบจริงๆ คำถามที่สำคัญที่ครูที่ปรึกษาจะถามคือ <strong>“ทำไมนักเรียนถึงอยากทำโครงงานนี้”</strong> ซึ่งการตอบคำถามนี้ได้ดี จะสะท้อนถึงความเข้าใจและความมุ่งมั่นในการทำโครงงาน
            </p>
             <p>
                ส่วนที่ใช้อธิบายเหตุผลนี้ในรายงานคือ "ความเป็นมาและความสำคัญ" ซึ่งเปรียบเสมือนการเล่าเรื่องเพื่อโน้มน้าวให้ผู้อ่านเห็นว่าปัญหาที่เราสนใจนั้นมีความสำคัญและน่าติดตามอย่างไร โดยมีโครงสร้างการเขียน 3 ส่วนหลัก:
            </p>
            <ul className="list-decimal list-inside space-y-2 pl-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <li><b>ส่วนต้น (ภาพใหญ่):</b> กล่าวถึงปัญหาในภาพรวมระดับกว้าง (เช่น ระดับประเทศ/โลก) เพื่อแสดงความสำคัญและดึงดูดความสนใจของผู้อ่าน</li>
                <li><b>ส่วนกลาง (เจาะลึก):</b> นำเสนอทฤษฎี, ข้อมูล, หรืองานวิจัยที่เกี่ยวข้องกับตัวแปรของโครงงานโดยตรง เพื่อแสดงให้เห็นว่าเราได้ศึกษาข้อมูลมาเป็นอย่างดี</li>
                <li><b>ส่วนปลาย (ที่มาจริง):</b> สรุปและเล่าที่มาของโครงงานจากประสบการณ์จริงหรือสิ่งที่นักเรียนพบเจอ แล้วเชื่อมโยงมาสู่การทำโครงงานนี้</li>
            </ul>
        </div>

        <div className="my-8">
            <h4 className="font-semibold text-xl !mt-6 text-slate-800 dark:text-slate-100 mb-3">ตัวอย่างการเขียนความเป็นมาและความสำคัญ</h4>
             <div className="my-4 p-4 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                <p className="font-bold text-slate-800 dark:text-slate-200 mb-2">ตัวอย่าง ส่วนต้น:</p>
                <p className="italic text-slate-600 dark:text-slate-400">
                    "ตั้งแต่อดีตจนถึงปัจจุบัน มนุษย์นำผลไม้มารับประทาน เพื่อเป็นแหล่งอาหารและเสริมสร้างวิตามินให้กับร่างกาย คุณประโยชน์ของผลไม้จึงมีมากมายตามแต่ละชนิดของผลไม้ การเก็บรักษาผลไม้สดให้ได้นานถือว่าเป็นประโยชน์อย่างยิ่ง..."
                </p>
            </div>
             <div className="my-4 p-4 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                 <p className="font-bold text-slate-800 dark:text-slate-200 mb-2">ตัวอย่าง ส่วนกลาง:</p>
                <p className="italic text-slate-600 dark:text-slate-400">
                    "ประเทศไทยมีความสามารถในการผลิตผลไม้ได้เป็นอย่างมาก... กากกาแฟ เป็นผลที่ได้จากการชงกาแฟสด... จากการศึกษางานวิจัยของศักยะ สมบัติไพรวัน ได้ทำการศึกษาการชะลอการสุกของมะม่วงน้ำดอกไม้โดยใช้ถ่านกำมันต์..."
                </p>
            </div>
             <div className="my-4 p-4 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                <p className="font-bold text-slate-800 dark:text-slate-200 mb-2">ตัวอย่าง ส่วนปลาย (เล่าจากประสบการณ์จริง):</p>
                 <p className="italic text-slate-600 dark:text-slate-400">
                    "ด้วยที่อาชีพของผู้ปกครองของเด็กชาย กันต์กวี บุญคง หนึ่งในสมาชิกโครงงาน เปิดร้านกาแฟโบราณ จึงทำให้มีกากกาแฟเหลือใช้ที่ร้านเป็นจำนวนมาก... ดังนั้นทางคณะผู้จัดทำจึงมีความสนใจที่จะทดสอบผลของกากกาแฟที่สามารถชะลอการสุกของกล้วยหอมได้..."
                </p>
            </div>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การตั้งประเด็นการสืบค้น (IS1)
                    </caption>
                    <thead className="text-xs text-slate-700 uppercase bg-slate-200 dark:text-slate-300 dark:bg-slate-800">
                        <tr>
                            <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600 w-1/4">เกณฑ์การประเมิน (Criteria)</th>
                            <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600">4 คะแนน (ดีเยี่ยม)</th>
                            <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600">3 คะแนน (ดี)</th>
                            <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600">2 คะแนน (พอใช้)</th>
                            <th scope="col" className="p-2 border border-slate-300 dark:border-slate-600">1 คะแนน (ปรับปรุง)</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-700 dark:text-slate-300">
                        <tr className="bg-white dark:bg-slate-800/50">
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">1. ความชัดเจนของประเด็น (Clarity)</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">✅ ประเด็นปัญหา/คำถามชัดเจนมาก เฉพาะเจาะจง ไม่กำกวม รู้ทันทีว่าต้องการศึกษาอะไร</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">👍 ประเด็นค่อนข้างชัดเจน แต่อาจต้องปรับภาษาเล็กน้อยเพื่อให้คมขึ้น</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">🤔 ประเด็นยังกว้างเกินไป หรือแคบเกินไป ขาดความเฉพาะเจาะจง</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">❌ ประเด็นกำกวมมาก หรือเป็นแค่ "หัวข้อ" กว้างๆ ไม่ใช่ "ประเด็น" ที่จะสืบค้น</td>
                        </tr>
                        <tr className="bg-slate-50 dark:bg-slate-800">
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">2. ความน่าสนใจและความสำคัญ (Significance & Interest)</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">✨ ประเด็นมีความน่าสนใจสูง สร้างสรรค์ หรือสะท้อนปัญหาที่สำคัญ (ต่อตนเอง/ชุมชน/วิชาการ)</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">😊 ประเด็นน่าสนใจ สอดคล้องกับความสนใจของผู้เรียน หรือบริบทในปัจจุบัน</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">😐 ประเด็นค่อนข้างทั่วไป ขาดความน่าสนใจ หรือยังไม่เห็นความสำคัญชัดเจน</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">👎 ประเด็นไม่น่าสนใจ ไม่สอดคล้องกับบริบท หรือไม่เห็นประโยชน์ในการศึกษา</td>
                        </tr>
                        <tr className="bg-white dark:bg-slate-800/50">
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">3. ความเป็นไปได้ในการสืบค้น (Feasibility)</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">🚀 ขอบเขตเหมาะสม สามารถสืบค้น/เก็บข้อมูลได้จริง ภายในเวลาและทรัพยากรที่กำหนด (ทำได้จริง)</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">👍 ขอบเขตค่อนข้างเหมาะสม แต่อาจต้องปรับเล็กน้อย (เช่น ลดขนาดกลุ่มตัวอย่าง) เพื่อให้ทำได้จริง</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">⚠️ ขอบเขตกว้างหรือแคบเกินไปมาก อาจทำให้หาข้อมูลยาก หรือข้อมูลล้นจนสรุปไม่ได้</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">🚫 ประเด็นไม่สามารถสืบค้นได้จริง (เช่น เป็นคำถามเชิงปรัชญา) หรือใช้ทรัพยากรเกินตัว</td>
                        </tr>
                        <tr className="bg-slate-50 dark:bg-slate-800">
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">4. การเชื่อมโยงกับแหล่งข้อมูล (Source Availability)</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">📚 คาดการณ์ได้ว่ามีแหล่งข้อมูล (เอกสาร, ผู้เชี่ยวชาญ, สถานที่) ที่หลากหลายและน่าเชื่อถือรองรับ</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">📖 คาดว่ามีแหล่งข้อมูลเพียงพอ แต่ อาจจะต้องใช้ความพยายามในการค้นหา</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">📉 แหล่งข้อมูลอาจมีจำกัดมาก หรือหาข้อมูลเชิงประจักษ์มาสนับสนุนได้ยาก</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">🔒 เป็นประเด็นที่หาแหล่งข้อมูลอ้างอิงหรือตรวจสอบได้ยากมาก</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">ใบกิจกรรมที่ 2: ระดมสมองกับ AI</h4>
             <InteractiveExercise
                context="IS1-ใบกิจกรรมที่ 2: การตั้งประเด็นปัญหา"
                question="ให้นักเรียนตั้งประเด็นปัญหาหรือเรื่องที่สนใจ 3 ประเด็น พร้อมให้เหตุผลสั้นๆ ว่าทำไมถึงสนใจในแต่ละประเด็น จากนั้น AI จะช่วยประเมินแนวคิดของคุณตามเกณฑ์ในตาราง Rubric ด้านบน"
                rows={8}
            />
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัด: ค้นหาหัวข้อกับ AI</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
                มาลองใช้ AI ผู้ช่วยในการค้นหาและพัฒนาแนวคิดโครงงานของคุณกันเถอะ! AI จะถามคำถามเพื่อนำทางคุณไปสู่หัวข้อโครงงานที่น่าสนใจและทำได้จริง
            </p>
            <Topic1CardFlow projectTitle={is1ProjectTitle} setProjectTitle={setIs1ProjectTitle} />
        </div>
    </div>
    );
};

export default Topic1;
