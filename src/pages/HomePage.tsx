import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { IS_CONFIG } from '../content';
import { ICONS, ChevronRightIcon } from '../ui/icons';
import { useAuth } from '../contexts/AuthContext';
import { trackEvent } from '../services/analyticsService';
import { StudentOnboarding } from '../components/StudentOnboarding';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

export const HomePage = () => {
    const { user, userData, userRole, joinClassroom } = useAuth();
    const [classCode, setClassCode] = useState('');
    const [isJoining, setIsJoining] = useState(false);
    const [joinError, setJoinError] = useState('');
    const [showJoinForm, setShowJoinForm] = useState(false);
    const [consultations, setConsultations] = useState<any[]>([]);

    useEffect(() => {
        if (!user || userRole !== 'student') return;

        const q = query(
            collection(db, 'users', user.uid, 'consultations'),
            orderBy('createdAt', 'desc'),
            limit(3)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setConsultations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return unsubscribe;
    }, [user, userRole]);

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!classCode.trim()) return;
        setIsJoining(true);
        setJoinError('');
        try {
            await joinClassroom(classCode);
            setShowJoinForm(false);
            setClassCode('');
        } catch (err: any) {
            setJoinError(err.message);
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-10 md:py-20 max-w-7xl mx-auto px-4"
        >
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="grow w-full space-y-12">
                    {/* Hero Section */}
                    <div className="text-left">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="inline-flex items-center gap-2 py-2 px-4 rounded-2xl bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 text-xs font-black uppercase tracking-widest mb-6 border border-sky-100 dark:border-sky-800/20"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                            IS Helper AI Engine
                        </motion.div>
                        
                        <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
                            สร้างโครงงาน IS<br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-500 to-indigo-600">ด้วยพลัง AI อัจฉริยะ</span>
                        </h2>

                        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-relaxed mb-10">
                            เครื่องมือที่ช่วยให้การทำ Independent Study เป็นเรื่องสนุก ตั้งแต่การตั้งชื่อหัวข้อจนถึงการเขียนรายงานเชิงวิชาการ
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {user && (
                                <div className="w-full flex flex-wrap gap-4 mb-4">
                                    {userRole === 'admin' && (
                                        <Link 
                                            to="/admin"
                                            className="group flex items-center gap-4 px-8 py-5 bg-linear-to-br from-rose-500 to-rose-600 text-white font-black uppercase tracking-widest rounded-3xl shadow-xl shadow-rose-500/20 transition-all hover:-translate-y-1 active:scale-95 text-xs"
                                        >
                                            <div className="p-2 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
                                                <ICONS.CheckCircleIcon className="w-5 h-5 text-white" />
                                            </div>
                                            เข้าสู่ระบบผู้ดูแลระบบ 🛡️
                                        </Link>
                                    )}
                                    {userRole === 'teacher' && (
                                        <Link 
                                            to="/teacher"
                                            className="group flex items-center gap-4 px-8 py-5 bg-linear-to-br from-emerald-500 to-emerald-600 text-white font-black uppercase tracking-widest rounded-3xl shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1 active:scale-95 text-xs"
                                        >
                                            <div className="p-2 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
                                                <ICONS.AcademicCapIcon className="w-5 h-5 text-white" />
                                            </div>
                                            จัดการชั้นเรียน (ครู) 👨‍🏫
                                        </Link>
                                    )}
                                </div>
                            )}

                            {user && userRole === 'student' && !userData?.classId && (
                                <div className="w-full">
                                    {!showJoinForm ? (
                                        <button 
                                            onClick={() => setShowJoinForm(true)}
                                            className="group flex items-center gap-4 px-8 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-sky-500 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:-translate-y-1 active:scale-95 text-xs"
                                        >
                                            <div className="p-2 bg-sky-50 dark:bg-sky-900/30 rounded-xl group-hover:scale-110 transition-transform">
                                                <ICONS.UsersIcon className="w-5 h-5 text-sky-500" />
                                            </div>
                                            เข้าร่วมห้องเรียนของครู
                                        </button>
                                    ) : (
                                        <motion.form 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            onSubmit={handleJoin}
                                            className="max-w-md p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] border-2 border-sky-500 shadow-2xl shadow-sky-500/10"
                                        >
                                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">กรอกรหัสห้องเรียน 🔑</h3>
                                            <input 
                                                autoFocus
                                                type="text"
                                                value={classCode}
                                                onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                                                placeholder="รหัส 6 หลัก"
                                                className="w-full px-6 py-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 text-center font-black text-3xl tracking-[0.5em] focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none mb-6 transition-all"
                                                maxLength={6}
                                            />
                                            {joinError && <p className="text-red-500 text-xs font-bold mb-6 text-center">❌ {joinError}</p>}
                                            <div className="flex gap-4">
                                                <button 
                                                    type="button"
                                                    onClick={() => setShowJoinForm(false)}
                                                    className="flex-1 py-4 text-slate-500 font-black uppercase tracking-widest text-[10px]"
                                                >
                                                    ยกเลิก
                                                </button>
                                                <button 
                                                    type="submit"
                                                    disabled={isJoining}
                                                    className="flex-1 py-4 bg-sky-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-sky-500/20 disabled:opacity-50 text-[10px]"
                                                >
                                                    {isJoining ? '...' : 'เข้าร่วมห้องเรียน'}
                                                </button>
                                            </div>
                                        </motion.form>
                                    )}
                                </div>
                            )}

                            {user && userRole === 'student' && userData?.classId && (
                                <div className="inline-flex items-center gap-4 px-6 py-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-[1.5rem] border border-emerald-100 dark:border-emerald-800/30">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                        <ICONS.CheckIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">ยินดีด้วย</div>
                                        <div className="font-black text-emerald-800 dark:text-emerald-400">คุณอยู่ในห้องเรียนแล้ว</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Consultation Feed for Students */}
                    {consultations.length > 0 && (
                        <div className="space-y-6">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                                <span className="w-8 h-px bg-slate-200 dark:bg-slate-700" />
                                คำแนะนำจากคุณครู
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {consultations.map((c, idx) => (
                                    <motion.div 
                                        key={c.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden group"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 font-black text-xs">
                                                {c.teacherName?.[0] || 'T'}
                                            </div>
                                            <div>
                                                <div className="text-xs font-black text-slate-800 dark:text-white uppercase">{c.teacherName || 'คุณครู'}</div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString('th-TH') : 'ล่าสุด'}</div>
                                            </div>
                                        </div>
                                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed italic">"{c.text}"</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-3xl mx-auto">
                        {Object.values(IS_CONFIG).map((is, idx) => {
                            const Icon = ICONS[is.icon as keyof typeof ICONS] as React.ElementType;
                            return (
                                <motion.div
                                    key={is.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * (idx + 1) }}
                                >
                                    <Link 
                                        to={is.path} 
                                        className={`group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 p-6 md:p-8 rounded-4xl md:rounded-[2.5rem] bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
                                        onClick={() => {
                                            trackEvent('select_is_card', {
                                                card_key: is.key,
                                                card_title: is.title,
                                            });
                                        }}
                                    >
                                        {/* Cute background blobs */}
                                        <div className={`absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-linear-to-br ${is.color} opacity-10 dark:opacity-20 rounded-full blur-2xl transition-transform group-hover:scale-150 duration-500`} />
                                        <div className={`absolute -bottom-10 -left-10 w-24 h-24 md:w-32 md:h-32 bg-linear-to-tr ${is.color} opacity-10 dark:opacity-20 rounded-full blur-2xl transition-transform group-hover:scale-150 duration-500`} />
                                        
                                        <div className={`relative z-10 inline-flex shrink-0 p-4 md:p-5 rounded-2xl md:rounded-3xl bg-linear-to-br ${is.color} text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                            {Icon && <Icon className="h-8 w-8 md:h-10 md:w-10" />}
                                            <span className="absolute -top-2 -right-2 text-lg md:text-xl animate-bounce">✨</span>
                                        </div>
                                        
                                        <div className="grow relative z-10">
                                            <div className="flex flex-wrap items-center gap-2 mb-1 md:mb-2">
                                                <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{is.title}</h3>
                                                {is.key === 'project_creation' && (
                                                    <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full border border-emerald-200 dark:border-emerald-800/50 shadow-sm animate-pulse">
                                                        แนะนำสำหรับมือใหม่ 🌟
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-3 md:mb-4 font-medium line-clamp-2">{is.subtitle}</p>
                                            
                                            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-sky-50 dark:bg-slate-700/50 text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/30 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                                {is.buttonText || 'เริ่มต้นเรียนรู้'}
                                                <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Sidebar Column */}
                {user && userRole === 'student' && !userData?.onboardingComplete && (
                    <div className="w-full lg:w-80 lg:sticky lg:top-24 shrink-0">
                        <StudentOnboarding />
                    </div>
                )}
            </div>
        </motion.div>
    );
};
