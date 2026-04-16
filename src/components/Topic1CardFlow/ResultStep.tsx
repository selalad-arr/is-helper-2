import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Loader2, RefreshCw, Sparkles } from 'lucide-react';

interface ResultStepProps {
    isGenerating: boolean;
    error: string | null;
    aiSuggestions: string[];
    projectTitle: string;
    onSelectTitle: (title: string) => void;
    onReset: () => void;
    onRetry: () => void;
}

const ResultStep: React.FC<ResultStepProps> = ({ 
    isGenerating, 
    error, 
    aiSuggestions, 
    projectTitle, 
    onSelectTitle, 
    onReset, 
    onRetry 
}) => {
    return (
        <motion.div
            key="step5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto w-full space-y-6"
        >
            {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium animate-pulse">
                        AI กำลังประมวลผลและคิดชื่อโครงงาน...
                    </p>
                </div>
            ) : error ? (
                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl text-center space-y-4">
                    <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                    <button 
                        onClick={onRetry}
                        className="px-4 py-2 bg-red-100 dark:bg-red-800/50 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                    >
                        ลองใหม่อีกครั้ง
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-indigo-500" />
                            ไอเดียชื่อโครงงานของคุณ
                        </h4>
                        <button
                            onClick={onReset}
                            className="text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" /> เริ่มใหม่ทั้งหมด
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        {aiSuggestions.map((title, index) => (
                            <div 
                                key={index} 
                                onClick={() => onSelectTitle(title)}
                                className={`p-4 border rounded-xl cursor-pointer transition-all ${
                                    projectTitle === title 
                                    ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/30 dark:border-emerald-500' 
                                    : 'bg-white border-slate-200 hover:border-sky-300 hover:bg-sky-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-sky-700 dark:hover:bg-slate-700'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <p className={`text-lg ${projectTitle === title ? 'text-emerald-800 dark:text-emerald-200 font-semibold' : 'text-slate-700 dark:text-slate-300'}`}>
                                        {title}
                                    </p>
                                    {projectTitle === title && <CheckCircle className="w-6 h-6 text-emerald-500" />}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-4">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            คลิกที่ชื่อโครงงานเพื่อเลือก
                        </p>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ResultStep;
