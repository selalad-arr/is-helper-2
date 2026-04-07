
import React from 'react';
import { TrophyIcon, LightBulbIcon, PresentationChartBarIcon, SparklesIcon, DocumentTextIcon } from '../../ui/icons';
import AARAssistant from '../../components/AARAssistant';
import { useProjectData } from '../../hooks/useProjectData';

const EvalCard = ({ icon, title, children }: React.PropsWithChildren<{ icon: React.ReactNode, title: string }>) => (
    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 h-full">
        <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 text-sky-500">{icon}</div>
            <h5 className="font-bold text-lg text-slate-800 dark:text-slate-200">{title}</h5>
        </div>
        <div className="text-slate-700 dark:text-slate-300 space-y-1 pl-9">
            {children}
        </div>
    </div>
);

const Topic4 = () => {
    const { is3ProjectTitle } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การประเมินผลและการสรุปบทเรียน</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p>
                    เมื่อโครงการเสร็จสิ้นแล้ว งานของเรายังไม่จบเพียงเท่านั้น! ขั้นตอนสุดท้ายที่สำคัญมากคือ "การประเมินผล" (Evaluation) เพื่อดูว่าสิ่งที่เราทำไปนั้นประสบความสำเร็จตามเป้าหมายที่ตั้งไว้หรือไม่ และ "การสรุปบทเรียน" (Lessons Learned) เพื่อนำประสบการณ์ที่ได้ไปพัฒนาตนเองและโครงการอื่นๆ ในอนาคต
                </p>

                <h4 className="font-semibold text-xl !mt-8 text-slate-800 dark:text-slate-100">ขั้นตอนการประเมินและสรุปผล</h4>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <EvalCard icon={<TrophyIcon className="w-6 h-6" />} title="1. วัดผลความสำเร็จ (KPIs)">
                        <p>กลับไปดู "วัตถุประสงค์" และ "ผลที่คาดว่าจะได้รับ" ในแผนโครงการ แล้วประเมินว่าเราทำได้ตามนั้นไหม เช่น ถ้าตั้งเป้าลดขยะ 20% เราลดได้จริงเท่าไหร่? (ใช้แบบสอบถาม, การสังเกต, หรือการนับจำนวน)</p>
                    </EvalCard>
                    <EvalCard icon={<LightBulbIcon className="w-6 h-6" />} title="2. ถอดบทเรียน (AAR)">
                        <p>ทำ After Action Review (AAR) โดยให้ทีมงานมาคุยกันว่า: อะไรที่ทำได้ดี? อะไรที่ควรปรับปรุง? ปัญหาที่พบคืออะไรและแก้ยังไง? และถ้าทำโครงการนี้อีกครั้ง จะทำอะไรให้ต่างไปจากเดิม?</p>
                    </EvalCard>
                    <EvalCard icon={<DocumentTextIcon className="w-6 h-6" />} title="3. จัดทำรายงานสรุปผล">
                        <p>รวบรวมข้อมูลทั้งหมดตั้งแต่ต้นจนจบมาเขียนเป็นรายงาน (IS3 Report) โดยเล่าถึงที่มา, วัตถุประสงค์, วิธีทำ, ผลการดำเนินงาน, ปัญหาอุปสรรค, และข้อเสนอแนะ</p>
                    </EvalCard>
                    <EvalCard icon={<PresentationChartBarIcon className="w-6 h-6" />} title="4. นำเสนอและเผยแพร่">
                        <p>นำผลงานความสำเร็จไปเล่าให้คนอื่นฟัง! อาจจะทำเป็นบอร์ดนิทรรศการ, วิดีโอพรีเซนต์, หรือโพสต์ลงโซเชียลมีเดีย เพื่อสร้างแรงบันดาลใจให้ผู้อื่นลุกขึ้นมาทำสิ่งดีๆ เพื่อสังคม</p>
                    </EvalCard>
                </div>

                <AARAssistant projectTitle={is3ProjectTitle} />

                <h4 className="font-semibold text-xl !mt-8 text-slate-800 dark:text-slate-100">คุณค่าที่แท้จริงของ IS3</h4>
                <div className="mt-4 p-5 rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-900/30 dark:to-indigo-900/30 border border-sky-100 dark:border-sky-800">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                            <SparklesIcon className="w-8 h-8 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
                                "ความสำเร็จของ IS3 ไม่ได้วัดที่ความยิ่งใหญ่ของโครงการ แต่วัดที่การเปลี่ยนแปลงที่เกิดขึ้น"
                            </p>
                            <p className="text-slate-600 dark:text-slate-400">
                                ไม่ว่าโครงการของคุณจะเล็กหรือใหญ่ หากมันสามารถสร้างรอยยิ้ม แก้ปัญหา หรือทำให้สังคมรอบตัวดีขึ้นได้แม้นิดเดียว นั่นคือความสำเร็จที่ยิ่งใหญ่ที่สุดแล้ว นอกจากนี้ ทักษะการคิดวิเคราะห์ การวางแผน การทำงานเป็นทีม และการแก้ปัญหาที่คุณได้ฝึกฝน จะเป็น "อาวุธ" สำคัญที่ติดตัวคุณไปตลอดชีวิต
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic4;