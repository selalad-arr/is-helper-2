import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';
import { Flag } from 'lucide-react';

const ProjectTopic15 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 15: สรุปผลและข้อเสนอแนะ (บทที่ 5) 🏁</h3>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-800/50 mb-8 text-center">
                    <p className="text-amber-800 dark:text-amber-300 leading-relaxed italic text-sm">
                        "ใกล้ถึงเส้นชัยแล้วจ้า! มาสรุปสิ่งที่ได้เรียนรู้ทั้งหมด และแชร์ไอเดียว่าเราจะพัฒนาต่อยอดไปทางไหนดีนะ"
                    </p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <Flag className="w-5 h-5 text-indigo-500" />
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">ร่างเนื้อหาบทที่ 5 ✨</h4>
                </div>

                <ChapterDraftingAssistant 
                    chapterNumber={5} 
                    stepNumber={15}
                    projectTitle={projectTitle} 
                    coreConcept={coreConcept} 
                    researchData={researchData}
                />
            </div>
        </div>
    );
};

export default ProjectTopic15;
