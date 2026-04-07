import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../src/contexts/AuthContext';
import { ICONS } from '../ui/icons';

export const LoginModal: React.FC = () => {
    const { user, loading, login, loginWithEmail } = useAuth();
    const BookOpenIcon = ICONS.BookOpenIcon;

    const [view, setView] = useState<'role-select' | 'email-login' | 'email-signup'>('role-select');
    const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'admin'>('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Do not render if user is already logged in
    if (user) return null;

    const handleRoleSelect = (role: 'student' | 'teacher') => {
        setSelectedRole(role);
        setView('email-login');
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');
        
        if (view === 'email-signup' && password !== confirmPassword) {
            setAuthError('รหัสผ่านไม่ตรงกัน');
            return;
        }

        setIsSubmitting(true);
        try {
            await loginWithEmail(email, password, view === 'email-signup', selectedRole);
        } catch (error: any) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                setAuthError('อีเมลนี้ถูกใช้งานแล้ว');
            } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email') {
                setAuthError(selectedRole === 'admin' ? 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' : 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
            } else if (error.code === 'auth/weak-password') {
                setAuthError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
            } else {
                setAuthError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
            }
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
            <p className="text-slate-500 dark:text-slate-400 text-center mb-8 text-sm">เลือกบทบาทของคุณเพื่อเริ่มต้นใช้งาน</p>

            {/* Student Login */}
            <button
                onClick={() => handleRoleSelect('student')}
                className="group relative w-full flex items-center p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-sky-50 dark:hover:bg-sky-900/30 border border-slate-200 dark:border-slate-600 hover:border-sky-300 dark:hover:border-sky-700 rounded-2xl transition-all duration-300"
            >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-sky-500 mr-4 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                </div>
                <div className="text-left flex-grow">
                    <h4 className="font-bold text-slate-800 dark:text-white text-base group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">นักเรียน</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">เข้าเรียนและทำโครงงาน</p>
                </div>
                <div className="text-slate-300 dark:text-slate-600 group-hover:text-sky-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" /></svg>
                </div>
            </button>

            {/* Teacher Login */}
            <button
                onClick={() => handleRoleSelect('teacher')}
                className="group relative w-full flex items-center p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-700 rounded-2xl transition-all duration-300"
            >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-emerald-500 mr-4 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                </div>
                <div className="text-left flex-grow">
                    <h4 className="font-bold text-slate-800 dark:text-white text-base group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">คุณครู</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">จัดการชั้นเรียนและตรวจงาน</p>
                </div>
                <div className="text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" /></svg>
                </div>
            </button>
            
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 text-center">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                    เข้าสู่ระบบด้วยอีเมลและรหัสผ่านเพื่อความปลอดภัย
                </p>
            </div>
        </motion.div>
    );

    const renderEmailAuth = () => (
        <motion.div
            key="email-auth"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col"
        >
            <button 
                onClick={() => setView('role-select')}
                className="self-start mb-4 text-sm text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                ย้อนกลับ
            </button>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">
                {view === 'email-login' 
                    ? `เข้าสู่ระบบ${selectedRole === 'student' ? 'นักเรียน' : selectedRole === 'teacher' ? 'คุณครู' : 'ผู้ดูแลระบบ'}` 
                    : `สมัครสมาชิก${selectedRole === 'student' ? 'นักเรียน' : selectedRole === 'teacher' ? 'คุณครู' : 'ผู้ดูแลระบบ'}`}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-center mb-6 text-sm">
                {view === 'email-login' ? 'กรอกอีเมลและรหัสผ่านของคุณ' : 'สร้างบัญชีใหม่เพื่อเริ่มต้นใช้งาน'}
            </p>

            {authError && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm text-center">
                    {authError}
                </div>
            )}

            <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {selectedRole === 'admin' ? 'ชื่อผู้ใช้ หรือ อีเมล' : 'อีเมล'}
                    </label>
                    <input 
                        type={selectedRole === 'admin' ? 'text' : 'email'} 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                        placeholder={selectedRole === 'admin' ? 'admin' : 'your@email.com'}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">รหัสผ่าน</label>
                    <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                        placeholder="••••••••"
                    />
                </div>
                
                {view === 'email-signup' && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">ยืนยันรหัสผ่าน</label>
                        <input 
                            type="password" 
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                )}

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl transition-colors disabled:opacity-70 flex justify-center items-center"
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        view === 'email-login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'
                    )}
                </button>
            </form>

            {/* No Google login button here */}
            
            <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                {view === 'email-login' ? (
                    <>
                        ยังไม่มีบัญชีใช่ไหม?{' '}
                        <button onClick={() => setView('email-signup')} className="text-sky-600 hover:text-sky-700 font-medium">
                            สมัครสมาชิก
                        </button>
                    </>
                ) : (
                    <>
                        มีบัญชีอยู่แล้วใช่ไหม?{' '}
                        <button onClick={() => setView('email-login')} className="text-sky-600 hover:text-sky-700 font-medium">
                            เข้าสู่ระบบ
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex flex-col bg-slate-50 dark:bg-slate-900 overflow-y-auto">
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
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300 font-medium">นักเรียน: มี AI ช่วยคิดหัวข้อและเขียนรายงาน</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
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
                                            {view === 'role-select' && renderRoleSelection()}
                                            {(view === 'email-login' || view === 'email-signup') && renderEmailAuth()}
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

