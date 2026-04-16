import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useFirestoreData } from '../hooks/useFirestore';
import { generateSimpleContent } from '../services/gemini';

export const IdeaMixer = () => {
    const { data, updateData } = useFirestoreData('user_exercises', 'idea_mixer', {
        problem: '',
        interest: '',
        subject: '',
        generatedIdeas: [] as string[]
    });

    const [problem, setProblem] = useState('');
    const [interest, setInterest] = useState('');
    const [subject, setSubject] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [ideas, setIdeas] = useState<string[]>([]);

    useEffect(() => {
        if (data.problem) setProblem(data.problem);
        if (data.interest) setInterest(data.interest);
        if (data.subject) setSubject(data.subject);
        if (data.generatedIdeas && data.generatedIdeas.length > 0) setIdeas(data.generatedIdeas);
    }, [data]);

    const handleMix = async () => {
        if (!problem || !interest || !subject) return;
        
        setIsGenerating(true);
        updateData({ problem, interest, subject });

        const prompt = `ในฐานะผู้เชี่ยวชาญด้านการทำโครงงานนักเรียน
ข้อมูลของนักเรียน:
- ปัญหาที่พบ/อยากแก้: ${problem}
- สิ่งที่ชอบ/งานอดิเรก: ${interest}
- วิชาที่ถนัด: ${subject}

จงคิดชื่อหัวข้อโครงงานที่สร้างสรรค์และเป็นไปได้สำหรับนักเรียนมัธยม โดยผสมผสาน 3 อย่างนี้เข้าด้วยกัน
ขอ 3 หัวข้อที่แตกต่างกัน
ตอบกลับมาเป็น JSON array ของ string เท่านั้น ห้ามมีข้อความอื่น ตัวอย่าง: ["หัวข้อที่ 1", "หัวข้อที่ 2", "หัวข้อที่ 3"]`;

        try {
            const response = await generateSimpleContent(prompt);
            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                const parsedIdeas = JSON.parse(jsonMatch[0]);
                setIdeas(parsedIdeas);
                updateData({ generatedIdeas: parsedIdeas });
            }
        } catch (error) {
            console.error("Error generating ideas:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                    </svg>
                </div>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">เครื่องผสมไอเดีย (Idea Mixer)</h4>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                ลองใส่ข้อมูล 3 อย่างด้านล่างนี้ แล้วให้ AI ช่วยผสมผสานออกมาเป็นหัวข้อโครงงานที่เหมาะกับคุณดูสิ!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        1. ปัญหาที่พบ / อยากแก้
                    </label>
                    <input
                        type="text"
                        value={problem}
                        onChange={(e) => {
                            setProblem(e.target.value);
                            updateData({ problem: e.target.value });
                        }}
                        placeholder="เช่น ขยะเยอะ, อากาศร้อน"
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        2. สิ่งที่ชอบ / งานอดิเรก
                    </label>
                    <input
                        type="text"
                        value={interest}
                        onChange={(e) => {
                            setInterest(e.target.value);
                            updateData({ interest: e.target.value });
                        }}
                        placeholder="เช่น เล่นเกม, วาดรูป, เลี้ยงแมว"
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        3. วิชาที่ถนัด
                    </label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => {
                            setSubject(e.target.value);
                            updateData({ subject: e.target.value });
                        }}
                        placeholder="เช่น คอมพิวเตอร์, ศิลปะ"
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                </div>
            </div>

            <button
                onClick={handleMix}
                disabled={!problem || !interest || !subject || isGenerating}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
                {isGenerating ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        กำลังผสมไอเดีย...
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                        ผสมไอเดียเลย!
                    </>
                )}
            </button>

            {ideas.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-3"
                >
                    <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-3">💡 ไอเดียที่ได้:</h5>
                    {ideas.map((idea, index) => (
                        <div key={index} className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-xl text-indigo-900 dark:text-indigo-200">
                            {idea}
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};
