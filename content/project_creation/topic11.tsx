import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';

const ProjectTopic11 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 11: สรุปผลและบอกเล่าความสำเร็จ! (บทที่ 5) 🏁</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="text-lg">
                    ในส่วนสุดท้ายนี้ เราจะมา <strong>"สรุปทุกอย่าง"</strong> และบอกเล่าว่าเราได้เรียนรู้อะไรจากโครงงานนี้บ้างจ้า
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">สิ่งที่ต้องเขียน:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>สรุปผล:</strong> สรุปสั้นๆ ว่าผลออกมาเป็นยังไง ตรงกับที่เราคิดไว้ตอนแรกไหม?</li>
                        <li><strong>คุยเรื่องผลลัพธ์:</strong> ลองคิดดูว่าทำไมถึงเป็นแบบนั้นนะ (เอาความรู้จากบทที่ 2 มาช่วยอธิบายได้นะจ๊ะ)</li>
                        <li><strong>ข้อเสนอแนะ:</strong> ถ้ามีเพื่อนอยากทำต่อ เราอยากแนะนำอะไรเขาบ้าง?</li>
                    </ul>
                </div>
            </div>

            <ChapterDraftingAssistant 
                chapterNumber={5} 
                stepNumber={11}
                projectTitle={projectTitle} 
                coreConcept={coreConcept} 
                researchData={researchData}
            />
        </div>
    );
};

export default ProjectTopic11;
