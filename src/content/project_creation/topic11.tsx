import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';
import { FileText } from 'lucide-react';

const ProjectTopic11 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 11: วิธีทำอย่างละเอียด (บทที่ 3) 📋</h3>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 mb-8">
                    <p className="text-indigo-800 dark:text-indigo-300 leading-relaxed italic text-sm">
                        "ตอนนี้ถีงเวลาเอาแผนที่ AI ช่วยวิเคราะห์ในก้าวที่ 9 และวัสดุที่เตรียมในก้าวที่ 10 มาเขียนเป็นวิธีกาารทำงานจริงๆ แล้วครับ!"
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
