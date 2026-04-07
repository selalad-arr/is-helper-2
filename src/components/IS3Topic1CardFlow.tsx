import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateSimpleContent } from '../services/geminiService';
import { ArrowRight, CheckCircle, Loader2, RefreshCw, Sparkles } from 'lucide-react';

interface IS3Topic1CardFlowProps {
    projectTitle?: string;
    setProjectTitle?: (title: string) => void;
}

const IS3Topic1CardFlow: React.FC<IS3Topic1CardFlowProps> = ({ projectTitle, setProjectTitle }) => {
    // Steps: 1 (Problem), 2 (Effects), 3 (Causes), 4 (AI Generating/Done)
    const [step, setStep] = useState<number>(1);
    
    // Current inputs
    const [problem, setProblem] = useState('');
    const [effects, setEffects] = useState('');
    const [causes, setCauses] = useState('');
    
    // AI Output
    const [aiSummary, setAiSummary] = useState('');
    const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNextStep1 = () => {
        if (!problem.trim()) return;
        setStep(2);
    };

    const handleNextStep2 = () => {
        if (!effects.trim()) return;
        setStep(3);
    };

    const handleFinish = async () => {
        if (!causes.trim()) return;
        setStep(4);
        setIsGenerating(true);
        setError(null);

        try {
            const prompt = `คุณคือผู้เชี่ยวชาญด้านการพัฒนาชุมชนและวิชา IS3
นักเรียนได้ทำการวิเคราะห์ปัญหาด้วยเทคนิค Problem Tree Analysis ดังนี้:

- ปัญหาหลัก (ลำต้น): ${problem}
- ผลกระทบ (กิ่งก้าน): ${effects}
- สาเหตุที่แท้จริง (ราก): ${causes}

กรุณาทำหน้าที่เป็นที่ปรึกษา:
1. สรุป Problem Tree ของนักเรียนให้เห็นภาพชัดเจนขึ้น (สั้นๆ ไม่เกิน 3 บรรทัด)
2. เสนอแนะชื่อ "โครงงานบริการสังคม" 3 ชื่อ ที่สามารถเข้าไปแก้ไขที่ "สาเหตุ (ราก)" ของปัญหานี้ได้โดยตรง

ตอบกลับมาเป็น JSON format เท่านั้น ห้ามมีข้อความอื่น โดยมีโครงสร้างดังนี้:
{
  "summary": "ข้อความสรุป Problem Tree",
  "ideas": ["ชื่อโครงงานที่ 1", "ชื่อโครงงานที่ 2", "ชื่อโครงงานที่ 3"]
}`;

            const response = await generateSimpleContent(prompt);
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsedData = JSON.parse(jsonMatch[0]);
                setAiSummary(parsedData.summary);
                setAiSuggestions(parsedData.ideas);
            } else {
                throw new Error("ไม่สามารถอ่านข้อมูลจาก AI ได้");
            }
        } catch (err: any) {
            setError(err.message || 'เกิดข้อผิดพลาดในการวิเคราะห์ปัญหา');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleReset = () => {
        setStep(1);
        setProblem('');
        setEffects('');
        setCauses('');
        setAiSummary('');
        setAiSuggestions([]);
        setError(null);
    };

    const handleSelectTitle = (title: string) => {
        if (setProjectTitle) {
            setProjectTitle(title);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[400px] flex flex-col relative">
            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 dark:bg-slate-700 w-full">
                <div 
                    className="h-full bg-emerald-500 transition-all duration-500 ease-in-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                />
            </div>

            <div className="flex-1 p-6 md:p-10 flex flex-col justify-center relative">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="max-w-2xl mx-auto w-full space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold mb-2">
                                    ส่วนที่ 1: ปัญหาหลัก (ลำต้น)
                                </span>
                                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    มีปัญหาอะไรในโรงเรียนหรือชุมชนที่คุณรู้สึกว่า 'น่าจะดีกว่านี้ได้' บ้าง?
                                </h4>
                                <p className="text-slate-500 dark:text-slate-400">
                                    เช่น "ขยะเยอะที่ชายหาด" หรือ "นักเรียนไม่กินผักในโรงอาหาร"
                                </p>
                            </div>
                            
                            <textarea
                                value={problem}
                                onChange={(e) => setProblem(e.target.value)}
                                placeholder="พิมพ์ปัญหาที่คุณสนใจที่นี่..."
                                rows={4}
                                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none text-lg"
                                autoFocus
                            />

                            <div className="flex justify-end">
                                <button
                                    onClick={handleNextStep1}
                                    disabled={!problem.trim()}
                                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-medium transition-colors"
                                >
                                    ถัดไป <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="max-w-2xl mx-auto w-full space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <span className="inline-block px-3 py-1 bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 rounded-full text-sm font-semibold mb-2">
                                    ส่วนที่ 2: ผลกระทบ (กิ่งก้าน)
                                </span>
                                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    ปัญหานี้ส่งผลกระทบอะไรตามมาบ้าง?
                                </h4>
                                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-600 dark:text-slate-400 italic">
                                    "จากปัญหา: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{problem}</span>"
                                </div>
                            </div>
                            
                            <textarea
                                value={effects}
                                onChange={(e) => setEffects(e.target.value)}
                                placeholder="เช่น ทำให้สัตว์ทะเลตาย, ทัศนียภาพไม่สวยงาม, หรือส่งผลเสียต่อสุขภาพ..."
                                rows={4}
                                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none text-lg"
                                autoFocus
                            />

                            <div className="flex justify-between">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-6 py-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors"
                                >
                                    ย้อนกลับ
                                </button>
                                <button
                                    onClick={handleNextStep2}
                                    disabled={!effects.trim()}
                                    className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-medium transition-colors"
                                >
                                    ถัดไป <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="max-w-2xl mx-auto w-full space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <span className="inline-block px-3 py-1 bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 rounded-full text-sm font-semibold mb-2">
                                    ส่วนที่ 3: สาเหตุ (ราก)
                                </span>
                                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    อะไรคือ "สาเหตุที่แท้จริง" ที่ทำให้เกิดปัญหานี้?
                                </h4>
                                <p className="text-slate-500 dark:text-slate-400">
                                    ลองขุดให้ลึกถึงต้นตอของปัญหา เพราะนี่คือจุดที่เราจะเข้าไปแก้ไข!
                                </p>
                            </div>
                            
                            <textarea
                                value={causes}
                                onChange={(e) => setCauses(e.target.value)}
                                placeholder="เช่น คนขาดความตระหนักรู้, ไม่มีถังขยะเพียงพอ, หรือเมนูอาหารไม่น่าสนใจ..."
                                rows={4}
                                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none text-lg"
                                autoFocus
                            />

                            <div className="flex justify-between">
                                <button
                                    onClick={() => setStep(2)}
                                    className="px-6 py-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors"
                                >
                                    ย้อนกลับ
                                </button>
                                <button
                                    onClick={handleFinish}
                                    disabled={!causes.trim()}
                                    className="flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-rose-500/30"
                                >
                                    <CheckCircle className="w-5 h-5" /> วิเคราะห์และหาไอเดีย
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl mx-auto w-full space-y-6"
                        >
                            {isGenerating ? (
                                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium animate-pulse">
                                        AI กำลังวิเคราะห์ Problem Tree และคิดไอเดียโครงงาน...
                                    </p>
                                </div>
                            ) : error ? (
                                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl text-center space-y-4">
                                    <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                                    <button 
                                        onClick={handleFinish}
                                        className="px-4 py-2 bg-red-100 dark:bg-red-800/50 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                                    >
                                        ลองใหม่อีกครั้ง
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                            <Sparkles className="w-6 h-6 text-emerald-500" />
                                            บทสรุปและไอเดียโครงงานของคุณ
                                        </h4>
                                        <button
                                            onClick={handleReset}
                                            className="text-sm text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
                                        >
                                            <RefreshCw className="w-4 h-4" /> เริ่มใหม่ทั้งหมด
                                        </button>
                                    </div>
                                    
                                    <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-xl prose prose-emerald dark:prose-invert max-w-none">
                                        <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">สรุปปัญหา:</p>
                                        <p className="text-emerald-700 dark:text-emerald-400">{aiSummary}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="font-semibold text-slate-700 dark:text-slate-300">ไอเดียโครงงานที่แนะนำ:</p>
                                        {aiSuggestions.map((title, index) => (
                                            <div 
                                                key={index} 
                                                onClick={() => handleSelectTitle(title)}
                                                className={`p-4 border rounded-xl cursor-pointer transition-all ${
                                                    projectTitle === title 
                                                    ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/30 dark:border-emerald-500' 
                                                    : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-emerald-700 dark:hover:bg-slate-700'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <p className={`text-lg ${projectTitle === title ? 'text-emerald-800 dark:text-emerald-200 font-semibold' : 'text-slate-700 dark:text-slate-300'}`}>
                                                        {title}
                                                    </p>
                                                    {projectTitle === title && <CheckCircle className="w-6 h-6 text-emerald-500" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {setProjectTitle && (
                                        <div className="flex justify-center mt-4">
                                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                                คลิกที่ชื่อโครงงานเพื่อเลือก
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default IS3Topic1CardFlow;
