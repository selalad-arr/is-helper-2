import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { ICONS } from '../ui/icons';

export const StudentOnboarding: React.FC = () => {
    const { updateProfile, userData } = useAuth();
    const [formData, setFormData] = useState({
        school: userData?.school || '',
        grade: userData?.grade || '',
        classNo: userData?.classNo || '',
        displayName: userData?.displayName || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.school || !formData.grade || !formData.classNo || !formData.displayName) {
            setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await updateProfile(formData);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (userData?.onboardingComplete && !loading) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-sky-100 dark:border-slate-700 h-fit"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-xl text-sky-600 dark:text-sky-400">
                    <ICONS.UserCircleIcon className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">ข้อมูลนักเรียน</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">กรุณาให้ข้อมูลเพื่อเริ่มต้น</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">ชื่อ-นามสกุล</label>
                    <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                        placeholder="เด็กชาย/นาย ..."
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">โรงเรียน</label>
                    <input
                        type="text"
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                        placeholder="ชื่อโรงเรียน"
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">ชั้น</label>
                        <input
                            type="text"
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                            placeholder="ม.3/1"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">เลขที่</label>
                        <input
                            type="text"
                            value={formData.classNo}
                            onChange={(e) => setFormData({ ...formData, classNo: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                            placeholder="เลขที่"
                        />
                    </div>
                </div>

                {error && (
                    <p className="text-red-500 text-xs font-medium text-center">{error}</p>
                )}
                {success && (
                    <p className="text-emerald-500 text-xs font-medium text-center">บันทึกข้อมูลสำเร็จ!</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-sky-200 dark:shadow-none transition-all transform active:scale-95 disabled:opacity-50"
                >
                    {loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                </button>
            </form>
        </motion.div>
    );
};
