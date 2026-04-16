import React from 'react';
import { motion } from 'motion/react';

interface ConsultationFeedProps {
    consultations: any[];
}

export const ConsultationFeed: React.FC<ConsultationFeedProps> = ({ consultations }) => {
    if (consultations.length === 0) return null;
    
    return (
        <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="w-8 h-px bg-slate-200 dark:bg-slate-700" />
                คำแนะนำจากคุณครู
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {consultations.map((c, idx) => (
                    <motion.div 
                        key={c.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 font-black text-xs">
                                {c.teacherName?.[0] || 'T'}
                            </div>
                            <div>
                                <div className="text-xs font-black text-slate-800 dark:text-white uppercase">{c.teacherName || 'คุณครู'}</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.createdAt?.toDate ? c.createdAt.toDate().toLocaleDateString('th-TH') : 'ล่าสุด'}</div>
                            </div>
                        </div>
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed italic">"{c.text}"</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

interface TaskFeedProps {
    tasks: any[];
}

export const TaskFeed: React.FC<TaskFeedProps> = ({ tasks }) => {
    if (tasks.length === 0) return null;

    return (
        <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="w-8 h-px bg-slate-200 dark:bg-slate-700" />
                ภารกิจที่ได้รับมอบหมาย
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tasks.map((t: any, idx: number) => (
                    <motion.div 
                        key={t.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative bg-linear-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5 p-8 rounded-[2.5rem] border border-purple-500/20 dark:border-purple-500/10 shadow-xl overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-purple-500 text-white rounded-2xl shadow-lg shadow-purple-500/20">
                                <span className="block w-5 h-5 flex items-center justify-center">📄</span>
                            </div>
                            <span className="text-[10px] font-black text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-1.5 rounded-full uppercase tracking-widest border border-purple-100 dark:border-purple-800/20">
                                Pending
                            </span>
                        </div>
                        <h4 className="text-xl font-black text-slate-800 dark:text-white mb-2 uppercase tracking-tight">{t.title}</h4>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{t.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
