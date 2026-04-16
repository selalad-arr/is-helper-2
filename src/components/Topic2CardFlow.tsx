import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateSimpleContent } from '../services/gemini';
import { ArrowRight, CheckCircle, Loader2, RefreshCw, Copy, Sparkles } from 'lucide-react';

interface Topic2CardFlowProps {
    projectTitle: string;
    setCoreConcept: (concept: string) => void;
}

const Topic2CardFlow: React.FC<Topic2CardFlowProps> = ({ projectTitle, setCoreConcept }) => {
    // Steps: 1 (Story), 2 (Research), 3 (More?), 4 (AI Generating/Done)
    const [step, setStep] = useState<number>(1);
    
    // Store pairs of [story, research]
    const [problemDetails, setProblemDetails] = useState<{ story: string; research: string }[]>([]);
    
    // Current inputs
    const [currentStory, setCurrentStory] = useState('');
    const [currentResearch, setCurrentResearch] = useState('');
    
    // AI Output
    const [aiSummary, setAiSummary] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNextStep1 = () => {
        if (!currentStory.trim()) return;
        setStep(2);
    };

    const handleNextStep2 = () => {
        if (!currentResearch.trim()) return;
        setStep(3);
    };

    const handleAddMore = () => {
        setProblemDetails(prev => [...prev, { story: currentStory, research: currentResearch }]);
        setCurrentStory('');
        setCurrentResearch('');
        setStep(1);
    };

    const handleFinish = async () => {
        const finalDetails = [...problemDetails, { story: currentStory, research: currentResearch }];
        setProblemDetails(finalDetails);
        setStep(4);
        setIsGenerating(true);
        setError(null);

        try {
            const prompt = `คุณคือผู้เชี่ยวชาญด้านโครงงานวิทยาศาสตร์และ IS
ชื่อโครงงาน: "${projectTitle || 'ไม่ระบุ'}"

นักเรียนได้เล่าเรื่องราวปัญหาและข้อมูลที่สืบค้นมาดังนี้:
${finalDetails.map((d, i) => `ข้อมูลชุดที่ ${i + 1}:
- เรื่องราวที่สัมผัส (ประสบการณ์): ${d.story}
- ข้อมูลที่สืบค้นมา: ${d.research}`).join('\n\n')}

จากข้อมูลข้างต้น กรุณาวิเคราะห์ปัญหาและสรุป "แกนหลักของโครงงาน" ออกมาให้ชัดเจน โดยแบ่งเป็นหัวข้อดังนี้:
1. ปัญหาและที่มา (สรุปจากเรื่องเล่า)
2. ข้อมูลสนับสนุน (สรุปจากสิ่งที่สืบค้น)
3. วัตถุประสงค์ของโครงงาน
4. สมมติฐาน (เขียนในรูปแบบ "ถ้า... ดังนั้น...")
5. ตัวแปรต้น, ตัวแปรตาม, ตัวแปรควบคุม

เขียนด้วยภาษาไทยที่เข้าใจง่าย เป็นกันเองแต่มีหลักการ`;

            const response = await generateSimpleContent(prompt);
            setAiSummary(response);
            setCoreConcept(response); // Auto-save to core concept
        } catch (err: any) {
            setError(err.message || 'เกิดข้อผิดพลาดในการวิเคราะห์ข้อมูล');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleReset = () => {
        setStep(1);
        setProblemDetails([]);
        setCurrentStory('');
        setCurrentResearch('');
        setAiSummary('');
        setError(null);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[400px] flex flex-col relative">
            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 dark:bg-slate-700 w-full">
                <div 
                    className="h-full bg-sky-500 transition-all duration-500 ease-in-out"
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
                                <span className="inline-block px-3 py-1 bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 rounded-full text-sm font-semibold mb-2">
                                    ส่วนที่ 1: เล่าเรื่องจากประสบการณ์
                                </span>
                                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    คุณพบเจอเหตุการณ์หรือปัญหาอะไรมาบ้าง?
                                </h4>
                                <p className="text-slate-500 dark:text-slate-400">
                                    เล่าเรื่องราวที่คุณสัมผัสมาจริงๆ เช่น "เห็นเพื่อนทิ้งขยะไม่ลงถัง" หรือ "พบว่าต้นไม้ในสวนโรงเรียนเหี่ยวเฉา"
                                </p>
                            </div>
                            
                            <textarea
                                value={currentStory}
                                onChange={(e) => setCurrentStory(e.target.value)}
                                placeholder="พิมพ์เรื่องราวที่คุณพบเจอที่นี่..."
                                rows={4}
                                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none text-lg"
                                autoFocus
                            />

                            <div className="flex justify-end">
                                <button
                                    onClick={handleNextStep1}
                                    disabled={!currentStory.trim()}
                                    className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-medium transition-colors"
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
                                    ส่วนที่ 2: ข้อมูลจากการสืบค้น
                                </span>
                                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    คุณไปค้นข้อมูลอะไรที่เกี่ยวข้องมาได้บ้าง?
                                </h4>
                                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-600 dark:text-slate-400 italic">
                                    "จากเรื่องที่คุณเล่า: <span className="font-semibold text-sky-600 dark:text-sky-400 line-clamp-1">{currentStory}</span>"
                                </div>
                            </div>
                            
                            <textarea
                                value={currentResearch}
                                onChange={(e) => setCurrentResearch(e.target.value)}
                                placeholder="เช่น สถิติจากอินเทอร์เน็ต, ความรู้จากหนังสือ, หรือข้อมูลจากการสอบถามผู้รู้..."
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
                                    disabled={!currentResearch.trim()}
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
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="max-w-2xl mx-auto w-full space-y-8 text-center"
                        >
                            <div className="w-20 h-20 mx-auto bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center mb-6">
                                <Sparkles className="w-10 h-10 text-sky-500" />
                            </div>
                            
                            <h4 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                                ข้อมูลครบถ้วนไหมครับ?
                            </h4>
                            <p className="text-slate-500 dark:text-slate-400 text-lg">
                                ถ้ามีเรื่องเล่าหรือข้อมูลอื่นเพิ่มเติมเรามาใส่เพิ่มกันได้ แต่ถ้าพอแล้วให้ AI ช่วยวิเคราะห์และสรุปให้เลยครับ
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                                <button
                                    onClick={handleAddMore}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-slate-800 border-2 border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-xl font-bold text-lg transition-colors"
                                >
                                    <RefreshCw className="w-5 h-5" /> เพิ่มข้อมูลอีก
                                </button>
                                <button
                                    onClick={handleFinish}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-indigo-500/30"
                                >
                                    <CheckCircle className="w-5 h-5" /> วิเคราะห์และสรุปเลย
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
                                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium animate-pulse">
                                        AI กำลังวิเคราะห์ปัญหาและร่างแนวทางโครงงาน...
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
                                            <Sparkles className="w-6 h-6 text-indigo-500" />
                                            ผลการวิเคราะห์และสรุปแนวทาง
                                        </h4>
                                        <button
                                            onClick={handleReset}
                                            className="text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
                                        >
                                            <RefreshCw className="w-4 h-4" /> เริ่มใหม่ทั้งหมด
                                        </button>
                                    </div>
                                    
                                    <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-xl prose prose-indigo dark:prose-invert max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: aiSummary.replace(/\n/g, '<br/>') }} />
                                    </div>

                                    <div className="flex justify-center">
                                        <p className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-full">
                                            <CheckCircle className="w-5 h-5" />
                                            ระบบได้บันทึกข้อมูลนี้ลงใน "บันทึกแกนหลักของโครงงาน" ด้านล่างเรียบร้อยแล้ว
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Topic2CardFlow;
