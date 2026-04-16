import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SparklesIcon, AcademicCapIcon, DocumentDuplicateIcon, CheckIcon } from '../../ui/icons';
import { trackEvent } from '../../services/analyticsService';
import type { PresentationContent } from '../../services/gemini';

export const SkeletonLoader = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-xl ${className}`} />
);

interface PresentationOutputProps {
    isLoading: boolean;
    textContent: PresentationContent | null;
}

const PresentationOutput: React.FC<PresentationOutputProps> = ({ isLoading, textContent }) => {
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
            }, 2000);
        });
    };

    return (
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
    );
};

export default PresentationOutput;
