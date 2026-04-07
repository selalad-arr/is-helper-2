import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { ICONS } from '../ui/icons';

export const LoginModal: React.FC = () => {
    const { user, loading, login } = useAuth();
    const location = useLocation();
    const BookOpenIcon = ICONS.BookOpenIcon;
    const AcademicCapIcon = ICONS.AcademicCapIcon;
    const UsersIcon = ICONS.UsersIcon;
    const AdminIcon = ICONS.CheckCircleIcon; // Using CheckCircleIcon as a placeholder for Admin if not specific

    const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'admin' | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Do not render if user is already logged in or on public tutorial page
    if (user || location.pathname === '/tutorial') return null;

    const handleGoogleLogin = async (role: 'student' | 'teacher' | 'admin') => {
        setIsSubmitting(true);
        try {
            await login('google', role);
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderRoleSelection = () => (
        <motion.div
            key="role-select"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4"
        >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">เข้าสู่ระบบ</h3>
            <p className="text-slate-500 dark:text-slate-400 text-center mb-8 text-sm">เลือกบทบาทของคุณเพื่อเริ่มต้นใช้งานผ่าน Google</p>

            {/* Student Login */}
            <button
                onClick={() => handleGoogleLogin('student')}
                disabled={isSubmitting}
                className="group relative w-full flex items-center p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-sky-50 dark:hover:bg-sky-900/30 border border-slate-200 dark:border-slate-600 hover:border-sky-300 dark:hover:border-sky-700 rounded-2xl transition-all duration-300 disabled:opacity-50"
            >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-sky-500 mr-4 group-hover:scale-110 transition-transform">
                    <AcademicCapIcon className="w-6 h-6" />
                </div>
                <div className="text-left flex-grow">
                    <h4 className="font-bold text-slate-800 dark:text-white text-base group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">นักเรียน</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">เข้าเรียนและทำโครงงาน</p>
                </div>
                <div className="text-slate-300 dark:text-slate-600 group-hover:text-sky-500 transition-colors">
                    <ICONS.ChevronRightIcon className="w-5 h-5" />
                </div>
            </button>

            {/* Teacher Login */}
            <button
                onClick={() => handleGoogleLogin('teacher')}
                disabled={isSubmitting}
                className="group relative w-full flex items-center p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-700 rounded-2xl transition-all duration-300 disabled:opacity-50"
            >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-emerald-500 mr-4 group-hover:scale-110 transition-transform">
                    <UsersIcon className="w-6 h-6" />
                </div>
                <div className="text-left flex-grow">
                    <h4 className="font-bold text-slate-800 dark:text-white text-base group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">คุณครู</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">จัดการชั้นเรียนและตรวจงาน</p>
                </div>
                <div className="text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 transition-colors">
                    <ICONS.ChevronRightIcon className="w-5 h-5" />
                </div>
            </button>

            {/* Admin Login */}
            <button
                onClick={() => handleGoogleLogin('admin')}
                disabled={isSubmitting}
                className="group relative w-full flex items-center p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-amber-50 dark:hover:bg-amber-900/30 border border-slate-200 dark:border-slate-600 hover:border-amber-300 dark:hover:border-amber-700 rounded-2xl transition-all duration-300 disabled:opacity-50"
            >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-amber-500 mr-4 group-hover:scale-110 transition-transform">
                    <AdminIcon className="w-6 h-6" />
                </div>
                <div className="text-left flex-grow">
                    <h4 className="font-bold text-slate-800 dark:text-white text-base group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">ผู้ดูแลระบบ</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">จัดการระบบและข้อมูลทั้งหมด</p>
                </div>
                <div className="text-slate-300 dark:text-slate-600 group-hover:text-amber-500 transition-colors">
                    <ICONS.ChevronRightIcon className="w-5 h-5" />
                </div>
            </button>
            
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                    เข้าสู่ระบบด้วย Google Account ของคุณเพื่อความปลอดภัย
                </p>
            </div>
        </motion.div>
    );

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-100 flex flex-col bg-slate-50 dark:bg-slate-900 overflow-y-auto">
                {/* Decorative Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-sky-400/20 dark:bg-sky-500/10 blur-[120px]" />
                    <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-indigo-400/20 dark:bg-indigo-500/10 blur-[120px]" />
                    <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-[120px]" />
                </div>

                {/* Header */}
                <header className="w-full p-6 flex justify-between items-center relative z-10 max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="bg-sky-500/10 text-sky-600 dark:text-sky-400 p-2.5 rounded-2xl">
                            <BookOpenIcon className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300">
                            IS Helper
                        </h1>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow flex items-center justify-center relative z-10 px-4 py-8">
                    <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        
                        {/* Left Column: Hero Text */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 font-semibold text-sm mb-6 border border-sky-200 dark:border-sky-800/50">
                                <span className="relative flex h-2.5 w-2.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                                </span>
                                แพลตฟอร์มการเรียนรู้ครบวงจร
                            </div>
                            <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                                จัดการโครงงาน IS <br className="hidden lg:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
                                    สำหรับทุกคน
                                </span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                เชื่อมต่อการเรียนรู้ระหว่างนักเรียนและคุณครู พร้อมเครื่องมือ AI ที่ช่วยให้การทำโครงงานและการตรวจประเมินเป็นเรื่องง่ายและมีประสิทธิภาพ
                            </p>

                            <div className="hidden lg:flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-sky-600 dark:text-sky-400">
                                        <AcademicCapIcon className="w-5 h-5" />
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300 font-medium">นักเรียน: มี AI ช่วยคิดหัวข้อและเขียนรายงาน</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                        <UsersIcon className="w-5 h-5" />
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300 font-medium">คุณครู: ติดตามความคืบหน้าและตรวจงานได้ในที่เดียว</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Login Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-full max-w-md mx-auto"
                        >
                            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-700 p-8 md:p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-400/20 to-indigo-400/20 rounded-bl-full -mr-8 -mt-8" />
                                
                                <div className="relative z-10">
                                    {loading ? (
                                        <div className="py-12 flex flex-col items-center justify-center gap-4">
                                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500"></div>
                                            <p className="text-slate-500 text-sm animate-pulse">กำลังตรวจสอบข้อมูล...</p>
                                        </div>
                                    ) : (
                                        <AnimatePresence mode="wait">
                                            {renderRoleSelection()}
                                        </AnimatePresence>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </AnimatePresence>
    );
};
