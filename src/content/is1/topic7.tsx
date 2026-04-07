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

const Topic7 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การสังเคราะห์และสรุปองค์ความรู้</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"ณ ที่แห่งใดแห่งหนึ่ง มีบางสิ่งที่น่าเหลือเชื่อรอคอยการค้นพบอยู่"</p>
            <p className="mt-1 text-sm">- คาร์ล เซแกน</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                หลังจากวิเคราะห์ข้อมูลแล้ว เราจะได้ "ข้อค้นพบ" (Findings) มากมาย แต่ข้อมูลเหล่านั้นยังกระจัดกระจายอยู่ ขั้นตอน "การสังเคราะห์" คือการนำข้อค้นพบเหล่านั้นมาเรียบเรียง, เชื่อมโยง, และตีความ เพื่อสร้างเป็น "องค์ความรู้ใหม่" ที่เป็นคำตอบสำหรับประเด็นปัญหาของเรา
            </p>
            <p>
                การสังเคราะห์ไม่ใช่แค่การสรุปย่อ แต่คือการ "สร้างความหมาย" จากข้อมูลที่เรามี
            </p>
            <h4 className="font-semibold text-lg mt-6 mb-2 text-slate-800 dark:text-slate-100">ขั้นตอนการสังเคราะห์ความรู้</h4>
            <ol className="list-decimal list-outside pl-5 space-y-2">
                <li>
                    <strong>ทบทวนวัตถุประสงค์และสมมติฐาน:</strong> กลับไปดูว่าเป้าหมายตั้งต้นของเราคืออะไร เราต้องการหาคำตอบของคำถามอะไร?
                </li>
                 <li>
                    <strong>จัดกลุ่มข้อค้นพบ:</strong> นำผลการวิเคราะห์ทั้งหมดมาจัดกลุ่มตามประเด็นที่เกี่ยวข้องกัน อาจใช้ mind mapping หรือตารางช่วยในการจัดระเบียบความคิด
                </li>
                <li>
                    <strong>ตีความและหาความเชื่อมโยง:</strong> ในแต่ละกลุ่มของข้อค้นพบ มันบอกอะไรเรา? มีรูปแบบ (Pattern) หรือความสัมพันธ์อะไรซ่อนอยู่หรือไม่? ผลที่ได้สอดคล้องหรือขัดแย้งกับสมมติฐานของเราหรือไม่?
                </li>
                <li>
                    <strong>เปรียบเทียบกับเอกสารที่เกี่ยวข้อง (บทที่ 2):</strong> นำสิ่งที่เราค้นพบไปเปรียบเทียบกับทฤษฎีหรืองานวิจัยของคนอื่นที่เคยศึกษาไว้ ผลของเราเหมือนหรือต่างจากเขา เพราะอะไร? การทำเช่นนี้จะทำให้องค์ความรู้ของเราลึกซึ้งและน่าเชื่อถือมากขึ้น
                </li>
                <li>
                    <strong>สรุปเป็นองค์ความรู้ใหม่ด้วยภาษาของตนเอง:</strong> เรียบเรียงข้อสรุปทั้งหมดที่ได้จากการตีความเป็นภาษาของเราเองให้เข้าใจง่ายและเป็นเหตุเป็นผล นี่คือ "คำตอบ" ของโครงงานเรา
                </li>
                <li>
                    <strong>เสนอแนะ:</strong> จากองค์ความรู้ที่ได้ เราสามารถให้ข้อเสนอแนะอะไรได้บ้าง? ทั้งข้อเสนอแนะในการนำไปใช้ประโยชน์ และข้อเสนอแนะในการทำวิจัยครั้งต่อไป
                </li>
            </ol>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การสังเคราะห์และสรุปองค์ความรู้
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
                        <RubricRow criteria="1. การสรุปผล" levels={[
                            'สรุปผลได้ตรงประเด็น สอดคล้องกับวัตถุประสงค์และผลการวิเคราะห์ทั้งหมด',
                            'สรุปผลได้สอดคล้องกับวัตถุประสงค์หลัก',
                            'สรุปผลได้ค่อนข้างตรงประเด็น',
                            'สรุปผลได้ แต่ยังไม่ครอบคลุม',
                            'สรุปผลไม่ตรงกับข้อมูลที่ได้',
                            'ไม่ได้สรุปผล'
                        ]} />
                        <RubricRow criteria="2. การอภิปรายผล" levels={[
                            'อภิปรายผลโดยเปรียบเทียบกับสมมติฐานและงานวิจัยที่เกี่ยวข้องได้อย่างลึกซึ้ง',
                            'อภิปรายผลโดยเปรียบเทียบกับสมมติฐานได้ดี',
                            'มีการอภิปรายผล แต่ยังไม่เชื่อมโยงกับทฤษฎี',
                            'อภิปรายผลเป็นเพียงการกล่าวซ้ำผลการทดลอง',
                            'การอภิปรายผลไม่สมเหตุสมผล',
                            'ไม่มีการอภิปรายผล'
                        ]} />
                        <RubricRow criteria="3. ข้อเสนอแนะ" levels={[
                            'ให้ข้อเสนอแนะที่เป็นรูปธรรม มีประโยชน์ และต่อยอดได้ทั้งในเชิงปฏิบัติและวิจัย',
                            'ให้ข้อเสนอแนะที่เป็นประโยชน์',
                            'ให้ข้อเสนอแนะที่สอดคล้องกับงานวิจัย',
                            'ข้อเสนอแนะกว้างเกินไป',
                            'ข้อเสนอแนะไม่เกี่ยวข้องกับงานวิจัย',
                            'ไม่มีข้อเสนอแนะ'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>
        
        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท (AI ช่วย)</h4>
            <InteractiveExercise
                context="บทที่ 7: การสังเคราะห์และสรุปองค์ความรู้"
                question="สรุป 'ข้อค้นพบหลัก' ที่ได้จากการวิเคราะห์ข้อมูล และ 'สมมติฐาน' เดิมของคุณ มาให้ AI ช่วยสังเคราะห์และสร้างเป็นข้อสรุปที่สมบูรณ์"
                rows={8}
            />
        </div>

    </div>
);

export default Topic7;
