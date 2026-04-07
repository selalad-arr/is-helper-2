import React from 'react';
import Topic1CardFlow from '../../components/Topic1CardFlow';
import { useProjectData } from '../../hooks/useProjectData';

const Topic1Shared = () => {
    const { is1ProjectTitle, setIs1ProjectTitle } = useProjectData();

    return (
        <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ที่มาของโครงงานและแหล่ง IDEA</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p>
                    สิ่งที่ควรจะเป็นที่มาของโครงงานคือต้องเป็นงานที่ผู้จัดทำโครงงานอยากทำและนึกถึงตลอดเวลาว่า อยากจะแก้ไข แต่หาทางออกไม่ได้ หาข้อมูลที่ใช้แก้ปัญหาไม่เจอ ไม่เคยมีใครทำมาก่อน ถึงจะเป็นโครงงานที่ดี แต่จากประสบการณ์ที่ผ่านมาพบว่าอาจารย์ที่ปรึกษาโครงงานหลายๆท่านไม่ได้ใส่ใจในเรื่องนี้จึงทำให้โครงงาน ที่นักเรียนทำออกมาเป็นการทำเพื่อเอาคะแนนและผลการศึกษาเท่านั้น ไม่ได้เป็นโครงงานที่พัฒนาความสามารถของนักเรียนเท่าที่ควร จนในบางครั้งนักเรียนอาจจะเอาโครงงานที่มาจาก Internet มาส่ง ซึ่งไม่เป็นผลดีกับทั้งนักเรียนและอาจารย์ที่ปรึกษาโครงงาน
                </p>
                <p>
                    คำถามที่สำคัญจึงเป็นคำว่า <strong>“ทำไมนักเรียนถึงอยากทำโครงงานนี้”</strong> ซึ่งแนวทางการตอบของนักเรียนส่วนใหญ่มี 2 แนวคือ <strong>การตอบตามหลักการ</strong> เช่น ทำไมนักเรียนถึงอยากทำที่บีบอัดขวดพลาสติก แนวคำตอบที่ได้คือ ทำเพื่อรักษ์โลก ลดขยะในโรงเรียน หรือช่วยรักษาสิ่งแวดล้อม ซึ่งการตอบตามหลักการจะบ่งบอกถึงความต้องการในการทำโครงงานที่น้อย และอีกแนวทางหนึ่งคือ<strong>การตอบโดยการเล่าเรื่องที่นักเรียนสัมผัสมา</strong>
                </p>
                <p>
                     โดยจะมี 2 แนวทางการตอบอีกเช่นกันคือ <strong>การตอบเรื่องจริงที่สัมผัสด้วยตนเอง</strong> เช่น หากถามด้วยคำถามเดิม แนวการตอบคือนักเรียนจะเล่าเรื่องที่เป็นชีวิตประจำวันเช่น “มีนักเรียนในกลุ่มทำโครงการธนาคารขยะกับอาจารย์อีกท่านอยู่แล้วอยากแก้ปัญหาจึงนำปัญหานี้มาเป็นโครงงาน” ซึ่งถือว่าเป็นที่มาที่ดีเพราะนักเรียนได้นำโครงงานไปใช้จริง และอีกแนวทางการตอบคือ <strong>การตอบจากข้อมูลที่ได้ไปสืบค้นมา</strong> กล่าวคือนักเรียนได้ไปค้นคว้าหาข้อมูลมาตอบด้วยตัวเองแล้วอยากจะทำโครงงานที่ไปหาข้อมูลมา โดยจะมีแนวทางการตอบคือ “จากข้อมูลที่พบในหนังสือ... นักเรียนอยากที่จะนำมาพัฒนาดัดแปลงเพื่อที่จะได้นำมาใช้จริง” โดยสรุปแนวทางการตอบได้ดังนี้
                </p>
            </div>

            <div className="my-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-slate-300 dark:border-slate-600">
                        <caption className="p-3 text-lg font-semibold text-left text-slate-900 bg-slate-100 dark:text-white dark:bg-slate-700">
                            ตัวอย่างคำถาม: ทำไมนักเรียนถึงอยากทำที่บีบอัดขวดพลาสติก
                        </caption>
                        <thead className="bg-slate-200 dark:bg-slate-800">
                            <tr>
                                <th className="p-3 border border-slate-300 dark:border-slate-600">แนวทางการตอบ</th>
                                <th className="p-3 border border-slate-300 dark:border-slate-600">ตัวอย่างการตอบ</th>
                                <th className="p-3 border border-slate-300 dark:border-slate-600">ระดับการตอบ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white dark:bg-slate-800/50">
                                <td className="p-3 border border-slate-300 dark:border-slate-600">การตอบตามหลักการ</td>
                                <td className="p-3 border border-slate-300 dark:border-slate-600">ทำเพื่อรักษ์โลก ลดขยะในโรงเรียน หรือช่วยรักษาสิ่งแวดล้อม</td>
                                <td className="p-3 border border-slate-300 dark:border-slate-600 font-semibold text-red-600 dark:text-red-400">ไม่ดี</td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800">
                                <td className="p-3 border border-slate-300 dark:border-slate-600">การตอบโดยการเล่าเรื่อง (เรื่องจริงที่สัมผัสด้วยตนเอง)</td>
                                <td className="p-3 border border-slate-300 dark:border-slate-600">นักเรียนจะเล่าเรื่องที่เป็นชีวิตประจำวัน</td>
                                <td className="p-3 border border-slate-300 dark:border-slate-600 font-semibold text-yellow-600 dark:text-yellow-400">ดี</td>
                            </tr>
                            <tr className="bg-white dark:bg-slate-800/50">
                                <td className="p-3 border border-slate-300 dark:border-slate-600">การตอบโดยการเล่าเรื่อง (จากข้อมูลที่ได้ไปสืบค้นมา)</td>
                                <td className="p-3 border border-slate-300 dark:border-slate-600">นักเรียนมีข้อมูลที่แน่น ตอบหลักการของโครงงานตัวเองได้</td>
                                <td className="p-3 border border-slate-300 dark:border-slate-600 font-semibold text-green-600 dark:text-green-400">ดีมาก</td>
                            </tr>
                        </tbody>
                    </table>
                     <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">ตารางที่ 2.1 แสดงตัวอย่างในการตอบคำถามที่ดีของนักเรียน</p>
                </div>
            </div>

            <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
                <h4 className="font-semibold text-xl mb-3 text-slate-800 dark:text-slate-100">แบบฝึกหัด: ค้นหาหัวข้อกับ AI</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    มาลองใช้ AI ผู้ช่วยในการค้นหาและพัฒนาแนวคิดโครงงานของคุณกันเถอะ! AI จะถามคำถามเพื่อนำทางคุณไปสู่หัวข้อโครงงานที่น่าสนใจและทำได้จริง
                </p>
                <Topic1CardFlow projectTitle={is1ProjectTitle} setProjectTitle={setIs1ProjectTitle} />
            </div>
        </div>
    );
};

export default Topic1Shared;
