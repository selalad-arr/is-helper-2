import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

interface Step4Props {
    variable: string;
    measurement: string;
    setMeasurement: (v: string) => void;
    onFinish: () => void;
    onPrev: () => void;
}

const Step4: React.FC<Step4Props> = ({ variable, measurement, setMeasurement, onFinish, onPrev }) => {
    return (
        <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl mx-auto w-full space-y-6"
        >
            <div className="text-center space-y-2">
                <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold mb-2">
                    ส่วนที่ 4: ระบุตัวแปรตาม
                </span>
                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    จะวัดผลอย่างไร?
                </h4>
                <p className="text-slate-500 dark:text-slate-400">
                    เราจะรู้ได้อย่างไรว่าวิธี "{variable}" ของเราได้ผล?
                </p>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    ฉันจะวัดผลความสำเร็จโดยดูจาก...
                </label>
                <input
                    type="text"
                    value={measurement}
                    onChange={(e) => setMeasurement(e.target.value)}
                    placeholder="เช่น ระยะเวลาที่ยังกรอบอยู่ (นาที), ปริมาณขยะที่ลดลง (กิโลกรัม), คะแนนความสดชื่นตอนตื่น (1-10)"
                    className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                    autoFocus
                />
                <p className="mt-2 text-sm text-purple-600 dark:text-purple-400">
                    *นี่คือ "ตัวแปรตาม" ของเรา (ผลที่ตามมาจากการเปลี่ยนตัวแปรต้น)
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
                    onClick={onFinish}
                    disabled={!measurement.trim()}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/30"
                >
                    <CheckCircle className="w-5 h-5" /> สร้างชื่อโครงงาน
                </button>
            </div>
        </motion.div>
    );
};

export default Step4;
