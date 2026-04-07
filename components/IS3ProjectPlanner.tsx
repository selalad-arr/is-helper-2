

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import { DocumentArrowDownIcon } from '../ui/icons';
import { trackEvent } from '../services/analyticsService';
import { useFirestoreData } from '../src/hooks/useFirestore';

const pdfStyles: { [key: string]: React.CSSProperties } = {
    page: {
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'Sarabun, sans-serif',
        width: '827px',
        boxSizing: 'border-box',
    },
    h1: { fontSize: '18pt', fontWeight: 'bold', textAlign: 'center', marginBottom: '24pt' },
    h2: { fontSize: '16pt', fontWeight: 'bold', marginTop: '16pt', marginBottom: '8pt', borderBottom: '1px solid #ccc', paddingBottom: '4pt' },
    p: { fontSize: '14pt', lineHeight: 1.6, marginBottom: '12pt', textIndent: '2rem', textAlign: 'justify' },
    li: { fontSize: '14pt', lineHeight: 1.6, marginBottom: '8pt', textAlign: 'justify' },
    label: { fontWeight: 'bold' },
    section: { marginBottom: '16pt' },
    signature: { marginTop: '40pt', textAlign: 'center', fontSize: '14pt' },
};

const PrintableIS3Plan = ({ values }: { values: any }) => (
    <div style={pdfStyles.page}>
        <h1 style={pdfStyles.h1}>แผนโครงการบริการสังคม (IS3)</h1>

        <div style={pdfStyles.section}>
            <p style={{...pdfStyles.p, textIndent: 0 }}><strong style={pdfStyles.label}>1. ชื่องาน/โครงการ:</strong> {values.title || '...'}</p>
        </div>
        
        <div style={pdfStyles.section}>
             <h2 style={{...pdfStyles.h2, marginTop: 0}}>2. หลักการและเหตุผล</h2>
             <p style={pdfStyles.p}>{values.rationale || '...'}</p>
        </div>

        <div style={pdfStyles.section}>
             <h2 style={{...pdfStyles.h2, marginTop: 0}}>3. วัตถุประสงค์</h2>
             <ol style={{ listStyleType: 'decimal', paddingLeft: '2.5rem' }}>
                {values.objectives.map((obj: string, i: number) => obj && <li key={i} style={pdfStyles.li}>{obj}</li>)}
             </ol>
        </div>
        
         <div style={pdfStyles.section}>
            <p style={{...pdfStyles.p, textIndent: 0 }}><strong style={pdfStyles.label}>4. กลุ่มเป้าหมาย:</strong> {values.targetAudience || '...'}</p>
        </div>

        <div style={pdfStyles.section}>
             <h2 style={{...pdfStyles.h2, marginTop: 0}}>5. วิธีดำเนินงาน</h2>
             <p style={pdfStyles.p}>{values.methodology || '...'}</p>
        </div>
        
        <div style={pdfStyles.section}>
            <p style={{...pdfStyles.p, textIndent: 0 }}><strong style={pdfStyles.label}>6. ระยะเวลาดำเนินงาน:</strong> {values.timeline || '...'}</p>
        </div>
        
        <div style={pdfStyles.section}>
            <p style={{...pdfStyles.p, textIndent: 0 }}><strong style={pdfStyles.label}>7. งบประมาณ:</strong> {values.budget || '...'}</p>
        </div>

         <div style={pdfStyles.section}>
             <h2 style={{...pdfStyles.h2, marginTop: 0}}>8. ผลที่คาดว่าจะได้รับ</h2>
               <ol style={{ listStyleType: 'decimal', paddingLeft: '2.5rem' }}>
                {values.outcomes.map((o: string, i: number) => o && <li key={i} style={pdfStyles.li}>{o}</li>)}
             </ol>
        </div>
        
        <div style={pdfStyles.section}>
            <p style={{...pdfStyles.p, textIndent: 0 }}><strong style={pdfStyles.label}>9. ผู้รับผิดชอบโครงการ:</strong> {values.responsible || '...'}</p>
        </div>

        <div style={pdfStyles.signature}>
            <p>ลงชื่อ.......................................................... ผู้เสนอโครงการ</p>
            <p>({values.responsible || '..........................................................'})</p>
            <p>............../............../..............</p>
        </div>
    </div>
);

const FormRow = ({ label, children, htmlFor }: React.PropsWithChildren<{ label: string, htmlFor: string }>) => (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2"
    >
        <label htmlFor={htmlFor} className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">{label}</label>
        {children}
    </motion.div>
);

