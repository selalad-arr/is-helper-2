import React from 'react';
import { ShieldCheck, Ruler, Layers } from 'lucide-react';

const ProjectTopic10 = () => {
    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 10: ความแม่นยำและการออกแบบ 🛠️</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-100 dark:border-sky-800/50">
                    <h4 className="font-bold text-sky-800 dark:text-sky-300 mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5" /> ความน่าเชื่อถือ (Replication)
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        <strong>การทำซ้ำ:</strong> ควรทดลองซ้ำอย่างน้อย <strong>3 ครั้ง</strong> ในแต่ละชุด เพื่อลดความคลาดเคลื่อนและให้ข้อมูลแม่นยำที่สุดนะจ๊ะ
                    </p>
                </div>
                
                <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800/50">
                    <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                        <Ruler className="w-5 h-5" /> หน่วยวัดที่ชัดเจน
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        เราจะวัดเป็น เซนติเมตร, กิโลกรัม, หรือนับจำนวน? ต้องระบุหน่วยให้ชัดเจนและใช้เครื่องมือที่มาตรฐานนะ
                    </p>
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-500" /> จดบันทึกวัสดุอุปกรณ์
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    ลิสต์รายการสิ่งของที่คุณต้องเตรียมมาให้หมด เพื่อที่ก้าวหน้าเราจะเริ่มเขียนขั้นตอน "วิธีทำ" กันแล้ว!
                </p>
                <div className="flex gap-4">
                    <div className="flex-1 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-center">
                        ตัวอย่าง: บีกเกอร์ 50ml, ขวดยาหม่องที่ล้างแล้ว...
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectTopic10;
