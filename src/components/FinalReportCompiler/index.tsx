import React, { useState, useEffect, useRef } from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { 
    Loader2, FileText, Download, Sparkles
} from 'lucide-react';
import { trackEvent } from '../../services/analyticsService';
import { analyzeSource, generateFullProjectDraft } from '../../services/gemini';
import PrintableReport from '../PrintableReport';

// Sub-components
import { A4Page } from './A4Page';
import CoverPage from './CoverPage';
import AbstractPage from './AbstractPage';
import { ChapterPage, ReferencesPage } from './ReportPages';

const CHAPTER_TEMPLATES = {
    1: { title: 'บทนำ', sections: [{ header: 'ที่มาและความสำคัญ' }, { header: 'วัตถุประสงค์' }, { header: 'ขอบเขตการศึกษา' }] },
    2: { title: 'เอกสารและงานวิจัยที่เกี่ยวข้อง', sections: [{ header: 'ทฤษฎีพื้นฐาน' }, { header: 'งานวิจัยที่เกี่ยวข้อง' }] },
    3: { title: 'วิธีดำเนินการ', sections: [{ header: 'วัสดุและอุปกรณ์' }, { header: 'ขั้นตอนการดำเนินงาน' }] },
    4: { title: 'ผลการดำเนินงาน', sections: [{ header: 'ผลการศึกษา' }, { header: 'การวิเคราะห์ผล' }] },
    5: { title: 'สรุปผลและข้อเสนอแนะ', sections: [{ header: 'สรุปผล' }, { header: 'ข้อเสนอแนะ' }] }
};

