import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { UserCircleIcon, KeyIcon } from '../ui/icons';

export const StudentOnboarding: React.FC = () => {
    const { updateProfile, userData, joinClassroom } = useAuth();
    const [formData, setFormData] = useState({
        school: userData?.school || '',
        grade: userData?.grade || '',
        classNo: userData?.classNo || '',
        displayName: userData?.displayName || '',
        classCode: '', // New field for joining classroom
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setLoading(true);
        setError('');
        try {
            // 1. Join Classroom first if code is provided
            if (formData.classCode.trim()) {
                await joinClassroom(formData.classCode.trim());
            }

            // 2. Update profile data
            const { classCode, ...profileData } = formData;
            await updateProfile(profileData);
            
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        } finally {
            setLoading(false);
        }
    };

    if (userData?.onboardingComplete && !loading) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-white/40 dark:border-slate-700/50 h-fit"
        >
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-linear-to-br from-sky-100 to-sky-50 dark:from-sky-900/40 dark:to-indigo-900/40 rounded-2xl text-sky-600 dark:text-sky-400 shadow-inner">
                    <UserCircleIcon className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">ข้อมูลนักเรียน 📝</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ข้อมูลส่วนนี้ไม่บังคับ สามารถเลือกกรอกหรือข้ามได้</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">ชื่อ-นามสกุล</label>
                    <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        className="w-full px-5 py-3.5 text-sm font-bold rounded-2xl bg-white/50 dark:bg-slate-900/50 border-2 border-slate-100/50 dark:border-slate-700/50 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                        placeholder="เด็กชาย/นาย ..."
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">โรงเรียน</label>
                    <input
                        type="text"
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                        className="w-full px-5 py-3.5 text-sm font-bold rounded-2xl bg-white/50 dark:bg-slate-900/50 border-2 border-slate-100/50 dark:border-slate-700/50 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                        placeholder="ชื่อโรงเรียนของคุณ"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">ชั้น</label>
                        <input
                            type="text"
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            className="w-full px-5 py-3.5 text-sm font-bold rounded-2xl bg-white/50 dark:bg-slate-900/50 border-2 border-slate-100/50 dark:border-slate-700/50 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                            placeholder="ม.3/1"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">เลขที่</label>
                        <input
                            type="text"
                            value={formData.classNo}
                            onChange={(e) => setFormData({ ...formData, classNo: e.target.value })}
                            className="w-full px-5 py-3.5 text-sm font-bold rounded-2xl bg-white/50 dark:bg-slate-900/50 border-2 border-slate-100/50 dark:border-slate-700/50 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                            placeholder="เลขที่"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-white/20 dark:border-slate-700/50">
                    <label className="block text-[10px] font-black text-sky-600 dark:text-sky-400 mb-2 ml-1 uppercase tracking-widest">
                        รหัสเข้าห้องเรียน (ถ้ามี) 🔑
                    </label>
                    <div className="relative">
                        <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-400" />
                        <input
                            type="text"
                            value={formData.classCode}
                            onChange={(e) => setFormData({ ...formData, classCode: e.target.value.toUpperCase() })}
                            className="w-full pl-12 pr-5 py-4 text-lg font-mono font-black rounded-2xl bg-linear-to-br from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 border-2 border-sky-100 dark:border-sky-800 placeholder:text-sky-200 dark:placeholder:text-sky-800 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all tracking-widest"
                            placeholder="รหัส 6 หลัก"
                            maxLength={6}
                        />
                    </div>
                    <p className="mt-2 text-[10px] font-medium text-slate-400 dark:text-slate-500 ml-1 italic leading-relaxed">
                        * รหัสนี้จะช่วยให้คุณครูติดตามและตรวจงานของคุณได้แบบ Real-time
                    </p>
                </div>

                {error && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/20 rounded-2xl text-[10px] font-black text-red-500 text-center uppercase tracking-widest">
                        {error}
                    </motion.div>
                )}
                {success && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/20 rounded-2xl text-[10px] font-black text-emerald-500 text-center uppercase tracking-widest">
                        บันทึกข้อมูลสำเร็จ! 🚀
                    </motion.div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-linear-to-br from-sky-500 to-indigo-600 hover:shadow-sky-500/25 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all transform active:scale-95 disabled:opacity-50"
                >
                    {loading ? '...' : 'เริ่มต้นใช้งาน IS Helper'}
                </button>
            </form>
        </motion.div>
    );
};
