import React from 'react';
import InteractiveExercise from '../../components/InteractiveExercise';

// FIX: Update component to accept and render children props using React.PropsWithChildren.
const InfoCard = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
        <h5 className="font-bold text-lg text-slate-800 dark:text-slate-200">{title}</h5>
        <div className="mt-2 text-slate-700 dark:text-slate-300 space-y-2">
            {children}
        </div>
    </div>
);

// FIX: Update component to accept and render children props using React.PropsWithChildren.
const ExampleBox = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
    <div className="mt-3 p-3 border-l-4 border-sky-500 bg-sky-50 dark:bg-slate-800/80 rounded-r-lg">
        <p className="font-semibold text-sky-800 dark:text-sky-300">{title}</p>
        <div className="mt-2 text-slate-700 dark:text-slate-300 text-sm space-y-2">
            {children}
        </div>
    </div>
);

const RubricRow = ({ criteria, levels }: { criteria: string, levels: string[] }) => (
    <tr className="bg-white dark:bg-slate-800/50">
        <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">{criteria}</td>
        {levels.map((level, index) => (
            <td key={index} className={`p-2 border border-slate-300 dark:border-slate-600`}>{level}</td>
        ))}
    </tr>
);

const Topic1 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">หลักการเขียนรายงานเชิงวิชาการ</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"ถ้าคุณไม่สามารถอธิบายมันให้ง่ายได้ แสดงว่าคุณยังไม่เข้าใจมันดีพอ"</p>
            <p className="mt-1 text-sm">- ริชาร์ด ไฟน์แมน</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                การเขียนรายงานเชิงวิชาการ คือ การนำเสนอผลจากการศึกษาค้นคว้าในเรื่องใดเรื่องหนึ่งอย่างเป็นระบบ มีระเบียบแบบแผน เพื่อถ่ายทอดความรู้ ความคิด และผลงานของเราให้ผู้อื่นเข้าใจได้อย่างน่าเชื่อถือ ซึ่งแตกต่างจากการเขียนเรียงความหรือบทความทั่วไป
            </p>
            <p>
                รายงานวิชาการที่ดีเปรียบเสมือนหลักฐานที่แสดงว่าเราได้ผ่านกระบวนการศึกษาค้นคว้ามาอย่างดี และมีทักษะในการสื่อสารองค์ความรู้ที่ค้นพบอย่างมืออาชีพ
            </p>

            <h4 className="font-semibold text-xl !mt-8 text-slate-800 dark:text-slate-100">องค์ประกอบหลักของรายงานวิชาการ</h4>
            <p>
                โดยทั่วไป รายงานวิชาการจะประกอบด้วย 3 ส่วนหลัก ดังนี้:
            </p>
            <div className="space-y-4">
                <InfoCard title="1. ส่วนนำ (Introduction)">
                    <p className="text-sm">ส่วนที่อยู่ก่อนถึงเนื้อหาหลัก ประกอบด้วย ปกนอก, ปกใน, คำนำ, และสารบัญ ทำหน้าที่เหมือนเป็นป้ายบอกทางให้ผู้อ่านทราบภาพรวมของรายงาน</p>
                </InfoCard>
                <InfoCard title="2. ส่วนเนื้อเรื่อง (Body)">
                    <p className="text-sm">ส่วนที่สำคัญที่สุดในการเสนอสาระของรายงาน ประกอบด้วย บทนำ, เนื้อหาหลัก (ซึ่งมักแบ่งเป็นบทต่างๆ), และบทสรุป</p>
                </InfoCard>
                <InfoCard title="3. ส่วนอ้างอิง (References)">
                    <p className="text-sm">ส่วนที่แสดงหลักฐานและแหล่งที่มาของข้อมูลที่ใช้ประกอบการเขียนทั้งหมด เพื่อสร้างความน่าเชื่อถือและเป็นการให้เกียรติเจ้าของผลงาน</p>
                </InfoCard>
            </div>

            <h4 className="font-semibold text-xl !mt-8 text-slate-800 dark:text-slate-100">หัวใจสำคัญของการเขียนเชิงวิชาการ</h4>
            <div className="space-y-4">
                 <InfoCard title="ใช้ภาษาที่เป็นทางการและชัดเจน">
                    <p className="text-sm">ใช้ถ้อยคำสำนวนในระดับทางการหรือกึ่งทางการ ที่ตรงไปตรงมา อ่านเข้าใจง่าย หลีกเลี่ยงภาษาพูด คำสแลง และการแสดงความคิดเห็นส่วนตัวโดยไม่มีหลักฐานสนับสนุน</p>
                    <ExampleBox title="ตัวอย่างการใช้ภาษา">
                        <p>❌ <b className="text-red-600 dark:text-red-400">ไม่ควรใช้:</b> "ผมว่าโครงงานนี้มันเจ๋งมากเลย เพราะมันช่วยลดขยะได้จริง ๆ นะ"</p>
                        <p>✅ <b className="text-green-600 dark:text-green-400">ควรใช้:</b> "ผลการศึกษาเบื้องต้นชี้ให้เห็นว่านวัตกรรมดังกล่าวมีศักยภาพในการลดปริมาณขยะในชุมชน"</p>
                    </ExampleBox>
                </InfoCard>
                <InfoCard title="มีโครงสร้างที่เป็นระบบ">
                    <p className="text-sm">เนื้อหาต้องมีการเรียบเรียงตามลำดับหัวข้ออย่างเป็นเหตุเป็นผล มีความต่อเนื่องสัมพันธ์กัน ไม่สับสนวกวน ซึ่งมักจะวางแผนผ่านการเขียน "โครงเรื่อง" (Outline) ก่อนลงมือเขียนจริง</p>
                    <ExampleBox title="ตัวอย่างโครงเรื่อง">
                        <p className="font-semibold">โครงงาน: การศึกษาผลของดนตรีคลาสสิกต่ออัตราการเจริญเติบโตของต้นถั่วเขียว</p>
                        <ul className="list-decimal list-outside pl-5 text-xs">
                            <li>บทที่ 1 บทนำ
                                <ul className="list-disc list-outside pl-5">
                                    <li>1.1 ความเป็นมาและความสำคัญ</li>
                                    <li>1.2 วัตถุประสงค์</li>
                                </ul>
                            </li>
                             <li>บทที่ 2 เอกสารที่เกี่ยวข้อง
                                <ul className="list-disc list-outside pl-5">
                                    <li>2.1 ข้อมูลทั่วไปของถั่วเขียว</li>
                                    <li>2.2 ผลของคลื่นเสียงต่อสิ่งมีชีวิต</li>
                                </ul>
                            </li>
                        </ul>
                    </ExampleBox>
                </InfoCard>
                <InfoCard title="การอ้างอิงแหล่งที่มา (Citation)">
                    <p className="text-sm">
                        นี่คือสิ่งที่สำคัญที่สุดในการเขียนเชิงวิชาการ ทุกครั้งที่นำข้อมูล ข้อเท็จจริง หรือแนวคิดของผู้อื่นมาใช้ จะต้องระบุแหล่งที่มาเสมอเพื่อให้เกียรติเจ้าของผลงานและหลีกเลี่ยงการคัดลอกผลงาน (Plagiarism)
                    </p>
                    <ul className="list-disc list-outside pl-5 mt-2 text-sm space-y-1">
                        <li><b>การอ้างอิงในเนื้อหา (In-text Citation):</b> คือการระบุแหล่งที่มาสั้นๆ แทรกไว้ในเนื้อหาทันทีที่ใช้ข้อมูลนั้น เช่น (ชื่อผู้แต่ง, ปีที่พิมพ์).</li>
                        <li><b>บรรณานุกรม (Bibliography):</b> คือการรวบรวมรายชื่อแหล่งข้อมูลทั้งหมดที่ใช้อ้างอิง มาจัดเรียงอย่างเป็นระบบไว้ท้ายเล่ม.</li>
                    </ul>
                     <ExampleBox title="ตัวอย่างการอ้างอิง (รูปแบบ APA)">
                         <div>
                            <p className="font-semibold">1. การอ้างอิงในเนื้อหา (In-text citation):</p>
                            <p className="p-2 bg-slate-100 dark:bg-slate-900 rounded mt-1">...การอ่านคือกระบวนการสร้างความหมายที่ซับซ้อน <span className="font-bold text-sky-600 dark:text-sky-400">(ชูศักดิ์ ภัทรกุลวณิชย์, 2545)</span>.</p>
                        </div>
                         <div>
                            <p className="font-semibold mt-2">2. การเขียนบรรณานุกรมท้ายเล่ม (Bibliography):</p>
                            <p className="p-2 bg-slate-100 dark:bg-slate-900 rounded mt-1">ชูศักดิ์ ภัทรกุลวณิชย์. (2545). <i className="italic">อ่าน(ไม่)เอาเรื่อง</i>. กรุงเทพฯ: โครงการจัดพิมพ์คบไฟ.</p>
                        </div>
                    </ExampleBox>
                </InfoCard>
            </div>
        </div>
        
        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การเขียนเชิงวิชาการ
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
                        <RubricRow criteria="1. การใช้ภาษา" levels={[
                            'ใช้ภาษาทางการได้อย่างถูกต้อง สละสลวย กระชับ และชัดเจนตลอดทั้งฉบับ',
                            'ใช้ภาษาทางการถูกต้องเป็นส่วนใหญ่ อาจมีคำฟุ่มเฟือยบ้างเล็กน้อย',
                            'ใช้ภาษาทางการได้ดี แต่บางส่วนยังมีความเป็นภาษาพูด',
                            'ใช้ภาษาทางการสลับกับภาษาพูดอย่างเห็นได้ชัด',
                            'ใช้ภาษาพูดเป็นส่วนใหญ่ มีคำสแลงปะปน',
                            'ใช้ภาษาพูดทั้งหมด ไม่เหมาะสมกับงานเขียนวิชาการ'
                        ]} />
                        <RubricRow criteria="2. โครงสร้างและความต่อเนื่อง" levels={[
                            'โครงสร้างเป็นระบบดีเยี่ยม มีการลำดับหัวข้อและย่อหน้าอย่างเป็นเหตุเป็นผลและเชื่อมโยงกันอย่างราบรื่น',
                            'โครงสร้างเป็นระบบดี การลำดับหัวข้อและย่อหน้ามีความต่อเนื่อง',
                            'มีโครงสร้างชัดเจน แต่การเชื่อมโยงระหว่างย่อหน้ายังไม่ราบรื่น',
                            'มีการแบ่งหัวข้อ แต่ลำดับยังสับสน หรือเนื้อหากระโดดไปมา',
                            'ขาดโครงสร้างที่ชัดเจน เนื้อหาไม่ต่อเนื่อง',
                            'ไม่มีโครงสร้าง เนื้อหาไม่เป็นระบบ'
                        ]} />
                        <RubricRow criteria="3. การอ้างอิง" levels={[
                            'มีการอ้างอิงในเนื้อหา (in-text) และบรรณานุกรมท้ายเล่มอย่างครบถ้วน ถูกต้องตามรูปแบบที่กำหนดทุกประการ',
                            'มีการอ้างอิงครบถ้วน แต่รูปแบบอาจมีข้อผิดพลาดเล็กน้อย',
                            'มีการอ้างอิง แต่ยังไม่ครบถ้วน หรือรูปแบบไม่สม่ำเสมอ',
                            'มีการอ้างอิงในเนื้อหา แต่ไม่มีบรรณานุกรม (หรือกลับกัน)',
                            'มีการอ้างอิงน้อยมาก ไม่น่าเชื่อถือ',
                            'ไม่มีการอ้างอิงแหล่งที่มาเลย ถือเป็นการคัดลอกผลงาน (Plagiarism)'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท: ฝึกใช้ภาษาเขียนเชิงวิชาการ</h4>
            <InteractiveExercise
                context="IS2-บทที่ 1: หลักการเขียนรายงานเชิงวิชาการ"
                question={`ลองเปลี่ยน "ภาษาพูด" ให้เป็น "ภาษาเขียนเชิงวิชาการ" ที่เหมาะสมสำหรับใช้ในรายงาน แล้ว AI จะช่วยตรวจสอบและให้คำแนะนำ

**ตัวอย่าง:**
- **ภาษาพูด:** "ผมว่าโครงงานของผมเจ๋งมากเลย เพราะมันช่วยลดขยะได้จริง"
- **ภาษาเขียนเชิงวิชาการ (ตัวอย่างคำตอบ):** "ผลการศึกษาเบื้องต้นชี้ให้เห็นว่านวัตกรรมดังกล่าวมีศักยภาพในการลดปริมาณขยะในชุมชน"

**ตาคุณลองทำ:**
ให้นักเรียนลองเปลี่ยนประโยคภาษาพูดของตนเองข้างล่างนี้ให้เป็นภาษาเขียนเชิงวิชาการ`}
                rows={4}
            />
        </div>
    </div>
);

export default Topic1;
