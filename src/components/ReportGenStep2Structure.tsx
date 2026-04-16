import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateSectionFeedback } from '../services/gemini';
import type { ReportStructure, ReportChapter, ReportSection } from '../services/gemini';
import { SparklesIcon, DocumentTextIcon, LightBulbIcon, BookOpenIcon, CameraIcon, XMarkIcon } from '../ui/icons';
import { trackEvent } from '../services/analyticsService';
import { ArrowLeft, Loader2 } from 'lucide-react';

const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-700/50 rounded-xl ${className}`} />
);

interface Step2Props {
    projectTitle: string;
    reportStructure: ReportStructure | null;
    isStructureLoading: boolean;
    structureError: string | null;
    studentInputs: { [key: string]: string };
    setStudentInputs: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    studentImages: { [key: string]: { data: string; mimeType: string; name: string; } | null };
    setStudentImages: React.Dispatch<React.SetStateAction<{ [key: string]: { data: string; mimeType: string; name: string; } | null }>>;
    feedbackResults: { [key: string]: string };
    setFeedbackResults: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    feedbackLoadingStates: { [key: string]: boolean };
    setFeedbackLoadingStates: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    onBack: () => void;
    onProceed: () => void;
    handleTriggerFileInput: (key: string) => void;
}

const ReportGenStep2Structure: React.FC<Step2Props> = (props) => {
    const {
        projectTitle, reportStructure, isStructureLoading,
        structureError, studentInputs, setStudentInputs, studentImages, setStudentImages,
        feedbackResults, setFeedbackResults, feedbackLoadingStates, setFeedbackLoadingStates,
        onBack, onProceed, handleTriggerFileInput
    } = props;

    const handleInputChange = (key: string, value: string) => {
        setStudentInputs(prev => ({ ...prev, [key]: value }));
    };

    const removeImage = (key: string) => {
        setStudentImages(prev => ({ ...prev, [key]: null }));
    };

    const handleGetFeedback = async (chapter: ReportChapter, section: ReportSection, key: string) => {
        const studentInput = studentInputs[key] || '';
        const imageInput = studentImages[key];

        if (!studentInput.trim() && !imageInput) {
            alert("กรุณาเขียนเนื้อหาหรือแนบรูปภาพก่อนขอรับการประเมินจาก AI");
            return;
        }
        
        setFeedbackLoadingStates(prev => ({ ...prev, [key]: true }));
        setFeedbackResults(prev => ({ ...prev, [key]: '' }));
        trackEvent('get_section_feedback', {
            project_title: reportStructure!.title,
            chapter_title: `บทที่ ${chapter.chapter_number}: ${chapter.title}`,
            section_header: section.header,
            with_image: !!imageInput,
        });

        // Build full report context from local state
        const compiled: string[] = [];
        reportStructure?.chapters.forEach(ch => {
            compiled.push(`[บทที่ ${ch.chapter_number}: ${ch.title}]`);
            ch.sections.forEach((sec, sIdx) => {
                const inputKey = `${ch.chapter_number}_${sIdx}`;
                if (studentInputs[inputKey]) {
                    compiled.push(`${sec.header}: ${studentInputs[inputKey]}`);
                }
            });
        });
        const fullReportContext = compiled.join('\n');

        try {
            const feedback = await generateSectionFeedback(
                reportStructure!.title, 
                `บทที่ ${chapter.chapter_number}: ${chapter.title}`, 
                section.header, 
                studentInput, 
                imageInput,
                fullReportContext
            );
            setFeedbackResults(prev => ({ ...prev, [key]: feedback }));
        } catch (e: any) {
             setFeedbackResults(prev => ({ ...prev, [key]: `เกิดข้อผิดพลาด: ${e.message}` }));
        } finally {
            setFeedbackLoadingStates(prev => ({ ...prev, [key]: false }));
        }
    };

    return (
        <div className="space-y-6">
            <div className="relative text-center space-y-2">
                <button 
                    onClick={onBack} 
                    className="absolute left-0 top-0 inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">กลับไปแก้ไขชื่อเรื่อง</span>
                    <span className="sm:hidden">กลับ</span>
                </button>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent dark:from-sky-400 dark:to-indigo-400">
                    ขั้นตอนที่ 2: สร้างโครงร่างและลงมือเขียน
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                    AI กำลังวิเคราะห์ชื่อโครงงานของคุณเพื่อสร้างแนวทางการเขียน 5 บท
                </p>
            </div>
            
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">ชื่อโครงงาน:</p>
                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">{projectTitle}</p>
            </div>

            <AnimatePresence mode="wait">
                {structureError && (
                    <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 dark:text-red-400 text-sm p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/30"
                    >
                        {structureError}
                    </motion.p>
                )}
            </AnimatePresence>
            
            <div className="mt-6 min-h-[300px]">
                {isStructureLoading && (
                    <div className="space-y-6">
                        <SkeletonLoader className="h-12 w-3/4 mx-auto" />
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="space-y-4 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
                                <SkeletonLoader className="h-8 w-1/3" />
                                <SkeletonLoader className="h-24 w-full" />
                            </div>
                        ))}
                    </div>
                )}
                
                {!isStructureLoading && !reportStructure && !structureError && (
                    <div className="text-center text-slate-500 dark:text-slate-400 h-full flex flex-col justify-center items-center py-16 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                        <DocumentTextIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mb-4 opacity-50" />
                        <p>หากเกิดข้อผิดพลาดในการสร้างโครงร่าง โปรดลองอีกครั้ง</p>
                    </div>
                )}

                {reportStructure && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-sky-800 dark:text-sky-300 text-center leading-tight">
                            {reportStructure.title}
                        </h2>
                        
                        <div className="space-y-8">
                            {reportStructure.chapters.map((chapter, chapterIndex) => (
                                <motion.div 
                                    key={chapter.chapter_number}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: chapterIndex * 0.1 }}
                                    className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm"
                                >
                                    <h3 className="font-bold text-xl sm:text-2xl text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700/50 pb-4 mb-6">
                                        บทที่ {chapter.chapter_number}: {chapter.title}
                                    </h3>
                                    
                                    <div className="space-y-8">
                                        {chapter.sections.map((section, i) => {
                                            const key = `${chapter.chapter_number}_${i}`;
                                            const isFeedbackLoading = feedbackLoadingStates[key];
                                            const feedback = feedbackResults[key];
                                            const image = studentImages[key];
                                            return (
                                             <div key={key} className="space-y-3">
                                                <h4 className="font-semibold text-lg text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-sm">
                                                        {chapter.chapter_number}.{i + 1}
                                                    </span>
                                                    {section.header}
                                                </h4>
                                                
                                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm leading-relaxed" 
                                                     dangerouslySetInnerHTML={{ __html: `<b>แนวทาง:</b> ${section.guideline.replace(/\n/g, '<br/>')}` }} 
                                                />
                                                
                                                <div className="space-y-3">
                                                    <textarea 
                                                        rows={5} 
                                                        value={studentInputs[key] || ''} 
                                                        onChange={(e) => handleInputChange(key, e.target.value)} 
                                                        className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-shadow text-slate-800 dark:text-slate-200 disabled:opacity-60 resize-y" 
                                                        placeholder={`พิมพ์เนื้อหาสำหรับหัวข้อ "${section.header}" ที่นี่...`} 
                                                    />
                                                    
                                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                                        <div>
                                                            {!image && (
                                                                <button 
                                                                    onClick={() => handleTriggerFileInput(key)} 
                                                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                                                >
                                                                    <CameraIcon className="w-4 h-4" />
                                                                    แนบรูปภาพประกอบ
                                                                </button>
                                                            )}
                                                            {image && (
                                                                <div className="flex items-center gap-3 p-2 pr-3 rounded-lg bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                                                                    <img src={image.data.startsWith('http') ? image.data : `data:${image.mimeType};base64,${image.data}`} alt="Preview" className="w-10 h-10 rounded object-cover shadow-sm" />
                                                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[150px]">{image.name}</span>
                                                                    <button 
                                                                        onClick={() => removeImage(key)} 
                                                                        className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                                                    >
                                                                        <XMarkIcon className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        <motion.button 
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={() => handleGetFeedback(chapter, section, key)} 
                                                            disabled={(!studentInputs[key]?.trim() && !studentImages[key]) || isFeedbackLoading} 
                                                            className="w-full sm:w-auto inline-flex items-center gap-2 justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed transition-all"
                                                        >
                                                            {isFeedbackLoading ? (
                                                                <><Loader2 className="w-4 h-4 animate-spin" /> ตรวจอยู่...</>
                                                            ) : (
                                                                <><SparklesIcon className="w-4 h-4" /> ขอคำแนะนำจาก AI</>
                                                            )}
                                                        </motion.button>
                                                     </div>
                                                </div>
                                                
                                                <AnimatePresence>
                                                    {feedback && (
                                                        <motion.div 
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 border border-sky-100 dark:border-sky-800/30">
                                                                <h5 className="flex items-center gap-2 text-sm font-bold text-sky-800 dark:text-sky-300 mb-2">
                                                                    <LightBulbIcon className="w-5 h-5 text-sky-500"/>
                                                                    คำแนะนำจาก AI
                                                                </h5>
                                                                <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                                                                    <p className="whitespace-pre-wrap leading-relaxed">{feedback}</p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                             </div>
                                        )})}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="flex justify-end pt-8 border-t border-slate-200 dark:border-slate-700/60">
                             <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onProceed} 
                                className="w-full sm:w-auto inline-flex items-center gap-2 justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
                            >
                                <BookOpenIcon className="w-6 h-6" />
                                ไปที่ขั้นตอนสุดท้าย: รวมเล่มรายงาน
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ReportGenStep2Structure;
