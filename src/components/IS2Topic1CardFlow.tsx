import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateSimpleContent } from '../services/geminiService';
import { ArrowRight, CheckCircle, Loader2, RefreshCw, Sparkles } from 'lucide-react';

interface IS2Topic1CardFlowProps {
    projectTitle: string;
    setProjectTitle: (title: string) => void;
}

const IS2Topic1CardFlow: React.FC<IS2Topic1CardFlowProps> = ({ projectTitle, setProjectTitle }) => {
    const [step, setStep] = useState<number>(1);
    
    // Inputs
    const [is1Topic, setIs1Topic] = useState('');
    const [findings, setFindings] = useState('');
    const [audience, setAudience] = useState('');
    const [mediaFormat, setMediaFormat] = useState('');
    
    // AI Output
    const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNextStep = () => {
        setStep(prev => prev + 1);
    };

    const handlePrevStep = () => {
        setStep(prev => prev - 1);
    };

    const handleFinish = async () => {
        setStep(5);
        setIsGenerating(true);
        setError(null);

        try {
            const prompt = `คุณคือผู้เชี่ยวชาญด้านโครงงานวิทยาศาสตร์และการสื่อสาร (IS2)
นักเรียนได้ให้ข้อมูลเพื่อคิดหัวข้อโครงงานการสื่อสารและการนำเสนอ (IS2) ดังนี้:
- หัวข้อโครงงานจาก IS1: ${is1Topic}
- ข้อค้นพบ/ความรู้ที่ได้: ${findings}
- กลุ่มเป้าหมายในการนำเสนอ: ${audience}
- รูปแบบสื่อ/วิธีการนำเสนอ: ${mediaFormat}

จากข้อมูลทั้งหมด กรุณาเสนอแนะชื่อโครงงาน IS2 (เน้นการสร้างสื่อ การนำเสนอ หรือการเผยแพร่ความรู้) 3 ชื่อ ที่เหมาะสมกับระดับมัธยมศึกษา
ตอบกลับมาเป็น JSON array ของ string เท่านั้น ห้ามมีข้อความอื่น ตัวอย่าง: ["ชื่อโครงงานที่ 1", "ชื่อโครงงานที่ 2", "ชื่อโครงงานที่ 3"]`;

            const response = await generateSimpleContent(prompt);
            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                const parsedIdeas = JSON.parse(jsonMatch[0]);
                setAiSuggestions(parsedIdeas);
            } else {
                 throw new Error("ไม่สามารถอ่านข้อมูลจาก AI ได้");
            }
        } catch (err: any) {
            setError(err.message || 'เกิดข้อผิดพลาดในการสร้างชื่อโครงงาน');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleReset = () => {
        setStep(1);
        setIs1Topic('');
        setFindings('');
        setAudience('');
        setMediaFormat('');
        setAiSuggestions([]);
        setError(null);
    };

    const handleSelectTitle = (title: string) => {
        setProjectTitle(title);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[400px] flex flex-col relative">
            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 dark:bg-slate-700 w-full">
                <div 
                    className="h-full bg-sky-500 transition-all duration-500 ease-in-out"
                    style={{ width: `${(step / 5) * 100}%` }}
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
                                    ส่วนที่ 1: ทบทวนความรู้จาก IS1
                                </span>
                                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    หัวข้อโครงงาน IS1 ของคุณคืออะไร?
                                </h4>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    ชื่อโครงงาน หรือเรื่องที่ศึกษาใน IS1...
                                </label>
                                <input
                                    type="text"
                                    value={is1Topic}
                                    onChange={(e) => setIs1Topic(e.target.value)}
                                    placeholder="เช่น การศึกษาประสิทธิภาพของสารสกัดจากใบฝรั่ง..."
                                    className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-lg"
                                    autoFocus
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={handleNextStep}
                                    disabled={!is1Topic.trim()}
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
                                <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold mb-2">
                                    ส่วนที่ 2: สรุปข้อค้นพบ
                                </span>
                                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    คุณได้ข้อค้นพบหรือความรู้อะไรบ้าง?
                                </h4>
                                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-600 dark:text-slate-400 italic">
                                    "จากโครงงาน <span className="font-semibold text-sky-600 dark:text-sky-400">{is1Topic}</span>"
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    ข้อค้นพบหลัก หรือความรู้สำคัญที่อยากนำเสนอ...
                                </label>
                                <input
                                    type="text"
                                    value={findings}
                                    onChange={(e) => setFindings(e.target.value)}
                                    placeholder="เช่น ใบฝรั่งสามารถยับยั้งแบคทีเรียได้จริง, วิธีการทำปุ๋ยหมักจากเศษอาหาร"
                                    className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-lg"
                                    autoFocus
                                />
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={handlePrevStep}
                                    className="px-6 py-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors"
                                >
                                    ย้อนกลับ
                                </button>
                                <button
                                    onClick={handleNextStep}
                                    disabled={!findings.trim()}
                                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-medium transition-colors"
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
                                <span className="inline-block px-3 py-1 bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 rounded-full text-sm font-semibold mb-2">
                                    ส่วนที่ 3: กำหนดกลุ่มเป้าหมาย
                                </span>
                                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    คุณอยากนำเสนอเรื่องนี้ให้ใครฟัง/ดู?
                                </h4>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    กลุ่มเป้าหมายหลักคือ...
                                </label>
                                <input
                                    type="text"
                                    value={audience}
                                    onChange={(e) => setAudience(e.target.value)}
                                    placeholder="เช่น นักเรียนในโรงเรียน, เกษตรกรในชุมชน, ผู้สูงอายุ"
                                    className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-lg"
                                    autoFocus
                                />
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={handlePrevStep}
                                    className="px-6 py-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors"
                                >
                                    ย้อนกลับ
                                </button>
                                <button
                                    onClick={handleNextStep}
                                    disabled={!audience.trim()}
                                    className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-medium transition-colors"
                                >
                                    ถัดไป <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="max-w-2xl mx-auto w-full space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold mb-2">
                                    ส่วนที่ 4: เลือกรูปแบบสื่อ
                                </span>
                                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                                    คุณอยากใช้สื่อรูปแบบไหนในการนำเสนอ?
                                </h4>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    รูปแบบสื่อ/วิธีการนำเสนอ...
                                </label>
                                <input
                                    type="text"
                                    value={mediaFormat}
                                    onChange={(e) => setMediaFormat(e.target.value)}
                                    placeholder="เช่น เว็บไซต์, วิดีโอสั้น (TikTok/Reels), นิทรรศการ, แผ่นพับ, บอร์ดความรู้"
                                    className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                                    autoFocus
                                />
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={handlePrevStep}
                                    className="px-6 py-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors"
                                >
                                    ย้อนกลับ
                                </button>
                                <button
                                    onClick={handleFinish}
                                    disabled={!mediaFormat.trim()}
                                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/30"
                                >
                                    <CheckCircle className="w-5 h-5" /> สร้างชื่อโครงงาน IS2
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 5 && (
                        <motion.div
                            key="step5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl mx-auto w-full space-y-6"
                        >
                            {isGenerating ? (
                                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium animate-pulse">
                                        AI กำลังประมวลผลและคิดชื่อโครงงาน IS2...
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
                                            ไอเดียชื่อโครงงาน IS2 ของคุณ
                                        </h4>
                                        <button
                                            onClick={handleReset}
                                            className="text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
                                        >
                                            <RefreshCw className="w-4 h-4" /> เริ่มใหม่ทั้งหมด
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {aiSuggestions.map((title, index) => (
                                            <div 
                                                key={index} 
                                                onClick={() => handleSelectTitle(title)}
                                                className={`p-4 border rounded-xl cursor-pointer transition-all ${
                                                    projectTitle === title 
                                                    ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/30 dark:border-emerald-500' 
                                                    : 'bg-white border-slate-200 hover:border-sky-300 hover:bg-sky-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-sky-700 dark:hover:bg-slate-700'
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

                                    <div className="flex justify-center mt-4">
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                                            คลิกที่ชื่อโครงงานเพื่อเลือก
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

export default IS2Topic1CardFlow;
