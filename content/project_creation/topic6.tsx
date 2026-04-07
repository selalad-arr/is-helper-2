import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';

const ProjectTopic6 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 6: เขียนเรื่องที่เกี่ยวข้อง (บทที่ 2) 📊</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="text-lg">
                    บทที่ 2 คือการรวบรวม <strong>"ความรู้และงานวิจัยที่เกี่ยวข้อง"</strong> โดยเอาข้อมูลที่เราหามาได้จากก้าวที่ 3 มาเล่าใหม่ให้เป็นระเบียบจ้า
                </p>
                <p>
                    เนื้อหาในบทนี้จะบอกว่า <strong>มีใครเคยทำเรื่องนี้มาก่อนไหม, เขามีข้อมูลอะไรบ้าง, และความรู้พื้นฐานที่จำเป็น</strong> เพื่อให้โครงงานของเราดูน่าเชื่อถือสุดๆ ไปเลย!
                </p>
            </div>

            <ChapterDraftingAssistant 
                chapterNumber={2} 
                stepNumber={6}
                projectTitle={projectTitle} 
                coreConcept={coreConcept} 
                researchData={researchData}
            />
        </div>
    );
};

export default ProjectTopic6;
