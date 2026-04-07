import React from 'react';
import PresentationGenerator from '../../components/PresentationGenerator';

const RubricRow = ({ criteria, levels }: { criteria: string, levels: string[] }) => (
    <tr className="bg-white dark:bg-slate-800/50">
        <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">{criteria}</td>
        {levels.map((level, index) => (
            <td key={index} className={`p-2 border border-slate-300 dark:border-slate-600`}>{level}</td>
        ))}
    </tr>
);

const Topic8 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">เครื่องมือช่วยออกแบบสไลด์นำเสนอ (AI)</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"ถ้าคุณไม่สามารถอธิบายมันให้ง่ายได้ แสดงว่าคุณยังไม่เข้าใจมันดีพอ"</p>
            <p className="mt-1 text-sm">- ริชาร์ด ไฟน์แมน</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                การนำเสนอผลงานวิจัยหรือโครงงานให้น่าสนใจและเข้าใจง่ายนั้น 'สื่อประกอบการนำเสนอ' ไม่ว่าจะเป็นโปสเตอร์หรือสไลด์ (PowerPoint/Google Slides) ถือว่ามีบทบาทสำคัญอย่างยิ่ง สื่อที่ดีจะช่วยดึงดูดความสนใจของผู้ชมและกรรมการ ช่วยลำดับความคิด และทำให้ข้อมูลที่ซับซ้อนดูเข้าใจง่ายขึ้น
            </p>
            <p>
                ในบทนี้ เราจะมาใช้ AI ช่วยเป็นผู้ช่วยในการระดมสมองและวางโครงสร้างเนื้อหาสำหรับการนำเสนอของคุณ เพียงกรอกรายละเอียดเกี่ยวกับโครงงานของคุณ แล้ว AI จะช่วยร่างโครงสร้างเนื้อหาและออกแบบภาพประกอบเบื้องต้นให้ทันที!
            </p>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การออกแบบเนื้อหาสไลด์
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
                        <RubricRow criteria="1. ความกระชับของเนื้อหา" levels={[
                            'เนื้อหาเป็น bullet point ที่กระชับ สื่อความหมายได้ครบถ้วน และเข้าใจง่ายมาก',
                            'เนื้อหาส่วนใหญ่กระชับและเข้าใจง่าย',
                            'เนื้อหาค่อนข้างกระชับ แต่บางส่วนยังยาวไป',
                            'เนื้อหายังเป็นประโยคยาวๆ เหมือนในรายงาน',
                            'มีเนื้อหามากเกินไปในแต่ละสไลด์',
                            'คัดลอกข้อความจากรายงานมาใส่ทั้งหมด'
                        ]} />
                        <RubricRow criteria="2. การลำดับเนื้อหา" levels={[
                            'ลำดับสไลด์มีความต่อเนื่องและเป็นเหตุเป็นผลอย่างยอดเยี่ยม',
                            'ลำดับสไลด์ส่วนใหญ่มีความต่อเนื่อง',
                            'ลำดับสไลด์มีความต่อเนื่อง แต่บางสไลด์อาจสลับที่กันได้',
                            'ลำดับสไลด์ยังดูกระโดดไปมา',
                            'ลำดับสไลด์สับสน',
                            'ไม่มีการลำดับเนื้อหา'
                        ]} />
                        <RubricRow criteria="3. ความชัดเจนของประเด็นหลัก" levels={[
                            'แต่ละสไลด์มีประเด็นหลักเพียงหนึ่งเดียวที่ชัดเจนมาก',
                            'แต่ละสไลด์ส่วนใหญ่มีประเด็นหลักที่ชัดเจน',
                            'บางสไลด์มีหลายประเด็นปนกัน',
                            'สไลด์ส่วนใหญ่มีหลายประเด็นปนกัน',
                            'ไม่สามารถจับประเด็นหลักของสไลด์ได้',
                            'ไม่มีประเด็นหลัก'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">เครื่องมือช่วยออกแบบการนำเสนอด้วย AI</h4>
            <PresentationGenerator />
        </div>
    </div>
);

export default Topic8;
