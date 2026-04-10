import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';
import { AreaChart } from 'lucide-react';

const ProjectTopic13 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 13: บันทึกความว้าว (บทที่ 4) 🔍</h3>
                
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 mb-8">
                    <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed italic text-sm text-center">
                        "โชว์สิ่งที่น้องๆ ค้นพบจากการทดลองจริงที่นี่นะจ๊ะ ยิ่งมีรูปภาพหรือตารางที่ชัดเจน ยิ่งทำให้โครงงานดูเป็นมืออาชีพ!"
                    </p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <AreaChart className="w-5 h-5 text-indigo-500" />
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">ร่างเนื้อหาบทที่ 4 ✨</h4>
                </div>

                <ChapterDraftingAssistant 
                    chapterNumber={4} 
                    stepNumber={13}
                    projectTitle={projectTitle} 
                    coreConcept={coreConcept} 
                    researchData={researchData}
                />
            </div>
        </div>
    );
};

export default ProjectTopic13;
