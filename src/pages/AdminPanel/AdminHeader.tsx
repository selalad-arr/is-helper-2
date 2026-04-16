import React from 'react';

const FOUNDER_EMAIL = 'selalad@gmail.com';

interface AdminHeaderProps {
    totalUsers: number;
    premiumUsers: number;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ totalUsers, premiumUsers }) => {
    return (
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-widest mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                     Founder Exclusive Access
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                    Founder Dashboard <span className="text-rose-500">🛡️</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">จัดการสิทธิ์สมาชิกและตรวจสอบความเรียบร้อยของระบบ โดยคุณ {FOUNDER_EMAIL}</p>
            </div>

            <div className="flex flex-wrap gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm min-w-[120px]">
                    <div className="text-xs font-bold text-slate-400 mb-1 uppercase">สมาชิกรวม</div>
                    <div className="text-2xl font-black text-slate-800 dark:text-white">{totalUsers}</div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-3xl border border-amber-100 dark:border-amber-900/20 shadow-sm min-w-[120px]">
                    <div className="text-xs font-bold text-amber-500 mb-1 uppercase">Premium</div>
                    <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{premiumUsers}</div>
                </div>
            </div>
        </header>
    );
};
