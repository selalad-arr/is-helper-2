import React from 'react';
import { motion } from 'motion/react';
import { SparklesIcon } from '../../ui/icons';

interface PresentationFormProps {
    projectTitle: string;
    setProjectTitle: (v: string) => void;
    introduction: string;
    setIntroduction: (v: string) => void;
    methodology: string;
    setMethodology: (v: string) => void;
    results: string;
    setResults: (v: string) => void;
    conclusion: string;
    setConclusion: (v: string) => void;
    isLoading: boolean;
    onSubmit: () => void;
    isSubmitDisabled: boolean;
}

const inputVariants = {
    focus: { scale: 1.01, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
};

const PresentationForm: React.FC<PresentationFormProps> = ({
    projectTitle, setProjectTitle,
    introduction, setIntroduction,
    methodology, setMethodology,
    results, setResults,
    conclusion, setConclusion,
    isLoading, onSubmit, isSubmitDisabled
}) => {
    return (
        <div className="space-y-5">
            <motion.div whileFocus="focus" variants={inputVariants}>
                <label htmlFor="project-title" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">1. ชื่องานวิจัย / โครงงาน</label>
                <input
                    id="project-title"
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    disabled={isLoading}
                    placeholder="เช่น การศึกษาผลของกากกาแฟต่อการสุกของกล้วย"
                    className="w-full p-3.5 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 disabled:opacity-60"
                />
            </motion.div>
            <motion.div whileFocus="focus" variants={inputVariants}>
                <label htmlFor="introduction" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">2. สรุปที่มา, ความสำคัญ, และวัตถุประสงค์ (จากบทที่ 1)</label>
                <textarea
                    id="introduction"
                    rows={4}
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                    disabled={isLoading}
                    placeholder="สรุปความเป็นมาของปัญหา และบอกวัตถุประสงค์ที่ชัดเจนของโครงงานนี้..."
                    className="w-full p-3.5 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 disabled:opacity-60 resize-y"
                />
            </motion.div>
             <motion.div whileFocus="focus" variants={inputVariants}>
                <label htmlFor="methodology" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">3. สรุปวิธีดำเนินการ (จากบทที่ 3)</label>
                <textarea
                    id="methodology"
                    rows={4}
                    value={methodology}
                    onChange={(e) => setMethodology(e.target.value)}
                    disabled={isLoading}
                    placeholder="อธิบายขั้นตอนการทดลองหรือการเก็บข้อมูลโดยย่อ..."
                    className="w-full p-3.5 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 disabled:opacity-60 resize-y"
                />
            </motion.div>
             <motion.div whileFocus="focus" variants={inputVariants}>
                <label htmlFor="results" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">4. สรุปผลการศึกษาที่สำคัญ (จากบทที่ 4)</label>
                <textarea
                    id="results"
                    rows={4}
                    value={results}
                    onChange={(e) => setResults(e.target.value)}
                    disabled={isLoading}
                    placeholder="ระบุผลลัพธ์หลักที่ค้นพบจากการทดลองหรือศึกษา..."
                    className="w-full p-3.5 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 disabled:opacity-60 resize-y"
                />
            </motion.div>
             <motion.div whileFocus="focus" variants={inputVariants}>
                <label htmlFor="conclusion" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">5. สรุปและอภิปรายผล (จากบทที่ 5)</label>
                <textarea
                    id="conclusion"
                    rows={4}
                    value={conclusion}
                    onChange={(e) => setConclusion(e.target.value)}
                    disabled={isLoading}
                    placeholder="สรุปว่าผลการทดลองที่ได้ตอบวัตถุประสงค์หรือไม่ และมีความหมายอย่างไร..."
                    className="w-full p-3.5 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 disabled:opacity-60 resize-y"
                />
            </motion.div>
            
            <div className="pt-2">
                 <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={onSubmit}
                    disabled={isSubmitDisabled}
                    className="w-full inline-flex items-center gap-2 justify-center px-6 py-3.5 border border-transparent text-base font-semibold rounded-xl shadow-sm text-white bg-linear-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed transition-all"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            กำลังวิเคราะห์...
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="w-5 h-5" />
                            สร้างโครงร่างเนื้อหา
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
};

export default PresentationForm;
