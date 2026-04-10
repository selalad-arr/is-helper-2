import React from 'react';
import { IdeaMixer } from '../../components/IdeaMixer';
import { Sparkles } from 'lucide-react';

const ProjectTopic2 = () => {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 2: ค้นหาไอเดียที่คุณหลงใหล 💡</h3>
            
            <div className="bg-sky-50 dark:bg-sky-900/20 p-5 rounded-2xl border border-sky-100 dark:border-sky-800/50 mb-8">
                <p className="text-sky-800 dark:text-sky-300 leading-relaxed">
                    การทำโครงงานที่ดี เริ่มจาก <strong>"สิ่งที่เราชอบ"</strong> หรือ <strong>"เรื่องที่เราสงสัย"</strong> ครับ ลองใช้ <strong>"เครื่องผสมไอเดีย"</strong> ด้านล่างนี้ เพื่อหาจุดเริ่มต้นสนุกๆ ดูนะ
                </p>
            </div>

            <div className="bg-white dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <h4 className="font-semibold text-xl mb-6 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    🧪 ลองผสมไอเดียกัน!
                </h4>
                <IdeaMixer />
            </div>
        </div>
    );
};

export default ProjectTopic2;
