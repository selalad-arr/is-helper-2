import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';
import { FileText } from 'lucide-react';

const ProjectTopic11 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 10: วิธีทำอย่างละเอียด (บทที่ 3) 📋</h3>
                
                <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 mb-8">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                        "ในส่วนนี้ เราจะมาเล่าขั้นตอนการประดิษฐ์หรือการทดลองของเราให้ละเอียดที่สุด เพื่อให้คนอื่นที่สนใจสามารถนำไปทำตามได้จ้า"
                    </p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">ร่างเนื้อหาบทที่ 3 ✨</h4>
                </div>

                <ChapterDraftingAssistant 
                    chapterNumber={3} 
                    stepNumber={11}
                    projectTitle={projectTitle} 
                    coreConcept={coreConcept} 
                    researchData={researchData}
                />
            </div>
        </div>
    );
};

export default ProjectTopic11;
