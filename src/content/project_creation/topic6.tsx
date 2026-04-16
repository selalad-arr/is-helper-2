import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import { Target, Lightbulb } from 'lucide-react';

const ProjectTopic6 = () => {
    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 5: เป้าหมายและสมมติฐาน 🎯</h3>
            
            <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-100 dark:border-sky-800/50">
                <h4 className="font-semibold text-sky-800 dark:text-sky-300 mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5" /> วัตถุประสงค์คืออะไร?
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    คือสิ่งที่เราต้องการหาคำตอบ มักจะขึ้นต้นด้วยคำว่า <strong>"เพื่อ..."</strong> เช่น "เพื่อศึกษาประสิทธิภาพของ..." หรือ "เพื่อประดิษฐ์เครื่องบีบขวด..."
                </p>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-sky-100 dark:border-sky-700">
                    <p className="text-xs text-slate-500 italic">"ลองย้อนกลับไปดูบทที่ 1 หรือถามพี่ AI ในก้าวต่อไปได้นะจ๊ะ"</p>
                </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-800/50">
                <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" /> สมมติฐานและการคาดการณ์
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    คือการเดาคำตอบล่วงหน้าอย่างมีหลักการ มักใช้รูปแบบ <strong>"ถ้า...ดังนั้น..."</strong> เช่น "ถ้าเราใช้สมุนไพรชนิด A ดังนั้นมดจะลดลงมากกว่าชนิด B"
                </p>
            </div>

            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-center">
                <p className="text-slate-500 text-sm">ส่วนนี้มักจะอยู่ในบทที่ 1 ที่เราเพิ่งเขียนไป <br/> ตรวจสอบความถูกต้องอีกครั้งก่อนไปก้าวที่ 6 นะครับ!</p>
            </div>
        </div>
    );
};

export default ProjectTopic6;
