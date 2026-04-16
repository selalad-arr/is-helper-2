import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';
import { AreaChart } from 'lucide-react';

const ProjectTopic13 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 12: บันทึกความว้าว (บทที่ 4) 🔍</h3>
                
                <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 mb-8">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                        "ได้เวลามาโชว์ผลการทดลองกันแล้ว! ไม่ว่าผลจะออกมาเป็นยังไง นั่นคือความรู้ใหม่ที่เราค้นพบนะจ๊ะ"
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
