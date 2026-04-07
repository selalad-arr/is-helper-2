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
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การตั้งสมมติฐาน (Hypothesis Formulation)</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"เราพิสูจน์ด้วยวิทยาศาสตร์ แต่เราค้นพบด้วยสัญชาตญาณ"</p>
            <p className="mt-1 text-sm">- อองรี ปวงกาเร</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                สมมติฐาน คือ คำตอบที่คาดเดาอย่างมีเหตุผล สำหรับปัญหาหรือคำถามของโครงงานที่เราสงสัย เป็นการทำนายผลการทดลองล่วงหน้าโดยอาศัยความรู้เดิม ทฤษฎี หรือข้อมูลที่ได้จากการสืบค้นมาก่อน ไม่ใช่การเดาสุ่ม ❌
            </p>
            <p>
                สมมติฐานที่ดีจะเป็นเหมือนเข็มทิศ 🧭 ที่ชี้นำทิศทางการทดลองว่าจะต้องทำอะไร สังเกตและวัดผลอะไรบ้าง
            </p>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">องค์ประกอบสำคัญในสมมติฐาน</h4>
            <p>
                สมมติฐานที่ดีมักจะแสดงความสัมพันธ์ของสิ่งที่เรียกว่า "ตัวแปร" ซึ่งในการทดลองทางวิทยาศาสตร์จะประกอบด้วย:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>ตัวแปรต้น (Independent Variable):</strong> คือ สิ่งที่ผู้ทดลองจงใจจัดให้แตกต่างกัน เพื่อดูผลกระทบของมัน มักจะอยู่หลังคำว่า "ถ้า"</li>
                <li><strong>ตัวแปรตาม (Dependent Variable):</strong> คือ ผลที่เกิดขึ้นจากการเปลี่ยนแปลงตัวแปรต้น เป็นสิ่งที่เราต้องคอยสังเกต วัดผล หรือเก็บข้อมูล มักจะอยู่หลังคำว่า "ดังนั้น"</li>
                <li><strong>ตัวแปรควบคุม (Controlled Variables):</strong> คือปัจจัยอื่นๆ ที่อาจส่งผลต่อการทดลองได้ ซึ่งผู้ทดลองต้องควบคุมให้เหมือนกันทุกชุดการทดลอง เพื่อให้แน่ใจว่าผลที่เกิดขึ้นมาจากตัวแปรต้นจริงๆ ไม่ใช่ปัจจัยอื่น</li>
            </ul>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">โครงสร้างการเขียนสมมติฐาน (ฉบับขยายความ)</h4>
             <div className="my-4 p-3 border-l-4 border-sky-500 bg-sky-50 dark:bg-slate-800/50 rounded-r-lg">
                <p className="font-semibold text-sky-800 dark:text-sky-300">ถ้า [เราเปลี่ยนแปลงตัวแปรต้นในลักษณะนี้] ดังนั้น [ตัวแปรตามที่เราคาดว่าจะสังเกตเห็นจะเปลี่ยนแปลงไปแบบนี้]</p>
            </div>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">วิเคราะห์ตัวอย่างสมมติฐาน</h4>
            <p>เรามาลองวิเคราะห์ตัวอย่างให้ลึกซึ้งยิ่งขึ้น เพื่อให้นักเรียนเห็นภาพชัดเจนครับ</p>
            
            <div className="my-4 p-4 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                <p className="font-bold text-slate-800 dark:text-slate-200">ตัวอย่าง:</p>
                <p className="mt-2 text-slate-700 dark:text-slate-300">
                   ถ้านำกากกาแฟปริมาณ 0, 10, 20, 30, 40, 50 กรัม มาเก็บรวมกับกล้วยหอมทองดิบ ดังนั้น กล้วยหอมทองจะมีการเปลี่ยนแปลงจากดิบเป็นสุกโดยใช้เวลาในการสุกไม่เท่ากัน
                </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50">
                <p className="font-semibold text-slate-800 dark:text-slate-200">การวิเคราะห์:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                    <li><b>ตัวแปรต้น:</b> ปริมาณกากกาแฟ ที่แตกต่างกัน (0, 10, 20, 30, 40, 50 กรัม) เพราะเป็นสิ่งที่ผู้ทดลองตั้งใจเปลี่ยน</li>
                    <li><b>ตัวแปรตาม:</b> ระยะเวลาที่กล้วยใช้ในการสุก (อาจวัดจากสีเปลือก หรือความนิ่ม) เพราะเป็นผลที่เราต้องการวัด</li>
                    <li>
                        <b>ตัวแปรควบคุม (ที่ต้องคิดถึง):</b>
                         <ul className="list-circle list-inside ml-5 mt-1 space-y-1">
                            <li>สายพันธุ์และขนาดของกล้วยหอม</li>
                            <li>ระดับความดิบของกล้วยที่นำมาทดลอง</li>
                            <li>ภาชนะที่ใช้ในการบ่มกล้วย</li>
                            <li>อุณหภูมิและความชื้นของสถานที่ทดลอง</li>
                        </ul>
                    </li>
                </ul>
            </div>

             <div className="mt-6 p-3 border-l-4 border-amber-500 bg-amber-50 dark:bg-slate-800/50 rounded-r-lg">
                <p className="font-semibold text-amber-800 dark:text-amber-300">ข้อแนะนำเพิ่มเติมสำหรับนักเรียน:</p>
                <p className="mt-1 text-slate-700 dark:text-slate-300">
                   "การใส่ปริมาณ 0 กรัม ลงไปด้วยนั้นสำคัญมาก เพราะชุดทดลองนี้เรียกว่า <b>ชุดควบคุม (Control Group)</b> ซึ่งจะใช้เป็นมาตรฐานเปรียบเทียบว่าการใส่กากกาแฟในปริมาณต่างๆ ให้ผลที่แตกต่างไปจากปกติ (ที่ไม่ใส่กากกาแฟ) จริงหรือไม่"
                </p>
            </div>
        </div>
        
        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การตั้งสมมติฐาน
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
                        <RubricRow criteria="1. โครงสร้าง 'ถ้า...ดังนั้น...'" levels={[
                            'ใช้โครงสร้าง "ถ้า...ดังนั้น..." อย่างถูกต้องสมบูรณ์และชัดเจน',
                            'ใช้โครงสร้าง "ถ้า...ดังนั้น..." ถูกต้อง แต่ภาษาอาจยังไม่กระชับ',
                            'มีโครงสร้างคล้าย "ถ้า...ดังนั้น..." แต่ไม่ครบถ้วน',
                            'พยายามแสดงความสัมพันธ์แต่ไม่มีโครงสร้างที่ชัดเจน',
                            'เป็นประโยคบอกเล่าที่ไม่แสดงความสัมพันธ์',
                            'ไม่เป็นประโยคที่สื่อถึงการคาดคะเน'
                        ]} />
                        <RubricRow criteria="2. ความสัมพันธ์ของตัวแปร" levels={[
                            'ระบุตัวแปรต้นและตัวแปรตามได้ชัดเจน และแสดงทิศทางความสัมพันธ์ที่คาดการณ์ไว้',
                            'ระบุตัวแปรต้นและตัวแปรตามได้ชัดเจน',
                            'ระบุตัวแปรต้นและตามได้ แต่ยังสับสนเล็กน้อย',
                            'ระบุตัวแปรได้เพียงตัวเดียว หรือระบุไม่ชัดเจน',
                            'ตัวแปรที่ระบุไม่สอดคล้องกับปัญหา',
                            'ไม่มีการระบุตัวแปรที่ศึกษา'
                        ]} />
                        <RubricRow criteria="3. ความสามารถในการทดสอบได้" levels={[
                            'สามารถออกแบบการทดลองหรือเก็บข้อมูลเพื่อทดสอบได้จริงอย่างเป็นรูปธรรม',
                            'สามารถทดสอบได้จริง แต่อาจมีขั้นตอนที่ซับซ้อน',
                            'สามารถทดสอบได้ในทางทฤษฎี แต่อาจทำได้ยากในทางปฏิบัติ',
                            'การทดสอบทำได้ยาก หรือตัวแปรตามวัดผลได้ไม่ชัดเจน',
                            'เป็นคำถามเชิงคุณค่า หรือนามธรรมที่วัดผลไม่ได้',
                            'ไม่สามารถทดสอบได้เลย'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">ใบกิจกรรมที่ 3: ฝึกตั้งสมมติฐานกับ AI</h4>
            <InteractiveExercise
                context="IS1-ใบกิจกรรมที่ 3: การตั้งสมมติฐาน"
                question={`จากประเด็นปัญหาต่อไปนี้ ให้นักเรียนลองเขียนสมมติฐานในรูปแบบ "ถ้า... ดังนั้น..." มา 2 สมมติฐานที่แตกต่างกัน แล้ว AI จะช่วยตรวจสอบความถูกต้องให้

ประเด็นปัญหา: "การศึกษาผลของชนิดดิน (ดินร่วน, ดินเหนียว, ดินทราย) ที่มีต่อการเจริญเติบโตของต้นถั่วเขียว"`}
                rows={5}
            />
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท (AI ช่วย)</h4>
            <InteractiveExercise
                context="บทที่ 2: การตั้งสมมติฐาน"
                question="อธิบายกิจกรรมหรือการทดลองที่นักเรียนวางแผนจะทำมาโดยสรุป (เช่น 'จะลองเอากากกาแฟไปใส่รวมกับกล้วยดิบ แล้วดูว่าจะสุกช้าลงไหม') แล้ว AI จะช่วยออกแบบสมมติฐานที่ถูกต้องตามหลักการให้"
                rows={6}
            />
        </div>
    </div>
);

export default Topic2;
