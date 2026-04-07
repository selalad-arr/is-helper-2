import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReportGenStep1Title from './ReportGenStep1Title';
import ReportGenStep2Structure from './ReportGenStep2Structure';
import ReportGenStep3Compile from './ReportGenStep3Compile';
import type { ReportStructure } from '../services/geminiService';
import { generateReportStructure } from '../services/geminiService';
import { trackEvent } from '../services/analyticsService';
import { compressImage } from '../src/utils/imageCompression';
import { useFirestoreData } from '../src/hooks/useFirestore';
import { uploadImageToStorage } from '../src/utils/storageUtils';
import { v4 as uuidv4 } from 'uuid';

const ReportStructureGenerator = () => {
    const { data: reportData, updateData: updateReportData, loading: isDataLoading } = useFirestoreData('user_reports', 'main', {
        step: 'title',
        interest: '',
        projectTitle: '',
        projectAbstract: '',
        reportStructure: null as string | null,
        studentInputs: '{}',
        studentImages: '{}',
        feedbackResults: '{}',
        authorName: '',
        acknowledgements: '',
        references: '',
        customCoverText: '',
        schoolName: '',
        semester: `ภาคเรียนที่ 1 ปีการศึกษา ${new Date().getFullYear() + 543}`
    });

    const [step, setStep] = useState<'title' | 'structure' | 'compile'>('title');

    // Step 1 states
    const [interest, setInterest] = useState('');
    const [projectTitle, setProjectTitle] = useState('');

    // Step 2 states
    const [projectAbstract, setProjectAbstract] = useState('');
    const [isStructureLoading, setStructureIsLoading] = useState(false);
    const [structureError, setStructureError] = useState<string | null>(null);
    const [reportStructure, setReportStructure] = useState<ReportStructure | null>(null);
    
    // Interactive form states
    const [studentInputs, setStudentInputs] = useState<{ [key: string]: string }>({});
    const [studentImages, setStudentImages] = useState<{ [key: string]: { data: string; mimeType: string; name: string } | null }>({});
    const [feedbackResults, setFeedbackResults] = useState<{ [key: string]: string }>({});
    const [feedbackLoadingStates, setFeedbackLoadingStates] = useState<{ [key: string]: boolean }>({});
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeImageUploadKey, setActiveImageUploadKey] = useState<string | null>(null);

    // Step 3 states
    const [authorName, setAuthorName] = useState('');
    const [acknowledgements, setAcknowledgements] = useState('');
    const [references, setReferences] = useState('');
    const [customCoverText, setCustomCoverText] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [semester, setSemester] = useState(`ภาคเรียนที่ 1 ปีการศึกษา ${new Date().getFullYear() + 543}`);

    useEffect(() => {
        if (!isDataLoading) {
            setStep(reportData.step as any);
            setInterest(reportData.interest);
            setProjectTitle(reportData.projectTitle);
            setProjectAbstract(reportData.projectAbstract);
            if (reportData.reportStructure) {
                try {
                    setReportStructure(JSON.parse(reportData.reportStructure));
                } catch (e) {
                    console.error("Failed to parse reportStructure", e);
                }
            } else {
                setReportStructure(null);
            }
            try {
                if (reportData.studentInputs) setStudentInputs(JSON.parse(reportData.studentInputs));
                if (reportData.studentImages) setStudentImages(JSON.parse(reportData.studentImages));
                if (reportData.feedbackResults) setFeedbackResults(JSON.parse(reportData.feedbackResults));
            } catch (e) {
                console.error("Failed to parse report data", e);
            }
            setAuthorName(reportData.authorName);
            setAcknowledgements(reportData.acknowledgements);
            setReferences(reportData.references);
            setCustomCoverText(reportData.customCoverText);
            setSchoolName(reportData.schoolName);
            setSemester(reportData.semester);
        }
    }, [reportData, isDataLoading]);

    const saveToFirestore = async (dataToUpdate: any) => {
        updateReportData(dataToUpdate);
    };

    const handleSetStep = (val: 'title' | 'structure' | 'compile') => { setStep(val); saveToFirestore({ step: val }); };
    const handleSetInterest = (val: string) => { setInterest(val); saveToFirestore({ interest: val }); };
    const handleSetProjectTitle = (val: string) => { setProjectTitle(val); saveToFirestore({ projectTitle: val }); };
    const handleSetProjectAbstract = (val: string) => { setProjectAbstract(val); saveToFirestore({ projectAbstract: val }); };
    const handleSetReportStructure = (val: ReportStructure | null) => { setReportStructure(val); saveToFirestore({ reportStructure: val ? JSON.stringify(val) : null }); };
    const handleSetStudentInputs = (val: { [key: string]: string }) => { setStudentInputs(val); saveToFirestore({ studentInputs: JSON.stringify(val) }); };
    const handleSetStudentImages = (val: { [key: string]: { data: string; mimeType: string; name: string } | null }) => { setStudentImages(val); saveToFirestore({ studentImages: JSON.stringify(val) }); };
    const handleSetFeedbackResults = (val: { [key: string]: string }) => { setFeedbackResults(val); saveToFirestore({ feedbackResults: JSON.stringify(val) }); };
    const handleSetAuthorName = (val: string) => { setAuthorName(val); saveToFirestore({ authorName: val }); };
    const handleSetAcknowledgements = (val: string) => { setAcknowledgements(val); saveToFirestore({ acknowledgements: val }); };
    const handleSetReferences = (val: string) => { setReferences(val); saveToFirestore({ references: val }); };
    const handleSetCustomCoverText = (val: string) => { setCustomCoverText(val); saveToFirestore({ customCoverText: val }); };
    const handleSetSchoolName = (val: string) => { setSchoolName(val); saveToFirestore({ schoolName: val }); };
    const handleSetSemester = (val: string) => { setSemester(val); saveToFirestore({ semester: val }); };
    
    const handleGenerateStructure = async (title: string) => {
        if (!title.trim()) {
            setStructureError("กรุณากรอกชื่อโครงงานก่อน");
            return;
        }
        setStructureIsLoading(true);
        setStructureError(null);
        handleSetReportStructure(null);
        handleSetStudentInputs({});
        handleSetStudentImages({});
        handleSetFeedbackResults({});
        setFeedbackLoadingStates({});
        trackEvent('generate_report_structure', {
            project_title: title,
        });
        try {
            const result = await generateReportStructure(title);
            handleSetReportStructure(result);
        } catch (e: any) {
            setStructureError(e.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ');
        } finally {
            setStructureIsLoading(false);
        }
    };
    
    const handleProceedToStructure = () => {
        const title = projectTitle.trim();
        if (title) {
            handleSetStep('structure');
            handleGenerateStructure(title);
        }
    };

    const handleBackToStep = (targetStep: 'title' | 'structure') => {
        handleSetStep(targetStep);
        if (targetStep === 'title') {
            handleSetReportStructure(null);
            handleSetProjectAbstract('');
            setStructureError(null);
            handleSetStudentInputs({});
            handleSetStudentImages({});
            handleSetFeedbackResults({});
            setFeedbackLoadingStates({});
        }
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
                const base64String = await compressImage(file, 800, 800, 0.7);
                
                // Upload to Firebase Storage
                const imageId = uuidv4();
                const imagePath = `report_structures/${imageId}.jpg`;
                const downloadURL = await uploadImageToStorage(base64String, imagePath);

                const newImages = {
                    ...studentImages,
                    [activeImageUploadKey]: {
                        data: downloadURL, // Store URL instead of base64
                        mimeType: 'image/jpeg',
                        name: file.name
                    }
                };
                handleSetStudentImages(newImages);
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


    const renderStep = () => {
        switch (step) {
            case 'title':
                return (
                    <motion.div
                        key="title"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ReportGenStep1Title
                            interest={interest}
                            setInterest={setInterest}
                            projectTitle={projectTitle}
                            setProjectTitle={setProjectTitle}
                            onProceed={handleProceedToStructure}
                        />
                    </motion.div>
                );
            case 'structure':
                return (
                    <motion.div
                        key="structure"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ReportGenStep2Structure
                            projectTitle={projectTitle}
                            reportStructure={reportStructure}
                            isStructureLoading={isStructureLoading}
                            structureError={structureError}
                            studentInputs={studentInputs}
                            setStudentInputs={setStudentInputs}
                            studentImages={studentImages}
                            setStudentImages={setStudentImages}
                            feedbackResults={feedbackResults}
                            setFeedbackResults={setFeedbackResults}
                            feedbackLoadingStates={feedbackLoadingStates}
                            setFeedbackLoadingStates={setFeedbackLoadingStates}
                            onBack={() => handleBackToStep('title')}
                            onProceed={() => setStep('compile')}
                            handleTriggerFileInput={handleTriggerFileInput}
                        />
                    </motion.div>
                );
            case 'compile':
                 return (
                    <motion.div
                        key="compile"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ReportGenStep3Compile
                            onBack={() => handleBackToStep('structure')}
                            reportData={{
                                reportStructure,
                                studentInputs,
                                projectAbstract,
                                authorName,
                                acknowledgements,
                                references,
                                customCoverText,
                                schoolName,
                                semester,
                            }}
                            setProjectAbstract={handleSetProjectAbstract}
                            setAuthorName={handleSetAuthorName}
                            setAcknowledgements={handleSetAcknowledgements}
                            setReferences={handleSetReferences}
                            setCustomCoverText={handleSetCustomCoverText}
                            setSchoolName={handleSetSchoolName}
                            setSemester={handleSetSemester}
                        />
                    </motion.div>
                 );
            default:
                return null;
        }
    };

    if (isDataLoading) {
        return (
            <div className="mt-6 p-4 sm:p-6 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl bg-white dark:bg-slate-800/50 shadow-sm">
                <div className="animate-pulse space-y-4">
                    <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl w-full"></div>
                    <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-xl w-full"></div>
                    <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-xl w-full"></div>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 sm:p-6 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
             <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/jpeg,image/png,image/webp" className="hidden" capture="environment" />
            <AnimatePresence mode="wait">
                {renderStep()}
            </AnimatePresence>
        </motion.div>
    );
};

export default ReportStructureGenerator;
