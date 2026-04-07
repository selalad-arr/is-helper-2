import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';

const ProjectTopic13 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 13: วัดผลความสำเร็จของโครงงาน 📏</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="text-lg">
                    ในขั้นตอนนี้ เราจะมาดูว่า <strong>"โครงงานของเราเจ๋งแค่ไหน"</strong> โดยใช้เครื่องมือวัดผลที่เข้าใจง่ายจ้า
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="font-semibold mb-2 text-teal-600 dark:text-teal-400">สิ่งที่เราจะมาดูกัน:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>ตัววัดความสำเร็จ:</strong> อะไรที่บอกว่าเราทำสำเร็จ? เช่น เพื่อนๆ ชอบไหม หรือใช้งานได้จริงหรือเปล่าจ๊ะ</li>
                        <li><strong>เครื่องมือวัดผล:</strong> เช่น การทำแบบสอบถามถามความเห็นเพื่อนๆ หรือการทดสอบเปรียบเทียบดูนะ</li>
                        <li><strong>สรุปเป็นตัวเลข:</strong> เช่น มีคนชอบกี่คน หรือทำได้ดีขึ้นกี่เปอร์เซ็นต์จ้า</li>
                        <li><strong>สิ่งที่ได้เรียนรู้:</strong> เราเก่งขึ้นเรื่องอะไรบ้าง และอยากทำอะไรต่อในครั้งหน้าดีนะ?</li>
                    </ul>
                </div>
            </div>

            <ChapterDraftingAssistant 
                chapterNumber={7} 
                stepNumber={13}
                projectTitle={projectTitle} 
                coreConcept={coreConcept} 
                researchData={researchData}
            />
        </div>
    );
};

export default ProjectTopic13;
