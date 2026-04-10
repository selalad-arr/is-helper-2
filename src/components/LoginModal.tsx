import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { ICONS } from '../ui/icons';

export const LoginModal: React.FC = () => {
    const { user, userRole, loading, login, selectRole, authError, clearError, logout } = useAuth();
    const location = useLocation();
    const BookOpenIcon = ICONS.BookOpenIcon;
    const AcademicCapIcon = ICONS.AcademicCapIcon;
    const UsersIcon = ICONS.UsersIcon;
    const AdminIcon = ICONS.CheckCircleIcon;

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Do not render if user is already logged in (Role selection is now a page) or is on tutorial
    if (user || location.pathname === '/tutorial') return null;

    const handleGoogleLogin = async () => {
        setIsSubmitting(true);
        try {
            await login('google');
        } catch (error) {
            // Error managed by context
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRoleSelect = async (role: 'student' | 'teacher' | 'admin') => {
        setIsSubmitting(true);
        try {
            await selectRole(role);
        } catch (error) {
            console.error('Role selection failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderLogin = () => (
        <motion.div
            key="login-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col gap-6"
        >
            <div className="text-center mb-4">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3">เข้าสู่ระบบ</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    บันทึกความก้าวหน้า เข้าถึงคลังความรู้ และเริ่มทำโครงงาน IS ด้วยพลังของ AI
                </p>
            </div>

            <AnimatePresence>
                {authError && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-900/30 p-4 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold relative group"
                    >
                        <ICONS.XMarkIcon className="w-5 h-5 shrink-0" />
                        <span className="flex-grow">{authError}</span>
                        <button 
                            onClick={clearError}
                            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors"
                        >
                            <ICONS.XMarkIcon className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-4 px-6 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[1.5rem] font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl shadow-slate-200 dark:shadow-none active:scale-95 disabled:opacity-50"
            >
                {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white dark:border-slate-900 border-t-transparent" />
                ) : (
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                )}
                เข้าสู่ระบบด้วย Google
            </button>



            <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center px-4 leading-relaxed font-medium">
                การเข้าสู่ระบบแสดงว่าคุณยอมรับข้อตกลงการใช้งานและนโยบายความเป็นส่วนตัวของเรา
            </p>
        </motion.div>
    );

    const renderRoleSelection = () => (
        <motion.div
            key="role-select"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4"
        >
            <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[10px] font-black uppercase tracking-wider mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                    ยืนยันตัวตนสำเร็จ
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">คุณเป็นใคร?</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">เลือกบทบาทของคุณเพื่อปรับแต่งประสบการณ์</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {/* Student Selection */}
                <button
                    onClick={() => handleRoleSelect('student')}
                    disabled={isSubmitting}
                    className="group relative flex items-center p-4 rounded-2xl border-2 bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-400 hover:shadow-lg hover:shadow-sky-100 dark:hover:shadow-none transition-all duration-300 disabled:opacity-50"
                >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-slate-50 dark:bg-slate-700 text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                        <AcademicCapIcon className="w-6 h-6" />
                    </div>
                    <div className="text-left flex-grow">
                        <h4 className="font-bold text-base text-slate-800 dark:text-white">นักเรียน</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">เข้าเรียน แชทกับ AI และทำโครงงาน</p>
                    </div>
                    <div className="text-slate-300 group-hover:text-sky-500 transition-colors">
                        <ICONS.ChevronRightIcon className="w-5 h-5" />
                    </div>
                </button>

                {/* Teacher Selection */}
                <button
                    onClick={() => handleRoleSelect('teacher')}
                    disabled={isSubmitting}
                    className="group relative flex items-center p-4 rounded-2xl border-2 bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-100 dark:hover:shadow-none transition-all duration-300 disabled:opacity-50"
                >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-slate-50 dark:bg-slate-700 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <UsersIcon className="w-6 h-6" />
                    </div>
                    <div className="text-left flex-grow">
                        <h4 className="font-bold text-base text-slate-800 dark:text-white">คุณครู</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">จัดการชั้นเรียน ติดตามและตรวจงาน</p>
                    </div>
                    <div className="text-slate-300 group-hover:text-emerald-500 transition-colors">
                        <ICONS.ChevronRightIcon className="w-5 h-5" />
                    </div>
                </button>

                {/* Admin Selection */}
                <button
                    onClick={() => handleRoleSelect('admin')}
                    disabled={isSubmitting}
                    className="group relative flex items-center p-4 rounded-2xl border-2 bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-lg hover:shadow-amber-100 dark:hover:shadow-none transition-all duration-300 disabled:opacity-50"
                >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-slate-50 dark:bg-slate-700 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                        <AdminIcon className="w-6 h-6" />
                    </div>
                    <div className="text-left flex-grow">
                        <h4 className="font-bold text-base text-slate-800 dark:text-white">ผู้ดูแลระบบ</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">จัดการระบบ สถิติ และข้อมูลหลังบ้าน</p>
                    </div>
                    <div className="text-slate-300 group-hover:text-amber-500 transition-colors">
                        <ICONS.ChevronRightIcon className="w-5 h-5" />
                    </div>
                </button>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
                <button 
                  onClick={() => useAuth().logout()}
                  className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
                >
                  ไม่ใช่บัญชีของคุณ? ออกจากระบบ
                </button>
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
                                            {!user ? renderLogin() : renderRoleSelection()}
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
