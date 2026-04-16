import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ICONS } from '../../ui/icons';

interface HeroSectionProps {
    user: any;
    userRole: string | null;
    userData: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ user, userRole, userData }) => {
    return (
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

                {user && userRole === 'student' && (
                    <div className="w-full flex flex-wrap gap-4 items-center">
                        {userData?.classId ? (
                            <div className="inline-flex items-center gap-4 px-6 py-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-[1.5rem] border border-emerald-100 dark:border-emerald-800/30">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                    <ICONS.CheckIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">กำลังใช้งานห้องเรียน</div>
                                    <div className="font-black text-emerald-800 dark:text-emerald-400">เข้าสู่ระบบห้องเรียนสำเร็จ</div>
                                </div>
                                <Link 
                                    to="/student"
                                    className="ml-4 px-4 py-2 bg-white dark:bg-slate-800 text-[10px] font-black text-slate-500 hover:text-sky-500 rounded-xl border border-slate-200 dark:border-slate-700 transition-all uppercase tracking-widest"
                                >
                                    สลับห้องเรียน
                                </Link>
                            </div>
                        ) : (
                            <Link 
                                to="/student"
                                className="group flex items-center gap-4 px-8 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-sky-500 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:-translate-y-1 active:scale-95 text-xs"
                            >
                                <div className="p-2 bg-sky-50 dark:bg-sky-900/30 rounded-xl group-hover:scale-110 transition-transform">
                                    <ICONS.UsersIcon className="w-5 h-5 text-sky-500" />
                                </div>
                                ตั้งค่าห้องเรียน / แลกเปลี่ยนห้อง
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroSection;
