import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { IS_CONFIG } from '../content';
import { ICONS, ChevronRightIcon } from '../ui/icons';
import { useAuth } from '../contexts/AuthContext';
import { trackEvent } from '../services/analyticsService';
import { StudentOnboarding } from '../components/StudentOnboarding';

export const HomePage = () => {
    const { user, userData, userRole, joinClassroom } = useAuth();
    const [classCode, setClassCode] = useState('');
    const [isJoining, setIsJoining] = useState(false);
    const [joinError, setJoinError] = useState('');
    const [showJoinForm, setShowJoinForm] = useState(false);

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!classCode.trim()) return;
        setIsJoining(true);
        setJoinError('');
        try {
            await joinClassroom(classCode);
            setShowJoinForm(false);
            setClassCode('');
            alert('เข้าร่วมห้องเรียนสำเร็จ!');
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
            className="py-8 md:py-16 max-w-7xl mx-auto px-4"
        >
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Main Content Column */}
                <div className="grow w-full">
                    <div className="text-center mb-10 md:mb-16">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs md:text-sm font-semibold mb-4">
                                ยินดีต้อนรับสู่ IS Helper 👋 {userData?.displayName}
                            </span>
                        </motion.div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tight">
                            เริ่มทำโครงงาน IS ง่ายๆ ด้วย AI 🚀
                        </h2>

                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            เลือกเส้นทางที่คุณต้องการให้เราช่วย ไม่ว่าจะเป็นมือใหม่หัดทำ หรือทำตามรายวิชา IS1-IS3
                        </p>

                        {user && !userData?.classId && (
                            <div className="mt-8">
                                {!showJoinForm ? (
                                    <button 
                                        onClick={() => setShowJoinForm(true)}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold rounded-2xl border-2 border-sky-200 dark:border-sky-900/30 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all shadow-sm"
                                    >
                                        <ICONS.UsersIcon className="w-5 h-5" />
                                        เข้าร่วมห้องเรียนของครู
                                    </button>
                                ) : (
                                    <motion.form 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        onSubmit={handleJoin}
                                        className="max-w-sm mx-auto p-6 bg-white dark:bg-slate-800 rounded-4xl border-2 border-sky-200 dark:border-sky-900/30 shadow-lg"
                                    >
                                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">กรอกรหัสห้องเรียน</h3>
                                        <input 
                                            type="text"
                                            value={classCode}
                                            onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                                            placeholder="รหัส 6 หลัก"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-bold text-xl tracking-widest focus:ring-2 focus:ring-sky-500 outline-none mb-4"
                                            maxLength={6}
                                        />
                                        {joinError && <p className="text-red-500 text-xs mb-4">{joinError}</p>}
                                        <div className="flex gap-2">
                                            <button 
                                                type="button"
                                                onClick={() => setShowJoinForm(false)}
                                                className="flex-1 py-2 text-slate-500 font-bold"
                                            >
                                                ยกเลิก
                                            </button>
                                            <button 
                                                type="submit"
                                                disabled={isJoining}
                                                className="flex-1 py-2 bg-sky-500 text-white font-bold rounded-xl shadow-md disabled:opacity-50"
                                            >
                                                {isJoining ? 'กำลังเข้าร่วม...' : 'เข้าร่วม'}
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </div>
                        )}

                        {userData?.classId && (
                            <div className="mt-8">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-bold border border-emerald-200 dark:border-emerald-800/50">
                                    <ICONS.CheckIcon className="w-4 h-4" />
                                    คุณอยู่ในห้องเรียนแล้ว
                                </span>
                            </div>
                        )}
                    </div>
                    
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
