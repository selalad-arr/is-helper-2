import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';
import { BookOpen, CheckCircle } from 'lucide-react';

const ProjectTopic8 = () => {
    const { projectTitle, coreConcept, researchData, setResearchData } = useProjectData();

    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 8: สะสมแต้มความรู้ (บทที่ 2) 📚</h3>
                
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-6 mb-8">
                    <h4 className="font-semibold text-lg mb-2 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        คลังความรู้สะสม (ที่ได้จากการสืบค้นก้าวก่อนหน้า)
                    </h4>
                    <textarea
                        value={researchData}
                        onChange={(e) => setResearchData(e.target.value)}
                        placeholder="สรุปข้อมูลที่หามาได้จะปรากฏที่นี่ เพื่อใช้เขียนบทที่ 2 จ้า..."
                        rows={5}
                        className="w-full p-4 rounded-xl border border-emerald-200 dark:border-emerald-700/50 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 transition-all resize-y text-xs font-mono"
                    />
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-indigo-500" />
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">ร่างเนื้อหาบทที่ 2 ✨</h4>
                </div>

                <ChapterDraftingAssistant 
                    chapterNumber={2} 
                    stepNumber={8}
                    projectTitle={projectTitle} 
                    coreConcept={coreConcept} 
                    researchData={researchData}
                />
            </div>
        </div>
    );
};

export default ProjectTopic8;
