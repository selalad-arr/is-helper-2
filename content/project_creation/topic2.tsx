import React from 'react';
import Topic2CardFlow from '../../components/Topic2CardFlow';
import { useProjectData } from '../../hooks/useProjectData';
import { CheckCircle } from 'lucide-react';

const ProjectTopic2 = () => {
    const { projectTitle, coreConcept, setCoreConcept } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 2: ปัญหาที่อยากแก้ 🎯</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="text-lg">
                    ในขั้นตอนนี้ เราจะมาสวมบทเป็น <strong>"นักสืบ"</strong> เพื่อหาว่ามีปัญหาอะไรบ้างที่น้องๆ อยากจะแก้ไข หรืออยากทำให้มันดีขึ้นกว่าเดิมครับ 🔍
                </p>
                <p>
                    โครงงานที่เจ๋งที่สุด มักจะเริ่มจากการสังเกตสิ่งรอบตัว แล้วพบว่ามีบางอย่างที่ "ไม่โอเค" หรือ "น่าจะทำได้ดีกว่านี้" นั่นเอง!
                </p>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl border border-amber-100 dark:border-amber-800 mt-6">
                    <h4 className="font-semibold text-lg text-amber-900 dark:text-amber-300 mb-3">วิธีเล่าปัญหาให้น่าสนใจ</h4>
                    <ul className="space-y-3">
                        <li className="flex gap-2">
                            <span className="text-amber-500 font-bold">1.</span>
                            <span><strong>เล่าจากเรื่องจริง:</strong> บอกเล่าสิ่งที่น้องๆ เจอมากับตัวเลยว่าปัญหานี้มันกวนใจยังไงบ้าง</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-amber-500 font-bold">2.</span>
                            <span><strong>ข้อมูลที่ไปสืบมา:</strong> บอกข้อมูลที่น้องๆ ไปค้นหามาเพิ่ม ว่าคนอื่นเขาเจอเหมือนเราไหม หรือมีตัวเลขอะไรที่น่าสนใจบ้าง</span>
                        </li>
                    </ul>
                </div>

                <h4 className="font-semibold text-lg !mt-8 text-slate-800 dark:text-slate-100">ตัวอย่างการเล่าเรื่องแบบนักสืบ</h4>
                
                <div className="my-4 p-5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
                    <p className="text-slate-700 dark:text-slate-300 italic">
                       "หนูสังเกตว่าที่โรงเรียนมีขยะขวดน้ำเยอะมาก เพราะเพื่อนๆ กินน้ำไม่หมดแล้วทิ้งเลย หนูอยากหาวิธีให้เพื่อนๆ หันมาพกกระติกน้ำแทน หนูไปสืบมาพบว่าโรงเรียนเราทิ้งขวดพลาสติกวันละตั้ง 500 ขวดแน่ะ และขยะพวกนี้ใช้เวลาย่อยสลายนานกว่า 450 ปีเลยนะ!"
                    </p>
                </div>
            </div>
            
            <div className="mt-10 border-t border-slate-200 dark:border-slate-700 pt-8">
                <h4 className="font-semibold text-xl mb-4 text-slate-800 dark:text-slate-100">🤖 ให้พี่ AI ช่วยวิเคราะห์ปัญหา</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    ลองเล่าปัญหาที่น้องๆ เจอให้พี่ AI ฟังหน่อยนะ เดี๋ยวพี่จะช่วยหาทางออกและร่างแนวทางแก้ปัญหาให้จ้า
                </p>
                <Topic2CardFlow projectTitle={projectTitle} setCoreConcept={setCoreConcept} />
            </div>

            <div className="mt-10 border-t border-slate-200 dark:border-slate-700 pt-8">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-6">
                    <h4 className="font-semibold text-xl mb-2 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6" />
                        บันทึกหัวใจของโครงงาน
                    </h4>
                    <p className="text-emerald-700 dark:text-emerald-400 mb-4 text-sm">
                        นำสิ่งที่พี่ AI สรุปให้ หรือที่น้องๆ สรุปเองมาจดไว้ที่นี่นะ โดยเน้น 2 ส่วนคือ <strong>เรื่องจริงที่เจอ</strong> และ <strong>ข้อมูลที่ไปสืบมา</strong> จ้า
                    </p>
                    <textarea
                        value={coreConcept}
                        onChange={(e) => setCoreConcept(e.target.value)}
                        placeholder="ตัวอย่างการจด:&#10;1. เรื่องจริงที่เจอ: เพื่อนๆ ทิ้งขยะไม่ลงถังเพราะถังขยะอยู่ไกล...&#10;2. ข้อมูลที่ไปสืบมา: สถิติขยะในโรงเรียนเพิ่มขึ้นเยอะมาก...&#10;3. แนวทางแก้ไข: ถ้าเราทำถังขยะที่สนุกขึ้น... เพื่อนๆ ก็น่าจะอยากทิ้งขยะมากขึ้น..."
                        rows={8}
                        className="w-full p-4 rounded-lg border border-emerald-200 dark:border-emerald-700/50 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow resize-y"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectTopic2;
