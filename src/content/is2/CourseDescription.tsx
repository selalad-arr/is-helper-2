import React from 'react';

const TableRow = ({ num, unit, outcomes, concepts, hours, score }: { num: string, unit: string, outcomes: React.ReactNode, concepts: React.ReactNode, hours: string, score: string }) => (
    <tr className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
        <td className="p-3 align-top text-center">{num}</td>
        <td className="p-3 align-top">{unit}</td>
        <td className="p-3 align-top">{outcomes}</td>
        <td className="p-3 align-top">{concepts}</td>
        <td className="p-3 align-top text-center">{hours}</td>
        <td className="p-3 align-top text-center">{score}</td>
    </tr>
);

const CourseDescription = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">คำอธิบายรายวิชา IS2: การสื่อสารและการนำเสนอ</h3>
        <p className="text-md text-slate-600 dark:text-slate-400 mb-1">Communication and Presentation</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">รายวิชาเพิ่มเติม I20202 - I30202 | จำนวน 1.0 หน่วยกิต</p>

        <div className="p-3 border-l-4 border-amber-500 bg-amber-50 dark:bg-slate-800/50 rounded-r-lg mb-6">
            <p className="font-semibold text-amber-800 dark:text-amber-300">เงื่อนไขการเรียน:</p>
            <p className="mt-1 text-slate-700 dark:text-slate-300">ผู้เรียนต้องผ่านการเรียนรายวิชาการศึกษาค้นคว้าและสร้างองค์ความรู้ (IS1) มาก่อน</p>
        </div>

        <div className="space-y-4 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-lg text-slate-800 dark:text-slate-100">คำอธิบายรายวิชา (สรุป)</h4>
            <p className="text-lg leading-relaxed">
                นำผลการศึกษาจาก IS1 มาเขียนเป็นรายงานวิชาการที่สมบูรณ์ ฝึกการนำเสนอด้วยเทคโนโลยี และเผยแพร่ผลงานสู่สาธารณะ
            </p>
        </div>

        <div className="mt-6 space-y-4 text-slate-700 dark:text-slate-300">
            <h4 className="font-semibold text-lg text-slate-800 dark:text-slate-100">สิ่งที่จะได้เรียนรู้</h4>
            <ul className="list-disc list-inside space-y-2 pl-2 text-md">
                <li>การเขียนรายงานวิชาการ (ไทย 4,000 คำ / อังกฤษ 2,000 คำ)</li>
                <li>การออกแบบสไลด์และเทคนิคการนำเสนอ</li>
                <li>การเผยแพร่ผลงานผ่านสื่อออนไลน์</li>
            </ul>
        </div>
        
        <div className="my-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100 text-center">โครงสร้างรายวิชา</h4>
             <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left text-slate-600 dark:text-slate-400">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:text-slate-300 dark:bg-slate-700">
                        <tr>
                            <th scope="col" className="p-3 text-center">หน่วยที่</th>
                            <th scope="col" className="p-3">ชื่อหน่วยการเรียนรู้</th>
                            <th scope="col" className="p-3">ผลการเรียนรู้</th>
                            <th scope="col" className="p-3">สาระสำคัญ</th>
                            <th scope="col" className="p-3 text-center">ชั่วโมง</th>
                            <th scope="col" className="p-3 text-center">น้ำหนักคะแนน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow 
                            num="1"
                            unit="Design Outline"
                            outcomes="1. วางโครงร่างการเขียนตามหลักเกณฑ์ องค์ประกอบและวิธีการเขียนโครงร่าง"
                            concepts="การเขียนโครงร่างรายงานการศึกษาค้นคว้าเชิงวิชาการ - หลักเกณฑ์ องค์ประกอบและวิธีการเขียนโครงร่าง"
                            hours="10"
                            score="30"
                        />
                         <TableRow 
                            num="2"
                            unit="Writing Report"
                            outcomes="2. เขียนรายงานการศึกษาค้นคว้าเชิงวิชาการภาษาไทย ความยาว 4,000 คำ หรือภาษาอังกฤษ ความยาว 2,500 คำ"
                            concepts="การเขียนรายงานการศึกษาค้นคว้าเชิงวิชาการภาษาไทยหรือภาษาอังกฤษ"
                            hours="18"
                            score="40"
                        />
                         <TableRow 
                            num="3"
                            unit="Show and Share"
                            outcomes={<ul className="list-disc pl-4"><li>นำเสนอข้อค้นพบ ข้อสรุปจากประเด็นที่เลือกในรูปแบบเดี่ยว (Oral individual presentation) หรือกลุ่ม (Oral panel presentation) โดยใช้สื่อเทคโนโลยีที่หลากหลาย</li><li>เผยแพร่ผลงานสู่สาธารณะ โดยใช้การสนทนา / วิพากษ์ผ่านสื่ออิเล็กทรอนิกส์ เช่น e-conference, social media online</li><li>เห็นประโยชน์และคุณค่าในการสร้างสรรค์งานและถ่ายทอดสิ่งที่เรียนรู้</li></ul>}
                            concepts={<ul className="list-disc pl-4"><li>การนำเสนอและการเผยแพร่ผลงานการเขียนรายงานการศึกษาค้นคว้า</li><li>การเลือกรูปแบบและสื่อประกอบการนำเสนอผลงาน</li><li>คุณค่าของการสร้างสรรค์งานและถ่ายทอดสิ่งที่เรียนรู้</li></ul>}
                            hours="12"
                            score="30"
                        />
                        <tr className="border-t-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 font-bold">
                            <td colSpan={4} className="p-3 text-right">รวม</td>
                            <td className="p-3 text-center">40</td>
                            <td className="p-3 text-center">100</td>
                        </tr>
                    </tbody>
                </table>
             </div>
        </div>
    </div>
);

export default CourseDescription;
