import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import Topic2CardFlow from '../../components/Topic2CardFlow';
import { Search } from 'lucide-react';

const ProjectTopic4 = () => {
    const { projectTitle, setCoreConcept, save, isSaving, isDirty } = useProjectData();

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 3: วิเคราะห์ปัญหาที่อยากแก้ (AI) 🔍</h3>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-800/50 mb-8">
                <p className="text-amber-800 dark:text-amber-300 leading-relaxed italic">
                    "ในก้าวนี้ เราจะมาสวมบทเป็น **นักสืบ** เพื่อหาว่าปัญหาที่คุณเจอคืออะไร และพี่ AI จะช่วยสรุป 'แกนหลัก' ให้เอง!"
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Search className="w-5 h-5 text-indigo-500" />
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300">ระดมสมองวิเคราะห์ปัญหา</h4>
                </div>
                <Topic2CardFlow projectTitle={projectTitle} setCoreConcept={setCoreConcept} />
            </div>

            <div className="flex justify-end pt-6">
                <button
                    onClick={save}
                    disabled={isSaving || !isDirty}
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${
                        isDirty 
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 active:scale-95' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default'
                    }`}
                >
                    {isSaving ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            กำลังบันทึก...
                        </>
                    ) : isDirty ? (
                        <>บันทึกหลักการโครงงาน ✨</>
                    ) : (
                        <>บันทึกเรียบร้อย ✅</>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProjectTopic4;
