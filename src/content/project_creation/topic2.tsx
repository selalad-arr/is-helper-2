import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import ChatInterface from '../../components/ChatInterface';
import { projectCreationConfig } from './config';
import { Tag, CheckCircle, MessageSquare } from 'lucide-react';

const ProjectTopic2 = () => {
    const { projectTitle, setProjectTitle } = useProjectData();

    const systemPrompt = React.useMemo(() => 
        projectCreationConfig.systemPrompt + "\nเป้าหมายหลักในตอนนี้คือช่วยให้น้องๆ ได้ชื่อโครงงานที่ชัดเจนและน่าสนใจ เมื่อได้ชื่อที่น้องชอบแล้ว ให้สรุปและบอกให้น้องนำชื่อนั้นไปกรอกที่ช่องด้านล่าง"
    , []);

    const welcomeMessage = React.useMemo(() => projectCreationConfig.welcomeMessage, []);

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 2: ระดมสมองและออกแบบโครงงาน (AI) 💡</h3>
                
                <div className="bg-sky-50 dark:bg-sky-900/20 p-5 rounded-2xl border border-sky-100 dark:border-sky-800/50 mb-6">
                    <p className="text-sky-800 dark:text-sky-300 leading-relaxed font-medium">
                        คุยกับพี่ AI เพื่อหาไอเดียที่ใช่! ลองเล่าสิ่งที่เราสนใจ หรือปัญหาที่อยากแก้ให้พี่ AI ฟังนะ พี่เขาจะช่วยระดมสมองจนเราได้ชื่อโครงงานสุดเจ๋งออกมาเลย
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
                    <ChatInterface
                        systemPrompt={systemPrompt}
                        welcomeMessage={welcomeMessage}
                        containerClassName="h-[500px]"
                        chatContext="project_ideation"
                        suggestedPrompts={[
                            "ช่วยหาไอเดียโครงงานเกี่ยวกับสิ่งแวดล้อมหน่อย",
                            "อยากทำโครงงานเกี่ยวกับแมลง แต่ไม่รู้จะทำอะไรดี",
                            "อยากทำเครื่องช่วยแบ่งเบาภาระงานบ้าน",
                            "ช่วยแนะนำชื่อโครงงานภาษาอังกฤษเท่ๆ หน่อย"
                        ]}
                    />
                </div>
            </div>

            <div className="pt-8 border-t-2 border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl">
                        <Tag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100">สรุปชื่อโครงงานที่เลือก ✨</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">เมื่อตกลงกับพี่ AI ได้แล้ว นำชื่อมาพิมพ์ใส่ตรงนี้ได้เลย!</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800/40 p-6 md:p-8 rounded-3xl border-2 border-indigo-100 dark:border-indigo-900/30 shadow-sm">
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            placeholder="เช่น เครื่องบีบขวดพลาสติกจอมพลัง, การศึกษาการเจริญเติบโตของพืชด้วยแสง LED..."
                            className="w-full p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-xl font-medium"
                        />
                        
                        {projectTitle && (
                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium animate-in fade-in slide-in-from-top-2">
                                <CheckCircle className="w-5 h-5" />
                                <span>เยี่ยมไปเลย! ชื่อโครงงานนี้ดูดีมากๆ พร้อมลุยต่อกันแล้ว!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectTopic2;

