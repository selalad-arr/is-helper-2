import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface Step1Props {
    interest: string;
    setInterest: (v: string) => void;
    reason: string;
    setReason: (v: string) => void;
    onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ interest, setInterest, reason, setReason, onNext }) => {
    return (
        <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl mx-auto w-full space-y-6"
        >
            <div className="text-center space-y-2">
                <span className="inline-block px-3 py-1 bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 rounded-full text-sm font-semibold mb-2">
                    ส่วนที่ 1: สำรวจความสนใจ
                </span>
                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    คุณสนใจเรื่องอะไร?
                </h4>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        ฉันสนใจเรื่อง...
                    </label>
                    <input
                        type="text"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        placeholder="เช่น กล้วยทอด, ขยะในโรงเรียน, การนอนหลับ"
                        className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-lg"
                        autoFocus
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        เพราะว่า...
                    </label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="เช่น มันนิ่มเร็วเกินไป, ทำให้โรงเรียนไม่น่าอยู่, ตื่นมาแล้วไม่สดชื่น"
                        className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-lg"
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={onNext}
                    disabled={!interest.trim() || !reason.trim()}
                    className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-medium transition-colors"
                >
                    ถัดไป <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
};

export default Step1;
