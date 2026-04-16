import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ResultInterpretationAI from '../../components/ResultInterpretationAI';

const ProjectTopic14 = () => {
    const { projectTitle, researchData } = useProjectData();

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 13: ถอดรหัสผลการทดลอง (AI) 🔮</h3>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 mb-8">
                <p className="text-indigo-800 dark:text-indigo-300 leading-relaxed italic">
                    "เห็นผลลัพธ์แล้ว แต่รู้ไหมว่าทำไมมันถึงออกมาแบบนั้น? มาให้พี่ AI ช่วยเชื่อมโยงเหตุผลที่ซ่อนอยู่กันเถอะ"
                </p>
            </div>

            <ResultInterpretationAI projectTitle={projectTitle} researchData={researchData} />
        </div>
    );
};

export default ProjectTopic14;