const FinalReportCompiler = () => {
    const { user, userData } = useAuth();
    const { projectTitle, isLoaded: isProjectLoaded, is1ProjectTitle, is2ProjectTitle, is3ProjectTitle, independentProjectTitle } = useProjectData();
    const [isLoading, setIsLoading] = useState(true);
    const [reportData, setReportData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const pdfRef = useRef<HTMLDivElement>(null);

    const contextId = userData?.classId || 'personal';
    const compositeId = user ? `${user.uid}_${contextId}` : '';

    const [authorName, setAuthorName] = useState('');
    const [acknowledgements, setAcknowledgements] = useState('');
    const [references, setReferences] = useState('');
    const [projectAbstract, setProjectAbstract] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [semester, setSemester] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [customCoverText, setCustomCoverText] = useState('');
    const [localInputs, setLocalInputs] = useState<any>({});
    const [isPolishing, setIsPolishing] = useState<string | null>(null);

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

            const snapshotPromises = stepMapping.map(map => {
                const docRef = doc(db, 'user_chapters', compositeId, 'chapters', map.stepId);
                return getDoc(docRef);
            });
            
            const snapshots = await Promise.all(snapshotPromises);

            snapshots.forEach((snap, index) => {
                const map = stepMapping[index];
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

                if (!chapterInfo) {
                    const template = (CHAPTER_TEMPLATES as any)[map.chapterNum];
                    chapterInfo = {
                        chapter_number: map.chapterNum,
                        title: template.title,
                        sections: template.sections
                    };
                }
                compiledChapters.push(chapterInfo);
            });

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

    const handleLocalInputChange = (key: string, value: string) => {
        setLocalInputs((prev: any) => ({ ...prev, [key]: value }));
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

    const handleGeneratePdf = () => {
        window.print();
    };

    const handleMasterDraft = async () => {
        if (!finalProjectTitle || finalProjectTitle === 'โครงงานวิจัย') {
            alert("กรุณาตั้งชื่อโครงงานให้ชัดเจนก่อนครับ");
            return;
        }

        if (confirm("AI จะช่วยร่างเนื้อหาทั้ง 5 บทให้คุณใหม่ทั้งหมด คุณต้องการดำเนินการใช่หรือไม่? (เนื้อหาเดิมที่เคยพิมพ์จะถูกทับเฉพาะส่วนที่เป็นหัวข้อหลัก)")) {
            setIsPolishing('master');
            try {
                const draft = await generateFullProjectDraft(finalProjectTitle, independentProjectTitle || "");
                const stepMapping = [
                    { chapterNum: 1, stepId: '5' },
                    { chapterNum: 2, stepId: '8' },
                    { chapterNum: 3, stepId: '11' },
                    { chapterNum: 4, stepId: '13' },
                    { chapterNum: 5, stepId: '15' }
                ];

                for (const chData of draft.chapters) {
                    const mapping = stepMapping.find(m => m.chapterNum === chData.chapter_number);
                    if (mapping) {
                        const docRef = doc(db, 'user_chapters', compositeId, 'chapters', mapping.stepId);
                        await setDoc(docRef, { 
                            studentInputs: JSON.stringify(chData.sections),
                            uid: user?.uid,
                            lastUpdated: new Date()
                        }, { merge: true });
                    }
                }
                
                alert("ร่างรายงานทั้ง 5 บทสำเร็จแล้ว! ระบบจะทำการรีโหลดข้อมูลใหม่ครับ");
                fetchData();
            } catch (e: any) {
                alert("เกิดข้อผิดพลาด: " + e.message);
            } finally {
                setIsPolishing(null);
            }
        }
    };

    if (isLoading) return <div className="p-20 text-center flex flex-col items-center gap-4"><Loader2 className="w-12 h-12 animate-spin text-emerald-500" /><p className="text-slate-500 animate-pulse">กำลังรวบรวมข้อมูลทุกบท...</p></div>;

    const chapters = reportData?.reportStructure?.chapters || [];
    const totalPages = 2 + chapters.length + 1; 

    return (
        <div className="space-y-6">
            <div className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-4 rounded-3xl flex items-center justify-between shadow-xl print:hidden">
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
                        onClick={handleMasterDraft}
                        disabled={!!isPolishing}
                        className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 rounded-xl font-medium flex items-center gap-2 hover:bg-indigo-100 transition-all text-sm disabled:opacity-50"
                    >
                        {isPolishing === 'master' ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> กำลังร่างทั้งเล่ม...</>
                        ) : (
                            <><Sparkles className="w-4 h-4" /> AI ร่างเนื้อหาทั้งเล่ม</>
                        )}
                    </button>
                    <button 
                        onClick={handleGeneratePdf} 
                        className="px-8 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-200 dark:shadow-none"
                    >
                        <Download className="w-4 h-4" />
                        ดาวน์โหลด PDF (พิมพ์)
                    </button>
                </div>
            </div>

            <div className="bg-slate-200/50 dark:bg-slate-950/20 py-12 px-4 rounded-[3rem] border-4 border-dashed border-slate-300 dark:border-slate-800 overflow-x-auto min-h-screen print:hidden">
                <div className="flex flex-col items-center gap-12 max-w-full">
                    
                    <CoverPage 
                        projectTitle={finalProjectTitle}
                        authorName={authorName}
                        customCoverText={customCoverText}
                        subjectName={subjectName}
                        subjectCode={subjectCode}
                        schoolName={schoolName}
                        semester={semester}
                        totalPages={totalPages}
                    />

                    <AbstractPage 
                        projectAbstract={projectAbstract}
                        setProjectAbstract={setProjectAbstract}
                        acknowledgements={acknowledgements}
                        setAcknowledgements={setAcknowledgements}
                        onAiPolish={handleAiPolish}
                        onSaveMetadata={handleSaveMetadata}
                        totalPages={totalPages}
                    />

                    {chapters.map((chapter: any, pageIdx: number) => (
                        <ChapterPage 
                            key={`${chapter.chapter_number}_${pageIdx}`}
                            chapter={chapter}
                            pageIdx={pageIdx}
                            totalPages={totalPages}
                            localInputs={localInputs}
                            onLocalInputChange={handleLocalInputChange}
                            onAiPolish={handleAiPolish}
                        />
                    ))}

                    <ReferencesPage 
                        references={references}
                        setReferences={setReferences}
                        onAiPolish={handleAiPolish}
                        onSaveMetadata={handleSaveMetadata}
                        totalPages={totalPages}
                    />
                </div>
            </div>

            <div className="printable-report-container" aria-hidden="true" >
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
                        userData={userData}
                    />
                </div>
            </div>
        </div>
    );
};

export default FinalReportCompiler;
