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
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การเขียนบทที่ 5: สรุปและอภิปรายผล</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"เราพิสูจน์ด้วยวิทยาศาสตร์ แต่เราค้นพบด้วยสัญชาตญาณ"</p>
            <p className="mt-1 text-sm">- อองรี ปวงกาเร</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                เดินทางมาถึงบทสุดท้ายของเนื้อหารายงานแล้ว! บทที่ 5 คือส่วนที่สำคัญและท้าทายที่สุด เพราะเป็นส่วนที่เราจะได้ "ตีความ" และ "อภิปราย" ว่าผลการศึกษาทั้งหมดที่เราทำมานั้นมีความหมายว่าอย่างไร ถ้าบทที่ 4 คือการ 'บอกว่าเจออะไร' บทที่ 5 ก็คือการ 'อธิบายว่าสิ่งที่เจอนั้นหมายความว่าอย่างไร'
            </p>
            
            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">องค์ประกอบสำคัญของบทที่ 5</h4>
            <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">1. สรุปผลการศึกษา (Summary of Findings)</h5>
                    <p className="mt-1 text-sm">เริ่มต้นด้วยการสรุป "ข้อค้นพบหลัก" จากบทที่ 4 อีกครั้งแบบสั้นๆ กระชับ เพื่อทบทวนให้ผู้อ่านทราบว่าผลลัพธ์ที่สำคัญที่สุดของเราคืออะไร</p>
                </div>
                 <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">2. อภิปรายผล (Discussion)</h5>
                    <p className="mt-1 text-sm">นี่คือหัวใจของบทนี้ เป็นการตอบคำถาม "ทำไม" และ "แล้วไงต่อ" ประกอบด้วย:</p>
                    <ul className="list-disc list-outside pl-5 mt-2 text-sm space-y-1">
                        <li><b>เปรียบเทียบกับสมมติฐาน:</b> ผลที่ได้สอดคล้องหรือขัดแย้งกับสมมติฐานที่เราตั้งไว้ในบทที่ 1 หรือไม่? เพราะเหตุใด?</li>
                        <li><b>เปรียบเทียบกับงานวิจัยที่เกี่ยวข้อง:</b> ผลของเราเหมือนหรือแตกต่างจากทฤษฎีหรืองานวิจัยของคนอื่นที่เราศึกษามาในบทที่ 2 อย่างไร? การอ้างอิงส่วนนี้จะทำให้การอภิปรายของเราน่าเชื่อถือมาก</li>
                        <li><b>อธิบายเหตุผล:</b> พยายามอธิบายด้วยหลักการทางวิทยาศาสตร์ว่า "ทำไม" ผลถึงออกมาเป็นเช่นนั้น</li>
                    </ul>
                </div>
                 <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">3. ข้อเสนอแนะ (Suggestions)</h5>
                    <p className="mt-1 text-sm">แบ่งเป็น 2 ส่วนคือ:</p>
                     <ul className="list-disc list-outside pl-5 mt-2 text-sm space-y-1">
                         <li><b>ข้อเสนอแนะในการนำไปใช้ประโยชน์:</b> จากการค้นพบนี้ เราสามารถให้คำแนะนำที่เป็นประโยชน์แก่ใครได้บ้าง?</li>
                        <li><b>ข้อเสนอแนะในการศึกษาครั้งต่อไป:</b> หากมีคนต้องการทำวิจัยต่อจากเรา เขควรจะศึกษาประเด็นอะไรเพิ่มเติม? หรือมีข้อจำกัดอะไรในงานของเราที่ควรปรับปรุงในครั้งหน้า?</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การเขียนบทที่ 5
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
                        <RubricRow criteria="1. การอภิปรายผล" levels={[
                            'อภิปรายผลโดยเปรียบเทียบกับสมมติฐานและงานวิจัยที่เกี่ยวข้องได้อย่างลึกซึ้งและสมเหตุสมผล',
                            'อภิปรายผลโดยเปรียบเทียบกับสมมติฐานและงานวิจัยอื่นได้ดี',
                            'มีการอภิปรายผล แต่ยังไม่เชื่อมโยงกับทฤษฎี/งานวิจัยอื่น',
                            'อภิปรายผลเป็นเพียงการกล่าวซ้ำผลการทดลอง',
                            'การอภิปรายผลไม่สมเหตุสมผล',
                            'ไม่มีการอภิปรายผล'
                        ]} />
                        <RubricRow criteria="2. การสรุปผล" levels={[
                            'สรุปผลได้ตรงประเด็น สอดคล้องกับวัตถุประสงค์และผลการวิเคราะห์ทั้งหมด',
                            'สรุปผลได้สอดคล้องกับวัตถุประสงค์หลัก',
                            'สรุปผลได้ค่อนข้างตรงประเด็น',
                            'สรุปผลได้ แต่ยังไม่ครอบคลุมทั้งหมด',
                            'สรุปผลไม่ตรงกับข้อมูลที่ได้',
                            'ไม่ได้สรุปผล'
                        ]} />
                        <RubricRow criteria="3. ข้อเสนอแนะ" levels={[
                            'ให้ข้อเสนอแนะที่เป็นรูปธรรม, มีประโยชน์, และต่อยอดได้ทั้งในเชิงปฏิบัติและวิจัย',
                            'ให้ข้อเสนอแนะที่เป็นประโยชน์และทำได้จริง',
                            'ให้ข้อเสนอแนะที่สอดคล้องกับงานวิจัย',
                            'ข้อเสนอแนะกว้างเกินไป ไม่เฉพาะเจาะจง',
                            'ข้อเสนอแนะไม่เกี่ยวข้องกับงานวิจัย',
                            'ไม่มีข้อเสนอแนะ'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท: ฝึกอภิปรายผล</h4>
            <InteractiveExercise
                context="IS2-บทที่ 5"
                question="บอก 'ผลการศึกษาหลัก' และ 'สมมติฐาน' ของคุณมาโดยย่อ แล้ว AI จะช่วยตั้งคำถามชี้นำเพื่อช่วยให้คุณเขียนอภิปรายผลได้ลึกซึ้งยิ่งขึ้น"
                rows={8}
            />
        </div>
    </div>
);

export default Topic6;
