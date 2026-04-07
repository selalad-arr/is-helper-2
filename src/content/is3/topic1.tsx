import React from 'react';
import IS3Topic1CardFlow from '../../components/IS3Topic1CardFlow';
import { UserCircleIcon, AcademicCapIcon, UsersIcon, GlobeAltIcon } from '../../ui/icons';
import { useProjectData } from '../../hooks/useProjectData';

// FIX: Correctly typed `children` prop using React.PropsWithChildren.
const InfoCard = ({ icon, title, children }: React.PropsWithChildren<{ icon: React.ReactNode, title: string }>) => (
    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 transition-shadow hover:shadow-md h-full">
        <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 text-sky-500">{icon}</div>
            <h5 className="font-bold text-lg text-slate-800 dark:text-slate-200">{title}</h5>
        </div>
        <div className="text-slate-700 dark:text-slate-300 space-y-1 pl-9">
            {children}
        </div>
    </div>
);

const Topic1 = () => {
    const { is3ProjectTitle, setIs3ProjectTitle } = useProjectData();

    return (
        <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การสำรวจและวิเคราะห์ปัญหาสังคม</h3>
        <div className="text-center italic text-slate-500 dark:text-slate-400 mt-2 mb-6 border-y border-slate-200 dark:border-slate-700 py-4">
            <p>"เราไม่สามารถแก้ปัญหาของเราได้ด้วยวิธีคิดแบบเดียวกับที่เราใช้สร้างมันขึ้นมา"</p>
            <p className="mt-1 text-sm">- อัลเบิร์ต ไอน์สไตน์</p>
        </div>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                ยินดีต้อนรับสู่ IS3: การนำความรู้ไปใช้บริการสังคม! ในรายวิชานี้ เราจะนำความรู้และทักษะทั้งหมดที่ได้จาก IS1 และ IS2 มาสร้างการเปลี่ยนแปลงจริงๆ ในสังคมรอบตัวเรา
            </p>
            <p>
                หัวใจสำคัญของการบริการสังคมคือการ "แก้ปัญหา" ที่มีอยู่จริง แต่ก่อนที่เราจะแก้ปัญหาได้ เราต้องเข้าใจปัญหานั้นอย่างลึกซึ้งเสียก่อน บทนี้จะสอนวิธีการมองหา, วิเคราะห์, และเลือกปัญหาที่เราจะลงมือทำ
            </p>

            <h4 className="font-semibold text-xl !mt-8 text-slate-800 dark:text-slate-100">ขั้นตอนที่ 1: แหล่งที่มาของปัญหา (เราจะหาไอเดียจากไหน?)</h4>
            <p>
                ไอเดียดีๆ สำหรับโครงงานบริการสังคมอยู่รอบตัวเรา ลองมองหาจาก 4 แหล่งนี้:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <InfoCard icon={<UserCircleIcon className="w-6 h-6" />} title="จากตนเอง (From Self)">
                    <ul className="list-disc list-outside pl-4">
                        <li>ปัญหาที่ตัวเรา, ครอบครัว, หรือเพื่อนๆ กำลังเจอ</li>
                        <li>ตัวอย่าง: การแยกขยะในบ้าน, การดูแลผู้สูงอายุ, ความปลอดภัยในการใช้อินเทอร์เน็ต</li>
                    </ul>
                </InfoCard>
                <InfoCard icon={<AcademicCapIcon className="w-6 h-6" />} title="จากโรงเรียน (From School)">
                     <ul className="list-disc list-outside pl-4">
                        <li>ปัญหาที่สังเกตเห็นภายในรั้วโรงเรียน</li>
                        <li>ตัวอย่าง: ขยะอาหารในโรงอาหาร, พื้นที่สีเขียวน้อย, การรณรงค์เรื่องการกลั่นแกล้ง (Bullying)</li>
                    </ul>
                </InfoCard>
                <InfoCard icon={<UsersIcon className="w-6 h-6" />} title="จากชุมชน (From Community)">
                     <ul className="list-disc list-outside pl-4">
                        <li>ปัญหาในท้องถิ่นหรือชุมชนที่เราอาศัยอยู่</li>
                        <li>ตัวอย่าง: ขยะทะเล, ผลกระทบจากการท่องเที่ยว, ขาดแคลนกิจกรรมสำหรับเยาวชน</li>
                    </ul>
                </InfoCard>
                <InfoCard icon={<GlobeAltIcon className="w-6 h-6" />} title="จากสังคม/โลก (From Society/World)">
                     <ul className="list-disc list-outside pl-4">
                        <li>ประเด็นปัญหาสังคมในภาพใหญ่ที่เราสนใจ</li>
                        <li>ตัวอย่าง: ภาวะโลกร้อน, ข่าวปลอม (Fake News), การตระหนักรู้เรื่องสุขภาพจิต</li>
                    </ul>
                </InfoCard>
            </div>

            <h4 className="font-semibold text-xl !mt-8 text-slate-800 dark:text-slate-100">ขั้นตอนที่ 2: วิเคราะห์ปัญหาให้ถึงแก่น (Problem Analysis)</h4>
            <p>
                เมื่อเจอประเด็นที่น่าสนใจแล้ว อย่าเพิ่งรีบลงมือทำ! เราต้องวิเคราะห์ให้เข้าใจถึง "ราก" ของปัญหาก่อน เครื่องมือที่เรียบง่ายแต่ทรงพลังคือ <strong>การวิเคราะห์แผนภูมิต้นไม้ (Problem Tree Analysis)</strong> ซึ่งแบ่งปัญหาออกเป็น 3 ส่วน:
            </p>
            <div className="mt-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700">
                <ul className="space-y-4">
                    <li className="flex items-start">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300 w-28 md:w-32 flex-shrink-0">🌳 กิ่งก้าน (ผลกระทบ):</span>
                        <span className="text-slate-700 dark:text-slate-300">คือผลลัพธ์หรือสิ่งที่เกิดขึ้นตามมาจากปัญหานั้น (What are the effects?)</span>
                    </li>
                     <li className="flex items-start">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300 w-28 md:w-32 flex-shrink-0">🌲 ลำต้น (ปัญหาหลัก):</span>
                        <span className="text-slate-700 dark:text-slate-300">คือปัญหาที่เรามองเห็นและต้องการจะแก้ไข (What is the core problem?)</span>
                    </li>
                     <li className="flex items-start">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300 w-28 md:w-32 flex-shrink-0">🌰 ราก (สาเหตุ):</span>
                        <span className="text-slate-700 dark:text-slate-300">คือสาเหตุที่แท้จริงที่ทำให้เกิดปัญหานั้นขึ้น (What are the causes?) <strong className="text-red-600 dark:text-red-400">นี่คือส่วนที่เราควรจะเข้าไปแก้ไข!</strong></span>
                    </li>
                </ul>
            </div>
            
            <h4 className="font-semibold text-xl !mt-8 text-slate-800 dark:text-slate-100">ตัวอย่างการวิเคราะห์: ปัญหาขยะบนชายหาด</h4>
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-300 dark:border-slate-600">
                    <thead className="bg-slate-200 dark:bg-slate-800">
                        <tr>
                            <th className="p-3 border border-slate-300 dark:border-slate-600">ส่วนประกอบ</th>
                            <th className="p-3 border border-slate-300 dark:border-slate-600">ตัวอย่างการวิเคราะห์</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white dark:bg-slate-800/50">
                            <td className="p-3 border border-slate-300 dark:border-slate-600 font-semibold">กิ่งก้าน (ผลกระทบ)</td>
                            <td className="p-3 border border-slate-300 dark:border-slate-600">
                                <ul className="list-disc list-outside pl-4">
                                    <li>ทำร้ายสัตว์ทะเล</li>
                                    <li>ทัศนียภาพไม่สวยงาม กระทบการท่องเที่ยว</li>
                                    <li>เกิดปัญหาสุขภาพและเชื้อโรค</li>
                                </ul>
                            </td>
                        </tr>
                        <tr className="bg-slate-50 dark:bg-slate-800">
                            <td className="p-3 border border-slate-300 dark:border-slate-600 font-semibold">ลำต้น (ปัญหาหลัก)</td>
                            <td className="p-3 border border-slate-300 dark:border-slate-600">มีขยะจำนวนมากเกลื่อนชายหาด</td>
                        </tr>
                        <tr className="bg-white dark:bg-slate-800/50">
                            <td className="p-3 border border-slate-300 dark:border-slate-600 font-semibold">ราก (สาเหตุ)</td>
                            <td className="p-3 border border-slate-300 dark:border-slate-600">
                                <ul className="list-disc list-outside pl-4">
                                    <li>นักท่องเที่ยวทิ้งขยะไม่เป็นที่</li>
                                    <li>ขาดแคลนถังขยะที่เพียงพอ</li>
                                    <li>คนในชุมชนขาดความตระหนักรู้</li>
                                    <li>ไม่มีระบบการจัดการขยะที่ดี</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
                <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัดท้ายบท: คลินิกวิเคราะห์ปัญหาชุมชน (AI)</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    มาลองใช้ AI ผู้ช่วยในการวิเคราะห์ปัญหาที่คุณสนใจกัน AI จะสวมบทบาทเป็น "นักพัฒนาชุมชน" และใช้เทคนิค "Problem Tree Analysis" เพื่อช่วยคุณวิเคราะห์ปัญหาให้ถึงราก!
                </p>
                <IS3Topic1CardFlow projectTitle={is3ProjectTitle} setProjectTitle={setIs3ProjectTitle} />
            </div>
        </div>
    </div>
    );
};

// FIX: Add default export for Topic1 component.
export default Topic1;
