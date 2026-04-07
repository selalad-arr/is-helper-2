import React, { useState } from 'react';
import Topic1CardFlow from '../../components/Topic1CardFlow';
import { IdeaMixer } from '../../components/IdeaMixer';
import { useProjectData } from '../../hooks/useProjectData';
import { CheckCircle, Info } from 'lucide-react';

const ProjectTopic1 = () => {
    const { 
        projectTitle, setProjectTitle
    } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 1: ค้นหาไอเดียสุดเจ๋ง! 💡</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="text-lg">
                    การทำโครงงานที่ดี เริ่มจาก <strong>"สิ่งที่เราชอบ"</strong> หรือ <strong>"เรื่องที่เราสงสัย"</strong> ครับ ไม่จำเป็นต้องเป็นเรื่องยากๆ แค่เป็นเรื่องที่น้องๆ อยากรู้หรืออยากทำให้มันดีขึ้นก็พอแล้ว!
                </p>

                <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl border border-sky-100 dark:border-sky-800">
                    <h4 className="font-semibold text-sky-800 dark:text-sky-300 mb-2">คำถามชวนคิด: "ทำไมเราถึงอยากทำเรื่องนี้?"</h4>
                    <p>
                        เวลาคุณครูถาม ลองตอบจาก <strong>"เรื่องจริงที่น้องๆ เจอ"</strong> ดูนะครับ จะทำให้โครงงานดูน่าสนใจและมีเสน่ห์มากๆ เลยล่ะ
                    </p>
                </div>
            </div>

            <div className="my-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-slate-300 dark:border-slate-600 rounded-xl overflow-hidden">
                        <caption className="p-3 text-lg font-semibold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                            ตัวอย่าง: ถ้าเราอยากทำ "เครื่องบีบขวดพลาสติก"
                        </caption>
                        <thead className="bg-slate-200 dark:bg-slate-800">
                            <tr>
                                <th className="p-3 border border-slate-300 dark:border-slate-600">วิธีตอบ</th>
                                <th className="p-3 border border-slate-300 dark:border-slate-600">ตัวอย่างคำตอบ</th>
                                <th className="p-3 border border-slate-300 dark:border-slate-600">คะแนนความว้าว</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white dark:bg-slate-800/50">
                                <td className="p-3 border border-slate-300 dark:border-slate-600">ตอบแบบทั่วไป</td>
                                <td className="p-3 border border-slate-300 dark:border-slate-600">"ทำเพื่อช่วยลดขยะครับ"</td>
                                <td className="p-3 border border-slate-300 dark:border-slate-600 font-semibold text-red-500 dark:text-red-400">⭐ พอใช้ได้นะ</td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800">
                                <td className="p-3 border border-slate-300 dark:border-slate-600">ตอบจากเรื่องที่เจอจริง</td>
                                <td className="p-3 border border-slate-300 dark:border-slate-600">"เห็นถังขยะที่โรงเรียนเต็มเร็วมาก เพราะขวดน้ำไม่ได้บีบ เลยอยากทำเครื่องนี้มาช่วยครับ"</td>
                                <td className="p-3 border border-slate-300 dark:border-slate-600 font-semibold text-yellow-600 dark:text-yellow-400">⭐⭐⭐ น่าสนใจจัง!</td>
                            </tr>
                            <tr className="bg-white dark:bg-slate-800/50">
                                <td className="p-3 border border-slate-300 dark:border-slate-600">ตอบจากเรื่องจริง + ข้อมูลที่หามา</td>
                                <td className="p-3 border border-slate-300 dark:border-slate-600">"เห็นขยะล้นถัง และไปค้นเจอวิธีบีบขวดง่ายๆ เลยอยากลองทำมาให้เพื่อนๆ ใช้จริงครับ"</td>
                                <td className="p-3 border border-slate-300 dark:border-slate-600 font-semibold text-green-600 dark:text-green-400">⭐⭐⭐⭐⭐ สุดยอดไปเลย!</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
                <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">🧪 มาลองผสมไอเดียกัน!</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    ก่อนจะไปคุยกับพี่ AI ลองใช้ <strong>"เครื่องผสมไอเดีย"</strong> ด้านล่างนี้ เพื่อหาจุดเริ่มต้นสนุกๆ จากสิ่งที่เราชอบดูก่อนนะ
                </p>
                <IdeaMixer />
            </div>

            <div className="mt-10 border-t border-slate-200 dark:border-slate-700 pt-8">
                <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800/50 rounded-xl p-6">
                    <h4 className="font-semibold text-xl mb-2 text-sky-800 dark:text-sky-300 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6" />
                        ตั้งชื่อโครงงานสุดเท่
                    </h4>
                    <p className="text-sky-700 dark:text-sky-400 mb-4 text-sm">
                        เมื่อได้ไอเดียที่ชอบแล้ว พิมพ์ชื่อโครงงานไว้ที่นี่นะ เพื่อให้พี่ AI จำชื่อโครงงานของน้องๆ ได้จ้า
                    </p>
                    <input
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="เช่น เครื่องบีบขวดพลาสติกจอมพลัง..."
                        className="w-full p-4 rounded-lg border border-sky-200 dark:border-sky-700/50 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow text-lg font-medium"
                    />
                </div>
            </div>

        </div>
    );
};

export default ProjectTopic1;
