import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateProjectTitleSuggestions } from '../services/gemini';
import { trackEvent } from '../services/analyticsService';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';

interface Step1Props {
    interest: string;
    setInterest: (value: string) => void;
    projectTitle: string;
    setProjectTitle: (value: string) => void;
    onProceed: () => void;
}

const ReportGenStep1Title: React.FC<Step1Props> = ({ interest, setInterest, projectTitle, setProjectTitle, onProceed }) => {
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
    const [titleError, setTitleError] = useState<string | null>(null);

    const handleSuggestTitles = async () => {
        if (!interest.trim()) return;
        
        setIsSuggesting(true);
        setTitleError(null);
        setSuggestedTitles([]);
        trackEvent('suggest_project_titles', {
            interest_length: interest.trim().length,
        });
        try {
            const results = await generateProjectTitleSuggestions(interest);
            setSuggestedTitles(results);
        } catch (e: any) {
            setTitleError(e.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
        } finally {
            setIsSuggesting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent dark:from-sky-400 dark:to-indigo-400">
                    ขั้นตอนที่ 1: ตั้งชื่อโครงงาน
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                    บอก AI เกี่ยวกับสิ่งที่คุณสนใจ แล้วให้ AI ช่วยเสนอชื่อโครงงานที่ถูกต้องตามหลักวิชาการ
                </p>
            </div>
            
            <div className="space-y-3">
                <label htmlFor="student-interest" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    เรื่องที่สนใจ
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        id="student-interest" 
                        type="text" 
                        value={interest} 
                        onChange={(e) => setInterest(e.target.value)}
                        disabled={isSuggesting}
                        placeholder="เช่น ทำสบู่จากใบโกงกาง, ปลูกผักในขวด"
                        className="flex-1 p-3.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all text-slate-800 dark:text-slate-200 disabled:opacity-60 placeholder:text-slate-400"
                    />
                     <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSuggestTitles} 
                        disabled={isSuggesting || !interest.trim()}
                        className="inline-flex items-center gap-2 justify-center px-6 py-3.5 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed transition-all"
                    >
                        {isSuggesting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                เสนอชื่อ
                            </>
                        )}
                    </motion.button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isSuggesting && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-center text-sky-600 dark:text-sky-400 flex items-center justify-center gap-2 py-2"
                    >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>กำลังค้นหาแนวทางที่น่าสนใจ...</span>
                    </motion.div>
                )}
                
                {suggestedTitles.length > 0 && !isSuggesting && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 bg-sky-50/50 dark:bg-sky-900/10 p-4 rounded-xl border border-sky-100 dark:border-sky-800/30"
                    >
                        <p className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-sky-500" />
                            ชื่อที่ AI แนะนำ:
                        </p>
                        <div className="flex flex-wrap gap-2">
                        {suggestedTitles.map((title, i) => (
                            <motion.button 
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.02, backgroundColor: 'var(--tw-colors-sky-200)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setProjectTitle(title)} 
                                className="px-4 py-2 text-sm bg-white dark:bg-slate-800 text-sky-700 dark:text-sky-300 rounded-lg border border-sky-200 dark:border-sky-700/50 hover:border-sky-300 dark:hover:border-sky-600 shadow-sm transition-all text-left"
                            >
                                {title}
                            </motion.button>
                        ))}
                        </div>
                    </motion.div>
                )}
                
                {titleError && (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 dark:text-red-400 text-sm p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/30"
                    >
                        {titleError}
                    </motion.p>
                )}
            </AnimatePresence>
            
            <div className="pt-6 border-t border-slate-200 dark:border-slate-700/60 space-y-3">
                <label htmlFor="final-project-title" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    ชื่อโครงงาน (สามารถแก้ไขได้)
                </label>
                <input
                    id="final-project-title" 
                    type="text" 
                    value={projectTitle} 
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="เลือกจากรายการแนะนำ หรือพิมพ์ชื่อโครงงานของคุณที่นี่"
                    className="w-full p-3.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
                />
            </div>
            
            <div className="flex justify-end pt-4">
                 <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onProceed} 
                    disabled={!projectTitle.trim()} 
                    className="w-full sm:w-auto inline-flex items-center gap-2 justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed transition-all"
                >
                    ถัดไป: สร้างโครงร่างรายงาน
                    <ArrowRight className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    );
};

export default ReportGenStep1Title;
