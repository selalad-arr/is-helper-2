import React, { useState, useEffect } from 'react';
import ChatInterface from '../../components/ChatInterface';
import { useProjectData } from '../../hooks/useProjectData';
import { useFirestoreData } from '../../hooks/useFirestore';
import { Sparkles, Lightbulb, CheckCircle2, Save, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ProjectTopic2 = () => {
    const { setProjectTitle } = useProjectData();
    const { data: chatData } = useFirestoreData('user_chats', 'project_ideation_brainstorm', {
        messages: '[]'
    });

    // We use a different hook to specifically target Chapter 1 (Step 5) for objectives
    const { updateData: updateChapter1 } = useFirestoreData('user_chapters', '5', {
        studentInputs: '{}'
    });

    const [extractedTitle, setExtractedTitle] = useState<string | null>(null);
    const [extractedObjectives, setExtractedObjectives] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState(false);

    // Watch chat messages for the special tags [TITLE: ...] and [OBJECTIVES: ...]
    useEffect(() => {
        try {
            const messages = JSON.parse(chatData.messages || '[]');
            const lastModelMessage = [...messages].reverse().find(m => m.role === 'model')?.parts[0].text || '';
            
            const titleMatch = lastModelMessage.match(/\[TITLE:\s*(.*?)\]/);
            const objectivesMatch = lastModelMessage.match(/\[OBJECTIVES:\s*(.*?)\]/s);

            if (titleMatch && titleMatch[1]) setExtractedTitle(titleMatch[1].trim());
            if (objectivesMatch && objectivesMatch[1]) setExtractedObjectives(objectivesMatch[1].trim());
        } catch (e) {
            console.error("Error parsing chat messages:", e);
        }
    }, [chatData.messages]);

    const handleApplyData = async () => {
        if (extractedTitle) {
            await setProjectTitle(extractedTitle);
        }
        if (extractedObjectives) {
            // Objectives go to Chapter 1 (Step 5), Section 2 (Key 1_1)
            const inputData = { '1_1': extractedObjectives };
            await updateChapter1({ studentInputs: JSON.stringify(inputData) });
        }
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const systemPrompt = `คุณคือ "พี่ AI ที่ปรึกษาโครงงาน" ผู้เชี่ยวชาญด้านการระดมสมอง และการวางโครงสร้างโครงงานวิจัย
ภารกิจของคุณคือ: ช่วยให้น้องๆ ค้นหา "หัวข้อโครงงาน" และ "วัตถุประสงค์" โดยรวม 3 ก้าวก่อนหน้าไว้ในที่เดียว

ขั้นตอนการทำงาน:
1. ชวนน้องๆ คุยเพื่อหาไอเดียที่ชอบ (หางานอดิเรก ปัญหาที่เจอ)
2. เมื่อได้ทิศทางแล้ว ให้ช่วยสรุป "ชื่อโครงงาน" ที่กระชับและน่าสนใจ
3. ช่วยร่างหัวข้อ "วัตถุประสงค์" (มักจะเริ่มด้วยคำว่า "เพื่อ...") 2-3 ข้อ

กติกาสำคัญ:
เมื่อน้องๆ ตัดสินใจเลือกหัวข้อและวัตถุประสงค์ได้แล้ว ให้คุณสรุปผลลัพธ์สุดท้ายในรูปแบบนี้เสมอ เพื่อให้ระบบบันทึกข้อมูลได้:
[TITLE: ชื่อโครงงานที่สรุปแล้ว]
[OBJECTIVES: 1. เพื่อ...
2. เพื่อ...]

ใช้ภาษาน่ารัก เป็นกันเอง และ Emoji เยอะๆ นะจ๊ะ!`;

    const welcomeMessage = "สวัสดีจ้า! มาเริ่มภารกิจ 3-in-1 กัน! 🚀 เดี๋ยวพี่ AI จะช่วยน้องหาทั้ง 'ไอเดีย', 'ชื่อโครงงาน' และ 'วัตถุประสงค์' ในทีเดียวเลย น้องมีเรื่องอะไรที่สนใจในใจบ้างไหม หรืออยากให้พี่ช่วยแนะนำหมวดที่สนุกๆ ดี?";

    const suggestedPrompts = [
        "อยากทำโครงงานเกี่ยวกับสุขภาพครับ",
        "หนูสนใจเรื่องสิ่งแวดล้อม ช่วยร่างชื่อเรื่องกับวัตถุประสงค์หน่อย",
        "ช่วยแนะนำโครงงานที่ทำได้ที่บ้านหน่อยค่ะ",
        "ผมชอบเรื่อง AI ครับ มีไอเดียโครงงานอะไรบ้าง?"
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500/10 to-purple-600/10 dark:from-indigo-500/5 dark:to-purple-600/5 p-8 rounded-[2.5rem] border border-indigo-200/50 dark:border-indigo-900/30">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles className="w-24 h-24 text-indigo-500" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-3 flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-indigo-500" />
                        Ideation & Design Hub 🎯
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                        ก้าวเดียวครบ! คุยกับพี่ AI เพื่อสรุป 'ชื่อโครงงาน' และ 'วัตถุประสงค์' แล้วข้อมูลจะถูกส่งไปยังรายงานของคุณทันที
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-900/40 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden h-[650px] flex flex-col">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest px-4 font-mono">Expert Advisor Chat</span>
                            <div className="flex gap-1.5 pr-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                            </div>
                        </div>
                        <ChatInterface 
                            systemPrompt={systemPrompt} 
                            welcomeMessage={welcomeMessage}
                            chatContext="project_ideation_brainstorm"
                            containerClassName="flex-1 rounded-none border-none shadow-none"
                            suggestedPrompts={suggestedPrompts}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <AnimatePresence>
                        {(extractedTitle || extractedObjectives) && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border-2 border-indigo-500 shadow-indigo-100 dark:shadow-none shadow-2xl space-y-5"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg">
                                        <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter">AI Proposal</h4>
                                </div>

                                {extractedTitle && (
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Title</label>
                                        <div className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                                            {extractedTitle}
                                        </div>
                                    </div>
                                )}

                                {extractedObjectives && (
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Objectives</label>
                                        <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700 whitespace-pre-wrap leading-relaxed">
                                            {extractedObjectives}
                                        </div>
                                    </div>
                                )}

                                <button 
                                    onClick={handleApplyData}
                                    className={`w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                                        isSaved 
                                        ? 'bg-emerald-500 text-white shadow-emerald-200' 
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
                                    } shadow-lg active:scale-95`}
                                >
                                    {isSaved ? <><CheckCircle2 className="w-4 h-4" /> บันทึกสำเร็จ!</> : <><Save className="w-4 h-4" /> นำไปใช้กับโครงงาน</>}
                                </button>
                                <p className="text-[10px] text-center text-slate-400 font-medium">เมื่อกดปุ่ม ข้อมูลจะถูกบันทึกลงในรายงานให้โดยอัตโนมัติ</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 space-y-4">
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-2">
                             <Target className="w-4 h-4 text-emerald-500" /> คำแนะนำเพิ่มเติม
                        </h4>
                        <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 leading-relaxed">
                            <li className="flex gap-2"><span>-</span> <span>คุยกับ AI จนกว่าน้องจะพอใจกับชื่อเรื่องและวัตถุประสงค์</span></li>
                            <li className="flex gap-2"><span>-</span> <span>หาก AI สรุปให้แล้ว ปุ่ม "นำไปใช้" จะปรากฏขึ้นมาด้านบน</span></li>
                            <li className="flex gap-2"><span>-</span> <span>วัตถุประสงค์ที่ดีควรขึ้นต้นด้วย "เพื่อ..." และวัดผลได้จ้า</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectTopic2;
