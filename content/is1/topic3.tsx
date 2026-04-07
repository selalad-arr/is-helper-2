

import React from 'react';
import SourceAnalysisExercise from '../../components/SourceAnalysisExercise';

const RubricRow = ({ criteria, levels }: { criteria: string, levels: string[] }) => (
    <tr className="bg-white dark:bg-slate-800/50">
        <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">{criteria}</td>
        {levels.map((level, index) => (
            <td key={index} className={`p-2 border border-slate-300 dark:border-slate-600`}>{level}</td>
        ))}
    </tr>
);

const DatabaseRow: React.FC<{ name: string, description: string, logo: React.ReactNode }> = ({ name, description, logo }) => (
    <tr className="bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
        <td className="p-3 border border-slate-300 dark:border-slate-600 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            {logo}
            <span>{name}</span>
        </td>
        <td className="p-3 border border-slate-300 dark:border-slate-600">{description}</td>
    </tr>
);


const databases = {
    english: [
        { name: 'ProQuest', description: 'แหล่งค้นหางานวิจัยที่ทุก ๆ ปีจะมีวิทยานิพนธ์ระดับปริญญาเอก และวิทยานิพนธ์ระดับปริญญาโทเพิ่มขึ้นประมาณ 70,000 ชื่อเรื่อง', logo: <span className="font-bold text-blue-600">ProQuest.</span> },
        { name: 'ERIC', description: 'ฐานข้อมูลด้านการศึกษา รวบรวมข้อมูลจากทั้งหนังสือ วารสาร รายงานการประชุม งานวิจัย วิทยานิพนธ์ ฯลฯ', logo: <span className="font-bold text-green-700">ERIC</span> },
        { name: 'ScienceDirect', description: 'ฐานข้อมูลบรรณานุกรม และเอกสารฉบับเต็ม (Full-text) จากวารสารของสำนักพิมพ์ในเครือ Elsevier ประกอบด้วยวารสารด้านวิทยาศาสตร์ เทคโนโลยี และการแพทย์', logo: <span className="font-bold text-sky-500">ELSEVIER</span> },
        { name: 'Google Scholar', description: 'วิธีที่ง่ายๆ ในการค้นหางานเขียนทางวิชาการได้อย่างกว้างขวาง ค้นหาได้จากหลากหลายสาขาวิชาและแหล่งข้อมูล', logo: <span className="font-bold"><span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span> Scholar</span> },
        { name: 'SCOPUS', description: 'ฐานข้อมูลบรรณานุกรม ครอบคลุมวารสาร, รายงานการประชุม, หนังสือชุด, สิทธิบัตร ด้านวิทยาศาสตร์และสังคมศาสตร์', logo: <span className="font-bold text-cyan-600">Scopus®</span> },
        { name: 'Taylor & Francis', description: 'ฐานข้อมูลวารสารอิเล็กทรอนิกส์สหสาขาวิชา ของสำนักพิมพ์ Taylor & Francis', logo: <span className="font-bold text-green-800">Taylor & Francis</span> },
        { name: 'Wiley', description: 'การรวมกันของฐานข้อมูลวารสารอิเล็กทรอนิกส์ 2 ฐานเดิม คือ Wiley Inter Science และ Blackwell Synergy', logo: <span className="font-bold text-blue-800">WILEY</span> },
        { name: 'Springer Link', description: 'ฐานข้อมูลวารสาร และหนังสืออิเล็กทรอนิกส์ของสำนักพิมพ์ Springer Link', logo: <span className="font-bold text-neutral-600">Springer</span> },
        { name: 'JSTOR', description: 'ฐานข้อมูลที่ประกอบด้วยวารสารวิชาการกว่า 2,000 ชื่อ หนังสือกว่า 25,000 ชื่อ และข้อมูลปฐมภูมิ (Primary sources) กว่า 2 ล้านรายการ', logo: <span className="font-bold text-rose-700">JSTOR</span> },
        { name: 'Annual Reviews', description: 'ฐานข้อมูลวารสารอิเล็กทรอนิกส์สหสาขาวิชา สามารถสืบค้นข้อมูลย้อนหลังได้ตั้งแต่ฉบับแรก (ค.ศ. 1932)', logo: <span className="font-bold text-teal-600">R</span> },
    ],
    thai: [
        { name: 'ThaiLIS', description: 'ฐานข้อมูลวิทยานิพนธ์ฉบับเต็มจากมหาวิทยาลัยในต่างประเทศ และระบบการจัดเก็บเอกสารและสิ่งพิมพ์อิเล็กทรอนิกส์เพื่อการสืบค้น', logo: <span className="font-bold text-indigo-700">ThaiLIS</span> },
        { name: 'คลังความรู้ SciMath', description: 'เครือข่ายสังคมแห่งการเรียนรู้ด้านวิทยาศาสตร์และคณิตศาสตร์ สำหรับครู นักเรียน ผู้ปกครอง และบุคคลทั่วไป', logo: <span className="font-bold"><span className="text-sky-400">คลังความรู้</span> SciMath</span> },
    ]
};

