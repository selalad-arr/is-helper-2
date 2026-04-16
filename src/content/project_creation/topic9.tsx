import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ExperimentalPlanningAI from '../../components/ExperimentalPlanningAI';

const ProjectTopic9 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 8: วางกลยุทธ์การทดลอง (AI) 🧪</h3>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-2xl border border-purple-100 dark:border-purple-800/50 mb-8">
                <p className="text-purple-800 dark:text-purple-300 leading-relaxed italic">
                    "ในก้าวนี้ เราจะมาวางแผนกันว่าเราจะวัดอะไร และเปลี่ยนอะไรบ้าง เพื่อให้การทดลองของเราได้เนื้อหาที่ถูกต้องที่สุด!"
                </p>
            </div>

            <ExperimentalPlanningAI 
                projectTitle={projectTitle} 
                coreConcept={coreConcept} 
                researchData={researchData} 
            />
        </div>
    );
};

export default ProjectTopic9;
