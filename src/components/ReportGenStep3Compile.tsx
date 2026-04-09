import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { trackEvent } from '../services/analyticsService';
import { DocumentArrowDownIcon } from '../ui/icons';
import PrintableReport from './PrintableReport';
import { ArrowLeft, Loader2, FileText, Book, GraduationCap, Calendar, FileCheck, Heart, Link } from 'lucide-react';

interface Step3Props {
    onBack: () => void;
    reportData: any;
    setProjectAbstract: (value: string) => void;
    setAuthorName: (value: string) => void;
    setAcknowledgements: (value: string) => void;
    setReferences: (value: string) => void;
    setCustomCoverText: (value: string) => void;
    setSchoolName: (value: string) => void;
    setSemester: (value: string) => void;
}

const ReportGenStep3Compile: React.FC<Step3Props> = (props) => {
    const {
        onBack, reportData, setProjectAbstract, setAuthorName,
        setAcknowledgements, setReferences, setCustomCoverText,
        setSchoolName, setSemester
    } = props;
    
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const pdfRef = useRef<HTMLDivElement>(null);

    const handleGeneratePdf = async () => {
        const pdfRenderElement = pdfRef.current;
        if (!pdfRenderElement || isGeneratingPdf) return;

        setIsGeneratingPdf(true);
        trackEvent('download_report_pdf', {
            project_title: reportData.reportStructure?.title || 'untitled',
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
                margin: [0, 0, 0, 0], // Margins handled by styled divs
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
                        weight: '700',
                        src: [{
                            url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/sarabun/Sarabun-Bold.ttf',
                            format: 'truetype'
                        }]
                    }
                ]
            });
            
            pdf.save(`${(reportData.reportStructure?.title || 'report').replace(/ /g, '_')}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("เกิดข้อผิดพลาดในการสร้างไฟล์ PDF โปรดลองอีกครั้ง");
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    const inputClasses = "w-full p-3.5 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-y";
    const labelClasses = "flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2";

    return (
        <div className="space-y-8">
            <div className="relative text-center space-y-2">
                <button 
                    onClick={onBack} 
                    className="absolute left-0 top-0 inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">กลับไปแก้ไขเนื้อหา</span>
                    <span className="sm:hidden">กลับ</span>
                </button>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
                    ขั้นตอนที่ 3: รวมเล่มและดาวน์โหลด
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                    ตรวจสอบและกรอกข้อมูลส่วนที่เหลือให้ครบถ้วน จากนั้นดาวน์โหลดรายงานเป็นไฟล์ PDF
                </p>
            </div>
            
            <div className="flex justify-center">
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGeneratePdf} 
                    disabled={isGeneratingPdf} 
                    className="w-full sm:w-auto inline-flex items-center gap-3 justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl shadow-lg shadow-emerald-500/20 text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-emerald-500 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                >
                    {isGeneratingPdf ? (
                        <><Loader2 className="w-6 h-6 animate-spin" /> กำลังสร้าง PDF...</>
                    ) : (
                        <><DocumentArrowDownIcon className="w-6 h-6" /> สร้างและดาวน์โหลดเป็น PDF</>
                    )}
                </motion.button>
            </div>

            {/* Hidden div for PDF rendering */}
            <div className="absolute -left-[9999px] top-0" aria-hidden="true" >
                <div ref={pdfRef}>
                    <PrintableReport {...reportData} />
                </div>
            </div>

            {/* Visible Form for additional data */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-100 dark:bg-slate-800/50 p-4 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-700/60"
            >
                <div className="bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-6 md:p-10 w-full max-w-4xl text-slate-800 dark:text-slate-200 mx-auto rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="text-center mb-8 pb-6 border-b border-slate-100 dark:border-slate-700">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">ตรวจสอบข้อมูลสำหรับปกและส่วนหน้า</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">ข้อมูลเหล่านี้จะปรากฏในส่วนต้นของรายงาน</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className={labelClasses}>
                                    <FileText className="w-4 h-4 text-emerald-500" />
                                    ชื่อผู้จัดทำ (คนละ 1 บรรทัด)
                                </label>
                                <textarea 
                                    rows={4} 
                                    value={reportData.authorName} 
                                    onChange={e => setAuthorName(e.target.value)} 
                                    placeholder="ชื่อ-สกุล ของสมาชิกแต่ละคน (คนละ 1 บรรทัด)" 
                                    className={inputClasses}
                                />
                            </div>
                            
                            <div>
                                <label className={labelClasses}>
                                    <Book className="w-4 h-4 text-emerald-500" />
                                    ข้อความหน้าปก (ถ้ามี)
                                </label>
                                <textarea 
                                    rows={3} 
                                    value={reportData.customCoverText} 
                                    onChange={e => setCustomCoverText(e.target.value)} 
                                    placeholder="เช่น 'รายงานนี้เป็นส่วนหนึ่งของรายวิชา...' หรือ 'โครงงานนี้ใช้ในการแข่งขัน...'" 
                                    className={inputClasses}
                                />
                            </div>
                            
                            <div>
                                <label className={labelClasses}>
                                    <GraduationCap className="w-4 h-4 text-emerald-500" />
                                    ชื่อโรงเรียน
                                </label>
                                <input 
                                    type="text" 
                                    value={reportData.schoolName} 
                                    onChange={e => setSchoolName(e.target.value)} 
                                    placeholder="กรอกชื่อโรงเรียน" 
                                    className={inputClasses}
                                />
                            </div>
                            
                            <div>
                                <label className={labelClasses}>
                                    <Calendar className="w-4 h-4 text-emerald-500" />
                                    ภาคเรียน/ปีการศึกษา
                                </label>
                                <input 
                                    type="text" 
                                    value={reportData.semester} 
                                    onChange={e => setSemester(e.target.value)} 
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <label className={labelClasses}>
                                    <FileCheck className="w-4 h-4 text-emerald-500" />
                                    บทคัดย่อ (Abstract)
                                </label>
                                <textarea 
                                    rows={5} 
                                    value={reportData.projectAbstract} 
                                    onChange={e => setProjectAbstract(e.target.value)} 
                                    placeholder="สรุปใจความสำคัญทั้งหมดของโครงงาน..." 
                                    className={inputClasses}
                                />
                            </div>
                            
                            <div>
                                <label className={labelClasses}>
                                    <Heart className="w-4 h-4 text-emerald-500" />
                                    กิตติกรรมประกาศ
                                </label>
                                <textarea 
                                    rows={5} 
                                    value={reportData.acknowledgements} 
                                    onChange={e => setAcknowledgements(e.target.value)} 
                                    placeholder="คำขอบคุณสำหรับผู้มีส่วนช่วยเหลือโครงงานนี้..." 
                                    className={inputClasses}
                                />
                            </div>
                            
                            <div>
                                <label className={labelClasses}>
                                    <Link className="w-4 h-4 text-emerald-500" />
                                    เอกสารอ้างอิง
                                </label>
                                <textarea 
                                    rows={5} 
                                    value={reportData.references} 
                                    onChange={e => setReferences(e.target.value)} 
                                    placeholder="ใส่รายการเอกสารอ้างอิงที่นี่ โดยขึ้นบรรทัดใหม่สำหรับแต่ละรายการ..." 
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 inline-block px-4 py-2 rounded-full">
                            เนื้อหาจากบทที่ 1-5 จะถูกนำมารวมในไฟล์ PDF โดยอัตโนมัติตามที่ได้เขียนไว้ในขั้นตอนก่อนหน้า
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ReportGenStep3Compile;
