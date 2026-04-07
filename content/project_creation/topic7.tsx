import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';

const ProjectTopic7 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 7: วางแผนการทดลองให้แม่นยำ 🔮</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="text-lg">
                    ในส่วนนี้เราจะมาวางแผนกันว่า <strong>"เราจะทดลองยังไง"</strong> เพื่อให้ผลออกมาถูกต้องและน่าเชื่อถือที่สุดจ้า
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="font-semibold mb-2 text-sky-600 dark:text-sky-400">สิ่งที่ต้องเตรียมคิด:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>สิ่งที่ใช้ทดลอง:</strong> เราจะทดลองกับอะไรดีนะ?</li>
                        <li><strong>วิธีทดลอง:</strong> เราจะทำอะไรกับมันบ้าง?</li>
                        <li><strong>ทำซ้ำกี่ครั้ง:</strong> ทดลองหลายๆ รอบเพื่อให้แน่ใจว่าผลเหมือนเดิมจ้า</li>
                        <li><strong>การสุ่ม:</strong> เลือกตัวอย่างแบบไม่ลำเอียง เพื่อความยุติธรรมนะ</li>
                    </ul>
                </div>
            </div>

            <ChapterDraftingAssistant 
                chapterNumber={3} 
                stepNumber={7}
                projectTitle={projectTitle} 
                coreConcept={coreConcept} 
                researchData={researchData}
            />
        </div>
    );
};

export default ProjectTopic7;
