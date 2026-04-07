import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../src/contexts/AuthContext';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.school || !formData.grade || !formData.classNo || !formData.displayName) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    setLoading(true);
    try {
      await updateProfile(formData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-xl border-2 border-sky-100 dark:border-slate-700"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-sky-100 dark:bg-sky-900/30 rounded-2xl text-sky-600 dark:text-sky-400 mb-4">
            <ICONS.UserCircleIcon className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">ข้อมูลนักเรียน</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">กรุณากรอกข้อมูลเพื่อเริ่มต้นใช้งาน</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">ชื่อ-นามสกุล</label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
              placeholder="เด็กชาย/เด็กหญิง/นาย/นางสาว ..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">โรงเรียน</label>
            <input
              type="text"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
              placeholder="ชื่อโรงเรียนของคุณ"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">ระดับชั้น</label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                placeholder="เช่น ม.3/1"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">เลขที่</label>
              <input
                type="text"
                value={formData.classNo}
                onChange={(e) => setFormData({ ...formData, classNo: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                placeholder="เช่น 15"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl shadow-lg shadow-sky-200 dark:shadow-none transition-all transform active:scale-95 disabled:opacity-50"
          >
            {loading ? 'กำลังบันทึก...' : 'เริ่มต้นใช้งาน'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
