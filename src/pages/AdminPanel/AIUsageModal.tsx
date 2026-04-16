import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ICONS, SparklesIcon } from '../../ui/icons';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AIUsageModalProps {
    userId: string;
    onClose: () => void;
}

const AIUsageModal: React.FC<AIUsageModalProps> = ({ userId, onClose }) => {
    const [usage, setUsage] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsage = async () => {
            setLoading(true);
            try {
                const today = new Date().toISOString().split('T')[0];
                const docRef = doc(db, 'users', userId, 'ai_usage', today);
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    setUsage([{ date: today, ...snap.data() }]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsage();
    }, [userId]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <SparklesIcon className="w-5 h-5 text-indigo-500" />
                        <h3 className="font-bold text-slate-800 dark:text-slate-100">AI Usage Monitor</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
                        <ICONS.XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {loading ? (
                        <div className="py-10 text-center text-slate-500">Loading...</div>
                    ) : usage.length > 0 ? (
                        <div className="space-y-4">
                            {usage.map((u, i) => (
                                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{u.date}</p>
                                        <p className="text-xs text-slate-500">Last used: {u.lastUsed?.toDate().toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-indigo-600">{u.count} / 3</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Requests Today</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-10 text-center text-slate-500">No usage recorded for today</div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AIUsageModal;
