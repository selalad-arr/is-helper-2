import React from 'react';
import ReportMetadataForm from '../../components/ReportMetadataForm';
import JobAllocation from '../../components/JobAllocation';
import { UserCircle } from 'lucide-react';

const ProjectTopic1 = () => {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 1: แนะนำตัวนักประดิษฐ์ ✍️</h3>
            <div className="bg-white dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-sky-100 dark:bg-sky-900/40 rounded-lg">
                        <UserCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    </div>
                    ข้อมูลผู้จัดทำและหน้าปก
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                    กรุณากรอกข้อมูลให้ครบถ้วน ข้อมูลนี้จะถูกนำไปใช้สร้างหน้าปกรายงานโดยอัตโนมัติในก้าวสุดท้ายจ้า
                </p>
                <ReportMetadataForm mode="early" />
            </div>

            <JobAllocation />
        </div>
    );
};

export default ProjectTopic1;
