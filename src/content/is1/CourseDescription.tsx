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
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">คำอธิบายรายวิชา IS1: การศึกษาค้นคว้าและสร้างองค์ความรู้</h3>
        <p className="text-md text-slate-600 dark:text-slate-400 mb-1">Research and Knowledge Formation</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">รายวิชาเพิ่มเติม | จำนวน 1 หน่วยกิต</p>

        <div className="space-y-4 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-lg text-slate-800 dark:text-slate-100">คำอธิบายรายวิชา (สรุป)</h4>
            <p className="text-lg leading-relaxed">
                ฝึกตั้งคำถามในเรื่องที่สนใจ ค้นคว้าหาข้อมูลอย่างเป็นระบบ และสรุปเป็นความรู้ใหม่เพื่อแก้ปัญหาอย่างมีเหตุผล
            </p>
        </div>

        <div className="mt-6 space-y-4 text-slate-700 dark:text-slate-300">
            <h4 className="font-semibold text-lg text-slate-800 dark:text-slate-100">สิ่งที่จะได้เรียนรู้</h4>
            <ul className="list-disc list-inside space-y-2 pl-2 text-md">
                <li>การตั้งประเด็นปัญหาและสมมติฐาน</li>
                <li>การค้นคว้าและตรวจสอบความน่าเชื่อถือของข้อมูล</li>
                <li>การวิเคราะห์และสรุปองค์ความรู้</li>
                <li>การเสนอแนวทางแก้ปัญหาอย่างเป็นระบบ</li>
            </ul>
        </div>
        
        <div className="my-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100 text-center">โครงสร้างรายวิชา</h4>
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="w-full text-sm text-left text-slate-600 dark:text-slate-400">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:text-slate-300 dark:bg-slate-700">
                        <tr>
                            <th scope="col" className="p-3 text-center">ที่</th>
                            <th scope="col" className="p-3">ชื่อหน่วย</th>
                            <th scope="col" className="p-3">ผลการเรียนรู้</th>
                            <th scope="col" className="p-3">สาระสำคัญ/ความคิดรวบยอด</th>
                            <th scope="col" className="p-3 text-center">เวลา (ชม.)</th>
                            <th scope="col" className="p-3 text-center">น้ำหนัก (คะแนน)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow 
                            num="1"
                            unit="การตั้งประเด็นคำถาม/สมมุติฐานอย่างมีเหตุผล (Hypothesis Formulation)"
                            outcomes={<ul className="list-disc pl-4"><li>ตั้งประเด็นปัญหาโดยเลือกประเด็นที่สนใจ</li><li>ตั้งสมมติฐานประเด็นปัญหาที่ตนเองสนใจ</li><li>ออกแบบ วางแผนใช้กระบวนการรวบรวมข้อมูลอย่างมีประสิทธิภาพ</li></ul>}
                            concepts={<ul className="list-disc pl-4"><li>การตั้งประเด็น/คำถามในเรื่องที่ตนสนใจโดยเริ่มจากตัวเอง เชื่อมโยงกับชุมชน ท้องถิ่น ประเทศ</li><li>การตั้งสมมุติฐานและให้เหตุผลโดยใช้ความรู้จากสาขาวิชาต่าง ๆ</li></ul>}
                            hours="12"
                            score="30"
                        />
                         <TableRow 
                            num="2"
                            unit="การสืบค้นความรู้จากแหล่งเรียนรู้และสารสนเทศ หรือจากการปฏิบัติทดลอง (Searching for Information)"
                            outcomes={<ul className="list-disc pl-4"><li>ศึกษา ค้นคว้า แสวงหาความรู้เกี่ยวกับประเด็นที่เลือกจากแหล่งเรียนรู้ที่หลากหลาย</li><li>ตรวจสอบความน่าเชื่อถือของแหล่งที่มาของข้อมูลได้</li><li>วิเคราะห์ข้อค้นพบด้วยสถิติที่เหมาะสม</li></ul>}
                            concepts={<ul className="list-disc pl-4"><li>ศึกษา ค้นคว้าแสวงหาความรู้เกี่ยวกับสมมุติฐานที่ตั้งไว้จากแหล่งเรียนรู้หลากหลาย (เช่น ห้องสมุด แหล่งเรียนรู้ทางออนไลน์ วารสาร การปฏิบัติ ทดลอง หรืออื่น ๆ)</li><li>ออกแบบ วางแผนรวบรวมข้อมูลโดยใช้กระบวนการรวบรวมข้อมูลอย่างมีประสิทธิภาพ</li><li>ใช้กระบวนการกลุ่มในการแลกเปลี่ยนความคิดเห็นโดยใช้ความรู้จากสาขาวิชาต่างๆเพื่อให้ได้ข้อมูลที่ครบถ้วนสมบูรณ์</li></ul>}
                            hours="12"
                            score="30"
                        />
                         <TableRow 
                            num="3"
                            unit="การสรุปองค์ความรู้ (Knowledge Formation)"
                            outcomes={<ul className="list-disc pl-4"><li>สังเคราะห์สรุปองค์ความรู้ด้วยกระบวนการกลุ่ม</li><li>เสนอแนวคิด การแก้ปัญหาอย่างเป็นระบบด้วยองค์ความรู้จากการค้นพบ</li><li>เห็นประโยชน์และคุณค่าของการศึกษาค้นคว้าด้วยตนเอง</li></ul>}
                            concepts={<ul className="list-disc pl-4"><li>ทำงานบรรลุผลตามเป้าหมายภายในกรอบการดำเนินงานที่กำหนดโดยการกำกับดูแลช่วยเหลือของครูอย่างต่อเนื่อง</li><li>วิเคราะห์ข้อมูลโดยใช้วิธีการที่เหมาะสม</li><li>สังเคราะห์และสรุปองค์ความรู้อภิปรายผลและเปรียบเทียบเชื่อมโยงความรู้</li><li>เสนอแนวคิด วิธีการแก้ปัญหาอย่างเป็นระบบ</li></ul>}
                            hours="16"
                            score="40"
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
