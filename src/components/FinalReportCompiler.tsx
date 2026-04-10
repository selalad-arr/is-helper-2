import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useProjectData } from '../hooks/useProjectData';
import { useAuth } from '../contexts/AuthContext';
import { db, auth } from '../firebase';
import { doc, getDoc, collection, getDocs, query, where, onSnapshot, setDoc } from 'firebase/firestore';
import { Loader2, FileText, Download, AlertCircle, RefreshCcw } from 'lucide-react';
import { trackEvent } from '../services/analyticsService';
import PrintableReport from './PrintableReport';
import ReportMetadataForm from './ReportMetadataForm';

const FinalReportCompiler = () => {
    const { user, userData } = useAuth();
    const { projectTitle, isLoaded: isProjectLoaded } = useProjectData();
    const [isLoading, setIsLoading] = useState(true);
    const [reportData, setReportData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const pdfRef = useRef<HTMLDivElement>(null);

    // Context Info
    const contextId = userData?.classId || 'personal';

    // Form states for Step 3 Compile (additional info)
    const [authorName, setAuthorName] = useState('');
    const [acknowledgements, setAcknowledgements] = useState('');
    const [references, setReferences] = useState('');
    const [projectAbstract, setProjectAbstract] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [semester, setSemester] = useState(`ภาคเรียนที่ 1 ปีการศึกษา ${new Date().getFullYear() + 543}`);
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [customCoverText, setCustomCoverText] = useState('');

    // 3. Fetch REPORT METADATA (Author, School, etc.)
    useEffect(() => {
        if (!user) return;

        const compositeId = `${user.uid}_${contextId}`;
        const reportRef = doc(db, 'user_reports', compositeId);
        
        const unsubscribeSnapshot = onSnapshot(reportRef, (reportSnap) => {
            if (reportSnap.exists()) {
                const rData = reportSnap.data();
                if (rData.authorName) setAuthorName(rData.authorName);
                if (rData.acknowledgements) setAcknowledgements(rData.acknowledgements);
                if (rData.references) setReferences(rData.references);
                if (rData.projectAbstract) setProjectAbstract(rData.projectAbstract);
                if (rData.schoolName) setSchoolName(rData.schoolName);
                if (rData.semester) setSemester(rData.semester);
                if (rData.subjectName) setSubjectName(rData.subjectName);
                if (rData.subjectCode) setSubjectCode(rData.subjectCode);
                if (rData.customCoverText) setCustomCoverText(rData.customCoverText);
            } else {
                // Clear form if no report context found
                setAuthorName('');
                setAcknowledgements('');
                setReferences('');
                setProjectAbstract('');
                setSchoolName('');
                setSemester(`ภาคเรียนที่ 1 ปีการศึกษา ${new Date().getFullYear() + 543}`);
                setSubjectName('');
                setSubjectCode('');
                setCustomCoverText('');
            }
        });
        
        return () => unsubscribeSnapshot();
    }, [user, contextId]);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        if (!user) {
            setError("กรุณาเข้าสู่ระบบก่อนครับ");
            setIsLoading(false);
            return;
        }

        const compositeId = `${user.uid}_${contextId}`;

        try {
            // 1. Fetch data from user_chapters for all steps (2-8)
            const steps = [5, 8, 11, 13, 15];
            const allInputs: any = {};
            const chapters: any[] = [];

            for (const stepNum of steps) {
                const docRef = doc(db, 'user_chapters', compositeId, 'chapters', String(stepNum));
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const guideline = data.guideline ? JSON.parse(data.guideline) : null;
                    const inputs = data.studentInputs ? JSON.parse(data.studentInputs) : {};
                    
                    Object.assign(allInputs, inputs);

                    if (guideline) {
                        const chapterNum = guideline.chapter_number;
                        let existingChapter = chapters.find(c => c.chapter_number === chapterNum);
                        
                        if (!existingChapter) {
                            existingChapter = {
                                chapter_number: chapterNum,
                                title: guideline.title,
                                sections: []
                            };
                            chapters.push(existingChapter);
                        }
                        
                        guideline.sections.forEach((sec: any) => {
                            if (!existingChapter.sections.find((s: any) => s.header === sec.header)) {
                                existingChapter.sections.push(sec);
                            }
                        });
                    }
                }
            }

            const structure = {
                title: projectTitle || 'รายงานโครงงาน',
                chapters: chapters.sort((a, b) => a.chapter_number - b.chapter_number)
            };

            setReportData({
                reportStructure: structure,
                studentInputs: allInputs
            });

        } catch (err: any) {
            console.error("Error fetching report data:", err);
            setError("เกิดข้อผิดพลาดในการดึงข้อมูล: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isProjectLoaded) {
            fetchData();
        }
    }, [isProjectLoaded, contextId]);

    const handleSaveMetadata = async (field: string, value: string) => {
        if (!user) return;
        const compositeId = `${user.uid}_${contextId}`;
        try {
            const reportRef = doc(db, 'user_reports', compositeId);
            await setDoc(reportRef, { [field]: value, uid: user.uid, lastUpdated: new Date() }, { merge: true });
        } catch (err) {
            console.error("Error saving metadata:", err);
        }
    };

    const handleGeneratePdf = async () => {
        const pdfRenderElement = pdfRef.current;
        if (!pdfRenderElement || isGeneratingPdf) return;

        setIsGeneratingPdf(true);
        trackEvent('download_final_compiled_report', {
            project_title: projectTitle,
        });
        
        try {
            const jsPDF = (await import('jspdf')).default;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4',
            });
            
            await pdf.html(pdfRenderElement, {
                html2canvas: {
                    scale: (595.28 - 72 * 2) / 827, 
                    useCORS: true,
                    backgroundColor: '#ffffff',
                },
                autoPaging: 'text',
                margin: [0, 0, 0, 0],
                fontFaces: [
                    {
                        family: 'THSarabunPSK',
                        style: 'normal',
                        weight: 'normal',
                        src: [{ url: '/fonts/THSarabun.ttf', format: 'truetype' }]
                    },
                    {
                        family: 'THSarabunPSK',
                        style: 'normal',
                        weight: '700',
                        src: [{ url: '/fonts/THSarabun Bold.ttf', format: 'truetype' }]
                    }
                ]
            });
            
            pdf.save(`${(projectTitle || 'report').replace(/ /g, '_')}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("เกิดข้อผิดพลาดในการสร้างไฟล์ PDF โปรดลองอีกครั้ง");
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    const [isEditing, setIsEditing] = useState(false);
    const [localInputs, setLocalInputs] = useState<any>({});

    useEffect(() => {
        if (reportData?.studentInputs && Object.keys(reportData.studentInputs).length > 0) {
            setLocalInputs(reportData.studentInputs);
        }
    }, [reportData?.studentInputs]);

    const handleLocalInputChange = (key: string, value: string) => {
        setLocalInputs(prev => ({ ...prev, [key]: value }));
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-4">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                <p className="text-slate-600 dark:text-slate-400">กำลังรวบรวมข้อมูลจากทุกก้าว...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                <p className="text-slate-800 dark:text-slate-200 font-medium">{error}</p>
                <button 
                    onClick={fetchData} 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                    <RefreshCcw className="w-4 h-4" /> ลองใหม่อีกครั้ง
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="sticky top-0 z-50 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500 rounded-lg text-white">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100">ตัวจัดการรายงาน</h4>
                        <p className="text-[10px] text-slate-500">แก้ไขเนื้อหาในหน้ากระดาษได้เลยจ้า</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`flex-1 md:flex-none px-4 py-2 rounded-xl transition-all font-medium flex items-center justify-center gap-2 ${
                            isEditing 
                            ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        <RefreshCcw className={`w-4 h-4 ${isEditing ? 'animate-spin-slow' : ''}`} />
                        {isEditing ? 'กำลังเปิดโหมดแก้ไข' : 'โหมดแก้ไขด่วน'}
                    </button>
                    
                    <button
                        onClick={handleGeneratePdf}
                        disabled={isGeneratingPdf}
                        className="flex-1 md:flex-none inline-flex items-center gap-2 justify-center px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        ดาวน์โหลด PDF
                    </button>
                </div>
            </div>

            {/* Document Editor / Viewer */}
            <div className="flex justify-center bg-slate-100 dark:bg-slate-950/40 p-4 md:p-12 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 min-h-[1000px] overflow-x-auto">
                <div className="bg-white text-black shadow-2xl origin-top transition-transform" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                    
                    {/* Fake A4 Page Content */}
                    <div className="font-serif">
                        <div className="text-center mb-20 pt-20">
                            <h1 className="text-4xl font-bold mb-10 leading-tight" style={{ fontFamily: 'THSarabunPSK' }}>{projectTitle || 'ชื่อโครงงานของคุณ'}</h1>
                            <div className="my-20">
                                <p className="text-xl mb-2" style={{ fontFamily: 'THSarabunPSK' }}>โดย</p>
                                <p className="text-2xl font-bold" style={{ fontFamily: 'THSarabunPSK' }}>{authorName || '...'}</p>
                            </div>
                        </div>

                        {/* Abstract Section */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'THSarabunPSK' }}>บทคัดย่อ</h2>
                            <textarea
                                value={projectAbstract}
                                onChange={(e) => handleSaveMetadata('projectAbstract', e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-blue-100 p-1 rounded transition-all resize-none overflow-hidden"
                                style={{ 
                                    fontFamily: 'THSarabunPSK', fontSize: '16pt', lineHeight: '1.6',
                                    textIndent: '1.5rem', textAlign: 'justify', minHeight: '100px'
                                }}
                                onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                            />
                        </div>

                        {/* Acknowledgements Section */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'THSarabunPSK' }}>กิตติกรรมประกาศ</h2>
                            <textarea
                                value={acknowledgements}
                                onChange={(e) => handleSaveMetadata('acknowledgements', e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-blue-100 p-1 rounded transition-all resize-none overflow-hidden"
                                style={{ 
                                    fontFamily: 'THSarabunPSK', fontSize: '16pt', lineHeight: '1.6',
                                    textIndent: '1.5rem', textAlign: 'justify', minHeight: '100px'
                                }}
                                onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                            />
                        </div>

                        {/* Content Chapters */}
                        {reportData?.reportStructure?.chapters.map((chapter: any) => (
                            <div key={chapter.chapter_number} className="mb-12">
                                <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'THSarabunPSK' }}>
                                    บทที่ {chapter.chapter_number} {chapter.title}
                                </h2>
                                
                                {chapter.sections.map((section: any, sIdx: number) => {
                                    const key = `${chapter.chapter_number}_${sIdx}`;
                                    const value = localInputs[key] || '';
                                    return (
                                        <div key={key} className="mb-6 group relative">
                                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ fontFamily: 'THSarabunPSK' }}>
                                                {chapter.chapter_number}.{sIdx + 1} {section.header}
                                                <span className="opacity-0 group-hover:opacity-100 text-[10px] text-blue-500 font-normal transition-opacity">(คลิกเพื่อแก้ไข)</span>
                                            </h3>
                                            <textarea
                                                value={value}
                                                onChange={(e) => handleLocalInputChange(key, e.target.value)}
                                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-blue-100 p-1 rounded transition-all resize-none overflow-hidden"
                                                style={{ 
                                                    fontFamily: 'THSarabunPSK', 
                                                    fontSize: '16pt', 
                                                    lineHeight: '1.6',
                                                    textIndent: '1.5rem',
                                                    textAlign: 'justify',
                                                    minHeight: '2em'
                                                }}
                                                onInput={(e: any) => {
                                                    e.target.style.height = 'auto';
                                                    e.target.style.height = e.target.scrollHeight + 'px';
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ))}

                        {/* References Section */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'THSarabunPSK' }}>เอกสารอ้างอิง</h2>
                            <textarea
                                value={references}
                                onChange={(e) => handleSaveMetadata('references', e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-blue-100 p-1 rounded transition-all resize-none overflow-hidden"
                                style={{ 
                                    fontFamily: 'THSarabunPSK', fontSize: '16pt', lineHeight: '1.6',
                                    minHeight: '100px'
                                }}
                                onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-900 text-sm text-amber-800 dark:text-amber-300">
                <p><strong>💡 หมายเหตุ:</strong> การแก้ไขในหน้านี้จะช่วยเติมเต็มรายงานให้สมบูรณ์ก่อนพิมพ์ แนะนำให้ตรวจทานคำผิดและการสะกดคำให้เรียบร้อยก่อนดาวน์โหลด PDF นะจ๊ะ</p>
            </div>

            {/* Hidden div for PDF rendering */}
            <div className="absolute -left-[9999px] top-0" aria-hidden="true" >
                <div ref={pdfRef}>
                    <PrintableReport 
                        reportStructure={reportData?.reportStructure}
                        studentInputs={localInputs}
                        authorName={authorName}
                        projectAbstract={projectAbstract}
                        acknowledgements={acknowledgements}
                        references={references}
                        schoolName={schoolName}
                        semester={semester}
                        subjectName={subjectName}
                        subjectCode={subjectCode}
                        customCoverText={customCoverText}
                    />
                </div>
            </div>
        </div>
    );
};

export default FinalReportCompiler;
