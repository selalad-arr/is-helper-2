import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { ICONS } from '../ui/icons';

export const RoleSelectionPage: React.FC = () => {
    const { user, userRole, selectRole, logout } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const AcademicCapIcon = ICONS.AcademicCapIcon;
    const UsersIcon = ICONS.UsersIcon;
    const AdminIcon = ICONS.CheckCircleIcon;

    // Redirect if they visit without login
    React.useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleRoleSelect = async (role: 'student' | 'teacher' | 'admin') => {
        setIsSubmitting(true);
        try {
            await selectRole(role);
            if (role === 'admin') navigate('/admin');
            else if (role === 'teacher') navigate('/teacher');
            else if (role === 'student') navigate('/student');
        } catch (error) {
            console.error('Role selection failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl w-full"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[10px] font-black uppercase tracking-wider mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                        ยืนยันตัวตนสำเร็จ
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">คุณเป็นใคร?</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">เลือกบทบาทของคุณเพื่อเริ่มต้นการใช้งานที่เหมาะสมกับคุณ</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {/* Student Selection */}
                    <button
                        onClick={() => handleRoleSelect('student')}
                        disabled={isSubmitting}
                        className="group relative flex items-center p-6 rounded-[2rem] border-2 bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-sky-500 dark:hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 disabled:opacity-50"
                    >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-6 bg-slate-50 dark:bg-slate-700 text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
                            <AcademicCapIcon className="w-7 h-7" />
                        </div>
                        <div className="text-left flex-grow">
                            <h4 className="font-black text-lg text-slate-800 dark:text-white mb-1">นักเรียน</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">เข้าเรียน แชทกับ AI และสร้างโปรเจกต์ IS</p>
                        </div>
                        <div className="text-slate-300 group-hover:text-sky-500 transition-colors">
                            <ICONS.ChevronRightIcon className="w-6 h-6" />
                        </div>
                    </button>

                    {/* Teacher Selection */}
                    <button
                        onClick={() => handleRoleSelect('teacher')}
                        disabled={isSubmitting}
                        className="group relative flex items-center p-6 rounded-[2rem] border-2 bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 disabled:opacity-50"
                    >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-6 bg-slate-50 dark:bg-slate-700 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                            <UsersIcon className="w-7 h-7" />
                        </div>
                        <div className="text-left flex-grow">
                            <h4 className="font-black text-lg text-slate-800 dark:text-white mb-1">คุณครู</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">จัดการห้องเรียน ติดตามความคืบหน้านักเรียน</p>
                        </div>
                        <div className="text-slate-300 group-hover:text-emerald-500 transition-colors">
                            <ICONS.ChevronRightIcon className="w-6 h-6" />
                        </div>
                    </button>

                    {/* Admin Selection - Only for Founder */}
                    {user?.email === 'selalad@gmail.com' && (
                        <button
                            onClick={() => handleRoleSelect('admin')}
                            disabled={isSubmitting}
                            className="group relative flex items-center p-6 rounded-[2rem] border-2 bg-rose-50/50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/30 hover:border-rose-500 dark:hover:border-rose-400 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300 disabled:opacity-50"
                        >
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mr-6 bg-rose-100 dark:bg-rose-900/30 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                                <AdminIcon className="w-7 h-7" />
                            </div>
                            <div className="text-left flex-grow">
                                <h4 className="font-black text-lg text-rose-800 dark:text-rose-100 mb-1">Founder Dashboard</h4>
                                <p className="text-xs text-rose-500/70 dark:text-rose-400/70 font-medium">จัดการระบบภาพรวม สมาชิก และสถานะ Premium</p>
                            </div>
                            <div className="text-rose-300 group-hover:text-rose-500 transition-colors">
                                <ICONS.ChevronRightIcon className="w-6 h-6" />
                            </div>
                        </button>
                    )}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                    <button 
                        onClick={() => logout()}
                        className="inline-flex items-center gap-2 text-sm font-black text-slate-400 hover:text-rose-500 transition-all group"
                    >
                        <span className="w-8 h-px bg-slate-200 dark:bg-slate-800 group-hover:bg-rose-500/50 transition-colors" />
                        ไม่ใช่บัญชีของคุณ? ออกจากระบบ
                        <span className="w-8 h-px bg-slate-200 dark:bg-slate-800 group-hover:bg-rose-500/50 transition-colors" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
