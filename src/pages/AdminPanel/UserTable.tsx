import React from 'react';
import { MagnifyingGlassIcon, UserCircleIcon, SparklesIcon } from '../../ui/icons';

interface UserTableProps {
    searchTerm: string;
    setSearchTerm: (v: string) => void;
    filteredUsers: any[];
    onViewUsage: (uid: string) => void;
    onTogglePremium: (uid: string, current: boolean) => void;
}

const UserTable: React.FC<UserTableProps> = ({ 
    searchTerm, 
    setSearchTerm, 
    filteredUsers, 
    onViewUsage, 
    onTogglePremium 
}) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-slate-50 dark:border-slate-700/50 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full max-w-sm">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="ค้นหาด้วย Email หรือชื่อ..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none transition-all text-sm font-medium"
                    />
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase">
                    แสดงผลล่าสุด {filteredUsers.length} รายการ
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-900/30 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                            <th className="px-8 py-5">ผู้ใช้งาน / Email</th>
                            <th className="px-8 py-5 text-center">สถานะ</th>
                            <th className="px-8 py-5">วันที่หมดอายุ</th>
                            <th className="px-8 py-5 text-right">การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-700/30">
                        {filteredUsers.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/10 transition-colors">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 overflow-hidden border border-slate-200 dark:border-slate-600">
                                            {u.photoURL ? <img src={u.photoURL} alt="" className="w-full h-full object-cover" /> : <UserCircleIcon className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <div className="font-black text-slate-800 dark:text-white text-sm leading-tight mb-1">{u.displayName || 'No Name'}</div>
                                            <div className="text-xs font-medium text-slate-400">{u.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-center">
                                    {u.isPremium ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] font-black rounded-lg uppercase tracking-wider border border-amber-200 dark:border-amber-800">
                                            <SparklesIcon className="w-3 h-3" /> Premium
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-black rounded-lg uppercase tracking-wider border border-slate-200 dark:border-slate-600">
                                            Free User
                                        </span>
                                    )}
                                </td>
                                <td className="px-8 py-5">
                                    <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                                        {u.subscriptionExpires?.toDate ? u.subscriptionExpires.toDate().toLocaleDateString('th-TH') : '-'}
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-right space-x-2">
                                    <button
                                        onClick={() => onViewUsage(u.id)}
                                        className="p-2 text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-xl transition-all"
                                        title="ดูประวัติการใช้งาน AI"
                                    >
                                        <SparklesIcon className="w-5 h-5" />
                                    </button>
                                    
                                    {u.isPremium ? (
                                        <button
                                            onClick={() => onTogglePremium(u.id, true)}
                                            className="px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-[10px] font-black rounded-lg hover:bg-rose-100 transition-all border border-rose-100 dark:border-rose-800"
                                        >
                                            ยกเลิกสิทธิ์
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onTogglePremium(u.id, false)}
                                            className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-lg hover:bg-emerald-100 transition-all border border-emerald-100 dark:border-emerald-800"
                                        >
                                            ให้ Premium
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
