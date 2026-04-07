import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';

const ProjectTopic5 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 5: เขียนบทนำ (บทที่ 1) 📝</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="text-lg">
                    บทที่ 1 คือ <strong>"บทนำ"</strong> เป็นการบอกเล่าว่าทำไมเราถึงอยากทำโครงงานนี้ และเราอยากรู้อะไรจ้า
                </p>
                <p>
                    ในส่วนนี้เราจะเขียนเรื่อง <strong>ที่มาและความสำคัญ (ทำไมถึงทำ), วัตถุประสงค์ (ทำเพื่ออะไร), และขอบเขตการศึกษา (เราจะศึกษาแค่ไหน)</strong> เพื่อให้คนอ่านเข้าใจโครงงานของเราตั้งแต่เริ่มเลย!
                </p>
            </div>

            <ChapterDraftingAssistant 
                chapterNumber={1} 
                stepNumber={5}
                projectTitle={projectTitle} 
                coreConcept={coreConcept} 
                researchData={researchData}
            />
        </div>
    );
};

export default ProjectTopic5;
