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

const Topic9 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">เทคนิคการนำเสนออย่างมีประสิทธิภาพ</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"ถ้าคุณไม่สามารถอธิบายมันให้ง่ายได้ แสดงว่าคุณยังไม่เข้าใจมันดีพอ"</p>
            <p className="mt-1 text-sm">- ริชาร์ด ไฟน์แมน</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                การมีข้อมูลและสไลด์ที่ดีเป็นเพียงครึ่งหนึ่งของความสำเร็จ อีกครึ่งหนึ่งที่สำคัญไม่แพ้กันคือ "วิธีการนำเสนอ" ของเรา การนำเสนอที่ดีสามารถทำให้เรื่องที่ซับซ้อนกลายเป็นเรื่องที่น่าติดตามและเข้าใจง่ายได้
            </p>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">1. การเตรียมตัว (Preparation is Key)</h4>
            <ul className="list-disc list-outside pl-5 space-y-2">
                <li><b>รู้จักผู้ฟัง:</b> เรากำลังนำเสนอให้ใครฟัง? (ครู, เพื่อน, กรรมการ) ปรับภาษาและเนื้อหาให้เหมาะสมกับผู้ฟัง</li>
                <li><b>ซ้อม ซ้อม และซ้อม:</b> การซ้อมช่วยลดความประหม่า ทำให้เรารู้ลำดับเนื้อหาและบริหารเวลาได้ดีขึ้น ลองซ้อมหน้ากระจก หรืออัดวิดีโอตัวเองเพื่อดูข้อบกพร่อง</li>
                <li><b>เตรียมอุปกรณ์ให้พร้อม:</b> ตรวจสอบไฟล์นำเสนอ, คอมพิวเตอร์, โปรเจคเตอร์ ให้พร้อมใช้งานก่อนถึงเวลาจริง</li>
            </ul>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">2. เทคนิคการพูดและน้ำเสียง (Vocal Delivery)</h4>
             <ul className="list-disc list-outside pl-5 space-y-2">
                <li><b>พูดให้ชัดเจนและดังพอดี:</b> ไม่ตะโกนหรือพูดในลำคอจนผู้ฟังไม่ได้ยิน</li>
                <li><b>ใช้ความเร็วที่เหมาะสม:</b> ไม่พูดเร็วหรือช้าจนเกินไป เว้นจังหวะเล็กน้อยเมื่อขึ้นหัวข้อใหม่เพื่อให้ผู้ฟังได้คิดตาม</li>
                <li><b>ใช้น้ำเสียงสูง-ต่ำ:</b> การพูดด้วยโทนเสียงเดียวจะทำให้น่าเบื่อ ลองเน้นเสียงในคำสำคัญเพื่อสร้างความน่าสนใจ</li>
            </ul>
            
            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">3. ภาษาท่าทาง (Body Language)</h4>
            <div className="p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <ul className="space-y-3">
                    <li>
                        <p><b className="text-sky-700 dark:text-sky-400">การสบตา (Eye Contact):</b> ควรสบตาผู้ฟังให้ทั่วถึง ไม่ควรอ่านจากสไลด์หรือสคริปต์ตลอดเวลา การสบตาแสดงถึงความมั่นใจและทำให้ผู้ฟังรู้สึกมีส่วนร่วม</p>
                    </li>
                    <li><b>การแสดงออกทางสีหน้า:</b> ยิ้มแย้มอย่างเป็นธรรมชาติ แสดงความกระตือรือร้นในเรื่องที่พูด</li>
                    <li><b>การใช้มือประกอบ:</b> ใช้มือประกอบการพูดอย่างเป็นธรรมชาติเพื่อเน้นย้ำประเด็นสำคัญ แต่ไม่ควรเคลื่อนไหวมากไปจนดูวุ่นวาย</li>
                    <li><b>การยืน:</b> ยืนตัวตรงอย่างมั่นคง ไม่โยกตัวไปมาหรือยืนพิง</li>
                </ul>
            </div>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">4. การจัดการเนื้อหาและเวลา (Content & Time Management)</h4>
             <ul className="list-disc list-outside pl-5 space-y-2">
                <li><b>กฎ 10-20-30 ของ Guy Kawasaki:</b> เป็นแนวทางที่น่าสนใจ คือ นำเสนอไม่เกิน 10 สไลด์, ใช้เวลาไม่เกิน 20 นาที, และใช้ขนาดตัวอักษรไม่ต่ำกว่า 30 point เพื่อให้สไลด์กระชับและอ่านง่าย</li>
                <li><b>เล่าเรื่อง (Storytelling):</b> พยายามเล่าที่มาของโครงงานเหมือนการเล่าเรื่อง จะช่วยให้ผู้ฟังอินไปกับเราได้ง่ายขึ้น</li>
                <li><b>เปิดอย่างน่าสนใจและปิดอย่างน่าจดจำ:</b> เริ่มต้นด้วยคำถามหรือข้อมูลที่น่าทึ่ง และจบด้วยการสรุปประเด็นสำคัญที่ต้องการให้ผู้ฟังจำได้</li>
            </ul>

             <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">5. การนำเสนอแบบเดี่ยว (Oral Individual) vs. แบบกลุ่ม (Oral Panel)</h4>
             <ul className="list-disc list-outside pl-5 space-y-2">
                <li><b>แบบเดี่ยว:</b> เราต้องรับผิดชอบทุกอย่างคนเดียว การบริหารเวลาและการลำดับเนื้อหาจึงสำคัญมาก</li>
                <li><b>แบบกลุ่ม:</b> ต้องมีการวางแผนและแบ่งหน้าที่กันอย่างชัดเจนว่าใครจะพูดส่วนไหน และต้องมีการซ้อมรับ-ส่งบทพูดกันให้ราบรื่น สมาชิกทุกคนควรรู้เนื้อหาทั้งหมดของโครงงาน ไม่ใช่แค่ส่วนของตัวเอง เพื่อช่วยตอบคำถามได้</li>
            </ul>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) ทักษะการนำเสนอ
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
                        <RubricRow criteria="1. ทักษะการพูดและน้ำเสียง" levels={[
                            'พูดจาฉะฉาน เสียงดังฟังชัด มีการเน้นเสียงและจังหวะที่น่าสนใจอย่างยิ่ง',
                            'พูดจาชัดเจนและมีความดังที่เหมาะสม',
                            'พูดได้ชัดเจน แต่ยังใช้น้ำเสียงโทนเดียว',
                            'พูดเสียงเบาหรือไม่ค่อยชัดเจน',
                            'พูดเร็วหรือช้าเกินไปจนฟังยาก',
                            'ไม่สามารถสื่อสารให้เข้าใจได้'
                        ]} />
                        <RubricRow criteria="2. ภาษาท่าทาง" levels={[
                            'สบตาผู้ฟังทั่วถึง, ยืนสง่า, และใช้มือประกอบอย่างเป็นธรรมชาติและมั่นใจ',
                            'มีการสบตาผู้ฟังและยืนในท่าทางที่เหมาะสม',
                            'สบตาผู้ฟังบ้าง แต่ส่วนใหญ่มองสไลด์/สคริปต์',
                            'ยืนไม่นิ่ง หรือไม่มีการสบตาผู้ฟัง',
                            'แสดงท่าทีประหม่าอย่างเห็นได้ชัด',
                            'ไม่แสดงออกทางภาษาท่าทาง'
                        ]} />
                        <RubricRow criteria="3. การบริหารเวลาและเนื้อหา" levels={[
                            'นำเสนอได้ครบถ้วนในเวลาที่กำหนด มีการเปิดและปิดที่น่าประทับใจ',
                            'นำเสนอได้ครบถ้วนและอยู่ในเวลา',
                            'นำเสนอได้ครบถ้วน แต่ใช้เวลาเกินเล็กน้อย',
                            'นำเสนอเนื้อหาไม่ครบถ้วนเนื่องจากบริหารเวลาไม่ดี',
                            'ใช้เวลาเกินกำหนดอย่างมาก',
                            'ไม่สามารถนำเสนอให้จบได้'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท: ฝึกเขียนสคริปต์กับ AI Coach</h4>
            <InteractiveExercise
                context="IS2-บทที่ 9: เทคนิคการนำเสนอ"
                question="ลองเขียน 'สคริปต์' หรือบทพูดสำหรับ 'สไลด์แรก' ที่จะใช้เปิดการนำเสนอของคุณ (ความยาวประมาณ 3-5 ประโยค) แล้ว AI จะสวมบทบาทเป็นโค้ช ช่วยให้คำแนะนำเพื่อทำให้การเปิดเรื่องของคุณน่าสนใจและดึงดูดผู้ฟังได้มากที่สุด"
                rows={6}
            />
        </div>

    </div>
);

export default Topic9;
