import React from 'react';
import ReportStructureGenerator from '../../components/ReportStructureGenerator';

const RubricRow = ({ criteria, levels }: { criteria: string, levels: string[] }) => (
    <tr className="bg-white dark:bg-slate-800/50">
        <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">{criteria}</td>
        {levels.map((level, index) => (
            <td key={index} className={`p-2 border border-slate-300 dark:border-slate-600`}>{level}</td>
        ))}
    </tr>
);

const Topic7 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">เครื่องมือช่วยเขียนรายงานฉบับสมบูรณ์ (AI)</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"ถ้าคุณไม่สามารถอธิบายมันให้ง่ายได้ แสดงว่าคุณยังไม่เข้าใจมันดีพอ"</p>
            <p className="mt-1 text-sm">- ริชาร์ด ไฟน์แมน</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                หลังจากที่เราได้เรียนรู้หลักการและองค์ประกอบของการเขียนรายงานในแต่ละบทมาแล้ว ในบทนี้เราจะมาใช้เครื่องมือ AI ที่ทรงพลังเพื่อรวบรวมทุกอย่างเข้าด้วยกัน และสร้างเป็นรายงานฉบับสมบูรณ์
            </p>
            <p>
                เครื่องมือนี้จะนำทางนักเรียนผ่าน 3 ขั้นตอนสำคัญ:
            </p>
             <ol className="list-decimal list-inside space-y-2 pl-4">
                <li><b>ผู้ช่วยตั้งชื่อโครงงาน:</b> เริ่มจากการระบุหัวข้อที่สนใจ แล้วให้ AI ช่วยเสนอแนะชื่อโครงงานที่ถูกต้องตามหลักวิชาการ</li>
                <li><b>ผู้ช่วยสร้างโครงร่างและตรวจงาน:</b> เมื่อได้ชื่อโครงงานแล้ว AI จะช่วยสร้างโครงสร้างรายงาน 5 บท พร้อม "แนวทางการเขียน" ที่ละเอียดในแต่ละหัวข้อย่อย จากนั้นนักเรียนสามารถลงมือเขียนและขอคำแนะนำจาก AI ได้ทีละส่วน</li>
                <li><b>ผู้ช่วยรวมเล่มรายงาน:</b> เมื่อเขียนเนื้อหาครบถ้วนแล้ว ขั้นตอนสุดท้ายคือการนำข้อมูลทั้งหมดมารวบรวมเป็น "รายงานฉบับสมบูรณ์" ในรูปแบบ PDF ที่สวยงามและพร้อมส่งได้ทันที</li>
            </ol>
             <p>
                กระบวนการนี้จะช่วยให้นักเรียนเริ่มต้นได้อย่างถูกทิศทางและมีแผนที่ในการเขียนรายงานฉบับสมบูรณ์อยู่ในมือตั้งแต่ต้นจนจบ
            </p>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) รายงานฉบับสมบูรณ์
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
                        <RubricRow criteria="1. ความสมบูรณ์ของโครงสร้าง" levels={[
                            'มีองค์ประกอบครบถ้วนตามโครงสร้าง 5 บท และมีหัวข้อย่อยที่สำคัญครบถ้วน',
                            'มีครบทั้ง 5 บท แต่อาจขาดหัวข้อย่อยบางส่วน',
                            'มีบทหลักๆ ครบ แต่ขาดรายละเอียดในแต่ละบท',
                            'ขาดบทใดบทหนึ่งไป',
                            'ขาดองค์ประกอบสำคัญหลายส่วน',
                            'โครงสร้างไม่เป็นไปตามรูปแบบรายงาน'
                        ]} />
                        <RubricRow criteria="2. ความสอดคล้องของเนื้อหา" levels={[
                            'เนื้อหาทุกบทมีความเชื่อมโยงและสอดคล้องกันอย่างเป็นเหตุเป็นผล',
                            'เนื้อหาส่วนใหญ่มีความสอดคล้องกันดี',
                            'เนื้อหาในแต่ละบทยังไม่ค่อยเชื่อมโยงกัน',
                            'เนื้อหาบางส่วนขัดแย้งกันเอง',
                            'เนื้อหาไม่สอดคล้องกับชื่อเรื่อง',
                            'เนื้อหากระจัดกระจาย ไม่เชื่อมโยงกัน'
                        ]} />
                        <RubricRow criteria="3. คุณภาพเชิงวิชาการ" levels={[
                            'มีการใช้ภาษา, การอ้างอิง, และการให้เหตุผลที่เป็นเลิศตามหลักวิชาการ',
                            'มีคุณภาพเชิงวิชาการที่ดี มีการอ้างอิงและใช้ภาษาที่เหมาะสม',
                            'มีคุณภาพในระดับที่ยอมรับได้',
                            'ยังขาดความน่าเชื่อถือเชิงวิชาการ',
                            'มีข้อผิดพลาดเชิงวิชาการหลายจุด',
                            'ไม่มีความเป็นวิชาการ'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">เครื่องมือ AI: จากไอเดียสู่รายงานฉบับสมบูรณ์</h4>
            <ReportStructureGenerator />
        </div>
    </div>
);

export default Topic7;
