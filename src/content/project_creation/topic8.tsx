import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';

const ProjectTopic8 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 8: ออกแบบสิ่งประดิษฐ์และเตรียมเก็บข้อมูล 🛠️</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="text-lg">
                    ในส่วนนี้เราจะมาเป็น <strong>"นักออกแบบ"</strong> กัน! เราจะวางแผนว่าสิ่งประดิษฐ์ของเราหน้าตาเป็นยังไง และจะจดบันทึกข้อมูลตอนไหนดีจ้า
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="font-semibold mb-2 text-sky-600 dark:text-sky-400">สิ่งที่ต้องเตรียมทำ:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>วาดแบบร่าง:</strong> ลองวาดรูปสิ่งประดิษฐ์หรือขั้นตอนการทดลองของเราดูนะ</li>
                        <li><strong>แผนการจดข้อมูล:</strong> เราจะจดอะไรบ้าง? เช่น จดทุกวัน หรือจดทุกชั่วโมงดีนะ?</li>
                        <li><strong>เตรียมอุปกรณ์:</strong> เช่น สมุดจด, ไม้บรรทัด, หรือกล้องถ่ายรูปจ้า</li>
                    </ul>
                </div>
            </div>

            <ChapterDraftingAssistant 
                chapterNumber={3} 
                stepNumber={8}
                projectTitle={projectTitle} 
                coreConcept={coreConcept} 
                researchData={researchData}
            />
        </div>
    );
};

export default ProjectTopic8;
