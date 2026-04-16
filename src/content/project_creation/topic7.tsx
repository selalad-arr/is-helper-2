import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import Topic3DataCollectionFlow from '../../components/Topic3DataCollectionFlow';
import { Key } from 'lucide-react';

const ProjectTopic7 = () => {
    const { projectTitle, setResearchData, save, isSaving, isDirty } = useProjectData();

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 6: กุญแจสู่การค้นความรู้ (AI) 🔑</h3>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 mb-8">
                <p className="text-indigo-800 dark:text-indigo-300 leading-relaxed italic">
                    "ก่อนจะเริ่มทดลอง เราต้องรู้ก่อนว่าคนอื่นเคยทำอะไรไว้บ้าง พี่ AI จะช่วยหา 'คำสำคัญ' (Keywords) และแหล่งข้อมูลที่เกี่ยวข้องให้ครับ"
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Key className="w-5 h-5 text-indigo-500" />
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300">ค้นหาและรวบรวมข้อมูลสนับสนุน</h4>
                </div>
                <Topic3DataCollectionFlow projectTitle={projectTitle} setResearchData={setResearchData} />
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
                        <>บันทึกข้อมูลการสืบค้น ✨</>
                    ) : (
                        <>บันทึกเรียบร้อย ✅</>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProjectTopic7;
