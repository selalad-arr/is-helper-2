import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useProjectData } from '../hooks/useProjectData';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, onSnapshot, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { 
    Loader2, FileText, Download, Sparkles, AlertCircle
} from 'lucide-react';
import { trackEvent } from '../services/analyticsService';
import { analyzeSource } from '../services/geminiService';
import PrintableReport from './PrintableReport';

// Standard Structure Template if AI hasn't been used
const CHAPTER_TEMPLATES = {
    1: { title: 'บทนำ', sections: [{ header: 'ที่มาและความสำคัญ' }, { header: 'วัตถุประสงค์' }, { header: 'ขอบเขตการศึกษา' }] },
    2: { title: 'เอกสารและงานวิจัยที่เกี่ยวข้อง', sections: [{ header: 'ทฤษฎีพื้นฐาน' }, { header: 'งานวิจัยที่เกี่ยวข้อง' }] },
    3: { title: 'วิธีดำเนินการ', sections: [{ header: 'วัสดุและอุปกรณ์' }, { header: 'ขั้นตอนการดำเนินงาน' }] },
    4: { title: 'ผลการดำเนินงาน', sections: [{ header: 'ผลการศึกษา' }, { header: 'การวิเคราะห์ผล' }] },
    5: { title: 'สรุปผลและข้อเสนอแนะ', sections: [{ header: 'สรุปผล' }, { header: 'ข้อเสนอแนะ' }] }
};

const A4Page: React.FC<React.PropsWithChildren<{ pageNumber?: number, totalPages?: number }>> = ({ children, pageNumber, totalPages }) => (
    <div className="relative bg-white text-black shadow-2xl mb-8 mx-auto print:shadow-none print:m-0" style={{ width: '210mm', minHeight: '297mm', padding: '1.5in 1in 1in 1.5in' }}>
        <div className="absolute top-4 left-4 text-[9px] text-slate-300 uppercase tracking-widest pointer-events-none print:hidden">A4 Preview Content</div>
        {pageNumber && totalPages && (
            <div className="absolute bottom-4 right-8 text-[12pt] text-slate-400 font-serif">{pageNumber} / {totalPages}</div>
        )}
        <div className="h-full" style={{ fontFamily: 'THSarabunPSK, sans-serif' }}>
            {children}
        </div>
    </div>
);

