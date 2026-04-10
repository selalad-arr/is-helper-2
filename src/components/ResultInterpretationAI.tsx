import React, { useState } from 'react';
import { generateSimpleContent } from '../services/geminiService';
import { HelpCircle, Sparkles, Loader2, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
    projectTitle: string;
    researchData: string;
}

const ResultInterpretationAI: React.FC<Props> = ({ projectTitle, researchData }) => {
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze = async () => {
        setIsLoading(true);
        try {
            const prompt = `ชื่อโครงงาน: "${projectTitle}"
เอกสารอ้างอิงที่เคยสืบค้น: ${researchData}

กรุณาช่วยวิเคราะห์แนวทางการสรุปและอภิปรายผล (สำหรับบทที่ 5):
1. แนวทางการเดาคำตอบว่า "ทำไมผลถึงออกมาเป็นแบบนั้น" (เช่น เพราะสมุนไพรมีสาร... หรือ เพราะแรงดัน...)
2. เชื่อมโยงกับเอกสารอ้างอิง ว่าเหมือนหรือต่างจากที่คนอื่นเคยทำไว้อย่างไร
3. ข้อเสนอแนะในการทำครั้งต่อไป 2-3 ข้อ

ตอบเป็นภาษาที่เข้าใจง่าย ให้กำลังใจน้องๆ`;
            const res = await generateSimpleContent(prompt);
            setAnalysis(res);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <HelpCircle className="w-6 h-6" />
                    <h4 className="font-bold">AI ช่วยวิเคราะห์เบื้องหลังผลลัพธ์</h4>
                </div>
                {!analysis && (
                    <button 
                        onClick={handleAnalyze}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors text-sm font-medium flex items-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 font-bold" />}
                        เริ่มขุดหาคำตอบ
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
                            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto" />
                            <p className="text-slate-500 animate-pulse">พี่ AI กำลังเชื่อมโยงข้อมูลให้ใจเย็นๆ นะจ๊ะ...</p>
                        </motion.div>
                    ) : analysis ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                                <div className="prose prose-indigo dark:prose-invert max-w-none text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>') }} />
                            </div>
                            <div className="flex items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-400">
                                <Lightbulb className="w-4 h-4 shrink-0" />
                                <p>นำบทวิเคราะห์นี้ไปใช้ในการเขียนบทที่ 5 เพื่อให้โครงงานของเรามี "เหตุมีผล" ที่สุดจ้า!</p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="py-10 text-center text-slate-400 space-y-3">
                            <p>กดปุ่ม "เริ่มขุดหาคำตอบ" เพื่อให้ AI ช่วยอภิปรายผลให้จ้า</p>
                            <p className="text-xs italic">(ขั้นตอนนี้จะใช้ข้อมูลที่หามาในก้าวที่ 7-8 มาช่วยคิดด้วยนะ)</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ResultInterpretationAI;
