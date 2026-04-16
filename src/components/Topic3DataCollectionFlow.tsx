import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateSimpleContent } from '../services/gemini';
import { ArrowRight, CheckCircle, Loader2, RefreshCw, Copy, Sparkles, User, Globe, BookOpen } from 'lucide-react';

interface Topic3DataCollectionFlowProps {
    projectTitle: string;
    setResearchData: (data: string) => void;
}

const Topic3DataCollectionFlow: React.FC<Topic3DataCollectionFlowProps> = ({ projectTitle, setResearchData }) => {
    // Steps: 1 (Expert), 2 (Internet), 3 (Author), 4 (AI Generating/Done)
    const [step, setStep] = useState<number>(1);
    
    // Store data
    const [academicInfo, setAcademicInfo] = useState('');
    const [bookInfo, setBookInfo] = useState('');
    const [orgInfo, setOrgInfo] = useState('');
    
    // AI Output
    const [aiSummary, setAiSummary] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNextStep1 = () => {
        setStep(2);
    };

    const handleNextStep2 = () => {
        setStep(3);
    };

    const handleFinish = async () => {
        setStep(4);
        setIsGenerating(true);
        setError(null);

        try {
            const prompt = `คุณคือผู้เชี่ยวชาญด้านการวิจัยและโครงงาน
ชื่อโครงงาน: "${projectTitle || 'ไม่ระบุ'}"

ข้อมูลจากแหล่งอ้างอิงมาตรฐานที่นักเรียนรวบรวมมามีดังนี้:
1. วารสารวิชาการ/งานวิจัย: ${academicInfo || 'ไม่ได้ระบุ'}
2. หนังสือ/ตำราเรียน: ${bookInfo || 'ไม่ได้ระบุ'}
3. หน่วยงาน/องค์กรที่น่าเชื่อถือ: ${orgInfo || 'ไม่ได้ระบุ'}

กรุณาสรุปข้อมูลเหล่านี้ให้เป็น "ฐานข้อมูลอ้างอิงมาตรฐาน" ที่เป็นระบบ โดยแบ่งเป็นหัวข้อ:
1. สรุปองค์ความรู้จากงานวิจัย (Research Synthesis)
2. ทฤษฎีและหลักการพื้นฐาน (Theoretical Framework)
3. ข้อมูลสนับสนุนจากหน่วยงาน (Institutional Data)
4. รายการอ้างอิงเบื้องต้น (Preliminary References) - จัดรูปแบบให้ถูกต้องตามหลักวิชาการ

เขียนด้วยภาษาไทยที่เป็นทางการ น่าเชื่อถือ เพื่อให้นักเรียนนำไปใช้ในบทที่ 2 (เอกสารที่เกี่ยวข้อง) ได้ทันที`;

            const response = await generateSimpleContent(prompt);
            setAiSummary(response);
            setResearchData(response); // Auto-save
        } catch (err: any) {
            setError(err.message || 'เกิดข้อผิดพลาดในการวิเคราะห์ข้อมูล');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleReset = () => {
        setStep(1);
        setAcademicInfo('');
        setBookInfo('');
        setOrgInfo('');
        setAiSummary('');
        setError(null);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[450px] flex flex-col relative">
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
                                <span className="inline-block px-3 py-1 bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 rounded-full text-sm font-semibold mb-2 flex items-center gap-2 w-fit mx-auto">
                                    <BookOpen className="w-4 h-4" /> ส่วนที่ 1: วารสารและงานวิจัย
                                </span>
                                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    พบข้อมูลอะไรจากวารสารหรือวิทยานิพนธ์บ้าง?
                                </h4>
                                <p className="text-slate-500 dark:text-slate-400">
                                    สรุปผลการศึกษาที่เกี่ยวข้อง หรือสถิติที่น่าสนใจจากฐานข้อมูลวิชาการ
                                </p>
                            </div>
                            
                            <textarea
                                value={academicInfo}
                                onChange={(e) => setAcademicInfo(e.target.value)}
                                placeholder="เช่น จากงานวิจัยของ... พบว่า... "
                                rows={4}
                                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none text-lg"
                                autoFocus
                            />

                            <div className="flex justify-end">
                                <button
                                    onClick={handleNextStep1}
                                    className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors"
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
                                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-2 flex items-center gap-2 w-fit mx-auto">
                                    <BookOpen className="w-4 h-4" /> ส่วนที่ 2: หนังสือและตำราเรียน
                                </span>
                                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    ทฤษฎีหรือหลักการพื้นฐานจากตำราคืออะไร?
                                </h4>
                                <p className="text-slate-500 dark:text-slate-400">
                                    ระบุแนวคิดสำคัญ หรือนิยามศัพท์ที่คุณค้นหาได้จากหนังสืออ้างอิง
                                </p>
                            </div>
                            
                            <textarea
                                value={bookInfo}
                                onChange={(e) => setBookInfo(e.target.value)}
                                placeholder="เช่น จากหนังสือ... บทที่... กล่าวถึงทฤษฎี... ว่าด้วยเรื่อง..."
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
                                    className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors"
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
                                <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold mb-2 flex items-center gap-2 w-fit mx-auto">
                                    <Globe className="w-4 h-4" /> ส่วนที่ 3: หน่วยงานหรือองค์กร
                                </span>
                                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    ข้อมูลจากหน่วยงานราชการหรือองค์กรที่เกี่ยวข้อง?
                                </h4>
                                <p className="text-slate-500 dark:text-slate-400">
                                    เช่น ประกาศกระทรวง, สถิติจากหน่วยงานรัฐ, หรือข้อมูลจากองค์กรสากล
                                </p>
                            </div>
                            
                            <textarea
                                value={orgInfo}
                                onChange={(e) => setOrgInfo(e.target.value)}
                                placeholder="เช่น ข้อมูลจากกรมอนามัย ระบุว่า... "
                                rows={4}
                                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none text-lg"
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
                                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/30"
                                >
                                    วิเคราะห์และสรุป <CheckCircle className="w-5 h-5" />
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
                                    <Loader2 className="w-12 h-12 text-sky-500 animate-spin" />
                                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium animate-pulse">
                                        AI กำลังรวบรวมและสรุปข้อมูลการสืบค้นของคุณ...
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
                                            <Sparkles className="w-6 h-6 text-sky-500" />
                                            คลังข้อมูลอ้างอิงมาตรฐาน
                                        </h4>
                                        <button
                                            onClick={handleReset}
                                            className="text-sm text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1 transition-colors"
                                        >
                                            <RefreshCw className="w-4 h-4" /> เริ่มใหม่
                                        </button>
                                    </div>
                                    
                                    <div className="p-6 bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/50 rounded-xl prose prose-sky dark:prose-invert max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: aiSummary.replace(/\n/g, '<br/>') }} />
                                    </div>

                                    <div className="flex justify-center">
                                        <p className="text-amber-600 dark:text-amber-400 font-medium flex flex-col items-center gap-2 bg-amber-50 dark:bg-amber-900/30 px-6 py-3 rounded-2xl border border-amber-100 dark:border-amber-800/30">
                                            <span className="flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5" />
                                                วิเคราะห์ข้อมูลสำเร็จแล้ว!
                                            </span>
                                            <span className="text-xs opacity-80">อย่าลืมกดปุ่ม "บันทึกข้อมูลการสืบค้น" ด้านล่างด้วยนะจ๊ะ ✨</span>
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

export default Topic3DataCollectionFlow;
