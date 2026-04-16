import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ResultVizAI from '../../components/ResultVizAI';

const ProjectTopic12 = () => {
    const { projectTitle } = useProjectData();

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 11: กราฟและตารางที่เหมาะสม (AI) 📊</h3>
            
            <div className="bg-sky-50 dark:bg-sky-900/20 p-5 rounded-2xl border border-sky-100 dark:border-sky-800/50 mb-8">
                <p className="text-sky-800 dark:text-sky-300 leading-relaxed italic">
                    "การแสดงผลข้อมูลด้วยรูปภาพจะทำให้คนอื่นเข้าใจโครงงานเราได้ใน 1 นาที! มาดูสถาปนิก AI ออกแบบข้อมูลกันเถอะ"
                </p>
            </div>

            <ResultVizAI projectTitle={projectTitle} />
        </div>
    );
};

export default ProjectTopic12;
