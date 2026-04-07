import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generatePresentationContent } from '../services/geminiService';
import type { PresentationContent } from '../services/geminiService';
import { SparklesIcon, ExclamationTriangleIcon, AcademicCapIcon, DocumentDuplicateIcon, CheckIcon } from '../ui/icons';
import { trackEvent } from '../services/analyticsService';
import { useFirestoreData } from '../src/hooks/useFirestore';

// Loading skeleton component
const SkeletonLoader = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-xl ${className}`} />
);

const PresentationGenerator = () => {
    const { data: presentationData, updateData: updatePresentationData, loading: isDataLoading } = useFirestoreData('user_presentations', 'main', {
        projectTitle: '',
        introduction: '',
        methodology: '',
        results: '',
        conclusion: '',
        textContent: null as string | null
    });

    const [projectTitle, setProjectTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [methodology, setMethodology] = useState('');
    const [results, setResults] = useState('');
    const [conclusion, setConclusion] = useState('');
    const [textContent, setTextContent] = useState<PresentationContent | null>(null);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isDataLoading) {
            setProjectTitle(presentationData.projectTitle);
            setIntroduction(presentationData.introduction);
            setMethodology(presentationData.methodology);
            setResults(presentationData.results);
            setConclusion(presentationData.conclusion);
            if (presentationData.textContent) {
                try {
                    setTextContent(JSON.parse(presentationData.textContent));
                } catch (e) {
                    console.error("Failed to parse textContent", e);
                }
            } else {
                setTextContent(null);
            }
        }
    }, [presentationData, isDataLoading]);

    const handleSetProjectTitle = (val: string) => { setProjectTitle(val); updatePresentationData({ projectTitle: val }); };
    const handleSetIntroduction = (val: string) => { setIntroduction(val); updatePresentationData({ introduction: val }); };
    const handleSetMethodology = (val: string) => { setMethodology(val); updatePresentationData({ methodology: val }); };
    const handleSetResults = (val: string) => { setResults(val); updatePresentationData({ results: val }); };
    const handleSetConclusion = (val: string) => { setConclusion(val); updatePresentationData({ conclusion: val }); };
    const handleSetTextContent = (val: PresentationContent | null) => { setTextContent(val); updatePresentationData({ textContent: val ? JSON.stringify(val) : null }); };

    const [copiedSlideKey, setCopiedSlideKey] = useState<string | null>(null);

    const handleCopy = (text: string, slideKey: string, header: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedSlideKey(slideKey);
            trackEvent('copy_slide_content', {
                project_title: textContent?.title || 'untitled',
                slide_header: header,
            });
            setTimeout(() => {
                setCopiedSlideKey(null);
            }, 2000); // Reset after 2 seconds
        });
    };

    const handleSubmit = async () => {
        if (!projectTitle.trim() || !introduction.trim() || !methodology.trim() || !results.trim() || !conclusion.trim()) return;

        setIsLoading(true);
        setError(null);
        handleSetTextContent(null);

        trackEvent('generate_presentation_content', {
            project_title: projectTitle,
        });

        try {
            // Generate text content
            const contentResult = await generatePresentationContent(projectTitle, introduction, methodology, results, conclusion);
            handleSetTextContent(contentResult);

        } catch (e: any) {
            setError(e.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
        } finally {
            setIsLoading(false);
        }
    };

    const isSubmitDisabled = isLoading || !projectTitle.trim() || !introduction.trim() || !methodology.trim() || !results.trim() || !conclusion.trim();

    const inputVariants = {
        focus: { scale: 1.01, transition: { duration: 0.2 } },
        blur: { scale: 1, transition: { duration: 0.2 } }
    };

    if (isDataLoading) {
        return (
            <div className="mt-6 p-6 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl bg-white dark:bg-slate-800/50 shadow-sm">
                <div className="space-y-4">
                    <SkeletonLoader className="h-12 w-full" />
                    <SkeletonLoader className="h-24 w-full" />
                    <SkeletonLoader className="h-24 w-full" />
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {/* Input Form */}
                <div className="space-y-5">
                    <motion.div whileFocus="focus" variants={inputVariants}>
                        <label htmlFor="project-title" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">1. ชื่องานวิจัย / โครงงาน</label>
                        <input
                            id="project-title"
                            type="text"
                            value={projectTitle}
                            onChange={(e) => handleSetProjectTitle(e.target.value)}
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
                            onChange={(e) => handleSetIntroduction(e.target.value)}
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
                            onChange={(e) => handleSetMethodology(e.target.value)}
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
                            onChange={(e) => handleSetResults(e.target.value)}
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
                            onChange={(e) => handleSetConclusion(e.target.value)}
                            disabled={isLoading}
                            placeholder="สรุปว่าผลการทดลองที่ได้ตอบวัตถุประสงค์หรือไม่ และมีความหมายอย่างไร..."
                            className="w-full p-3.5 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 disabled:opacity-60 resize-y"
                        />
                    </motion.div>
                    
                    <div className="pt-2">
                         <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={handleSubmit}
                            disabled={isSubmitDisabled}
                            className="w-full inline-flex items-center gap-2 justify-center px-6 py-3.5 border border-transparent text-base font-semibold rounded-xl shadow-sm text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed transition-all"
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
                    
                    <AnimatePresence>
                        {error && (
                             <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                             >
                                 <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0">
                                            <ExclamationTriangleIcon className="w-5 h-5 text-red-500 dark:text-red-400" />
                                        </div>
                                        <div className="text-red-800 dark:text-red-300 text-sm">
                                            <p className="font-semibold">เกิดข้อผิดพลาด</p>
                                            <p className="mt-1">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700/60">
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                    <SparklesIcon className="w-6 h-6 text-sky-500" />
                    ผลลัพธ์จาก AI: โครงร่างเนื้อหาสำหรับสไลด์
                </h4>
                
                <AnimatePresence mode="wait">
                    {isLoading && (
                        <motion.div 
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                           <SkeletonLoader className="h-40 w-full" />
                           <SkeletonLoader className="h-32 w-full" />
                           <SkeletonLoader className="h-32 w-full" />
                        </motion.div>
                    )}
                    
                    {!isLoading && !textContent && (
                        <motion.div 
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center text-slate-500 dark:text-slate-400 h-full flex flex-col justify-center items-center py-12 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700"
                        >
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <AcademicCapIcon className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                            </div>
                            <p className="font-medium text-slate-700 dark:text-slate-300">กรอกข้อมูลโครงงานของคุณแล้วกดปุ่ม</p>
                            <p className="text-sm mt-1">AI จะช่วยวิเคราะห์และแยกเนื้อหาสำหรับแต่ละสไลด์ให้ที่นี่</p>
                        </motion.div>
                    )}

                    {!isLoading && textContent && (
                        <motion.div 
                            key="content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Slide 1: Title */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800/80 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
                                <div className="flex justify-between items-center mb-4">
                                    <h5 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                        <span className="px-2.5 py-1 rounded-md bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-sm">สไลด์ 1</span> 
                                        หน้าปก
                                    </h5>
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleCopy(textContent.title, 'title', 'หน้าปก')} 
                                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors text-slate-700 dark:text-slate-200 font-medium"
                                    >
                                        {copiedSlideKey === 'title' ? <CheckIcon className="w-4 h-4 text-emerald-500"/> : <DocumentDuplicateIcon className="w-4 h-4" />}
                                        {copiedSlideKey === 'title' ? 'คัดลอกแล้ว' : 'คัดลอก'}
                                    </motion.button>
                                </div>
                                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center py-8 px-4 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-800">
                                    {textContent.title}
                                </p>
                            </motion.div>
                            
                            {/* Subsequent Slides */}
                            {textContent.sections.map((section, index) => {
                                const slideKey = `slide_${index}`;
                                const copyText = `${section.header}\n\n${section.bullet_points.map(p => `- ${p}`).join('\n')}`;
                                return (
                                    <motion.div 
                                        key={index} 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * (index + 2) }}
                                        className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800/80 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-slate-300 dark:bg-slate-600"></div>
                                        <div className="flex justify-between items-start mb-4">
                                            <h5 className="text-lg font-bold text-slate-800 dark:text-slate-100 pr-4 flex items-center gap-2">
                                                <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm">สไลด์ {index + 2}</span> 
                                                {section.header}
                                            </h5>
                                            <motion.button 
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleCopy(copyText, slideKey, section.header)} 
                                                className="flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors text-slate-700 dark:text-slate-200 font-medium"
                                            >
                                                {copiedSlideKey === slideKey ? <CheckIcon className="w-4 h-4 text-emerald-500"/> : <DocumentDuplicateIcon className="w-4 h-4" />}
                                                {copiedSlideKey === slideKey ? 'คัดลอกแล้ว' : 'คัดลอก'}
                                            </motion.button>
                                        </div>
                                        <ul className="text-slate-700 dark:text-slate-300 list-disc list-outside pl-5 space-y-2 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                            {section.bullet_points.map((point, i) => (
                                                <li key={i} className="leading-relaxed">{point}</li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default PresentationGenerator;
