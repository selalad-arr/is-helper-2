import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChapterDraftingAssistant from '../../components/ChapterDraftingAssistant';

const ProjectTopic12 = () => {
    const { projectTitle, coreConcept, researchData } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 12: โชว์ผลงานและทำบอร์ดโครงงานสุดอลังการ! 🖼️</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="text-lg">
                    ก้าวสุดท้ายแล้ว! คือการ <strong>"เล่าเรื่องราว"</strong> ของเราให้คนอื่นฟังและทำให้เขาประทับใจในผลงานเราจ้า
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <p className="font-semibold mb-2 flex items-center gap-2 text-pink-600 dark:text-pink-400">📌 การทำบอร์ด/โปสเตอร์:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>ชื่อเรื่องเด่นชัด:</strong> ตัวหนังสือต้องใหญ่และอ่านง่ายนะ</li>
                            <li><strong>รูปภาพสวยงาม:</strong> ใช้รูปเยอะๆ แทนตัวหนังสือจะทำให้น่าสนใจขึ้นจ้า</li>
                            <li><strong>สีสันสดใส:</strong> เลือกสีที่เข้ากันและดูสบายตา</li>
                            <li><strong>ข้อมูลครบ:</strong> มีทั้งที่มา, วิธีทำ, และผลสรุปนะจ๊ะ</li>
                        </ul>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <p className="font-semibold mb-2 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">🎤 การนำเสนอ (เล่าเรื่อง):</p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>เปิดเรื่องให้น่าสนใจ:</strong> เริ่มต้นด้วยคำถามหรือปัญหาที่น่าตื่นเต้น</li>
                            <li><strong>เล่าเหมือนนิทาน:</strong> เล่าว่าเราเจอปัญหาอะไรและแก้ยังไง</li>
                            <li><strong>มั่นใจเข้าไว้:</strong> ยิ้มแย้มและตอบคำถามอย่างมั่นใจนะจ๊ะ</li>
                            <li><strong>รักษาเวลา:</strong> เล่าให้กระชับและได้ใจความสำคัญจ้า</li>
                        </ul>
                    </div>
                </div>
            </div>

            <ChapterDraftingAssistant 
                chapterNumber={6} 
                stepNumber={12}
                projectTitle={projectTitle} 
                coreConcept={coreConcept} 
                researchData={researchData}
            />
        </div>
    );
};

export default ProjectTopic12;
