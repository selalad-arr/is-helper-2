import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { ICONS } from '../ui/icons';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export const StudentClassroomGate: React.FC = () => {
    const { user, userData, joinClassroom, selectClassroom } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState<'ask' | 'select'>('ask');
    const [classCode, setClassCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [joinedClassrooms, setJoinedClassrooms] = useState<any[]>([]);
    const [fetchingClasses, setFetchingClasses] = useState(false);

    const UsersIcon = ICONS.UsersIcon;
    const AcademicCapIcon = ICONS.AcademicCapIcon;
    const KeyIcon = ICONS.KeyIcon;
    const ChevronRightIcon = ICONS.ChevronRightIcon;
    const BookOpenIcon = ICONS.BookOpenIcon;
    const SparklesIcon = ICONS.SparklesIcon;

    useEffect(() => {
        if (userData?.classroomIds?.length > 0) {
            fetchClassrooms(userData.classroomIds);
        }
    }, [userData?.classroomIds]);

    const fetchClassrooms = async (ids: string[]) => {
        setFetchingClasses(true);
        try {
            const classes = [];
            let activeClassFound = false;
            for (const id of ids) {
                const docRef = doc(db, 'classrooms', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    classes.push({ id: docSnap.id, ...docSnap.data() });
                    if (id === userData?.classId) activeClassFound = true;
                }
            }
            
            // If the student has an active classId but that classroom no longer exists, clear it
            if (userData?.classId && !activeClassFound) {
                console.log("Active classroom no longer exists, clearing classId");
                await selectClassroom(null);
            }
            
            setJoinedClassrooms(classes);
        } catch (err) {
            console.error("Error fetching classrooms:", err);
        } finally {
            setFetchingClasses(false);
        }
    };

    const handleNoClassroom = () => {
        selectClassroom(null);
        navigate('/student/dashboard');
    };

    const handleJoinNew = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!classCode.trim()) return;
        setIsLoading(true);
        setError('');
        try {
            await joinClassroom(classCode.toUpperCase());
            navigate('/student/dashboard');
        } catch (err: any) {
            if (err.message === 'LIMIT_EXCEEDED') {
                setError('คุณใช้งานโครงงานครบจำนวนที่จำกัดแล้ว (3 โครงงาน) กรุณาอัปเกรดเป็นพรีเมี่ยม หรือใช้ API Key ของตัวเองเพื่อปลดล็อคขีดจำกัด');
            } else {
                setError(err.message || 'รหัสไม่ถูกต้อง');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectOld = async (classId: string) => {
        setIsLoading(true);
        try {
            await selectClassroom(classId);
            navigate('/student/dashboard');
        } catch (err) {
            setError('เกิดข้อผิดพลาด');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <AnimatePresence mode="wait">
                    {step === 'ask' ? (
                        <motion.div
                            key="ask"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs font-black uppercase tracking-widest mb-8">
                                <SparklesIcon className="w-4 h-4" />
                                เริ่มต้นการเรียนรู้
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                                วันนี้คุณต้องการเรียนรู้<br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-500 to-indigo-600">ในรูปแบบไหน?</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 font-medium max-w-xl mx-auto">
                                คุณมีห้องเรียนจากคุณครู หรือต้องการเรียนรู้ด้วยตัวเองแบบอิสระ?
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <button
                                    onClick={() => setStep('select')}
                                    className="group p-8 rounded-[3rem] bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-sky-500 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:-translate-y-2 text-left"
                                >
                                    <div className="w-16 h-16 rounded-3xl bg-sky-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform">
                                        <UsersIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2 uppercase tracking-tighter">มีห้องเรียน 🔑</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">เข้าห้องเรียนที่คุณครูสร้างไว้ เพื่อติดตามงานและรับคำแนะนำ</p>
                                    <div className="mt-6 inline-flex items-center text-sky-500 font-black text-xs uppercase tracking-widest">
                                        เลือกข้อนี้ <ChevronRightIcon className="w-4 h-4 ml-1" />
                                    </div>
                                </button>

                                <button
                                    onClick={handleNoClassroom}
                                    className="group p-8 rounded-[3rem] bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-indigo-500 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:-translate-y-2 text-left"
                                >
                                    <div className="w-16 h-16 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                                        <BookOpenIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2 uppercase tracking-tighter">เรียนรู้เอง 🚀</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">เริ่มต้นทำโครงงาน IS ด้วยตัวเองแบบอิสระ พร้อมผู้ช่วย AI</p>
                                    <div className="mt-6 inline-flex items-center text-indigo-500 font-black text-xs uppercase tracking-widest">
                                        ไปหน้าเรียนรู้ <ChevronRightIcon className="w-4 h-4 ml-1" />
                                    </div>
                                </button>
                            </div>
                            
                            {(() => {
                                const hasCustomKey = typeof window !== 'undefined' && !!localStorage.getItem('custom_gemini_api_key');
                                if (userData?.isPremium || hasCustomKey) return null;
                                
                                return (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="mt-12 inline-block px-6 py-3 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700"
                                    >
                                        <div className="flex items-center gap-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                                            <span>จำนวนโครงงานที่ใช้งาน (ฟรี):</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full transition-all ${((userData?.projectCount || 0) >= 3) ? 'bg-rose-500' : 'bg-sky-500'}`}
                                                        style={{ width: `${Math.min(100, ((userData?.projectCount || 0) / 3) * 100)}%` }}
                                                    />
                                                </div>
                                                <span className={(userData?.projectCount || 0) >= 3 ? 'text-rose-500' : ''}>
                                                    {userData?.projectCount || 0} / 3
                                                </span>
                                            </div>
                                            {(userData?.projectCount || 0) >= 3 && (
                                                <button 
                                                    onClick={() => navigate('/pricing')}
                                                    className="ml-2 text-sky-500 hover:underline bg-transparent border-none p-0 cursor-pointer"
                                                >
                                                    อัปเกรดเพื่อปลดล็อค ✨
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })()}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="select"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <button
                                    onClick={() => setStep('ask')}
                                    className="p-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-400 hover:text-sky-500 transition-all shadow-sm"
                                >
                                    <ChevronRightIcon className="w-6 h-6 rotate-180" />
                                </button>
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">เลือกเข้าห้องเรียน 📝</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">กรอกรหัส หรือเลือกห้องเดิมที่คุณเคยเข้า</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                {/* New Classroom Form */}
                                <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-2 border-sky-500 shadow-2xl shadow-sky-500/10">
                                    <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6 uppercase tracking-tight flex items-center gap-2">
                                        <KeyIcon className="w-5 h-5 text-sky-500" />
                                        กรอกรหัสใหม่
                                    </h3>
                                    <form onSubmit={handleJoinNew}>
                                        <input
                                            autoFocus
                                            type="text"
                                            value={classCode}
                                            onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                                            placeholder="รหัส 6 หลัก"
                                            maxLength={6}
                                            className="w-full px-6 py-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 text-center font-black text-3xl tracking-[0.5em] focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none mb-6 transition-all"
                                        />
                                        {error && <p className="text-red-500 text-xs font-bold mb-6 text-center">❌ {error}</p>}
                                        <button
                                            type="submit"
                                            disabled={isLoading || !classCode.trim()}
                                            className="w-full py-5 bg-sky-500 hover:bg-sky-600 text-white font-black uppercase tracking-widest rounded-3xl shadow-xl shadow-sky-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                        >
                                            {isLoading ? 'กำลังประมวลผล...' : 'เข้าร่วมห้องเรียน'}
                                            {!isLoading && <ChevronRightIcon className="w-5 h-5" />}
                                        </button>
                                    </form>
                                </div>

                                {/* History / Old Classrooms */}
                                <div className="space-y-6">
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-3">
                                        <span className="w-8 h-px bg-slate-200 dark:bg-slate-700" />
                                        ห้องเรียนที่คุณเข้าร่วมแล้ว
                                    </h3>

                                    {fetchingClasses ? (
                                        <div className="p-12 text-center text-slate-400 animate-pulse font-medium">
                                            กำลังโหลดประวัติ...
                                        </div>
                                    ) : joinedClassrooms.length === 0 ? (
                                        <div className="p-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-700">
                                            <AcademicCapIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                            <p className="text-slate-400 font-bold italic">คุณยังไม่เคยเข้าห้องเรียนใดๆ</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                                            {joinedClassrooms.map((c) => (
                                                <button
                                                    key={c.id}
                                                    onClick={() => handleSelectOld(c.id)}
                                                    disabled={isLoading}
                                                    className="w-full group flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-[2rem] border-2 border-slate-100 dark:border-slate-700 hover:border-emerald-500 transition-all text-left shadow-sm hover:shadow-lg disabled:opacity-50"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                                                            <AcademicCapIcon className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-slate-800 dark:text-white uppercase group-hover:text-emerald-500 transition-colors">{c.className}</div>
                                                            <div className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-widest uppercase">{c.teacherName || 'ไม่ระบุผู้สอน'} • CODE: {c.classCode}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-slate-200 group-hover:text-emerald-500 transition-colors">
                                                        <ChevronRightIcon className="w-6 h-6" />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
