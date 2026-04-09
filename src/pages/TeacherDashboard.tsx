import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { 
    collection, query, where, onSnapshot, addDoc, 
    serverTimestamp, deleteDoc, doc, limit, orderBy, getDoc
} from 'firebase/firestore';
import { Link, Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { 
    ChevronRightIcon, PlusIcon, TrashIcon, 
    UsersIcon, HomeIcon, AcademicCapIcon, PresentationChartBarIcon as ChartBarIcon, 
    Cog6ToothIcon, BookOpenIcon, XMarkIcon, MagnifyingGlassIcon,
    ArrowTrendingUpIcon, CheckCircleIcon, KeyIcon, UserCircleIcon, EyeIcon, 
    ArrowDownTrayIcon, DocumentTextIcon 
} from '../ui/icons';
import { IS_CONFIG } from '../content';
import PrintableReport from '../components/PrintableReport';

// --- Sub-components ---

const StatCard = ({ icon: Icon, label, value, colorClass, delay = 0 }: { icon: any, label: string, value: string | number, colorClass: string, delay?: number }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="group relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/40 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
        <div className="absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-5">
            <div className={`p-4 rounded-3xl ${colorClass} shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                <Icon className="w-7 h-7" />
            </div>
            <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">{value}</div>
            </div>
        </div>
    </motion.div>
);

const ProgressBar = ({ progress, label }: { progress: number, label: string }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 truncate max-w-[120px]">{label}</span>
            <span className="text-xs font-black text-sky-600 dark:text-sky-400">{progress}%</span>
        </div>
        <div className="h-2.5 w-full bg-slate-100/50 dark:bg-slate-700/30 rounded-full overflow-hidden p-0.5 border border-slate-200/20 dark:border-slate-700/20">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full rounded-full bg-linear-to-r ${progress === 100 ? 'from-emerald-400 to-emerald-600 shadow-emerald-500/20' : 'from-sky-400 to-indigo-600 shadow-sky-500/20'} shadow-sm`}
            />
        </div>
    </div>
);

// --- Student Detail Flyout Component (Route-based) ---

const StudentDetailFlyout = () => {
    const { classId, studentId } = useParams();
    const { user, userData } = useAuth();
    const navigate = useNavigate();
    const [student, setStudent] = useState<any | null>(null);
    const [project, setProject] = useState<any | null>(null);
    const [progress, setProgress] = useState<any | null>(null);
    const [report, setReport] = useState<any | null>(null);
    const [consultations, setConsultations] = useState<any[]>([]);
    const [feedbackText, setFeedbackText] = useState('');
    const [savingFeedback, setSavingFeedback] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showPdfPreview, setShowPdfPreview] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const pdfRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!studentId) return;
        setLoading(true);
        
        // Fetch student basic info
        const studentRef = doc(db, 'users', studentId);
        const projectRef = doc(db, 'user_projects', studentId);
        
        const unsubStudent = onSnapshot(studentRef, (snap) => {
            if (snap.exists()) setStudent({ id: snap.id, ...snap.data() });
        }, (err) => {
            console.error("Student detail fetch error:", err);
            setLoading(false);
        });

        const unsubProject = onSnapshot(projectRef, (snap) => {
            if (snap.exists()) setProject(snap.data());
        }, (err) => console.error("Project detail fetch error:", err));

        const unsubProgress = onSnapshot(doc(db, 'user_progress', studentId), (snap) => {
            if (snap.exists()) setProgress(snap.data());
        }, (err) => console.error("Progress detail fetch error:", err));

        const unsubReport = onSnapshot(doc(db, 'user_reports', studentId), (snap) => {
            if (snap.exists()) setReport(snap.data());
        }, (err) => console.error("Report detail fetch error:", err));

        // Fetch consultations
        const q = query(
            collection(db, 'users', studentId, 'consultations'),
            orderBy('createdAt', 'desc'),
            limit(5)
        );

        const unsubConsultations = onSnapshot(q, (snapshot) => {
            setConsultations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (err) => {
            console.error("Consultations fetch error:", err);
            setLoading(false);
        });

        return () => {
            unsubStudent();
            unsubProject();
            unsubProgress();
            unsubReport();
            unsubConsultations();
        };
    }, [studentId]);

    const calculateISProgress = (isKey: string) => {
        if (!progress) return 0;
        const config = IS_CONFIG[isKey as keyof typeof IS_CONFIG];
        if (!config || !('topics' in config)) return 0;
        
        const visitedTopics = progress[`visited_${isKey}`] || [];
        const totalTopics = config.topics.length;
        return totalTopics > 0 ? Math.round((visitedTopics.length / totalTopics) * 100) : 0;
    };

    const handleGeneratePdf = async () => {
        if (!pdfRef.current || isGeneratingPdf || !report) return;

        setIsGeneratingPdf(true);
        try {
            const jsPDF = (await import('jspdf')).default;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4',
            });
            
            await pdf.html(pdfRef.current, {
                html2canvas: {
                    scale: (595.28 - 72 * 2) / 827, 
                    useCORS: true,
                    backgroundColor: '#ffffff',
                },
                autoPaging: 'text',
                margin: [0, 0, 0, 0],
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
            
            pdf.save(`${(project?.is1ProjectTitle || student.displayName || 'report').replace(/ /g, '_')}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("เกิดข้อผิดพลาดในการสร้างไฟล์ PDF");
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    const parsedReport = report ? {
        ...report,
        reportStructure: report.reportStructure ? JSON.parse(report.reportStructure) : null,
        studentInputs: report.studentInputs ? JSON.parse(report.studentInputs) : {},
    } : null;

    const handleSaveFeedback = async () => {
        if (!student || !feedbackText.trim() || !user) return;
        setSavingFeedback(true);
        try {
            await addDoc(collection(db, 'users', student.id, 'consultations'), {
                text: feedbackText,
                teacherId: user.uid,
                teacherName: userData?.displayName || user.email,
                createdAt: serverTimestamp()
            });
            setFeedbackText('');
        } catch (err) {
            console.error("Error saving feedback:", err);
            alert("ไม่สามารถบันทึกคำแนะนำได้");
        } finally {
            setSavingFeedback(false);
        }
    };

    const onClose = () => {
        navigate(`/teacher/classrooms/${classId}`);
    };

    if (!studentId) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[150] flex justify-end">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ x: '100%' }} 
                    animate={{ x: 0 }} 
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-lg bg-white dark:bg-slate-900 h-full shadow-2xl overflow-y-auto"
                >
                    <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">โปรไฟล์นักเรียน</h3>
                        <button onClick={onClose} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
                            <XMarkIcon className="w-6 h-6 text-slate-400" />
                        </button>
                    </div>
                    
                    {!student ? (
                        <div className="p-8 flex items-center justify-center h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
                        </div>
                    ) : (
                        <div className="p-8 space-y-8">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 rounded-3xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400 text-4xl font-bold shadow-lg overflow-hidden mb-4">
                                    {student.photoURL ? <img src={student.photoURL} alt="" className="w-full h-full object-cover" /> : <UsersIcon className="w-12 h-12" />}
                                </div>
                                <h4 className="text-2xl font-black text-slate-800 dark:text-white uppercase">{student.displayName || 'ไม่มีชื่อ'}</h4>
                                <p className="text-slate-500 font-bold">เลขที่ {student.classNo || '-'} | {student.email}</p>
                            </div>

                            <div className="space-y-4">
                                <h5 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">วิชาที่กำลังเรียนและความก้าวหน้า</h5>
                                
                                <div className="space-y-3">
                                    <div className={`bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border-2 transition-all ${project?.is1ProjectTitle ? 'border-sky-500/30 ring-4 ring-sky-500/5' : 'border-slate-100 dark:border-slate-800 opacity-60'}`}>
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`p-3 rounded-xl ${project?.is1ProjectTitle ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                                <BookOpenIcon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">วิชา IS1</div>
                                                    {project?.is1ProjectTitle && <span className="text-[10px] font-black text-sky-500 bg-sky-50 dark:bg-sky-900/30 px-2 py-0.5 rounded-md uppercase">Enrolled</span>}
                                                </div>
                                                <div className="font-bold text-slate-800 dark:text-white">{project?.is1ProjectTitle || 'ไม่พบการลงทะเบียน'}</div>
                                            </div>
                                        </div>
                                        <ProgressBar progress={calculateISProgress('is1')} label="Progress IS1" />
                                    </div>

                                    <div className={`bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border-2 transition-all ${project?.is2ProjectTitle ? 'border-purple-500/30 ring-4 ring-purple-500/5' : 'border-slate-100 dark:border-slate-800 opacity-60'}`}>
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`p-3 rounded-xl ${project?.is2ProjectTitle ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                                <ChartBarIcon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">วิชา IS2</div>
                                                    {project?.is2ProjectTitle && <span className="text-[10px] font-black text-purple-500 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-md uppercase">Enrolled</span>}
                                                </div>
                                                <div className="font-bold text-slate-800 dark:text-white">{project?.is2ProjectTitle || 'รอดำเนินการจาก IS1'}</div>
                                            </div>
                                        </div>
                                        <ProgressBar progress={calculateISProgress('is2')} label="Progress IS2" />
                                    </div>

                                    <div className={`bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border-2 transition-all ${project?.is3ProjectTitle ? 'border-amber-500/30 ring-4 ring-amber-500/5' : 'border-slate-100 dark:border-slate-800 opacity-60'}`}>
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`p-3 rounded-xl ${project?.is3ProjectTitle ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                                <ArrowTrendingUpIcon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">วิชา IS3</div>
                                                    {project?.is3ProjectTitle && <span className="text-[10px] font-black text-amber-500 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-md uppercase">Enrolled</span>}
                                                </div>
                                                <div className="font-bold text-slate-800 dark:text-white">{project?.is3ProjectTitle || 'รอการนำเสนอ'}</div>
                                            </div>
                                        </div>
                                        <ProgressBar progress={calculateISProgress('is3')} label="Progress IS3" />
                                    </div>
                                </div>
                            </div>

                            {report && (
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-[2.5rem] border-2 border-emerald-100 dark:border-emerald-800/30 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-[4rem] -mr-4 -mt-4 group-hover:scale-110 transition-transform"></div>
                                    <h5 className="font-black text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
                                        <DocumentTextIcon className="w-5 h-5" />
                                        เอกสารรายงานโครงงาน
                                    </h5>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">นักเรียนได้เริ่มบันทึกข้อมูลรายงานแล้ว คุณสามารถตรวจสอบความถูกต้องหรือดาวน์โหลดเป็นไฟล์ PDF ได้</p>
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => setShowPdfPreview(true)}
                                                className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                                            >
                                                <EyeIcon className="w-5 h-5" />
                                                ดูตัวอย่าง
                                            </button>
                                            <button 
                                                onClick={handleGeneratePdf}
                                                disabled={isGeneratingPdf}
                                                className="px-6 py-4 bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-black rounded-2xl border-2 border-emerald-100 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all disabled:opacity-50"
                                            >
                                                {isGeneratingPdf ? '...' : <ArrowDownTrayIcon className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-sky-50 dark:bg-sky-900/20 p-8 rounded-[2.5rem] border-2 border-sky-100 dark:border-sky-800/30">
                                <h5 className="font-black text-sky-700 dark:text-sky-300 mb-4 flex items-center gap-2">
                                    <ChartBarIcon className="w-5 h-5" />
                                    บันทึกการให้คำปรึกษา
                                </h5>
                                <textarea 
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                    placeholder="พิมพ์คำแนะนำของคุณที่นี่ เพื่อให้นักเรียนเห็นในหน้า Dashboard..." 
                                    className="w-full p-6 bg-white dark:bg-slate-900 border-2 border-sky-100 dark:border-sky-800 rounded-3xl h-32 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none resize-none text-sm font-medium transition-all"
                                />
                                <button 
                                    onClick={handleSaveFeedback}
                                    disabled={savingFeedback || !feedbackText.trim()}
                                    className="w-full mt-4 py-4 bg-sky-500 hover:bg-sky-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-sky-500/20 transition-all disabled:opacity-50 active:scale-95"
                                >
                                    {savingFeedback ? 'กำลังบันทึก...' : 'บันทึกคำแนะนำ'}
                                </button>
                            </div>

                            {consultations.length > 0 && (
                                <div className="space-y-4">
                                    <h5 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">ประวัติการแนะนำล่าสุด</h5>
                                    {consultations.map((c) => (
                                        <div key={c.id} className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm relative group overflow-hidden">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.createdAt?.toDate ? c.createdAt.toDate().toLocaleString('th-TH') : 'กำลังบันทึก...'}</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{c.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* PDF Preview Modal */}
                <AnimatePresence>
                    {showPdfPreview && parsedReport && (
                        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }}
                                onClick={() => setShowPdfPreview(false)}
                                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border-4 border-white/20"
                            >
                                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl">
                                            <DocumentTextIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">ตัวอย่างรายงาน PDF</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{student.displayName}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={handleGeneratePdf}
                                            disabled={isGeneratingPdf}
                                            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                                        >
                                            <ArrowDownTrayIcon className="w-5 h-5" />
                                            {isGeneratingPdf ? 'กำลังเตรียม...' : 'ดาวน์โหลด PDF'}
                                        </button>
                                        <button 
                                            onClick={() => setShowPdfPreview(false)}
                                            className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all"
                                        >
                                            <XMarkIcon className="w-6 h-6 text-slate-400" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-grow overflow-y-auto bg-slate-100 dark:bg-slate-950 p-12 flex justify-center">
                                    <div className="bg-white shadow-2xl origin-top transform scale-75 md:scale-90 lg:scale-100" ref={pdfRef}>
                                        <PrintableReport {...parsedReport} studentInputs={parsedReport.studentInputs} />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </AnimatePresence>
    );
};

// --- Main Component ---

export const TeacherDashboard: React.FC = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Logic for view derivation - moved inside main render or specific components
  
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<any | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [studentProjects, setStudentProjects] = useState<Record<string, any>>({});
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 1. Fetch Classrooms for this teacher
  useEffect(() => {
    if (!user || user.uid === 'admin-mock-id') return;
    const q = query(collection(db, 'classrooms'), where('teacherId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setClassrooms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      console.error("Error fetching classrooms:", err);
      // We don't set alert here to avoid annoyance, but logging is crucial
    });
    return unsubscribe;
  }, [user]);

  // 2. Fetch Students for selected classroom
  useEffect(() => {
    if (!selectedClassroom) {
      setStudents([]);
      return;
    }

    setError(null);
    const q = query(
      collection(db, 'users'),
      where('classId', '==', selectedClassroom.id),
      where('role', '==', 'student')
    );

    console.log("TeacherDashboard: Fetching students for classId:", selectedClassroom.id);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const studentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(`TeacherDashboard: Found ${studentList.length} students`);
      setStudents(studentList);
    }, (err) => {
      console.error("Error fetching students:", err);
      setError("ไม่สามารถโหลดรายชื่อนักเรียนได้ (ตรวจสอบสิทธิ์หรือ Index)");
    });

    return unsubscribe;
  }, [selectedClassroom]);

  // Sync selectedClassroom with URL classId
  // Syncing state will be handled differently to avoid undefined classId from parent

  // 3. Fetch projects for these students (Optimized: Use batched queries instead of multiple listeners)
  useEffect(() => {
    if (students.length === 0) {
      setStudentProjects({});
      return;
    }

    // Function to fetch projects in batches of 30 (Firestore 'in' query limit)
    const fetchProjects = async () => {
      const studentIds = students.map(s => s.id);
      const batches = [];
      
      for (let i = 0; i < studentIds.length; i += 30) {
        batches.push(studentIds.slice(i, i + 30));
      }

      const allProjects: Record<string, any> = {};
      
      try {
        const { getDocs, query, collection, where } = await import('firebase/firestore');
        
        await Promise.all(batches.map(async (batchIds) => {
          const q = query(
            collection(db, 'user_projects'),
            where('uid', 'in', batchIds)
          );
          const snapshot = await getDocs(q);
          snapshot.forEach(doc => {
            allProjects[doc.id] = doc.data();
          });
        }));
        
        setStudentProjects(allProjects);
      } catch (err) {
        console.error("Error fetching student projects in batch:", err);
      }
    };

    fetchProjects();
    
    // We fetch once on classroom/student list change to save resources.
    // Real-time updates for ALL students at once might be too heavy, 
    // so we only do a manual refresh or fetch when the list changes.
  }, [students]);

  const totalStudents = classrooms.reduce((acc, curr) => acc + (curr.studentCount || 0), 0);
  
  const generateClassCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim() || !user) return;
    setLoading(true);
    try {
      const classCode = generateClassCode();
      const classroomData = {
        className: newClassName,
        classCode: classCode,
        teacherId: user.uid,
        teacherName: userData?.displayName || user.email,
        createdAt: serverTimestamp(),
        studentCount: 0
      };

      addDoc(collection(db, 'classrooms'), classroomData).catch(err => {
        console.error("Background classroom creation error:", err);
        alert("เกิดข้อผิดพลาดในการบันทึกห้องเรียน โปรดรีเฟรชหน้าจอ");
      });
      
      setLoading(false);
      setShowCreateModal(false);
      setNewClassName('');
      navigate('/teacher/classrooms');
      
    } catch (err) {
      console.error("Error setting up class creation:", err);
      alert("ไม่สามารถสร้างห้องเรียนได้ในขณะนี้");
      setLoading(false);
    }
  };

  const calculateProgress = (project: any) => {
      if (!project) return 0;
      let count = 0;
      if (project.is1ProjectTitle) count += 33;
      if (project.is2ProjectTitle) count += 33;
      if (project.is3ProjectTitle) count += 34;
      return count;
  };

  const renderSidebar = () => (
      <div className="w-20 md:w-64 flex flex-col bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border-r border-white/20 dark:border-slate-800/50 h-[calc(100vh-80px)] sticky top-20 z-40 transition-all">
          <div className="grow p-4 space-y-3">
              {[
                  { id: 'home', label: 'หน้าหลัก', icon: HomeIcon, path: '/teacher/home' },
                  { id: 'classrooms', label: 'ห้องเรียนของฉัน', icon: AcademicCapIcon, path: '/teacher/classrooms' },
                  { id: 'analytics', label: 'การวิเคราะห์', icon: ChartBarIcon, path: '/teacher/analytics' }
              ].map((item) => {
                  const activeView = location.pathname.includes('/classrooms') ? 'classrooms' : 
                                   location.pathname.includes('/analytics') ? 'analytics' : 'home';
                  return (
                  <Link 
                    key={item.id}
                    to={item.path}
                    className={`w-full group relative flex items-center justify-center md:justify-start gap-4 p-4 rounded-3xl transition-all duration-300 ${activeView === item.id ? 'bg-linear-to-br from-sky-500 to-indigo-600 text-white shadow-xl shadow-sky-500/20 font-bold' : 'text-slate-500 hover:bg-white/60 dark:hover:bg-slate-800/60'}`}
                  >
                      <item.icon className={`w-6 h-6 transition-transform group-hover:scale-110 ${activeView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-sky-500'}`} />
                      <span className="hidden md:block">{item.label}</span>
                      {activeView === item.id && (
                          <motion.div layoutId="activeNav" className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-sky-500 rounded-full" />
                      )}
                  </Link>
                  )
              })}
          </div>
          <div className="p-4 border-t border-white/20 dark:border-slate-800/50">
              <button className="w-full flex items-center justify-center md:justify-start gap-4 p-4 rounded-3xl text-slate-500 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all group">
                  <Cog6ToothIcon className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                  <span className="hidden md:block">ตั้งค่า</span>
              </button>
          </div>
      </div>
  );

  const HomeView = () => {
    console.log("TeacherDashboard: Rendering HomeView");
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">สวัสดีคุณครู {userData?.displayName || 'ผู้สอน'} 🙏</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">ยินดีต้อนรับกลับสู่ระบบช่วยสอนอัจฉริยะ IS Helper</p>
              </div>
              <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                          {String.fromCharCode(64 + i)}
                      </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-sky-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-sky-500/20">
                      +{totalStudents}
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard icon={AcademicCapIcon} label="ห้องเรียนทั้งหมด" value={classrooms.length} colorClass="bg-blue-500/10 text-blue-600 dark:text-blue-400" delay={0.1} />
              <StatCard icon={UsersIcon} label="นักเรียนทั้งหมด" value={totalStudents} colorClass="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" delay={0.2} />
              <StatCard icon={ArrowTrendingUpIcon} label="ผลงานนักเรียน" value={Object.keys(studentProjects).length} colorClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" delay={0.3} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-[3rem] border border-white/20 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none">
                  <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                          <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                          กิจกรรมล่าสุด
                      </h3>
                      <Link to="/teacher/classrooms" className="text-xs font-black text-sky-500 hover:text-sky-600 uppercase tracking-widest px-4 py-2 bg-sky-50 dark:bg-sky-900/30 rounded-xl transition-colors">ดูทั้งหมด</Link>
                  </div>
                  <div className="space-y-4">
                      {classrooms.length === 0 ? (
                          <div className="py-12 text-center text-slate-400 font-medium italic bg-slate-50/50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200/50 dark:border-slate-700/50">
                              ยังไม่มีกิจกรรมในขณะนี้
                          </div>
                      ) : (
                          classrooms.slice(0, 4).map((c, idx) => (
                              <motion.div 
                                key={c.id} 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className="group flex items-center justify-between p-5 bg-white/40 dark:bg-slate-900/40 rounded-[2rem] border border-white/20 dark:border-slate-800/50 hover:border-sky-500/30 transition-all hover:shadow-lg hover:shadow-sky-500/5"
                              >
                                  <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-slate-500 text-sm font-black uppercase shadow-inner">
                                          {c.className.substring(0, 2)}
                                      </div>
                                      <div>
                                          <div className="font-black text-slate-800 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{c.className}</div>
                                          <div className="text-xs font-bold text-slate-400 mt-0.5">ID: {c.classCode} • {c.studentCount} นักเรียน</div>
                                      </div>
                                  </div>
                                  <Link to={`/teacher/classrooms/${c.id}`} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-sm">
                                      <ChevronRightIcon className="w-5 h-5" />
                                  </Link>
                              </motion.div>
                          ))
                      )}
                  </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                  <div className="bg-linear-to-br from-sky-500 to-indigo-600 p-8 rounded-[3rem] text-white shadow-2xl shadow-sky-500/20 overflow-hidden relative group h-full flex flex-col justify-between">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
                      <div className="relative z-10">
                          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 backdrop-blur-md">
                              <PlusIcon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-3xl font-black mb-3 leading-tight">สร้างพื้นที่<br />เรียนรู้ใหม่ 🚀</h3>
                          <p className="text-sky-100/80 text-sm font-medium leading-relaxed">ให้นักเรียนของคุณเข้าถึงเครื่องมือช่วยทำ IS ที่อัปเดตใหม่ล่าสุด พร้อมพลัง AI ช่วยเขียนรายงาน</p>
                      </div>
                      <button 
                        onClick={() => setShowCreateModal(true)}
                        className="relative z-10 mt-8 px-6 py-5 bg-white text-sky-600 font-black uppercase tracking-widest rounded-[1.5rem] shadow-xl hover:bg-sky-50 transition-all transform active:scale-95 text-sm"
                      >
                          เริ่มสร้างห้องเรียน
                      </button>
                  </div>
              </div>
          </div>
      </motion.div>
    );
  };

  const ClassroomsView = () => {
    const { classId } = useParams();
    
    useEffect(() => {
        if (classId && classrooms.length > 0) {
            const found = classrooms.find(c => c.id === classId);
            if (found) setSelectedClassroom(found);
        } else if (!classId) {
            setSelectedClassroom(null);
        }
    }, [classId, classrooms]);

    console.log("TeacherDashboard: Rendering ClassroomsView, classId:", classId, "selectedClassroom:", selectedClassroom?.id);
    return (
      <div className="space-y-10">
          {selectedClassroom ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                      <div className="flex items-center gap-5">
                          <Link to="/teacher/classrooms" className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none text-slate-400 hover:text-sky-500 transition-all hover:scale-105">
                              <ChevronRightIcon className="w-6 h-6 rotate-180" />
                          </Link>
                          <div>
                              <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">{selectedClassroom.className}</h2>
                              <div className="flex items-center gap-3 mt-3">
                                  <span className="text-[10px] font-black text-sky-600 dark:text-sky-400 px-3 py-1.5 bg-sky-50 dark:bg-sky-900/30 rounded-xl border border-sky-100 dark:border-sky-800/20 tracking-widest">CODE: {selectedClassroom.classCode}</span>
                                  <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-800/20 uppercase">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                      Active Class
                                  </span>
                              </div>
                          </div>
                      </div>
                      
                      <div className="flex gap-3">
                          <button className="px-6 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl text-xs font-black text-slate-500 hover:text-sky-500 transition-all">ส่งออกข้อมูล</button>
                      </div>
                  </div>

                  <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-[3rem] border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                      <div className="p-8 border-b border-white/20 dark:border-slate-700/30 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30 dark:bg-slate-900/30">
                          <div>
                              <h3 className="text-xl font-black text-slate-900 dark:text-white">รายชื่อนักเรียน</h3>
                              <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-widest">ทั้งหมด {students.length} คนในชั้นเรียนนี้</p>
                          </div>
                          <div className="relative max-w-sm w-full group">
                              <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                              <input 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="ค้นหาชื่อ หรือเลขที่..." 
                                className="w-full pl-14 pr-6 py-4 bg-white/50 dark:bg-slate-900/50 border-2 border-slate-100/50 dark:border-slate-700/50 rounded-2xl text-sm font-bold focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all" 
                              />
                          </div>
                      </div>
                      
                      <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                              <thead>
                                  <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-white/20 dark:border-slate-800/50">
                                      <th className="px-10 py-5">นักเรียน</th>
                                      <th className="px-10 py-5 text-center">ความก้าวหน้า IS (รวม)</th>
                                      <th className="px-10 py-5 text-right">ดำเนินการ</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/30">
                                  {error && (
                                      <tr><td colSpan={3} className="px-10 py-8 text-center text-red-500 font-bold bg-red-50/50 dark:bg-red-900/10 uppercase text-[10px] tracking-widest">
                                          {error}
                                      </td></tr>
                                  )}
                                  {students.length === 0 && !error ? (
                                      <tr><td colSpan={3} className="px-10 py-24 text-center">
                                          <div className="flex flex-col items-center gap-3">
                                              <UsersIcon className="w-12 h-12 text-slate-200" />
                                              <p className="text-slate-400 font-bold italic">ยังไม่มีนักเรียนเข้าร่วมห้องเรียนนี้ หรือกำลังโหลดข้อมูล...</p>
                                              {selectedClassroom.studentCount > 0 && (
                                                  <p className="text-[10px] text-slate-400 mt-2 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800">
                                                      ตรวจพบจำนวนนักเรียนในฐานข้อมูล {selectedClassroom.studentCount} คน แต่รายชื่อถูกกรองออก (ตรวจสอบว่านักเรียนเลือกบทบาท Student หรือยัง)
                                                  </p>
                                              )}
                                          </div>
                                      </td></tr>
                                  ) : (
                                      students.filter(s => {
                                          if (!searchQuery) return true;
                                          const searchStr = searchQuery.toLowerCase();
                                          return (s.displayName || '').toLowerCase().includes(searchStr) || 
                                                 (s.email || '').toLowerCase().includes(searchStr) ||
                                                 (s.classNo || '').toString().includes(searchStr);
                                      }).map(s => {
                                          const proj = studentProjects[s.id];
                                          const prog = calculateProgress(proj);
                                          return (
                                              <tr key={s.id} className="hover:bg-sky-50/30 dark:hover:bg-sky-900/10 transition-colors group">
                                                  <td className="px-10 py-7">
                                                      <div className="flex items-center gap-5">
                                                          <div className="relative group/avatar">
                                                              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-sky-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-sky-600 dark:text-sky-400 font-black text-xl shadow-inner overflow-hidden border-2 border-white dark:border-slate-700">
                                                                  {s.photoURL ? <img src={s.photoURL} alt="" className="w-full h-full object-cover transition-transform group-hover/avatar:scale-110" /> : <UserCircleIcon className="w-8 h-8" />}
                                                              </div>
                                                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                                                          </div>
                                                          <div>
                                                              <div className="font-black text-slate-900 dark:text-white uppercase leading-tight group-hover:text-sky-600 transition-colors">{s.displayName || 'ไม่มีชื่อ'}</div>
                                                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">เลขที่ {s.classNo || '??'} • {s.email.split('@')[0]}</div>
                                                          </div>
                                                      </div>
                                                  </td>
                                                  <td className="px-10 py-7">
                                                      <div className="max-w-[180px] mx-auto">
                                                          <ProgressBar progress={prog} label={proj?.is1ProjectTitle ? 'IS1 Active' : 'ยังไม่ระบุหัวข้อ'} />
                                                      </div>
                                                  </td>
                                                  <td className="px-10 py-7 text-right">
                                                      <Link 
                                                        to={`/teacher/classrooms/${selectedClassroom.id}/student/${s.id}`}
                                                        className="px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-sky-500 hover:text-white text-slate-600 dark:text-slate-300 font-black text-[10px] uppercase tracking-widest rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-sm flex items-center gap-2 ml-auto active:scale-95"
                                                      >
                                                          รายละเอียด
                                                          <ChevronRightIcon className="w-4 h-4" />
                                                      </Link>
                                                  </td>
                                              </tr>
                                          );
                                      })
                                  )}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </motion.div>
          ) : (
              <div className="space-y-8">
                  <div className="flex items-center justify-between">
                      <div>
                          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">ห้องเรียนของฉัน</h2>
                          <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-widest">จัดการชั้นเรียนและรหัสห้องเรียน</p>
                      </div>
                      <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-3 px-8 py-4 bg-linear-to-br from-sky-500 to-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-sky-500/20 hover:shadow-2xl hover:scale-105 transition-all active:scale-95 text-xs">
                          <PlusIcon className="w-5 h-5" />
                          เพิ่มห้องเรียน
                      </button>
                  </div>
                  
                  {classrooms.length === 0 ? (
                      <div className="text-center py-40 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-[3rem] border-2 border-dashed border-slate-200/50 dark:border-slate-700/50">
                          <AcademicCapIcon className="w-20 h-20 text-slate-200 mx-auto mb-6" />
                          <h3 className="text-2xl font-black text-slate-400 italic">ยังไม่มีห้องเรียนที่สร้างไว้</h3>
                          <button onClick={() => setShowCreateModal(true)} className="mt-6 text-sky-500 font-black uppercase tracking-widest text-sm hover:underline">เริ่มสร้างห้องแรกได้เลย</button>
                      </div>
                  ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                          {classrooms.map((c, idx) => (
                              <motion.div 
                                key={c.id} 
                                initial={{ opacity: 0, scale: 0.95 }} 
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-[3rem] border border-white/20 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:border-sky-500/30 transition-all"
                              >
                                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-sky-500/5 to-indigo-500/5 rounded-bl-full -mr-4 -mt-4 group-hover:scale-110 transition-transform" />
                                  <div className="flex items-center justify-between mb-8 relative z-10">
                                      <div className="p-4 bg-linear-to-br from-sky-100 to-sky-50 dark:from-sky-900/30 dark:to-indigo-900/30 text-sky-500 rounded-3xl shadow-inner group-hover:rotate-6 transition-transform">
                                          <AcademicCapIcon className="w-8 h-8" />
                                      </div>
                                      <button 
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleDeleteClass(c.id);
                                        }} 
                                        className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all border border-slate-100 dark:border-slate-800 shadow-sm"
                                        title="ลบห้องเรียน"
                                      >
                                          <TrashIcon className="w-5 h-5" />
                                      </button>
                                  </div>
                                  <h3 className="text-2xl font-black text-slate-900 dark:text-white truncate mb-2 relative z-10">{c.className}</h3>
                                  <div className="flex items-center gap-2 text-slate-400 mb-8 relative z-10">
                                      <UsersIcon className="w-4 h-4" />
                                      <span className="text-[10px] font-black uppercase tracking-widest">{c.studentCount} นักเรียนในชั้น</span>
                                  </div>
                                  <div className="flex items-center justify-between bg-slate-900 dark:bg-slate-950 p-5 rounded-[1.5rem] mb-8 relative z-10 shadow-inner">
                                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Join Code</span>
                                      <span className="font-mono text-xl font-black text-sky-400 tracking-wider group-hover:scale-110 transition-transform">{c.classCode}</span>
                                  </div>
                                  <Link to={`/teacher/classrooms/${c.id}`} className="w-full py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black uppercase tracking-widest text-[10px] rounded-[1.5rem] shadow-lg border border-slate-100 dark:border-slate-800 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all flex items-center justify-center gap-3 active:scale-95 group-hover:shadow-sky-500/10">
                                      จัดการห้องเรียน
                                      <ChevronRightIcon className="w-4 h-4" />
                                  </Link>
                              </motion.div>
                          ))}
                      </div>
                  )}
              </div>
          )}
      </div>
    );
  };

  const handleDeleteClass = async (id: string) => {
    if (window.confirm('หากคุณลบห้องเรียนนี้ ข้อมูลสมาชิกนักเรียนจะถูกยกเลิกการเข้าถึงห้องเรียนนี้ทันที คุณแน่ใจหรือไม่?')) {
      try {
        await deleteDoc(doc(db, 'classrooms', id));
        // Find if this was the selected classroom and clear it if so
        if (selectedClassroom?.id === id) {
           setSelectedClassroom(null);
           navigate('/teacher/classrooms');
        }
      } catch (err: any) {
        console.error("Error deleting class:", err);
        alert('ไม่สามารถลบห้องเรียนได้: ' + err.message);
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-transparent font-sans">
      {renderSidebar()}
      
      <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/teacher/home" replace />} />
            <Route path="/home" element={<HomeView />} />
            <Route path="/classrooms" element={<ClassroomsView />} />
            <Route path="/classrooms/:classId" element={<ClassroomsView />} />
            <Route path="/classrooms/:classId/student/:studentId" element={
                <>
                    <ClassroomsView />
                    <StudentDetailFlyout />
                </>
            } />
            <Route path="/analytics" element={
              <div className="flex items-center justify-center h-full text-slate-400 italic font-bold">
                  เร็ว ๆ นี้ : ระบบวิเคราะห์ความก้าวหน้าเชิงลึก 📊
              </div>
            } />
          </Routes>
      </main>

      {/* Create Class Modal */}
      <AnimatePresence mode="wait">
        {showCreateModal && (
          <div key="create-class-overlay" className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
            <motion.div
              key="create-class-modal-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl border-4 border-slate-50 dark:border-slate-800"
            >
              <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">สร้างห้องเรียน</h3>
                  <button onClick={() => setShowCreateModal(false)}><XMarkIcon className="w-6 h-6 text-slate-300" /></button>
              </div>
              
              <form onSubmit={handleCreateClass} className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">ชื่อห้องเรียน</label>
                  <input
                    autoFocus
                    type="text"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all text-lg font-bold"
                    placeholder="เช่น ม.3/1 วิชา IS1"
                    required
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 font-black uppercase tracking-widest rounded-2xl transition-all hover:bg-slate-200"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !newClassName.trim()}
                    className="flex-1 py-4 bg-sky-500 hover:bg-sky-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-sky-200 dark:shadow-none transition-all disabled:opacity-50 transform active:scale-95"
                  >
                    {loading ? '...' : 'สร้างทันที'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
