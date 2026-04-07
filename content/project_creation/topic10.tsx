import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';

const ProjectTopic10 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 10: โชว์ผลการทดลองสุดเจ๋ง! (บทที่ 4) 🔍</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="text-lg">
                    ในส่วนนี้เราจะมา <strong>"โชว์ผลลัพธ์"</strong> ที่เราได้จากการทดลองกัน! มาทำให้ข้อมูลดูง่ายและน่าตื่นเต้นกันเถอะ
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="font-semibold mb-2 text-blue-600 dark:text-blue-400">วิธีโชว์ผลงาน:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>ทำตาราง:</strong> จัดระเบียบตัวเลขให้ดูง่ายๆ</li>
                        <li><strong>วาดกราฟหรือแผนภูมิ:</strong> จะได้เห็นชัดๆ ว่าอะไรเยอะกว่ากัน!</li>
                        <li><strong>เขียนอธิบาย:</strong> บอกเล่าว่าในตารางหรือกราฟมีอะไรเกิดขึ้นบ้าง</li>
                        <li><strong>ใส่รูปถ่าย:</strong> เอารูปตอนเรากำลังทดลองมาโชว์ด้วยนะจ๊ะ</li>
                    </ul>
                </div>
                <p className="text-amber-600 dark:text-amber-400 font-medium italic">
                    * จำไว้นะ: ในบทนี้ให้เขียนแค่ "สิ่งที่เกิดขึ้นจริง" เท่านั้นนะจ๊ะ ยังไม่ต้องบอกว่าทำไม (เดี๋ยวเราไปบอกในบทที่ 5 กัน!)
                </p>
            </div>

            <ChapterDraftingAssistant 
                chapterNumber={4} 
                stepNumber={10}
                projectTitle={projectTitle} 
                coreConcept={coreConcept} 
                researchData={researchData}
            />
        </div>
    );
};

export default ProjectTopic10;
