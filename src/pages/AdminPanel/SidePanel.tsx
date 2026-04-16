import React from 'react';
import { motion } from 'motion/react';
import { PlusIcon } from '../../ui/icons';

interface AddUserFormProps {
    newEmail: string;
    setNewEmail: (v: string) => void;
    isAdding: boolean;
    onAdd: (e: React.FormEvent) => void;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({ newEmail, setNewEmail, isAdding, onAdd }) => {
    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl group-hover:bg-rose-500/30 transition-all duration-700"></div>
            <h3 className="text-xl font-black mb-4 relative z-10 flex items-center gap-2">
                <PlusIcon className="w-6 h-6 text-rose-500" />
                เพิ่มสิทธิ์ด้วย Email
            </h3>
            <p className="text-slate-400 text-sm mb-6 relative z-10 leading-relaxed font-medium">
                กรอก Email ผู้ใช้ที่ต้องการอัปเกรดเป็น Premium โดยระบบจะทำการเปิดสิทธิ์ 30 วันนับจากนี้
            </p>
            <form onSubmit={onAdd} className="space-y-4 relative z-10">
                <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="name@email.com"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none transition-all text-sm font-bold text-white placeholder-white/30"
                />
                <button
                    type="submit"
                    disabled={isAdding}
                    className="w-full py-4 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-rose-500/30 active:scale-[0.98] transition-all"
                >
                    {isAdding ? 'กำลังดำเนินการ...' : 'สั่งเปิดสิทธิ์ Premium ✨'}
                </button>
            </form>
        </div>
    );
};

interface QuickStatsProps {
    premiumUsers: number;
    totalUsers: number;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ premiumUsers, totalUsers }) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-black text-slate-800 dark:text-white mb-4">Founder Quick Stats</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Free Conversion</span>
                    <span className="font-black text-slate-800 dark:text-white">
                        {totalUsers > 0 ? ((premiumUsers / totalUsers) * 100).toFixed(1) : 0}%
                    </span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-rose-500" 
                        initial={{ width: 0 }}
                        animate={{ width: `${(premiumUsers / (totalUsers || 1)) * 100}%` }}
                    />
                </div>
                <p className="text-[10px] text-slate-400 italic">
                    * ข้อมูลอัปเดตแบบเรียลไทม์จาก Firestore
                </p>
            </div>
        </div>
    );
};