const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
        type="text"
        className="w-full p-3.5 border border-slate-200 dark:border-slate-700/60 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 shadow-sm"
        {...props}
    />
);

const FormTextarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea 
        className="w-full p-3.5 border border-slate-200 dark:border-slate-700/60 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 shadow-sm resize-y min-h-[120px]"
        {...props}
    />
);


const IS3ProjectPlanner = () => {
    const { data: planData, updateData: updatePlanData, loading: isDataLoading } = useFirestoreData('user_is3_plans', 'main', {
        plan: JSON.stringify({
            title: '',
            rationale: '',
            objectives: [''],
            targetAudience: '',
            methodology: '',
            timeline: '',
            budget: '',
            outcomes: [''],
            responsible: '',
        })
    });

    const [plan, setPlan] = useState({
        title: '',
        rationale: '',
        objectives: [''],
        targetAudience: '',
        methodology: '',
        timeline: '',
        budget: '',
        outcomes: [''],
        responsible: '',
    });
    
    const [isGenerating, setIsGenerating] = useState(false);
    const [printableData, setPrintableData] = useState<any | null>(null);
    const pdfContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isDataLoading && planData.plan) {
            try {
                setPlan(JSON.parse(planData.plan));
            } catch (e) {
                console.error("Failed to parse plan data", e);
            }
        }
    }, [planData, isDataLoading]);

    const saveToFirestore = async (newPlan: any) => {
        updatePlanData({ plan: JSON.stringify(newPlan) });
    };

     useEffect(() => {
        if (!printableData || !isGenerating) return;

        const generatePdf = async () => {
            const pdfElement = pdfContainerRef.current;
            if (!pdfElement) {
                setIsGenerating(false);
                return;
            }
            
            try {
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: 'a4',
                });
                
                await pdf.html(pdfElement, {
                    html2canvas: {
                        scale: (595.28 - 72 * 2) / 827,
                        useCORS: true,
                        backgroundColor: '#ffffff',
                    },
                    autoPaging: 'text',
                    margin: [60, 72, 60, 72],
                    fontFaces: [
                        {
                            family: 'Sarabun',
                            style: 'normal',
                            weight: 'normal',
                            src: [{
                                url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/sarabun/Sarabun-Regular.ttf',
                                format: 'truetype'
                            }]
                        },
                        {
                            family: 'Sarabun',
                            style: 'normal',
                            weight: 'bold',
                            src: [{
                                url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/sarabun/Sarabun-Bold.ttf',
                                format: 'truetype'
                            }]
                        }
                    ]
                });
                
                pdf.save('IS3-แผนโครงการ.pdf');
            } catch (error) {
                console.error("Error generating PDF:", error);
                alert("เกิดข้อผิดพลาดในการสร้างไฟล์ PDF โปรดลองอีกครั้ง");
            } finally {
                setIsGenerating(false);
                setPrintableData(null);
            }
        };
        
        generatePdf();

    }, [printableData, isGenerating]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newPlan = { ...plan, [e.target.name]: e.target.value };
        setPlan(newPlan);
        saveToFirestore(newPlan);
    };
    
    const handleListChange = (listName: 'objectives' | 'outcomes', index: number, value: string) => {
        const newList = [...plan[listName]];
        newList[index] = value;
        const newPlan = { ...plan, [listName]: newList };
        setPlan(newPlan);
        saveToFirestore(newPlan);
    };

    const addListItem = (listName: 'objectives' | 'outcomes') => {
        const newPlan = { ...plan, [listName]: [...plan[listName], ''] };
        setPlan(newPlan);
        saveToFirestore(newPlan);
    };

    const handleGeneratePdf = () => {
        if (isGenerating) return;
        const dataForPdf = {
            ...plan,
            objectives: plan.objectives.filter(o => o.trim() !== ''),
            outcomes: plan.outcomes.filter(o => o.trim() !== ''),
        };
        setPrintableData(dataForPdf);
        setIsGenerating(true);
        trackEvent('download_is3_plan_pdf', {
            project_title: plan.title,
        });
    };

    if (isDataLoading) {
        return (
            <div className="mt-6 p-6 sm:p-8 border border-slate-200/60 dark:border-slate-700/60 rounded-3xl bg-white/80 dark:bg-slate-800/80 shadow-xl backdrop-blur-sm">
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
            className="mt-6 p-6 sm:p-8 border border-slate-200/60 dark:border-slate-700/60 rounded-3xl bg-white/80 dark:bg-slate-800/80 shadow-xl backdrop-blur-sm"
        >
            <div className="space-y-8">
                <FormRow label="1. ชื่องาน/โครงการ" htmlFor="title">
                    <FormInput name="title" id="title" value={plan.title} onChange={handleInputChange} placeholder="ระบุชื่อโครงการของคุณ" />
                </FormRow>
                <FormRow label="2. หลักการและเหตุผล" htmlFor="rationale">
                    <FormTextarea name="rationale" id="rationale" value={plan.rationale} onChange={handleInputChange} rows={5} placeholder="อธิบายที่มาและความสำคัญของปัญหา..." />
                </FormRow>
                
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 mb-2">3. วัตถุประสงค์ (เขียนเป็นข้อๆ)</label>
                    <div className="space-y-3">
                        <AnimatePresence>
                            {plan.objectives.map((obj, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-3"
                                >
                                   <span className="text-slate-400 font-medium w-4 text-right">{i + 1}.</span>
                                   <FormInput value={obj} onChange={(e) => handleListChange('objectives', i, e.target.value)} placeholder={`วัตถุประสงค์ข้อที่ ${i+1}`} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                     <button onClick={() => addListItem('objectives')} className="mt-3 ml-7 text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors flex items-center gap-1">
                         <span className="text-lg leading-none">+</span> เพิ่มวัตถุประสงค์
                     </button>
                </motion.div>

                <FormRow label="4. กลุ่มเป้าหมาย" htmlFor="targetAudience">
                    <FormInput name="targetAudience" id="targetAudience" value={plan.targetAudience} onChange={handleInputChange} placeholder="ระบุกลุ่มบุคคลที่ได้รับประโยชน์" />
                </FormRow>
                <FormRow label="5. วิธีดำเนินงาน (อธิบายขั้นตอน)" htmlFor="methodology">
                    <FormTextarea name="methodology" id="methodology" value={plan.methodology} onChange={handleInputChange} rows={5} placeholder="อธิบายขั้นตอนการทำงานตั้งแต่ต้นจนจบ..." />
                </FormRow>
                <FormRow label="6. ระยะเวลาดำเนินงาน" htmlFor="timeline">
                    <FormInput name="timeline" id="timeline" value={plan.timeline} onChange={handleInputChange} placeholder="เช่น 1 มิถุนายน - 31 สิงหาคม 2567" />
                </FormRow>
                <FormRow label="7. งบประมาณ" htmlFor="budget">
                    <FormInput name="budget" id="budget" value={plan.budget} onChange={handleInputChange} placeholder="ระบุจำนวนเงินที่คาดว่าจะใช้ (ถ้ามี)" />
                </FormRow>
                
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 mb-2">8. ผลที่คาดว่าจะได้รับ</label>
                    <div className="space-y-3">
                        <AnimatePresence>
                            {plan.outcomes.map((o, i) => (
                                 <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-3"
                                 >
                                   <span className="text-slate-400 font-medium w-4 text-right">{i + 1}.</span>
                                   <FormInput value={o} onChange={(e) => handleListChange('outcomes', i, e.target.value)} placeholder={`ผลที่คาดว่าจะได้รับข้อที่ ${i+1}`} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                     <button onClick={() => addListItem('outcomes')} className="mt-3 ml-7 text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors flex items-center gap-1">
                         <span className="text-lg leading-none">+</span> เพิ่มรายการ
                     </button>
                </motion.div>

                <FormRow label="9. ผู้รับผิดชอบโครงการ" htmlFor="responsible">
                    <FormInput name="responsible" id="responsible" value={plan.responsible} onChange={handleInputChange} placeholder="ชื่อ-นามสกุล ผู้รับผิดชอบหลัก" />
                </FormRow>

            </div>

             {printableData && (
                <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                    <div ref={pdfContainerRef}>
                        <PrintableIS3Plan values={printableData} />
                    </div>
                </div>
            )}


            <div className="mt-10 pt-8 border-t border-slate-200/60 dark:border-slate-700/60 flex justify-center">
                 <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGeneratePdf}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-3 justify-center px-8 py-4 text-base font-semibold rounded-2xl shadow-lg text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-800 focus:ring-emerald-500 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed transition-all"
                >
                    {isGenerating ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            กำลังสร้าง PDF...
                        </>
                    ) : (
                        <>
                            <DocumentArrowDownIcon className="w-6 h-6" />
                            สร้างและดาวน์โหลดแผนโครงการ (PDF)
                        </>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default IS3ProjectPlanner;