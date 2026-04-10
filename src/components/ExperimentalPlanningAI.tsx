import React, { useState } from 'react';
import { generateSimpleContent } from '../services/geminiService';
import { Beaker, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
    projectTitle: string;
    coreConcept: string;
    researchData: string;
}

const ExperimentalPlanningAI: React.FC<Props> = ({ projectTitle, coreConcept, researchData }) => {
    const [plan, setPlan] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePlan = async () => {
        setIsLoading(true);
        try {
            const prompt = `คุณคือผู้เชี่ยวชาญด้านวิธีวิจัยและโครงงานวิทยาศาสตร์
ชื่อโครงงาน: "${projectTitle}"
ปัญหาหลัก: ${coreConcept}
ข้อมูลอ้างอิง: ${researchData}

กรุณาวิเคราะห์และวางแผนกลยุทธ์การทดลองให้เหมาะสม โดยระบุ:
1. ตัวแปรต้น (สิ่งที่เปลี่ยน), ตัวแปรตาม (สิ่งที่วัด), ตัวแปรควบคุม (สิ่งที่คุมให้คงที่)
2. ชุดการทดลอง (ทรีทเมนต์) ที่ควรมีเพื่อเปรียบเทียบ
3. วิธีการวัดผลที่เป็นตัวเลข (Quantitative)
4. อุปกรณ์สำคัญที่ต้องใช้

ตอบด้วยภาษาทางการแต่เข้าใจง่ายสำหรับเด็กนักเรียน`;
            const res = await generateSimpleContent(prompt);
            setPlan(res);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Beaker className="w-6 h-6" />
                    <h4 className="font-bold">วิเคราะห์แผนการทดลองโดย AI</h4>
                </div>
                {!plan && (
                    <button 
                        onClick={handlePlan}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors text-sm font-medium flex items-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 font-bold" />}
                        เริ่มวิเคราะห์แผน
                    </button>
                )}
            </div>
            
            <div className="p-6">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="py-20 text-center space-y-4"
                        >
                            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto" />
                            <p className="text-slate-500 animate-pulse">พี่ AI กำลังคำนวณแผนการทดลองที่แม่นยำที่สุดให้จ้า...</p>
                        </motion.div>
                    ) : plan ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="prose prose-indigo dark:prose-invert max-w-none"
                        >
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <div dangerouslySetInnerHTML={{ __html: plan.replace(/\n/g, '<br/>') }} />
                            </div>
                            <div className="mt-6 flex justify-center">
                                <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    แผนนี้จะช่วยให้น้องๆ เขียนบทที่ 3 ได้ง่ายขึ้นมาก! ไปต่อที่ก้าวถัดไปเลย
                                </p>
                            </div>
                            <button onClick={() => setPlan('')} className="mt-4 text-xs text-slate-400 hover:text-slate-600 transition-colors underline">ล้างข้อมูลและวิเคราะห์ใหม่</button>
                        </motion.div>
                    ) : (
                        <div className="py-12 text-center text-slate-400 space-y-3">
                            <Sparkles className="w-12 h-12 mx-auto opacity-20" />
                            <p>กดปุ่ม "เริ่มวิเคราะห์แผน" ด้านบน เพื่อให้พี่ AI ช่วยวางโครงสร้างบทที่ 3 นะครับ</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ExperimentalPlanningAI;
