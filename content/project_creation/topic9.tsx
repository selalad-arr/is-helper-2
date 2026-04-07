import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';

const ProjectTopic9 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 9: เขียนวิธีทำและขั้นตอนการทดลอง (บทที่ 3) 🧪</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="text-lg">
                    ในส่วนนี้เราจะเขียน <strong>"ขั้นตอนการทำงาน"</strong> อย่างละเอียด เพื่อให้เพื่อนๆ คนอื่นสามารถทำตามเราได้จ้า
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="font-semibold mb-2 text-purple-600 dark:text-purple-400">สิ่งที่ต้องเขียน:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>อุปกรณ์ที่ใช้:</strong> มีอะไรบ้าง? จดมาให้ครบเลยนะ</li>
                        <li><strong>ขั้นตอนการทำ:</strong> บอกทีละขั้น 1, 2, 3... เหมือนเขียนสูตรอาหารเลยล่ะ!</li>
                        <li><strong>วิธีเก็บข้อมูล:</strong> เราจะจดผลลัพธ์ยังไงดี?</li>
                        <li><strong>การสรุปข้อมูล:</strong> เราจะเอาตัวเลขที่ได้มาทำอะไรต่อจ๊ะ?</li>
                    </ul>
                </div>
            </div>

            <ChapterDraftingAssistant 
                chapterNumber={3} 
                stepNumber={9}
                projectTitle={projectTitle} 
                coreConcept={coreConcept} 
                researchData={researchData}
            />
        </div>
    );
};

export default ProjectTopic9;
