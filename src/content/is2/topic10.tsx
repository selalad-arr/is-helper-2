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

const Topic10 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การเผยแพร่ผลงานสู่สาธารณะ</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"วิทยาศาสตร์คือบทกวีแห่งความเป็นจริง"</p>
            <p className="mt-1 text-sm">- ริชาร์ด ดอว์กินส์</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                การทำโครงงานจะสมบูรณ์และเกิดประโยชน์สูงสุดเมื่อเราได้นำองค์ความรู้ที่ค้นพบไป "แบ่งปัน" ให้กับผู้อื่นในวงกว้าง การเผยแพร่ผลงานไม่เพียงแต่เป็นการแสดงความสำเร็จของเรา แต่ยังเป็นการสร้างคุณค่าให้กับสังคมและอาจจุดประกายให้คนอื่นนำไปต่อยอดได้อีกด้วย
            </p>
            <p>
                ในยุคดิจิทัล มีช่องทางมากมายที่เราสามารถเผยแพร่ผลงานของเราได้ง่ายและรวดเร็ว ตามที่ระบุไว้ในผลการเรียนรู้ของ IS2
            </p>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">ช่องทางการเผยแพร่ผลงาน</h4>
            <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">1. E-conference / Online Symposium</h5>
                    <p className="mt-1">
                        คืองานประชุมวิชาการออนไลน์ ที่นักเรียน นักศึกษา หรือนักวิจัยมานำเสนอผลงานของตนเอง เป็นช่องทางที่เป็นทางการและน่าเชื่อถือ
                    </p>
                    <p className="font-semibold text-sm mt-2 text-sky-700 dark:text-sky-300">ข้อดี:</p>
                    <ul className="list-disc list-outside pl-5 text-sm">
                        <li>ได้แลกเปลี่ยนความรู้กับผู้เชี่ยวชาญและเพื่อนๆ ที่สนใจในเรื่องคล้ายกัน</li>
                        <li>ได้รับคำแนะนำเพื่อนำไปพัฒนาโครงงานต่อได้</li>
                        <li>สามารถใส่ในแฟ้มสะสมผลงาน (Portfolio) เพื่อใช้ในการศึกษาต่อได้</li>
                    </ul>
                </div>

                 <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">2. Social Media Online</h5>
                    <p className="mt-1">
                        คือการย่อยผลงานของเราให้เข้าใจง่ายและน่าสนใจ แล้วนำเสนอผ่านแพลตฟอร์มต่างๆ เช่น Facebook, Instagram, YouTube, TikTok
                    </p>
                     <p className="font-semibold text-sm mt-2 text-sky-700 dark:text-sky-300">เทคนิคการนำเสนอ:</p>
                    <ul className="list-disc list-outside pl-5 text-sm">
                        <li><b>Infographic:</b> สร้างภาพสรุปผลงานที่สวยงามและเข้าใจง่ายในภาพเดียว โดยเน้นที่ผลลัพธ์ที่น่าสนใจที่สุด</li>
                        <li><b>วิดีโอสั้น:</b> ทำคลิปวิดีโอสั้นๆ (Reels, TikTok) อธิบายโครงงานแบบสนุกๆ หรือแสดงการทดลองให้เห็นภาพ (เช่น ภาพ Before-After)</li>
                        <li><b>สรุปเป็นอัลบั้มภาพ:</b> เล่าเรื่องโครงงานผ่านชุดภาพพร้อมคำบรรยายสั้นๆ ใน Facebook หรือ Instagram</li>
                        <li><b>เป้าหมาย:</b> คือการสื่อสารกับคนทั่วไปที่ไม่ใช่นักวิชาการ ต้องใช้ภาษาง่ายๆ และเน้นสิ่งที่น่าสนใจหรือเป็นประโยชน์ต่อชีวิตประจำวัน</li>
                    </ul>
                </div>
            </div>

             <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">ตัวอย่างการปรับเนื้อหาเพื่อการสื่อสารวงกว้าง</h4>
            <p>
                ไม่ว่าจะเผยแพร่ผ่านช่องทางไหน สิ่งสำคัญคือการ "ปรับ" เนื้อหาจากรายงานฉบับเต็มให้เหมาะสมกับสื่อและกลุ่มเป้าหมาย
            </p>
            <ul className="list-decimal list-outside pl-5">
                <li><b>หาแก่นของเรื่อง (Core Message):</b> อะไรคือสิ่งที่สำคัญที่สุด 1-2 อย่างที่เราอยากให้คนจำได้จากโครงงานของเรา?</li>
                <li><b>ตัดศัพท์เทคนิค:</b> เปลี่ยนคำศัพท์ทางวิทยาศาสตร์ที่ซับซ้อนให้เป็นภาษาที่คนทั่วไปเข้าใจได้</li>
                <li><b>เน้นประโยชน์:</b> บอกให้ชัดว่าสิ่งที่ค้นพบนั้นมีประโยชน์หรือเกี่ยวข้องกับชีวิตของพวกเขาอย่างไร</li>
            </ul>

            <div className="mt-4 p-4 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                <p className="font-bold text-slate-800 dark:text-slate-200">ตัวอย่าง:</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                   <b>จากรายงาน (วิชาการ):</b> "ผลการทดลองพบว่าสารสกัดจากเปลือกมังคุดที่ความเข้มข้น 10% สามารถยับยั้งการเจริญเติบโตของเชื้อ S. aureus ได้อย่างมีนัยสำคัญทางสถิติ (p &lt; 0.05)"
                </p>
                <p className="mt-3 text-sm text-green-700 dark:text-green-300">
                   <b>สู่ Social Media (เข้าใจง่าย):</b> "รู้หรือไม่? 💡 เปลือกมังคุดที่เราทิ้งกัน มีสาร 'แซนโทน' ที่ช่วยหยุดเชื้อแบคทีเรียที่ทำให้เกิดสิวได้! โครงงานของเราพบว่าแค่สารสกัด 10% ก็เอาอยู่แล้ว #เปลือกมังคุดมีดี #โครงงานวิทย์"
                </p>
            </div>

        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การเผยแพร่ผลงานสู่สาธารณะ
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
                        <RubricRow criteria="1. การปรับเนื้อหาให้เหมาะสม" levels={[
                            'ย่อยเนื้อหาที่ซับซ้อนให้เข้าใจง่ายอย่างยอดเยี่ยม และเน้นประเด็นที่สำคัญที่สุด',
                            'ย่อยเนื้อหาได้ดีและเหมาะสมกับคนทั่วไป',
                            'พยายามย่อยเนื้อหา แต่ยังคงมีศัพท์เทคนิคอยู่',
                            'เนื้อหายังคงเป็นภาษาจากรายงาน',
                            'เนื้อหายากเกินกว่าที่คนทั่วไปจะเข้าใจ',
                            'ไม่ได้ปรับเนื้อหา'
                        ]} />
                        <RubricRow criteria="2. ความน่าสนใจของสื่อ" levels={[
                            'เลือกใช้รูปแบบสื่อ (เช่น Infographic, Video) ได้อย่างสร้างสรรค์และดึงดูดความสนใจมาก',
                            'สื่อที่ใช้มีความน่าสนใจและเหมาะสม',
                            'สื่อที่ใช้มีความชัดเจน แต่ยังไม่น่าดึงดูด',
                            'สื่อมีข้อมูลมากเกินไป',
                            'สื่อไม่สวยงามหรือไม่น่าสนใจ',
                            'ไม่มีการใช้สื่อประกอบ'
                        ]} />
                        <RubricRow criteria="3. ความชัดเจนในการสื่อสาร" levels={[
                            'สื่อสารแก่นของเรื่อง (Core Message) และประโยชน์ของโครงงานได้อย่างชัดเจนและทรงพลัง',
                            'สื่อสารแก่นของเรื่องได้ชัดเจน',
                            'สื่อสารได้ดี แต่ยังไม่ชัดเจนว่าประโยชน์คืออะไร',
                            'ยังไม่สามารถสื่อสารแก่นของเรื่องได้ชัดเจน',
                            'ผู้รับสารอาจเข้าใจผิดได้',
                            'ไม่สามารถสื่อสารให้เข้าใจได้'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>
        
        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท: ฝึกย่อยข้อมูล</h4>
            <InteractiveExercise
                context="บทที่ 5: การเผยแพร่ผลงานสู่สาธารณะ"
                question="หากต้องสรุปโครงงานของคุณให้เพื่อนที่ไม่ได้เรียนสายวิทย์ฟังภายใน 3 ประโยค คุณจะอธิบายว่าอย่างไร เพื่อให้เขาสนใจและเข้าใจว่าโครงงานของคุณเกี่ยวกับอะไร?"
                rows={5}
            />
        </div>
    </div>
);

export default Topic10;
