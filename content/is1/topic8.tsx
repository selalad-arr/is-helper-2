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


const Topic8 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การเขียนรายงาน IS1 (ฉบับสมบูรณ์)</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"ถ้าคุณไม่สามารถอธิบายมันให้ง่ายได้ แสดงว่าคุณยังไม่เข้าใจมันดีพอ"</p>
            <p className="mt-1 text-sm">- ริชาร์ด ไฟน์แมน</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                หลังจากที่เราได้เรียนรู้และลงมือทำตามขั้นตอนต่างๆ มาตั้งแต่บทที่ 1 ถึง 7 แล้ว ก็มาถึงขั้นตอนสุดท้ายของการรวบรวมองค์ความรู้ทั้งหมด นั่นคือ "การเขียนรายงานฉบับสมบูรณ์"
            </p>
            <p>
                รายงาน IS1 อาจจะยังไม่ใช่รายงาน 5 บทเต็มรูปแบบเหมือน IS2 แต่เป็นการเรียบเรียงกระบวนการเรียนรู้และการค้นคว้าทั้งหมดของเราให้เป็นเอกสารทางวิชาการที่มีโครงสร้างชัดเจน
            </p>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">องค์ประกอบสำคัญของรายงาน IS1</h4>
            <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">1. ส่วนหน้า (Front Matter)</h5>
                    <ul className="list-disc list-outside pl-5 mt-1 text-sm">
                        <li><b>ปกนอกและปกใน:</b> ระบุชื่อโครงงาน, ชื่อผู้จัดทำ, ชื่อครูที่ปรึกษา</li>
                        <li><b>บทคัดย่อ (Abstract):</b> ส่วนที่สำคัญที่สุด! คือการย่อเรื่องราวทั้งหมดของโครงงาน (วัตถุประสงค์, วิธีทำ, ผล, สรุป) ให้อยู่ใน 1 ย่อหน้า เพื่อให้ผู้อ่านเข้าใจภาพรวมทั้งหมดได้อย่างรวดเร็ว</li>
                        <li><b>กิตติกรรมประกาศ (Acknowledgements):</b> กล่าวขอบคุณผู้ที่มีส่วนช่วยเหลือในการทำโครงงาน เช่น ครูที่ปรึกษา, ผู้ให้ข้อมูล, ผู้ปกครอง</li>
                        <li><b>สารบัญ:</b> แสดงหัวข้อต่างๆ ในรายงานพร้อมเลขหน้า</li>
                    </ul>
                </div>
                 <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold text-sky-700 dark:text-sky-400">2. ส่วนเนื้อหา (Body) - เจาะลึก 3 ส่วนสำคัญ</h5>
                    <p className="mt-2 text-sm">เป็นการนำเนื้อหาจากเค้าโครงโครงงานและผลการศึกษาที่เราทำมา มาขยายความและเรียบเรียงใหม่ด้วยภาษาเขียนที่เป็นทางการ ประกอบด้วย:</p>
                    
                    <div className="mt-4 space-y-4">
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                            <h6 className="font-semibold text-slate-800 dark:text-slate-200">2.1 บทนำ (Introduction)</h6>
                            <p className="text-sm mt-1">ส่วนนี้เป็นการเกริ่นนำให้ผู้อ่านทราบว่าทำไมเราถึงทำโครงงานนี้ ประกอบด้วย:</p>
                            <ul className="list-disc list-outside pl-5 mt-1 text-sm text-slate-600 dark:text-slate-400">
                                <li><b>ที่มาและความสำคัญ:</b> เล่าปัญหาหรือแรงบันดาลใจที่ทำให้เกิดโครงงานนี้ (จากกว้างไปแคบ)</li>
                                <li><b>วัตถุประสงค์:</b> ระบุเป็นข้อๆ ว่าต้องการศึกษาหรือทำอะไรให้สำเร็จ</li>
                                <li><b>สมมติฐาน (ถ้ามี):</b> การคาดเดาคำตอบล่วงหน้าอย่างมีเหตุผล</li>
                                <li><b>ขอบเขตการศึกษา:</b> ระบุประชากร กลุ่มตัวอย่าง ตัวแปร ระยะเวลา และสถานที่</li>
                            </ul>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                            <h6 className="font-semibold text-slate-800 dark:text-slate-200">2.2 วิธีดำเนินการศึกษาค้นคว้า (Methodology)</h6>
                            <p className="text-sm mt-1">อธิบายขั้นตอนการทำงานอย่างละเอียด เพื่อให้ผู้อ่านสามารถทำซ้ำได้ ประกอบด้วย:</p>
                            <ul className="list-disc list-outside pl-5 mt-1 text-sm text-slate-600 dark:text-slate-400">
                                <li><b>ประชากรและกลุ่มตัวอย่าง:</b> ระบุว่าศึกษาใคร จำนวนเท่าไหร่ และเลือกมาอย่างไร</li>
                                <li><b>เครื่องมือที่ใช้:</b> เช่น แบบสอบถาม (มีกี่ส่วน อะไรบ้าง), แบบสัมภาษณ์, หรืออุปกรณ์ทดลอง</li>
                                <li><b>ขั้นตอนการเก็บรวบรวมข้อมูล:</b> เล่าลำดับเหตุการณ์ว่าไปเก็บข้อมูลอย่างไร เมื่อไหร่</li>
                                <li><b>การวิเคราะห์ข้อมูล:</b> ระบุสถิติที่ใช้ (เช่น ร้อยละ, ค่าเฉลี่ย) หรือวิธีการสรุปเนื้อหา</li>
                            </ul>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                            <h6 className="font-semibold text-slate-800 dark:text-slate-200">2.3 ผลการศึกษาค้นคว้า (Results)</h6>
                            <p className="text-sm mt-1">นำเสนอข้อค้นพบที่ได้จากการวิเคราะห์ข้อมูล โดยไม่ใส่ความคิดเห็นส่วนตัวลงไป ประกอบด้วย:</p>
                            <ul className="list-disc list-outside pl-5 mt-1 text-sm text-slate-600 dark:text-slate-400">
                                <li><b>การนำเสนอข้อมูล:</b> ใช้ตาราง แผนภูมิ หรือกราฟ เพื่อให้ดูง่ายและเป็นระเบียบ</li>
                                <li><b>คำบรรยายประกอบ:</b> อธิบายใต้ตารางหรือกราฟว่าข้อมูลนั้นบอกอะไรเราบ้าง (เน้นจุดเด่นหรือข้อค้นพบสำคัญ)</li>
                                <li><b>การตอบวัตถุประสงค์:</b> เรียบเรียงผลการศึกษาให้ตรงกับวัตถุประสงค์ที่ตั้งไว้ในบทนำทีละข้อ</li>
                            </ul>
                        </div>
                        
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                            <h6 className="font-semibold text-slate-800 dark:text-slate-200">2.4 สรุปและอภิปรายผล (Conclusion & Discussion)</h6>
                            <p className="text-sm mt-1">สรุปองค์ความรู้ที่ได้, ตอบวัตถุประสงค์, อภิปรายผลที่ได้ (ทำไมถึงเป็นเช่นนั้น สอดคล้องกับงานวิจัยอื่นหรือไม่) และข้อเสนอแนะ</p>
                        </div>
                    </div>
                </div>
                 <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold">3. ส่วนท้าย (Back Matter)</h5>
                     <ul className="list-disc list-outside pl-5 mt-1 text-sm">
                        <li><b>บรรณานุกรม/เอกสารอ้างอิง (Bibliography/References):</b> รวบรวมรายชื่อแหล่งข้อมูลทั้งหมดที่ใช้อ้างอิงในรายงานอย่างเป็นระบบ</li>
                        <li><b>ภาคผนวก (Appendix):</b> ใช้สำหรับแนบเอกสารอื่นๆ ที่เกี่ยวข้อง เช่น แบบสอบถามฉบับเต็ม, รูปภาพกิจกรรม</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) รายงาน IS1 ฉบับสมบูรณ์
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
                        <RubricRow criteria="1. ความครบถ้วนขององค์ประกอบ" levels={[
                            'มีองค์ประกอบครบถ้วนทุกส่วน (หน้า, เนื้อหา, ท้าย) และมีเนื้อหาที่สมบูรณ์',
                            'มีองค์ประกอบหลักครบถ้วน',
                            'ขาดองค์ประกอบส่วนหน้าหรือท้ายไปบางส่วน',
                            'ขาดองค์ประกอบในส่วนเนื้อหา',
                            'ขาดองค์ประกอบสำคัญหลายส่วน',
                            'โครงสร้างไม่เป็นไปตามรูปแบบ'
                        ]} />
                        <RubricRow criteria="2. คุณภาพของบทคัดย่อ" levels={[
                            'บทคัดย่อกระชับ, ชัดเจน, และครอบคลุม (วัตถุประสงค์, วิธี, ผล, สรุป) ได้อย่างยอดเยี่ยม',
                            'บทคัดย่อครอบคลุมประเด็นสำคัญได้ดี',
                            'บทคัดย่อครอบคลุม แต่ยังยาวเกินไป',
                            'บทคัดย่อขาดองค์ประกอบสำคัญ',
                            'บทคัดย่อเป็นเพียงการเกริ่นนำ',
                            'ไม่มีบทคัดย่อ'
                        ]} />
                        <RubricRow criteria="3. ความถูกต้องและความน่าเชื่อถือ" levels={[
                            'เนื้อหาทั้งหมดถูกต้อง, มีการอ้างอิงที่เหมาะสม, และใช้ภาษาเขียนเชิงวิชาการได้อย่างสม่ำเสมอ',
                            'เนื้อหาส่วนใหญ่ถูกต้องและน่าเชื่อถือ',
                            'เนื้อหาถูกต้อง แต่การอ้างอิงยังไม่ครบถ้วน',
                            'มีข้อผิดพลาดของข้อมูลเล็กน้อย',
                            'มีข้อผิดพลาดหลายจุด',
                            'ข้อมูลไม่น่าเชื่อถือ'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>
        
        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท (AI ช่วย)</h4>
            
            <div className="space-y-8">
                <InteractiveExercise
                    context="IS1-บทที่ 8: การเขียนบทนำ"
                    question="ลองเขียนร่าง 'บทนำ' (Introduction) โดยเน้นที่มาและความสำคัญ วัตถุประสงค์ และขอบเขตการศึกษา ให้ AI ช่วยตรวจสอบความครบถ้วน"
                    rows={6}
                />
                
                <InteractiveExercise
                    context="IS1-บทที่ 8: การเขียนวิธีดำเนินการ"
                    question="ลองเขียนร่าง 'วิธีดำเนินการศึกษาค้นคว้า' (Methodology) โดยระบุประชากร/กลุ่มตัวอย่าง เครื่องมือ และขั้นตอนการเก็บข้อมูล ให้ AI ช่วยตรวจสอบความชัดเจน"
                    rows={6}
                />

                <InteractiveExercise
                    context="IS1-บทที่ 8: การเขียนผลการศึกษา"
                    question="ลองเขียนร่าง 'ผลการศึกษาค้นคว้า' (Results) โดยอธิบายสิ่งที่คุณค้นพบ หรือสรุปข้อมูลที่คุณได้มา ให้ AI ช่วยแนะนำวิธีการนำเสนอที่น่าสนใจ"
                    rows={6}
                />

                <InteractiveExercise
                    context="IS1-บทที่ 8: การเขียนบทคัดย่อ"
                    question="ลองเขียนร่าง 'บทคัดย่อ' (Abstract) ของโครงงานคุณ โดยพยายามสรุป วัตถุประสงค์, วิธีทำ, ผล, และข้อสรุป ให้ได้ภายใน 1 ย่อหน้า แล้ว AI จะช่วยตรวจสอบความครบถ้วนและให้คำแนะนำ"
                    rows={8}
                />
            </div>
        </div>
    </div>
);

export default Topic8;
