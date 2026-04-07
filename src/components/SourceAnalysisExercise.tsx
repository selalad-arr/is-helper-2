

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeSource } from '../services/geminiService';
import { DocumentTextIcon, PhotoIcon, SparklesStarIcon, ArrowUpOnSquareIcon } from '../ui/icons';
import { trackEvent } from '../services/analyticsService';
import { compressImage } from '../utils/imageCompression';
import { useFirestoreData } from '../hooks/useFirestore';
import { uploadImageToStorage } from '../utils/storageUtils';
import { v4 as uuidv4 } from 'uuid';

const SourceAnalysisExercise: React.FC = () => {
    const { data: sourceData, updateData: updateSourceData, loading: isDataLoading } = useFirestoreData('user_source_analyses', 'main', {
        activeTab: 'manual',
        manualInput: '{}',
        feedback: ''
    });

    const [activeTab, setActiveTab] = useState<'manual' | 'image'>('manual');
    const [manualInput, setManualInput] = useState({ topic: '', author: '', publication: '' });
    const [fileInfo, setFileInfo] = useState<{ name: string; data: string; mimeType: string } | null>(null);
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isDataLoading) {
            setActiveTab(sourceData.activeTab as 'manual' | 'image');
            try {
                if (sourceData.manualInput) setManualInput(JSON.parse(sourceData.manualInput));
            } catch (e) {
                console.error("Failed to parse manualInput", e);
            }
            setFeedback(sourceData.feedback);
        }
    }, [sourceData, isDataLoading]);

    const saveToFirestore = async (dataToUpdate: any) => {
        updateSourceData(dataToUpdate);
    };

    const handleSetActiveTab = (tab: 'manual' | 'image') => {
        setActiveTab(tab);
        saveToFirestore({ activeTab: tab });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit before compression
                alert("ขนาดไฟล์ต้องไม่เกิน 10MB");
                return;
            }
            if (!file.type.startsWith('image/')) {
                alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
                return;
            }
            
            setIsLoading(true);
            try {
                const base64String = await compressImage(file);
                
                // Upload to Firebase Storage
                const imageId = uuidv4();
                const imagePath = `source_analysis/${imageId}.jpg`;
                const downloadURL = await uploadImageToStorage(base64String, imagePath);

                setFileInfo({
                    name: file.name,
                    data: downloadURL, // Store the URL instead of base64
                    mimeType: 'image/jpeg', // compressImage returns jpeg
                });
            } catch (error) {
                console.error("Error processing image:", error);
                alert("เกิดข้อผิดพลาดในการประมวลผลหรืออัปโหลดรูปภาพ");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleManualInputChange = (field: keyof typeof manualInput, value: string) => {
        const newInput = { ...manualInput, [field]: value };
        setManualInput(newInput);
        saveToFirestore({ manualInput: JSON.stringify(newInput) });
    };

    const handleSubmit = async () => {
        const hasManualInput = activeTab === 'manual' && Object.values(manualInput).some(v => typeof v === 'string' && v.trim() !== '');
        const hasImage = activeTab === 'image' && fileInfo;

        if (!hasManualInput && !hasImage) return;

        setIsLoading(true);
        setFeedback('');
        saveToFirestore({ feedback: '' });

        trackEvent('submit_source_analysis', {
            source_type: activeTab,
        });

        let source;
        if (activeTab === 'manual') {
            source = {
                type: 'manual' as const,
                ...manualInput,
            };
        } else {
            source = { type: 'image' as 'image', value: fileInfo!.data, mimeType: fileInfo!.mimeType };
        }
        
        try {
            const aiFeedback = await analyzeSource(source);
            setFeedback(aiFeedback);
            saveToFirestore({ feedback: aiFeedback });
        } catch (error) {
            console.error("Error analyzing source:", error);
            alert("เกิดข้อผิดพลาดในการวิเคราะห์ข้อมูล");
        } finally {
            setIsLoading(false);
        }
    };
    
    const isManualInputValid = Object.values(manualInput).some(v => typeof v === 'string' && v.trim() !== '');
    const isSubmitDisabled = isLoading || (activeTab === 'manual' ? !isManualInputValid : !fileInfo);

    if (isDataLoading) {
        return (
            <div className="mt-6 p-6 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl bg-white dark:bg-slate-800/50 shadow-sm">
                <div className="animate-pulse space-y-4">
                    <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl w-1/3"></div>
                    <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-xl w-full"></div>
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
            <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
                <button
                    onClick={() => handleSetActiveTab('manual')}
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all relative disabled:opacity-50 ${activeTab === 'manual' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                    <DocumentTextIcon className="w-5 h-5"/>
                    กรอกข้อมูลเอง
                    {activeTab === 'manual' && (
                        <motion.div 
                            layoutId="activeTabIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 dark:bg-sky-400"
                        />
                    )}
                </button>
                <button
                    onClick={() => handleSetActiveTab('image')}
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all relative disabled:opacity-50 ${activeTab === 'image' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                    <PhotoIcon className="w-5 h-5"/>
                    วิเคราะห์จากรูปภาพ
                    {activeTab === 'image' && (
                        <motion.div 
                            layoutId="activeTabIndicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 dark:bg-sky-400"
                        />
                    )}
                </button>
            </div>
            
            <AnimatePresence mode="wait">
                {activeTab === 'manual' ? (
                    <motion.div 
                        key="manual"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-5"
                    >
                         <div>
                             <label htmlFor="source-topic" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">หัวข้อ / ชื่อเรื่อง</label>
                             <input
                                id="source-topic"
                                type="text"
                                value={manualInput.topic}
                                onChange={(e) => handleManualInputChange('topic', e.target.value)}
                                className="w-full p-3.5 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 disabled:opacity-60"
                                placeholder="เช่น ผลของแสงสีแดงต่อการเจริญเติบโตของพืช"
                                disabled={isLoading}
                            />
                        </div>
                         <div>
                             <label htmlFor="source-author" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">ผู้เขียน / ผู้แต่ง / องค์กร</label>
                             <input
                                id="source-author"
                                type="text"
                                value={manualInput.author}
                                onChange={(e) => handleManualInputChange('author', e.target.value)}
                                className="w-full p-3.5 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 disabled:opacity-60"
                                placeholder="เช่น นายวิทยา เก่งกาจ, กรมส่งเสริมการเกษตร"
                                disabled={isLoading}
                            />
                        </div>
                         <div>
                             <label htmlFor="source-publication" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">แหล่งตีพิมพ์ / ชื่อวารสาร</label>
                             <input
                                id="source-publication"
                                type="text"
                                value={manualInput.publication}
                                onChange={(e) => handleManualInputChange('publication', e.target.value)}
                                className="w-full p-3.5 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 disabled:opacity-60"
                                placeholder="เช่น วารสารวิทยาศาสตร์และเทคโนโลยี ปีที่ 10 ฉบับที่ 2"
                                disabled={isLoading}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="image"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">อัปโหลดรูปภาพของแหล่งข้อมูล (หนังสือ, บทความ):</label>
                        <div 
                            className={`flex justify-center items-center w-full h-40 px-6 border-2 border-dashed rounded-xl transition-all duration-300 ${
                                !isLoading 
                                    ? 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:border-sky-500 dark:hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 cursor-pointer' 
                                    : 'border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 opacity-60'
                            }`}
                            onClick={() => !isLoading && fileInputRef.current?.click()}
                        >
                             <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" disabled={isLoading} />
                             {fileInfo ? (
                                <div className="text-center">
                                    <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center mx-auto mb-3">
                                        <PhotoIcon className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate max-w-[200px] mx-auto">
                                        {fileInfo.name}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">คลิกเพื่อเปลี่ยนไฟล์</p>
                                </div>
                             ) : (
                                <div className="text-center text-slate-500 dark:text-slate-400">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mx-auto mb-3">
                                        <ArrowUpOnSquareIcon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                                    </div>
                                    <p className="text-sm font-medium">คลิกเพื่อเลือกไฟล์รูปภาพ</p>
                                    <p className="text-xs mt-1">รองรับ JPG, PNG (ไม่เกิน 10MB)</p>
                                </div>
                             )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="mt-6 flex justify-end">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                    className="inline-flex items-center gap-2 justify-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed transition-all"
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            กำลังวิเคราะห์...
                        </>
                    ) : (
                         <>
                            <SparklesStarIcon className="w-4 h-4" />
                            วิเคราะห์แหล่งข้อมูล
                         </>
                    )}
                </motion.button>
            </div>

            <AnimatePresence>
                {feedback && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-5 rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 border border-sky-100 dark:border-sky-800/30">
                            <h5 className="flex items-center gap-2 font-bold text-sky-800 dark:text-sky-300 mb-3">
                                <SparklesStarIcon className="w-5 h-5 text-sky-500"/>
                                ผลการวิเคราะห์จาก AI
                            </h5>
                            <div className="prose prose-sm sm:prose-base prose-slate dark:prose-invert max-w-none">
                                <p className="whitespace-pre-wrap leading-relaxed">{feedback}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SourceAnalysisExercise;