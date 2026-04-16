import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface Step2Props {
    interest: string;
    goal: string;
    setGoal: (v: string) => void;
    onNext: () => void;
    onPrev: () => void;
}

const Step2: React.FC<Step2Props> = ({ interest, goal, setGoal, onNext, onPrev }) => {
    return (
        <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl mx-auto w-full space-y-6"
        >
            <div className="text-center space-y-2">
                <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold mb-2">
                    ส่วนที่ 2: กำหนดเป้าหมาย
                </span>
                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    เป้าหมายของคุณคืออะไร?
                </h4>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-600 dark:text-slate-400 italic">
                    "จากเรื่อง <span className="font-semibold text-sky-600 dark:text-sky-400">{interest}</span>"
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    เป้าหมายหลักของโครงงานนี้คือการทำให้...
                </label>
                <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="เช่น กล้วยทอดกรอบนานขึ้น, ขยะลดลง 50%, นอนหลับได้ลึกขึ้น"
                    className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-lg"
                    autoFocus
                />
            </div>

            <div className="flex justify-between">
                <button
                    onClick={onPrev}
                    className="px-6 py-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors"
                >
                    ย้อนกลับ
                </button>
                <button
                    onClick={onNext}
                    disabled={!goal.trim()}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-medium transition-colors"
                >
                    ถัดไป <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
};

export default Step2;
