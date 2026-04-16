import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateChapterGuideline, ChapterGuideline, generateSectionFeedback } from '../services/gemini';
import { Loader2, Sparkles, RefreshCw, Camera, X, Lightbulb } from 'lucide-react';
import { trackEvent } from '../services/analyticsService';
import { compressImage } from '../utils/imageCompression';
import { useFirestoreData } from '../hooks/useFirestore';
import { uploadImageToStorage } from '../utils/storageUtils';
import { v4 as uuidv4 } from 'uuid';

interface ChapterDraftingAssistantProps {
    chapterNumber: number;
    stepNumber?: number;
    projectTitle: string;
    coreConcept?: string;
    researchData?: string;
}

const ChapterDraftingAssistant: React.FC<ChapterDraftingAssistantProps> = ({ 
    chapterNumber, 
    stepNumber,
    projectTitle, 
    coreConcept = '',
    researchData = ''
}) => {
    const storageId = stepNumber || chapterNumber;

    const { data: chapterData, updateData: updateChapterData, loading: isDataLoading } = useFirestoreData('user_chapters', String(storageId), {
        guideline: null as string | null,
        studentInputs: '{}',
        studentImages: '{}',
        feedbackResults: '{}'
    });

    const [guideline, setGuideline] = useState<ChapterGuideline | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [studentInputs, setStudentInputs] = useState<{ [key: string]: string }>({});
    const [studentImages, setStudentImages] = useState<{ [key: string]: { data: string; mimeType: string; name: string } | null }>({});
    const [feedbackResults, setFeedbackResults] = useState<{ [key: string]: string }>({});
    const [feedbackLoadingStates, setFeedbackLoadingStates] = useState<{ [key: string]: boolean }>({});
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeImageUploadKey, setActiveImageUploadKey] = useState<string | null>(null);

    useEffect(() => {
        if (!isDataLoading) {
            if (chapterData.guideline) {
                try {
                    setGuideline(JSON.parse(chapterData.guideline));
                } catch (e) {
                    console.error("Failed to parse guideline", e);
                }
            } else {
                setGuideline(null);
            }
            
            try {
                if (chapterData.studentInputs) setStudentInputs(JSON.parse(chapterData.studentInputs));
                if (chapterData.studentImages) setStudentImages(JSON.parse(chapterData.studentImages));
                if (chapterData.feedbackResults) setFeedbackResults(JSON.parse(chapterData.feedbackResults));
            } catch (e) {
                console.error("Failed to parse chapter data", e);
            }
        }
    }, [chapterData, isDataLoading]);

    const saveToFirestore = async (dataToUpdate: any) => {
        updateChapterData(dataToUpdate);
    };

    const handleGenerate = async () => {
        if (!projectTitle.trim()) {
            setError("กรุณากำหนดชื่อโครงงานในก้าวที่ 1 ก่อนครับ");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateChapterGuideline(projectTitle, chapterNumber, coreConcept, researchData, stepNumber);
            setGuideline(result);
            saveToFirestore({ guideline: JSON.stringify(result) });
        } catch (e: any) {
            setError(e.message || "เกิดข้อผิดพลาดในการสร้างคำแนะนำ");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (key: string, value: string) => {
        const newInputs = { ...studentInputs, [key]: value };
        setStudentInputs(newInputs);
        saveToFirestore({ studentInputs: JSON.stringify(newInputs) });
    };

    const removeImage = (key: string) => {
        const newImages = { ...studentImages, [key]: null };
        setStudentImages(newImages);
        saveToFirestore({ studentImages: JSON.stringify(newImages) });
    };

    const handleTriggerFileInput = (key: string) => {
        setActiveImageUploadKey(key);
        fileInputRef.current?.click();
    };
    
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!activeImageUploadKey) return;
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                alert("ขนาดไฟล์ต้องไม่เกิน 10MB");
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                alert("รองรับไฟล์ .jpeg, .png, .webp เท่านั้น");
                return;
            }
    
            try {
                // Compress image to avoid freezing and reduce size for Firestore
                const base64String = await compressImage(file, 800, 800, 0.7);
                
                // Upload to Firebase Storage
                const imageId = uuidv4();
                const imagePath = `chapter_drafts/${imageId}.jpg`;
                const downloadURL = await uploadImageToStorage(base64String, imagePath);

                const newImages = {
                    ...studentImages,
                    [activeImageUploadKey]: {
                        data: downloadURL, // Store URL instead of base64
                        mimeType: 'image/jpeg', // compressImage always outputs jpeg
                        name: file.name
                    }
                };
                setStudentImages(newImages);
                saveToFirestore({ studentImages: JSON.stringify(newImages) });
            } catch (error) {
                console.error("Error processing image:", error);
                alert("เกิดข้อผิดพลาดในการประมวลผลหรืออัปโหลดรูปภาพ");
            }
        }
        if (e.target) {
            e.target.value = '';
        }
        setActiveImageUploadKey(null);
    };

    const handleGetFeedback = async (sectionHeader: string, key: string) => {
        const studentInput = studentInputs[key] || '';
        const imageInput = studentImages[key];

        if (!studentInput.trim() && !imageInput) {
            alert("กรุณาเขียนเนื้อหาหรือแนบรูปภาพก่อนขอรับการประเมินจาก AI");
            return;
        }
        
        setFeedbackLoadingStates(prev => ({ ...prev, [key]: true }));
        const newFeedbackResults = { ...feedbackResults, [key]: '' };
        setFeedbackResults(newFeedbackResults);
        
        trackEvent('get_chapter_section_feedback', {
            project_title: projectTitle,
            chapter_number: chapterNumber,
            section_header: sectionHeader,
            with_image: !!imageInput,
        });
        try {
            const feedback = await generateSectionFeedback(projectTitle, `บทที่ ${chapterNumber}: ${guideline?.title || ''}`, sectionHeader, studentInput, imageInput);
            const updatedFeedback = { ...feedbackResults, [key]: feedback };
            setFeedbackResults(updatedFeedback);
            saveToFirestore({ feedbackResults: JSON.stringify(updatedFeedback) });
        } catch (e: any) {
             const errorFeedback = { ...feedbackResults, [key]: `เกิดข้อผิดพลาด: ${e.message}` };
             setFeedbackResults(errorFeedback);
             saveToFirestore({ feedbackResults: JSON.stringify(errorFeedback) });
        } finally {
            setFeedbackLoadingStates(prev => ({ ...prev, [key]: false }));
        }
    };

    if (isDataLoading) {
        return (
            <div className="mt-6 border border-indigo-100 dark:border-indigo-900/50 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 flex justify-between items-center border-b border-indigo-100 dark:border-indigo-900/50">
                    <div>
                        <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-indigo-500" />
                            หุ่นยนต์ผู้ช่วยนักประดิษฐ์ 🤖 {stepNumber ? `(ก้าวที่ ${stepNumber})` : `(บทที่ ${chapterNumber})`}
                        </h4>
                        <p className="text-sm text-indigo-700/70 dark:text-indigo-400/70 mt-1">
                            กำลังโหลดข้อมูล...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-6 border border-indigo-100 dark:border-indigo-900/50 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/jpeg,image/png,image/webp" className="hidden" capture="environment" />
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 flex justify-between items-center border-b border-indigo-100 dark:border-indigo-900/50">
                <div>
                    <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        หุ่นยนต์ผู้ช่วยนักประดิษฐ์ 🤖 {stepNumber ? `(ก้าวที่ ${stepNumber})` : `(บทที่ ${chapterNumber})`}
                    </h4>
                    <p className="text-sm text-indigo-700/70 dark:text-indigo-400/70 mt-1">
                        AI จะช่วยวางโครงและให้คำแนะนำในการเขียน โดยอิงจากชื่อเรื่องและไอเดียของคุณ
                    </p>
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                >
                    {isLoading ? (
                        <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            กำลังร่าง...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4" />
                            {guideline ? 'ร่างใหม่' : 'ขอคำแนะนำจาก AI'}
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border-b border-red-100 dark:border-red-900/50">
                    {error}
                </div>
            )}

            {guideline && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 space-y-8"
                >
                    <div className="text-center mb-6 border-b border-slate-100 dark:border-slate-700/50 pb-4">
                        <h5 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                            บทที่ {guideline.chapter_number}
                        </h5>
                        <h6 className="text-lg font-medium text-slate-700 dark:text-slate-300 mt-1">
                            {guideline.title}
                        </h6>
                    </div>

                    <div className="space-y-8">
                        {guideline.sections.map((section, idx) => {
                            const key = `${chapterNumber}_${idx}`;
                            const isFeedbackLoading = feedbackLoadingStates[key];
                            const feedback = feedbackResults[key];
                            const image = studentImages[key];

                            return (
                                <div key={key} className="space-y-3">
                                    <h6 className="font-semibold text-lg text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-sm shrink-0">
                                            {chapterNumber > 0 ? `${chapterNumber}.` : ''}{idx + 1}
                                        </span>
                                        {section.header}
                                    </h6>
                                    
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
                                                        <Camera className="w-4 h-4" />
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
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <motion.button 
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleGetFeedback(section.header, key)} 
                                                disabled={(!studentInputs[key]?.trim() && !studentImages[key]) || isFeedbackLoading} 
                                                className="w-full sm:w-auto inline-flex items-center gap-2 justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed transition-all"
                                            >
                                                {isFeedbackLoading ? (
                                                    <><Loader2 className="w-4 h-4 animate-spin" /> ตรวจอยู่...</>
                                                ) : (
                                                    <><Sparkles className="w-4 h-4" /> ขอคำแนะนำจาก AI</>
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
                                                        <Lightbulb className="w-5 h-5 text-sky-500"/>
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
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ChapterDraftingAssistant;
