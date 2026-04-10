import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import { Tag, CheckCircle } from 'lucide-react';

const ProjectTopic3 = () => {
    const { projectTitle, setProjectTitle } = useProjectData();

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 3: ตั้งชื่อเรื่องสุดปัง 🏷️</h3>
            
            <div className="bg-white dark:bg-slate-800/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl">
                        <Tag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100">ชื่อโครงงานของคุณ</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">ชื่อเรื่องที่ชัดเจนจะช่วยให้ AI เข้าใจและแนะนำแนวทางได้แม่นยำขึ้น</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <input
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="เช่น เครื่องบีบขวดพลาสติกจอมพลัง, การศึกษาการเจริญเติบโตของพืชด้วยแสง LED..."
                        className="w-full p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xl font-medium"
                    />
                    
                    {projectTitle && (
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium animate-in fade-in slide-in-from-top-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>ยอดเยี่ยมเลย! พร้อมที่จะไปวิเคราะห์ปัญหาต่อหรือยัง?</span>
                        </div>
                    )}
                </div>

                <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dotted border-slate-300 dark:border-slate-600">
                    <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-2 text-sm text-center">💡 เทคนิคการตั้งชื่อโครงงาน</h5>
                    <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 list-disc list-inside">
                        <li><strong>แบบที่ 1:</strong> สั้น กระชับ เข้าใจง่าย (เช่น "หุ่นยนต์เก็บขยะอัจฉริยะ")</li>
                        <li><strong>แบบที่ 2:</strong> บอกชัดเจนว่าทำอะไรกับอะไร (เช่น "การเปรียบเทียบประสิทธิภาพของสมุนไพรกำจัดมด")</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProjectTopic3;
