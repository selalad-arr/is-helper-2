import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { generateSimpleContent } from '../../services/gemini';

// Sub-components
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import ResultStep from './ResultStep';

interface Topic1CardFlowProps {
    projectTitle: string;
    setProjectTitle: (title: string) => void;
}

const Topic1CardFlow: React.FC<Topic1CardFlowProps> = ({ projectTitle, setProjectTitle }) => {
    const [step, setStep] = useState<number>(1);
    
    // Inputs
    const [interest, setInterest] = useState('');
    const [reason, setReason] = useState('');
    const [goal, setGoal] = useState('');
    const [variable, setVariable] = useState('');
    const [measurement, setMeasurement] = useState('');
    
    // AI Output
    const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNextStep = () => {
        setStep(prev => prev + 1);
    };

    const handlePrevStep = () => {
        setStep(prev => prev - 1);
    };

    const handleFinish = async () => {
        setStep(5);
        setIsGenerating(true);
        setError(null);

        try {
            const prompt = `คุณคือผู้เชี่ยวชาญด้านโครงงานวิทยาศาสตร์และโครงงานทั่วไป
นักเรียนได้ให้ข้อมูลเพื่อคิดหัวข้อโครงงานดังนี้:
- สิ่งที่สนใจ: ${interest}
- เหตุผลที่สนใจ: ${reason}
- เป้าหมาย: ทำให้ ${goal} ดีขึ้น/ลดลง/เปลี่ยนไป
- วิธีการ/ตัวแปรต้น: จะทดลองโดยการเปลี่ยน/ใช้ ${variable}
- การวัดผล/ตัวแปรตาม: จะวัดผลความสำเร็จโดยดูจาก ${measurement}

จากข้อมูลทั้งหมด กรุณาเสนอแนะชื่อโครงงานที่เป็นรูปธรรม 3 ชื่อ ที่เหมาะสมกับระดับมัธยมศึกษา
ตอบกลับมาเป็น JSON array ของ string เท่านั้น ห้ามมีข้อความอื่น ตัวอย่าง: ["ชื่อโครงงานที่ 1", "ชื่อโครงงานที่ 2", "ชื่อโครงงานที่ 3"]`;

            const response = await generateSimpleContent(prompt);
            const jsonMatch = response.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                const parsedIdeas = JSON.parse(jsonMatch[0]);
                setAiSuggestions(parsedIdeas);
            } else {
                 throw new Error("ไม่สามารถอ่านข้อมูลจาก AI ได้");
            }
        } catch (err: any) {
            setError(err.message || 'เกิดข้อผิดพลาดในการสร้างชื่อโครงงาน');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleReset = () => {
        setStep(1);
        setInterest('');
        setReason('');
        setGoal('');
        setVariable('');
        setMeasurement('');
        setAiSuggestions([]);
        setError(null);
    };

    const handleSelectTitle = (title: string) => {
        setProjectTitle(title);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[400px] flex flex-col relative">
            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 dark:bg-slate-700 w-full">
                <div 
                    className="h-full bg-sky-500 transition-all duration-500 ease-in-out"
                    style={{ width: `${(step / 5) * 100}%` }}
                />
            </div>

            <div className="flex-1 p-6 md:p-10 flex flex-col justify-center relative">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <Step1 
                            interest={interest} 
                            setInterest={setInterest} 
                            reason={reason} 
                            setReason={setReason} 
                            onNext={handleNextStep} 
                        />
                    )}

                    {step === 2 && (
                        <Step2 
                            interest={interest} 
                            goal={goal} 
                            setGoal={setGoal} 
                            onNext={handleNextStep} 
                            onPrev={handlePrevStep} 
                        />
                    )}

                    {step === 3 && (
                        <Step3 
                            goal={goal} 
                            variable={variable} 
                            setVariable={setVariable} 
                            onNext={handleNextStep} 
                            onPrev={handlePrevStep} 
                        />
                    )}

                    {step === 4 && (
                        <Step4 
                            variable={variable} 
                            measurement={measurement} 
                            setMeasurement={setMeasurement} 
                            onFinish={handleFinish} 
                            onPrev={handlePrevStep} 
                        />
                    )}

                    {step === 5 && (
                        <ResultStep 
                            isGenerating={isGenerating} 
                            error={error} 
                            aiSuggestions={aiSuggestions} 
                            projectTitle={projectTitle} 
                            onSelectTitle={handleSelectTitle} 
                            onReset={handleReset} 
                            onRetry={handleFinish} 
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Topic1CardFlow;
