import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';
import { Flag } from 'lucide-react';

const ProjectTopic15 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 14: สรุปผลและข้อเสนอแนะ (บทที่ 5) 🏁</h3>
                
                <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 mb-8">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                        "มาถึงบทสรุปกันแล้ว! มาทบทวนกันว่าสิ่งที่เราทำสำเร็จตามเป้าหมายไหม และมีอะไรที่อยากบอกนักประดิษฐ์คนต่อไปบ้าง"
                    </p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <Flag className="w-5 h-5 text-indigo-500" />
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">ร่างเนื้อหาบทที่ 5 ✨</h4>
                </div>

                <ChapterDraftingAssistant 
                    chapterNumber={5} 
                    stepNumber={15}
                    projectTitle={projectTitle} 
                    coreConcept={coreConcept} 
                    researchData={researchData}
                />
            </div>
        </div>
    );
};

export default ProjectTopic15;
