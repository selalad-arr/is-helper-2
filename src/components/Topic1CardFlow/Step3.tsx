import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface Step3Props {
    goal: string;
    variable: string;
    setVariable: (v: string) => void;
    onNext: () => void;
    onPrev: () => void;
}

const Step3: React.FC<Step3Props> = ({ goal, variable, setVariable, onNext, onPrev }) => {
    return (
        <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl mx-auto w-full space-y-6"
        >
            <div className="text-center space-y-2">
                <span className="inline-block px-3 py-1 bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 rounded-full text-sm font-semibold mb-2">
                    ส่วนที่ 3: ระบุตัวแปรต้น
                </span>
                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    คุณจะใช้วิธีไหน?
                </h4>
                <p className="text-slate-500 dark:text-slate-400">
                    เพื่อให้บรรลุเป้าหมาย "{goal}" เราต้องมีวิธีทดลอง
                </p>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    ฉันจะทดลองโดยการเปลี่ยน/ใช้...
                </label>
                <input
                    type="text"
                    value={variable}
                    onChange={(e) => setVariable(e.target.value)}
                    placeholder="เช่น ชชนิดของแป้ง (แป้งข้าวเจ้า, แป้งมัน), ถังขยะแยกสี, เสียงเพลงก่อนนอน"
                    className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-lg"
                    autoFocus
                />
                <p className="mt-2 text-sm text-sky-600 dark:text-sky-400">
                    *นี่คือ "ตัวแปรต้น" ของเรา (สิ่งที่เราจงใจทำให้ต่างกันเพื่อดูผล)
                </p>
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
                    disabled={!variable.trim()}
                    className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-medium transition-colors"
                >
                    ถัดไป <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
};

export default Step3;
