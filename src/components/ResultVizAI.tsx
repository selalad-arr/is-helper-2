import React, { useState } from 'react';
import { generateSimpleContent } from '../services/gemini';
import { fetchFullReportContext } from '../services/reportContextService';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, Sparkles, Loader2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
    projectTitle: string;
}

const ResultVizAI: React.FC<Props> = ({ projectTitle }) => {
    const { user, userData } = useAuth();
    const [advice, setAdvice] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGetAdvice = async () => {
        setIsLoading(true);
        try {
            let fullReportContext = "";
            if (user && userData) {
                fullReportContext = await fetchFullReportContext(user.uid, userData.classId || 'personal');
            }

            const prompt = `ชื่อโครงงาน: "${projectTitle}"
${fullReportContext ? `[บริบทของเล่มรายงานปัจจุบัน]\n${fullReportContext}\n\n` : ''}

กรุณาแนะนำการเลือกใช้ "กราฟ" หรือ "ตาราง" ที่เหมาะสมสำหรับการโชว์ผลการทดลองของโครงงานนี้
1. ควรใช้ตารางแบบไหน (หัวข้อหัวตารางควรมีอะไรบ้าง)
2. ควรใช้กราฟประเภทไหน (แท่ง, เส้น, หรือวงกลม) เพราะอะไร
3. แนะนำจุดที่ควรสังเกตเป็นพิเศษในผลการทดลอง

ตอบเป็นภาษาที่เข้าใจง่าย เป็นกันเองสำหรับเด็ก`;
            const res = await generateSimpleContent(prompt);
            setAdvice(res);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-6 h-6" />
                    <h4 className="font-bold">AI แนะนำการนำเสนอผลข้อมูล</h4>
                </div>
                {!advice && (
                    <button 
                        onClick={handleGetAdvice}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors text-sm font-medium flex items-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 font-bold" />}
                        ขอคำแนะนำ
                    </button>
                )}
            </div>
            
            <div className="p-6">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="py-16 text-center space-y-4"
                        >
                            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto" />
                            <p className="text-slate-500 animate-pulse">กำลังออกแบบตารางและกราฟที่สวยที่สุดให้นะจ๊ะ...</p>
                        </motion.div>
                    ) : advice ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                                <div className="prose prose-emerald dark:prose-invert max-w-none text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: advice.replace(/\n/g, '<br/>') }} />
                            </div>
                            <div className="flex items-center gap-2 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-400">
                                <Info className="w-4 h-4 shrink-0" />
                                <p>นำไอเดียเหล่านี้ไปเตรียมสร้างตารางบันทึกผลจริงในก้าวถัดไปได้เลยจ้า!</p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="py-10 text-center text-slate-400">
                            <p>กดปุ่ม "ขอคำแนะนำ" เพื่อดูว่าควรโชว์ข้อมูลอย่างไรให้ว้าว!</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ResultVizAI;
