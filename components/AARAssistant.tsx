import React, { useState } from 'react';
import { useFirestoreData } from '../src/hooks/useFirestore';
import { generateAARReport } from '../services/geminiService';
import { SparklesIcon, DocumentTextIcon, CheckCircleIcon, ExclamationTriangleIcon, ArrowTrendingUpIcon } from '../ui/icons';
import { trackEvent } from '../services/analyticsService';

interface AARAssistantProps {
    projectTitle: string;
}

const AARAssistant: React.FC<AARAssistantProps> = ({ projectTitle }) => {
    const { data, updateData, loading: isDataLoading } = useFirestoreData('user_is3_aars', 'main', {
        wentWell: '',
        problems: '',
        improvements: '',
        generatedAAR: ''
    });

    const [wentWell, setWentWell] = useState(data?.wentWell || '');
    const [problems, setProblems] = useState(data?.problems || '');
    const [improvements, setImprovements] = useState(data?.improvements || '');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sync state when data loads
    React.useEffect(() => {
        if (data) {
            setWentWell(data.wentWell || '');
            setProblems(data.problems || '');
            setImprovements(data.improvements || '');
        }
    }, [data]);

    const handleGenerate = async () => {
        if (!wentWell.trim() || !problems.trim() || !improvements.trim()) {
            setError('กรุณากรอกข้อมูลให้ครบทั้ง 3 ช่องก่อนสร้างรายงานครับ');
            return;
        }

        setIsGenerating(true);
        setError(null);

        try {
            trackEvent('generate_aar_report', { projectTitle });
            const result = await generateAARReport(projectTitle, wentWell, problems, improvements);
            
            await updateData({
                wentWell,
                problems,
                improvements,
                generatedAAR: result
            });
        } catch (err: any) {
            setError(err.message || 'เกิดข้อผิดพลาดในการสร้างรายงาน');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveDraft = () => {
        updateData({ wentWell, problems, improvements });
    };

    if (isDataLoading) {
        return <div className="p-4 text-center text-slate-500">กำลังโหลดข้อมูล...</div>;
    }

    return (
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <SparklesIcon className="w-8 h-8 text-indigo-100" />
                    <h3 className="text-2xl font-bold">AI ช่วยถอดบทเรียน (AAR Assistant)</h3>
                </div>
                <p className="text-indigo-100">
                    เล่าให้ AI ฟังว่าโครงการของคุณเป็นอย่างไรบ้าง แล้ว AI จะช่วยเรียบเรียงเป็นรายงานสรุปบทเรียน (After Action Review) ที่สวยงามให้เอง!
                </p>
            </div>

            <div className="p-6 space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800 text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                            <CheckCircleIcon className="w-5 h-5" />
                            1. สิ่งที่ทำได้ดี (What went well?)
                        </label>
                        <textarea
                            value={wentWell}
                            onChange={(e) => setWentWell(e.target.value)}
                            onBlur={handleSaveDraft}
                            placeholder="เช่น เพื่อนร่วมทีมให้ความร่วมมือดีมาก, กิจกรรมสนุกและคนเข้าร่วมเยอะกว่าที่คิด..."
                            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none min-h-[100px]"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-rose-700 dark:text-rose-400 mb-2">
                            <ExclamationTriangleIcon className="w-5 h-5" />
                            2. ปัญหาและอุปสรรค (Problems & Challenges)
                        </label>
                        <textarea
                            value={problems}
                            onChange={(e) => setProblems(e.target.value)}
                            onBlur={handleSaveDraft}
                            placeholder="เช่น ฝนตกทำให้ต้องย้ายสถานที่, อุปกรณ์ไม่พอ, สื่อสารกันผิดพลาด..."
                            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-rose-500 outline-none min-h-[100px]"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-sky-700 dark:text-sky-400 mb-2">
                            <ArrowTrendingUpIcon className="w-5 h-5" />
                            3. สิ่งที่อยากปรับปรุง (Areas for Improvement)
                        </label>
                        <textarea
                            value={improvements}
                            onChange={(e) => setImprovements(e.target.value)}
                            onBlur={handleSaveDraft}
                            placeholder="เช่น คราวหน้าจะเตรียมแผนสำรองเรื่องสถานที่, จะแบ่งหน้าที่ให้ชัดเจนกว่านี้..."
                            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-sky-500 outline-none min-h-[100px]"
                        />
                    </div>
                </div>

                <div className="flex justify-center pt-4 border-t border-slate-200 dark:border-slate-700">
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !wentWell || !problems || !improvements}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-bold rounded-full transition-colors shadow-md"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                กำลังสร้างรายงาน...
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="w-5 h-5" />
                                สร้างรายงานถอดบทเรียนด้วย AI
                            </>
                        )}
                    </button>
                </div>

                {data?.generatedAAR && (
                    <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                            <DocumentTextIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">รายงานถอดบทเรียน (AAR) ของคุณ</h4>
                        </div>
                        <div className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                            {data.generatedAAR}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AARAssistant;