const FinalReportCompiler = () => {
    const { user, userData } = useAuth();
    const { projectTitle, isLoaded: isProjectLoaded, is1ProjectTitle, is2ProjectTitle, is3ProjectTitle, independentProjectTitle } = useProjectData();
    const [isLoading, setIsLoading] = useState(true);
    const [reportData, setReportData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const pdfRef = useRef<HTMLDivElement>(null);

    const contextId = userData?.classId || 'personal';
    const compositeId = user ? `${user.uid}_${contextId}` : '';

    // Metadata states
    const [authorName, setAuthorName] = useState('');
    const [acknowledgements, setAcknowledgements] = useState('');
    const [references, setReferences] = useState('');
    const [projectAbstract, setProjectAbstract] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [semester, setSemester] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [customCoverText, setCustomCoverText] = useState('');

    // Consolidated Title to avoid placeholders on Cover
    const finalProjectTitle = projectTitle || is2ProjectTitle || is1ProjectTitle || independentProjectTitle || 'โครงงานวิจัย';

    useEffect(() => {
        if (!user || !compositeId) return;
        const unsubscribe = onSnapshot(doc(db, 'user_reports', compositeId), (snap) => {
            if (snap.exists()) {
                const d = snap.data();
                setAuthorName(d.authorName || userData?.displayName || '');
                setAcknowledgements(d.acknowledgements || '');
                setReferences(d.references || '');
                setProjectAbstract(d.projectAbstract || '');
                setSchoolName(d.schoolName || '');
                setSemester(d.semester || '');
                setSubjectName(d.subjectName || '');
                setSubjectCode(d.subjectCode || '');
                setCustomCoverText(d.customCoverText || '');
            }
        });
        return () => unsubscribe();
    }, [user, compositeId, userData]);

    const fetchData = async () => {
        if (!user || !compositeId) return;
        setIsLoading(true);
        try {
            const stepMapping = [
                { chapterNum: 1, stepId: '5' },
                { chapterNum: 2, stepId: '8' },
                { chapterNum: 3, stepId: '11' },
                { chapterNum: 4, stepId: '13' },
                { chapterNum: 5, stepId: '15' }
            ];
            
            const allInputs: any = {};
            const compiledChapters: any[] = [];

            for (const map of stepMapping) {
                const docRef = doc(db, 'user_chapters', compositeId, 'chapters', map.stepId);
                const snap = await getDoc(docRef);
                
                let chapterInfo: any = null;

                if (snap.exists()) {
                    const data = snap.data();
                    const guideline = data.guideline ? JSON.parse(data.guideline) : null;
                    const inputs = data.studentInputs ? JSON.parse(data.studentInputs) : {};
                    Object.assign(allInputs, inputs);
                    
                    if (guideline) {
                        chapterInfo = {
                            chapter_number: guideline.chapter_number,
                            title: guideline.title,
                            sections: guideline.sections
                        };
                    }
                }

                // Fallback to template if no AI guideline used but we want to show the chapter
                if (!chapterInfo) {
                    const template = (CHAPTER_TEMPLATES as any)[map.chapterNum];
                    chapterInfo = {
                        chapter_number: map.chapterNum,
                        title: template.title,
                        sections: template.sections
                    };
                }
                compiledChapters.push(chapterInfo);
            }

            setReportData({
                reportStructure: { title: finalProjectTitle, chapters: compiledChapters },
                studentInputs: allInputs
            });
            setLocalInputs(allInputs);
        } catch (err: any) {
            console.error(err);
            setError("Failed to fetch. Please try refreshing.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isProjectLoaded && compositeId) fetchData();
    }, [isProjectLoaded, compositeId]);

    const [localInputs, setLocalInputs] = useState<any>({});
    const [isPolishing, setIsPolishing] = useState<string | null>(null);

    const handleLocalInputChange = (key: string, value: string) => {
        setLocalInputs(prev => ({ ...prev, [key]: value }));
    };

    const handleSaveMetadata = async (field: string, value: string) => {
        if (!user || !compositeId) return;
        await setDoc(doc(db, 'user_reports', compositeId), { [field]: value, uid: user.uid, lastUpdated: new Date() }, { merge: true });
    };

    const handleAiPolish = async (key: string, currentText: string, fieldType: 'input' | 'meta' = 'input', metaField?: string) => {
        if (!currentText.trim() || isPolishing) return;
        setIsPolishing(key);
        try {
            const prompt = `ช่วยเกลาภาษาไทยส่วนนี้ให้เป็นภาษาทางการเชิงวิชาการ (Academic Thai) โดยรักษาเนื้อหาเดิมไว้:\n\n${currentText}`;
            const polished = await analyzeSource(prompt, []);
            if (polished) {
                if (fieldType === 'input') handleLocalInputChange(key, polished);
                if (fieldType === 'meta' && metaField) {
                     if (metaField === 'projectAbstract') setProjectAbstract(polished);
                     else if (metaField === 'acknowledgements') setAcknowledgements(polished);
                     else if (metaField === 'references') setReferences(polished);
                     handleSaveMetadata(metaField, polished);
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsPolishing(null);
        }
    };

    const handleGeneratePdf = async () => {
        const renderEl = pdfRef.current;
        if (!renderEl || isGeneratingPdf) return;
        setIsGeneratingPdf(true);
        try {
            const jsPDF = (await import('jspdf')).default;
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
            await pdf.html(renderEl, {
                html2canvas: { scale: 0.7, useCORS: true, backgroundColor: '#ffffff' },
                autoPaging: 'text',
                margin: [0, 0, 0, 0],
                fontFaces: [
                    { family: 'THSarabunPSK', style: 'normal', weight: 'normal', src: [{ url: '/fonts/THSarabun.ttf', format: 'truetype' }] },
                    { family: 'THSarabunPSK', style: 'normal', weight: '700', src: [{ url: '/fonts/THSarabun Bold.ttf', format: 'truetype' }] }
                ]
            });
            pdf.save(`${finalProjectTitle.replace(/ /g, '_')}.pdf`);
        } catch (error) {
            alert("Error generating PDF");
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    if (isLoading) return <div className="p-20 text-center flex flex-col items-center gap-4"><Loader2 className="w-12 h-12 animate-spin text-emerald-500" /><p className="text-slate-500 animate-pulse">กำลังรวบรวมข้อมูลทุกบท...</p></div>;

    const chapters = reportData?.reportStructure?.chapters || [];
    const totalPages = 2 + chapters.length + 1; // Cover + Abs/Ack + Chapters + Ref

    return (
        <div className="space-y-6">
            {/* Control Bar */}
            <div className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-4 rounded-3xl flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500 rounded-lg text-white">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100">Final Report Editor 📝</h4>
                        <p className="text-[10px] text-slate-500">ตรวจสอบความเรียบร้อยก่อนสั่งพิมพ์</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleGeneratePdf} 
                        disabled={isGeneratingPdf} 
                        className="px-8 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                        {isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        ดาวน์โหลด PDF
                    </button>
                </div>
            </div>

            <div className="bg-slate-200/50 dark:bg-slate-950/20 py-12 px-4 rounded-[3rem] border-4 border-dashed border-slate-300 dark:border-slate-800 overflow-x-auto min-h-screen">
                <div className="flex flex-col items-center gap-12 max-w-full">
                    
                    {/* PAGE 1: COVER */}
                    <A4Page pageNumber={1} totalPages={totalPages}>
                        <div className="h-full flex flex-col justify-between text-center pt-24 pb-24 text-black">
                            <div>
                                <h1 className="text-[28pt] font-bold mb-10 leading-tight">{finalProjectTitle}</h1>
                            </div>
                            <div className="my-10">
                                <p className="text-[18pt]">โดย</p>
                                <p className="text-[22pt] font-bold mt-4 whitespace-pre-wrap">{authorName || '...'}</p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[16pt] whitespace-pre-wrap">{customCoverText}</p>
                                <p className="text-[17pt] font-bold">รายวิชา {subjectName} {subjectCode ? `(${subjectCode})` : ''}</p>
                                <p className="text-[17pt]">{schoolName}</p>
                                <p className="text-[17pt]">{semester || `ภาคเรียนที่ 1 ปีการศึกษา 2567`}</p>
                            </div>
                        </div>
                    </A4Page>

                    {/* PAGE 2: ABSTRACT & ACKNOWLEDGEMENTS */}
                    <A4Page pageNumber={2} totalPages={totalPages}>
                        <div className="space-y-16">
                            <section>
                                <h2 className="text-[22pt] font-bold text-center mb-8">บทคัดย่อ</h2>
                                <div className="group relative">
                                    <button onClick={() => handleAiPolish('abstract', projectAbstract, 'meta', 'projectAbstract')} className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition-all">
                                        <Sparkles className="w-5 h-5" />
                                    </button>
                                    <textarea 
                                        value={projectAbstract} 
                                        onChange={(e) => {setProjectAbstract(e.target.value); handleSaveMetadata('projectAbstract', e.target.value);}}
                                        className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-100 p-2 rounded text-[16pt] leading-[1.8] text-justify resize-none h-auto min-h-[200px]"
                                        style={{ textIndent: '1.5cm' }}
                                        onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                                        placeholder="พิมพ์บทคัดย่อ..."
                                    />
                                </div>
                            </section>
                            <section>
                                <h2 className="text-[22pt] font-bold text-center mb-8">กิตติกรรมประกาศ</h2>
                                <div className="group relative">
                                    <button onClick={() => handleAiPolish('ack', acknowledgements, 'meta', 'acknowledgements')} className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition-all">
                                        <Sparkles className="w-5 h-5" />
                                    </button>
                                    <textarea 
                                        value={acknowledgements} 
                                        onChange={(e) => {setAcknowledgements(e.target.value); handleSaveMetadata('acknowledgements', e.target.value);}}
                                        className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-100 p-2 rounded text-[16pt] leading-[1.8] text-justify resize-none h-auto min-h-[200px]"
                                        style={{ textIndent: '1.5cm' }}
                                        onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                                        placeholder="พิมพ์กิตติกรรมประกาศ..."
                                    />
                                </div>
                            </section>
                        </div>
                    </A4Page>

                    {/* CHAPTERS */}
                    {chapters.map((chapter: any, pageIdx: number) => (
                        <A4Page key={`${chapter.chapter_number}_${pageIdx}`} pageNumber={3 + pageIdx} totalPages={totalPages}>
                            <h2 className="text-[22pt] font-bold text-center mb-12">บทที่ {chapter.chapter_number}<br/>{chapter.title}</h2>
                            {chapter.sections?.map((section: any, sIdx: number) => {
                                const key = `${chapter.chapter_number}_${sIdx}`;
                                const val = localInputs[key] || '';
                                return (
                                    <div key={key} className="mb-10 group relative">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-[17pt] font-bold">{chapter.chapter_number}.{sIdx+1} {section.header}</h3>
                                            <button onClick={() => handleAiPolish(key, val)} className="opacity-0 group-hover:opacity-100 text-indigo-500 p-1 hover:bg-indigo-50 rounded-md transition-all">
                                                <Sparkles className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <textarea 
                                            value={val}
                                            onChange={(e) => handleLocalInputChange(key, e.target.value)}
                                            className="w-full border-none focus:ring-1 focus:ring-indigo-50 p-2 rounded text-[16pt] leading-[1.8] text-justify bg-transparent resize-none overflow-hidden min-h-[100px]"
                                            style={{ textIndent: '1.5cm' }}
                                            onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                                            placeholder="..."
                                        />
                                    </div>
                                );
                            })}
                        </A4Page>
                    ))}

                    {/* REFERENCES */}
                    <A4Page pageNumber={totalPages} totalPages={totalPages}>
                        <h2 className="text-[22pt] font-bold text-center mb-10">เอกสารอ้างอิง</h2>
                        <div className="group relative">
                             <button onClick={() => handleAiPolish('ref', references, 'meta', 'references')} className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 text-indigo-500 p-2 hover:bg-indigo-50 rounded-full transition-all">
                                <Sparkles className="w-5 h-5" />
                            </button>
                            <textarea 
                                value={references} 
                                onChange={(e) => {setReferences(e.target.value); handleSaveMetadata('references', e.target.value);}}
                                className="w-full bg-transparent border-none focus:ring-1 focus:ring-indigo-100 p-2 rounded text-[16pt] leading-[1.8] resize-none h-auto min-h-[400px]"
                                onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                                placeholder="รายการเอกสารอ้างอิง..."
                            />
                        </div>
                    </A4Page>
                </div>
            </div>

            {/* Hidden for actual PDF render */}
            <div className="absolute -left-[9999px] top-0 opacity-0" aria-hidden="true" >
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
