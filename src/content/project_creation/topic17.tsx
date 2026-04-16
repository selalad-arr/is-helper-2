import React from 'react';
import FinalReportCompiler from '../../components/FinalReportCompiler';
import { BookMarked } from 'lucide-react';

const ProjectTopic17 = () => {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-3xl text-white shadow-lg shadow-emerald-200 dark:shadow-none mb-8">
                <h3 className="text-3xl font-bold mb-3 flex items-center gap-3">
                    <BookMarked className="w-8 h-8" />
                    <span>ก้าวที่ 16: ตรวจสอบและดาวน์โหลด 📚</span>
                </h3>
                <p className="text-emerald-50 opacity-90 text-lg leading-relaxed">
                    ภารกิจเสร็จสิ้น! ตอนนี้รายงานฉบับสมบูรณ์พร้อมแจกจ่ายแล้ว ตรวจสอบความถูกต้องรอบสุดท้ายแล้วดาวน์โหลดได้เลยครับ! ✨
                </p>
            </div>

            <FinalReportCompiler />
            
            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 text-center">
                <p>ขอขอบคุณที่ใช้บริการ IS-Helper หวังว่าโครงงานนี้จะสร้างประโยชน์ให้ทุกคนนะครับ! ❤️</p>
            </div>
        </div>
    );
};

export default ProjectTopic17;
