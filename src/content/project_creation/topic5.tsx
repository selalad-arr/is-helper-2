import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';
import { PenTool, CheckCircle } from 'lucide-react';

const ProjectTopic5 = () => {
    const { projectTitle, coreConcept, researchData, setCoreConcept, save, isSaving, isDirty } = useProjectData();

    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 4: ร่างบทนำและความสำคัญ (บทที่ 1) 📝</h3>
                
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-6 mb-4">
                    <h4 className="font-semibold text-lg mb-2 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        หัวใจของปัญหา (ปรับแก้ได้ตามต้องการ)
                    </h4>
                    <textarea
                        value={coreConcept}
                        onChange={(e) => setCoreConcept(e.target.value)}
                        placeholder="สรุปปัญหาที่เจอจะปรากฏที่นี่ คุณสามารถปรับแต่งข้อความได้จ้า..."
                        rows={5}
                        className="w-full p-4 rounded-xl border border-emerald-200 dark:border-emerald-700/50 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 transition-shadow text-sm"
                    />
                </div>

                <div className="flex justify-end mb-8">
                    <button
                        onClick={save}
                        disabled={isSaving || !isDirty}
                        className={`inline-flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                            isDirty 
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default'
                        }`}
                    >
                        {isSaving ? 'กำลังบันทึก...' : isDirty ? 'บันทึกการปรับปรุง ✨' : 'บันทึกเรียบร้อย ✅'}
                    </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <PenTool className="w-5 h-5 text-indigo-500" />
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">ร่างเนื้อหาที่มาและความสำคัญ ✨</h4>
                </div>

                <ChapterDraftingAssistant 
                    chapterNumber={1} 
                    stepNumber={5}
                    projectTitle={projectTitle} 
                    coreConcept={coreConcept} 
                    researchData={researchData}
                />
            </div>
        </div>
    );
};

export default ProjectTopic5;
