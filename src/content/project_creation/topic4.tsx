import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';

const ProjectTopic4 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 4: จัดหน้ากระดาษให้สวยเป๊ะ 📚</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="text-lg">
                    การจัดรูปแบบรายงาน (Report Formatting) จะช่วยให้ผลงานของน้องๆ ดูเป็นระเบียบและอ่านง่ายเหมือนหนังสือจริงๆ เลยล่ะ! ✨
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">1. ตัวหนังสือและขอบกระดาษ</h4>
                        <p className="text-sm">เลือกแบบตัวอักษรที่อ่านง่าย และเว้นขอบกระดาษให้พอดี ไม่เบียดกันจนเกินไปนะ</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                        <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">2. ล้างรูปแบบที่คัดลอกมา</h4>
                        <p className="text-sm">เวลาเราก๊อปปี้ข้อความมาจากเน็ต อย่าลืมล้างรูปแบบเดิมออกก่อน เพื่อให้ตัวหนังสือในรายงานเราเหมือนกันหมดจ้า</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                        <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">3. การใส่เลขหน้า</h4>
                        <p className="text-sm">ใส่เลขหน้าให้เรียบร้อย เพื่อให้คนอ่านหาข้อมูลในรายงานเราได้ง่ายๆ ไงล่ะ</p>
                    </div>
                </div>

                <p className="mt-4">
                    นอกจากนี้ยังมีเรื่องการเขียนบทคัดย่อ (สรุปสั้นๆ) การทำสารบัญ และการเขียนที่มาของข้อมูล (บรรณานุกรม) เพื่อให้รู้ว่าเราหาความรู้มาจากไหนด้วยนะจ๊ะ
                </p>
            </div>

            <ChapterDraftingAssistant 
                chapterNumber={0} 
                stepNumber={4}
                projectTitle={projectTitle} 
                coreConcept={coreConcept} 
                researchData={researchData}
            />
        </div>
    );
};

export default ProjectTopic4;
