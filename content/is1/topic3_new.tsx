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


const Topic3_Design = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การออกแบบการค้นคว้า (Research Design)</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"โชคเข้าข้างจิตใจที่เตรียมพร้อม"</p>
            <p className="mt-1 text-sm">- หลุยส์ ปาสเตอร์</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                หลังจากที่เรามีประเด็นปัญหาและสมมติฐานแล้ว ขั้นตอนต่อไปคือการ "ออกแบบ" ว่าเราจะหาคำตอบสำหรับคำถามนั้นๆ ได้อย่างไร การออกแบบการค้นคว้าก็เหมือนกับการวาดแผนที่การเดินทาง ที่จะบอกว่าเราต้องทำอะไรบ้างเพื่อไปให้ถึงจุดหมาย
            </p>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">1. ประเภทของการศึกษาค้นคว้า</h4>
            <p>โดยทั่วไป การศึกษาค้นคว้าในระดับ IS สามารถแบ่งออกได้เป็นประเภทหลักๆ ดังนี้:</p>
            <ul className="list-disc list-outside pl-5 space-y-2">
                <li><strong>การศึกษาเชิงทดลอง (Experimental Research):</strong> คือการศึกษาที่มีการควบคุมตัวแปรต่างๆ เพื่อดูผลของ "ตัวแปรต้น" ที่มีต่อ "ตัวแปรตาม" เหมาะสำหรับโครงงานที่ต้องการพิสูจน์เหตุและผล เช่น "การเปรียบเทียบประสิทธิภาพของปุ๋ย 2 ชนิดต่อการเจริญเติบโตของพืช"</li>
                <li><strong>การศึกษาเชิงสำรวจ (Survey Research):</strong> คือการรวบรวมข้อมูลจากกลุ่มคนจำนวนมาก โดยใช้เครื่องมืออย่างแบบสอบถาม เพื่อศึกษาความคิดเห็น, ทัศนคติ, หรือพฤติกรรมต่างๆ เช่น "การสำรวจพฤติกรรมการใช้โซเชียลมีเดียของนักเรียนในโรงเรียน"</li>
                <li><strong>การศึกษาเชิงพรรณนา (Descriptive Research):</strong> คือการอธิบายลักษณะหรือปรากฏการณ์ที่เกิดขึ้นตามที่เป็นจริง โดยไม่มีการควบคุมตัวแปร เช่น "การศึกษาลักษณะทางกายภาพของพืชสมุนไพรในท้องถิ่น"</li>
                 <li><strong>การพัฒนาหรือสิ่งประดิษฐ์ (Development/Invention):</strong> คือการสร้างชิ้นงาน, นวัตกรรม, หรือกระบวนการใหม่ๆ ขึ้นมาเพื่อแก้ปัญหาอย่างเป็นรูปธรรม เช่น "การพัฒนาเครื่องบีบอัดขวดพลาสติกอย่างง่าย"</li>
            </ul>

            <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">2. การกำหนดประชากรและกลุ่มตัวอย่าง</h4>
             <div className="p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <ul className="space-y-3">
                    <li>
                        <p><b className="text-sky-700 dark:text-sky-400">ประชากร (Population):</b> คือกลุ่มทั้งหมดที่เราสนใจศึกษา เช่น "นักเรียนชั้น ม.5 ทั้งหมดในโรงเรียน"</p>
                    </li>
                    <li><b className="text-sky-700 dark:text-sky-400">กลุ่มตัวอย่าง (Sample):</b> คือส่วนหนึ่งของประชากรที่เราเลือกมาศึกษาจริงๆ เนื่องจากเราอาจไม่สามารถเก็บข้อมูลจากทุกคนได้ เช่น "นักเรียนชั้น ม.5/1 และ ม.5/2 จำนวน 60 คน"</li>
                </ul>
            </div>
            <p>
                สิ่งสำคัญคือวิธีการเลือกกลุ่มตัวอย่างต้องมีความเหมาะสมและเป็นตัวแทนที่ดีของประชากร เพื่อให้ผลการศึกษาน่าเชื่อถือ
            </p>

             <h4 className="font-semibold text-lg !mt-6 text-slate-800 dark:text-slate-100">3. การวางแผนขั้นตอนการดำเนินงาน</h4>
            <p>
                ในส่วนนี้ เราต้องเขียนขั้นตอนทั้งหมดที่จะทำอย่างละเอียด เพื่อให้คนอื่นสามารถอ่านแล้วเข้าใจ หรือทำตามได้ ประกอบด้วย:
            </p>
             <ol className="list-decimal list-outside pl-5 space-y-2">
                 <li><strong>การเตรียมการ:</strong> ต้องเตรียมวัสดุอุปกรณ์อะไรบ้าง? จะสร้างเครื่องมือ (เช่น แบบสอบถาม) อย่างไร?</li>
                <li><strong>การเก็บรวบรวมข้อมูล:</strong> จะลงพื้นที่เก็บข้อมูลเมื่อไหร่? จะทดลองกี่ครั้ง? มีขั้นตอนอย่างไรบ้าง?</li>
                <li><strong>การวิเคราะห์ข้อมูล:</strong> เมื่อได้ข้อมูลมาแล้ว จะนำไปวิเคราะห์ด้วยวิธีใด? (เช่น หาค่าร้อยละ, ค่าเฉลี่ย)</li>
            </ol>
             <div className="mt-6 p-3 border-l-4 border-amber-500 bg-amber-50 dark:bg-slate-800/50 rounded-r-lg">
                <p className="font-semibold text-amber-800 dark:text-amber-300">หัวใจสำคัญของการออกแบบ</p>
                <p className="mt-1 text-slate-700 dark:text-slate-300">
                   คือการทำให้แน่ใจว่าวิธีการที่เราเลือกใช้นั้น สามารถตอบ "วัตถุประสงค์" และทดสอบ "สมมติฐาน" ที่เราตั้งไว้ได้จริงๆ
                </p>
            </div>
        </div>

        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การออกแบบการค้นคว้า
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
                        <RubricRow criteria="1. ความสอดคล้อง" levels={[
                            'การออกแบบสอดคล้องกับวัตถุประสงค์และสมมติฐานอย่างสมบูรณ์',
                            'การออกแบบส่วนใหญ่สอดคล้องกับวัตถุประสงค์',
                            'การออกแบบมีความสอดคล้องกับวัตถุประสงค์เป็นบางส่วน',
                            'การออกแบบไม่ค่อยสอดคล้องกับวัตถุประสงค์',
                            'การออกแบบไม่สอดคล้องกับวัตถุประสงค์',
                            'ไม่มีการออกแบบการค้นคว้า'
                        ]} />
                        <RubricRow criteria="2. กลุ่มตัวอย่าง" levels={[
                            'ระบุประชากร กลุ่มตัวอย่าง และวิธีสุ่มตัวอย่างได้ชัดเจนและเหมาะสมมาก',
                            'ระบุประชากรและกลุ่มตัวอย่างได้ชัดเจน',
                            'ระบุกลุ่มตัวอย่างได้ แต่ยังไม่ชัดเจนเรื่องประชากร',
                            'ระบุกลุ่มตัวอย่างไม่ชัดเจน',
                            'กลุ่มตัวอย่างไม่เหมาะสมกับเรื่องที่ศึกษา',
                            'ไม่ได้ระบุกลุ่มตัวอย่าง'
                        ]} />
                        <RubricRow criteria="3. ขั้นตอนดำเนินงาน" levels={[
                            'อธิบายขั้นตอนได้ละเอียด เป็นลำดับ และสามารถทำตามได้จริง',
                            'อธิบายขั้นตอนได้ชัดเจนเป็นส่วนใหญ่',
                            'อธิบายขั้นตอนได้ แต่ยังขาดรายละเอียด',
                            'ขั้นตอนที่อธิบายยังสับสน',
                            'ขั้นตอนไม่สมเหตุสมผล',
                            'ไม่มีการอธิบายขั้นตอน'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท (AI ช่วย)</h4>
            <InteractiveExercise
                context="บทที่ 3: การออกแบบการค้นคว้า"
                question="อธิบายวัตถุประสงค์และสมมติฐานของโครงงานคุณโดยสรุป แล้ว AI จะช่วยแนะนำประเภทการออกแบบการค้นคว้าและขั้นตอนที่เหมาะสมให้"
                rows={6}
            />
        </div>

    </div>
);

export default Topic3_Design;
