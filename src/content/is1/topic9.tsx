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
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การนำเสนอผลงาน IS1</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"ถ้าคุณไม่สามารถอธิบายมันให้ง่ายได้ แสดงว่าคุณยังไม่เข้าใจมันดีพอ"</p>
            <p className="mt-1 text-sm">- ริชาร์ด ไฟน์แมน</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                การนำเสนอผลงาน คือขั้นตอนสุดท้ายที่จะสื่อสารให้ผู้อื่นได้รับรู้ถึงสิ่งที่เราได้ทุ่มเทศึกษาค้นคว้ามาทั้งหมด การนำเสนอที่ดีจะช่วยให้ผลงานของเราน่าสนใจและเป็นที่น่าจดจำ
            </p>
            <p>
                สำหรับการนำเสนอผลการศึกษาค้นคว้า IS1 มักจะเน้นที่ความชัดเจนของกระบวนการและข้อค้นพบเบื้องต้น
            </p>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">โครงสร้างการนำเสนอที่แนะนำ</h4>
            <ol className="list-decimal list-outside pl-5 space-y-2">
                <li><strong>สไลด์ที่ 1: หน้าปก</strong> - ชื่อโครงงาน, ชื่อผู้จัดทำ, ชื่อครูที่ปรึกษา</li>
                <li><strong>สไลด์ที่ 2: ที่มาและความสำคัญ</strong> - ทำไมถึงทำเรื่องนี้? ปัญหานี้สำคัญอย่างไร? (สรุปจากบทที่ 1)</li>
                <li><strong>สไลด์ที่ 3: วัตถุประสงค์และสมมติฐาน</strong> - ต้องการศึกษาอะไร? และคาดว่าผลจะเป็นอย่างไร?</li>
                <li><strong>สไลด์ที่ 4: วิธีดำเนินการ</strong> - อธิบายขั้นตอนการศึกษาค้นคว้าโดยสรุป (ออกแบบการค้นคว้าอย่างไร? เก็บข้อมูลด้วยวิธีไหน?)</li>
                <li><strong>สไลด์ที่ 5: ผลการศึกษา</strong> - นำเสนอข้อค้นพบที่สำคัญที่สุด อาจใช้ตารางหรือกราฟอย่างง่ายเพื่อแสดงผล</li>
                <li><strong>สไลด์ที่ 6: สรุปและอภิปรายผล</strong> - สรุปว่าผลที่ได้เป็นไปตามสมมติฐานหรือไม่ เพราะอะไร? เราได้เรียนรู้อะไรจากโครงงานนี้?</li>
                <li><strong>สไลด์ที่ 7: ข้อเสนอแนะ</strong> - มีข้อเสนอแนะอะไรสำหรับการนำไปใช้ประโยชน์ หรือการศึกษาต่อในอนาคต?</li>
                <li><strong>สไลด์ที่ 8: ขอบคุณและเปิดรับคำถาม</strong></li>
            </ol>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">เคล็ดลับการนำเสนอให้น่าสนใจ</h4>
            <div className="p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <ul className="list-disc list-outside pl-5 space-y-2">
                    <li><b>สไลด์กระชับ:</b> ใส่เฉพาะประเด็นสำคัญ (Keyword) และรูปภาพ ไม่ควรนำข้อความยาวๆ จากรายงานมาใส่ในสไลด์ทั้งหมด</li>
                    <li><b>ซ้อมจับเวลา:</b> การซ้อมจะช่วยให้เราพูดได้อย่างราบรื่นและคุมเวลาการนำเสนอได้พอดี</li>
                    <li><b>พูดด้วยความมั่นใจ:</b> สบตาผู้ฟัง พูดเสียงดังฟังชัด และแสดงความกระตือรือร้นในสิ่งที่เราทำ</li>
                    <li><b>เตรียมตอบคำถาม:</b> ลองคิดล่วงหน้าว่ากรรมการหรือผู้ฟังอาจจะสงสัยและถามอะไรเกี่ยวกับโครงงานของเรา</li>
                </ul>
            </div>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การนำเสนอผลงาน
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
                        <RubricRow criteria="1. เนื้อหา" levels={[
                            'เนื้อหาถูกต้อง ชัดเจน ครอบคลุม และเรียงลำดับได้อย่างดีเยี่ยม',
                            'เนื้อหาถูกต้องและชัดเจน',
                            'เนื้อหาค่อนข้างถูกต้อง แต่ยังขาดรายละเอียด',
                            'เนื้อหามีข้อผิดพลาดเล็กน้อย หรือยังสับสน',
                            'เนื้อหาผิดพลาดหลายจุด',
                            'เนื้อหาไม่ถูกต้อง'
                        ]} />
                        <RubricRow criteria="2. สื่อประกอบ" levels={[
                            'สื่อสวยงาม สร้างสรรค์ สรุปประเด็นได้ดี และส่งเสริมความเข้าใจ',
                            'สื่อชัดเจน อ่านง่าย และเหมาะสม',
                            'สื่ออ่านง่าย แต่การออกแบบยังไม่น่าสนใจ',
                            'มีข้อมูลในสื่อมากเกินไป',
                            'สื่อไม่ชัดเจน หรือมีข้อผิดพลาด',
                            'สื่อไม่เกี่ยวข้องกับเนื้อหา'
                        ]} />
                        <RubricRow criteria="3. ทักษะการนำเสนอ" levels={[
                            'พูดจาฉะฉาน มั่นใจ สบตาผู้ฟัง ใช้ภาษาท่าทางและน้ำเสียงได้อย่างน่าประทับใจ',
                            'พูดจาชัดเจน มีความมั่นใจ และสบตาผู้ฟัง',
                            'พูดได้ชัดเจน แต่ยังขาดความมั่นใจ หรืออ่านจากสไลด์มากไป',
                            'พูดเสียงเบาหรือไม่ชัดเจน',
                            'อ่านจากสคริปต์/สไลด์ตลอดเวลา',
                            'ไม่สามารถนำเสนอได้'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท (AI ช่วย)</h4>
            <InteractiveExercise
                context="บทที่ 9: การนำเสนอผลงาน"
                question="ลองเขียน 'สคริปต์' หรือบทพูดสำหรับสไลด์แนะนำที่มาและความสำคัญของโครงงานคุณ (ความยาวประมาณ 3-5 ประโยค) แล้ว AI จะช่วยให้คำแนะนำเพื่อทำให้การเปิดเรื่องของคุณน่าสนใจยิ่งขึ้น"
                rows={6}
            />
        </div>
    </div>
);

export default Topic9;
