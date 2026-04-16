import React from 'react';
import ReportMetadataForm from '../../components/ReportMetadataForm';
import { FileText, Link as LinkIcon } from 'lucide-react';

const ProjectTopic16 = () => {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 15: บทคัดย่อและเอกสารอ้างอิง ✍️</h3>
            
            <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-100 dark:border-sky-800/50 mb-8">
                <p className="text-sky-800 dark:text-sky-300 leading-relaxed italic">
                    "ใกล้เสร็จแล้ว! มาสรุปบทคัดย่อสั้นๆ และรวบรวมรายชื่อหนังสือหรือเว็บไซต์ที่เราไปอ่านมา เพื่อให้โครงงานของเราสมบูรณ์ที่สุดกันครับ"
                </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-sky-100 dark:bg-sky-900/40 rounded-lg">
                        <FileText className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">บันทึกข้อมูลส่วนสุดท้าย</h4>
                </div>
                <ReportMetadataForm mode="late" />
            </div>

            <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <LinkIcon className="w-4 h-4 shrink-0" />
                <p><strong>คำแนะนำเรื่องการอ้างอิง:</strong> ระบุชื่อผู้แต่ง, ชื่อบทความ, และวันที่สืบค้นให้ครบถ้วนนะครับ</p>
            </div>
        </div>
    );
};

export default ProjectTopic16;