const Topic3 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ข้อมูล วิธีการหาข้อมูล และแหล่งข้อมูลที่ได้มาตรฐาน</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"ถ้าข้าพเจ้ามองเห็นได้ไกลกว่าคนอื่น นั่นเป็นเพราะข้าพเจ้ายืนอยู่บนบ่าของยักษ์"</p>
            <p className="mt-1 text-sm">- ไอแซก นิวตัน</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                ข้อมูลถือว่าเป็นสิ่งที่สำคัญมากในการทำโครงงานด้วยเหตุผลที่ว่า โครงงานนั้นจำเป็นต้องอ้างอิงหลักการต่างๆ เป็นองค์ประกอบของโครงงานเพื่อเป็นหลักประกันในความน่าเชื่อถือของโครงงานนั้นเอง
            </p>
            <p>
                ข้อมูลที่นำมาประกอบโครงงานที่จะถือได้ว่ามีความน่าเชื่อถือมากที่สุดจะต้องมีองค์ประกอบโดยเรียงตามน้ำหนักความน่าเชื่อถือดังต่อไปนี้ จากความน่าเชื่อถือน้อยที่สุดไปความน่าเชื่อถือมากที่สุดดังต่อไปนี้:
            </p>
             <ol className="list-decimal list-inside space-y-2 pl-2">
                <li><b>การศึกษาข้อมูลจากคำบอกเล่าของผู้รู้:</b> กล่าวคือในการสัมภาษณ์นั้น ความเป็นไปได้ที่ข้อมูลจะตกหล่นหรือมีความผิดเพี้ยนของข้อมูลมีสูงมาก แต่ก็จะได้ข้อมูลที่ไม่มีบันทึกไว้ในหนังสือหรือเอกสารทั่วไป</li>
                <li><b>ข้อมูลจากอินเทอร์เน็ต:</b> ในที่นี้จะกล่าวถึงการใช้ข้อมูลจากหน้าเว็บไซต์ทั่วไป รวมไปถึงการใช้วิกิพีเดียสารานุกรมเสรี ที่มีข้อเสียคือบุคคลใดก็สามารถเขียนข้อมูลลงไปได้อาจจะมีความถูกต้องบ้างแต่ในทางวิชาการถือว่าไม่มีความน่าเชื่อถือโดยสิ้นเชิง</li>
                <li><b>มีชื่อผู้แต่งหรือเขียนผลงานเป็นบุคคลหรือมีชื่อผู้แต่งหรือเขียนผลงานเป็นองค์กรความรู้:</b> ในหัวข้อนี้ถือว่ามีความน่าเชื่อถือมากที่สุดเพราะถือว่ามีบุคคลหรือองค์กรรับประกันผลงานโดยต้องมีการระบุชื่อและองค์กรในการอ้างอิง</li>
            </ol>

            <h4 className="font-semibold text-xl !mt-6 text-slate-800 dark:text-slate-100">แหล่งการหาข้อมูลอ้างอิงที่ดีและได้มาตรฐาน</h4>
            <p>
                แหล่งข้อมูลที่ดีที่สุดสำหรับสืบค้นงานวิจัยและข้อมูลทางวิชาการ มีดังนี้:
            </p>
        </div>
        
        <div className="my-6 space-y-8">
            {/* English Databases */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-300 dark:border-slate-600">
                     <caption className="p-3 text-lg font-semibold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        แหล่งข้อมูลภาษาอังกฤษ
                    </caption>
                    <thead className="bg-slate-200 dark:bg-slate-800/80">
                        <tr>
                            <th className="p-3 border border-slate-300 dark:border-slate-600 w-1/3">ฐานข้อมูล</th>
                            <th className="p-3 border border-slate-300 dark:border-slate-600">คำอธิบาย</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* FIX: Destructure props in .map() to ensure only expected props are passed to the component. */}
                        {databases.english.map(({ name, description, logo }) => <DatabaseRow key={name} name={name} description={description} logo={logo} />)}
                    </tbody>
                </table>
            </div>
             {/* Thai Databases */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-300 dark:border-slate-600">
                     <caption className="p-3 text-lg font-semibold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        แหล่งข้อมูลในประเทศไทย (ภาษาไทย)
                    </caption>
                    <thead className="bg-slate-200 dark:bg-slate-800/80">
                        <tr>
                            <th className="p-3 border border-slate-300 dark:border-slate-600 w-1/3">ฐานข้อมูล</th>
                            <th className="p-3 border border-slate-300 dark:border-slate-600">คำอธิบาย</th>
                        </tr>
                    </thead>
                    <tbody>
                         {/* FIX: Destructure props in .map() to ensure only expected props are passed to the component. */}
                         {databases.thai.map(({ name, description, logo }) => <DatabaseRow key={name} name={name} description={description} logo={logo} />)}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div className="my-8">
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left border-collapse">
                    <caption className="p-3 text-lg font-bold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                        📊 ตารางประเมินผล (Rubric) การประเมินความน่าเชื่อถือของแหล่งข้อมูล
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
                        <RubricRow criteria="1. ผู้แต่ง/องค์กร" levels={[
                            'ระบุชัดเจน เป็นผู้เชี่ยวชาญ/องค์กรที่ได้รับการยอมรับในสาขานั้นๆ',
                            'ระบุชัดเจน และมีประวัติที่น่าเชื่อถือ',
                            'ระบุชัดเจน แต่ไม่ทราบความเชี่ยวชาญ',
                            'ระบุ แต่เป็นนามแฝง หรือไม่มีประวัติ',
                            'ไม่ระบุผู้แต่ง/องค์กร',
                            'ข้อมูลไม่น่าเชื่อถืออย่างชัดเจน (เช่น เว็บบอร์ด)'
                        ]} />
                        <RubricRow criteria="2. ความเป็นกลาง/อคติ" levels={[
                            'เนื้อหาเป็นกลาง มีการนำเสนอหลายมุมมอง และอ้างอิงหลักฐานชัดเจน',
                            'เนื้อหาค่อนข้างเป็นกลาง มีข้อมูลสนับสนุน',
                            'เนื้อหามีความเป็นกลาง แต่ขาดข้อมูลสนับสนุน',
                            'มีแนวโน้มเอนเอียงไปทางใดทางหนึ่ง',
                            'มีจุดประสงค์แอบแฝงชัดเจน (เช่น โฆษณา, โฆษณาชวนเชื่อ)',
                            'ข้อมูลมีอคติและบิดเบือน'
                        ]} />
                        <RubricRow criteria="3. ความทันสมัย" levels={[
                            'ข้อมูลเป็นปัจจุบันมาก และระบุวันที่เผยแพร่ชัดเจน',
                            'ข้อมูลค่อนข้างใหม่ และระบุวันที่ชัดเจน',
                            'ข้อมูลไม่เก่าเกินไปสำหรับหัวข้อที่ศึกษา',
                            'ข้อมูลเริ่มล้าสมัย แต่ยังพอใช้อ้างอิงได้',
                            'ข้อมูลล้าสมัยมาก',
                            'ไม่ระบุวันที่เผยแพร่'
                        ]} />
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท: วิเคราะห์แหล่งข้อมูล</h4>
             <p className="text-slate-600 dark:text-slate-400 mb-4">
                ให้นักเรียนลองนำแหล่งข้อมูลที่ตนเองสนใจ (อาจจะเป็นเว็บไซต์, หนังสือ, หรือบทความ) มาให้ AI ช่วยวิเคราะห์ตามหลักการที่เรียนมา
            </p>
            <SourceAnalysisExercise />
        </div>
    </div>
);

export default Topic3;
