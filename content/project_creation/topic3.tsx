import React from 'react';
import { useProjectData } from '../../hooks/useProjectData';
import Topic3DataCollectionFlow from '../../components/Topic3DataCollectionFlow';
import { CheckCircle, Info, BookOpen, Globe } from 'lucide-react';

const ProjectTopic3 = () => {
    const { projectTitle, researchData, setResearchData } = useProjectData();

    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">ก้าวที่ 3: แหล่งขุมทรัพย์ข้อมูล 🕒</h3>
            
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="text-lg">
                    โครงงานที่น่าเชื่อถือ ต้องมี <strong>"ข้อมูลสนับสนุน"</strong> ที่ถูกต้องนะจ๊ะ เหมือนนักสืบที่ต้องมีหลักฐานมัดตัวคนร้ายนั่นเอง! 🔍
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
                        <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                            <BookOpen className="w-6 h-6 flex items-center justify-center bg-amber-500 text-white rounded-full p-1" />
                            งานวิจัยของรุ่นพี่
                        </h4>
                        <p className="text-sm text-amber-700/80 dark:text-amber-400/80">
                            ลองดูว่ามีใครเคยทำเรื่องคล้ายๆ เราไหม ในเว็บไซต์รวมงานวิจัยต่างๆ จ้า
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <a href="https://tci-thailand.org/" target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700 rounded text-amber-600 hover:bg-amber-50 transition-colors">ThaiJO</a>
                            <a href="https://scholar.google.co.th/" target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700 rounded text-amber-600 hover:bg-amber-50 transition-colors">Google Scholar</a>
                        </div>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                            <BookOpen className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full p-1" />
                            หนังสือในห้องสมุด
                        </h4>
                        <p className="text-sm text-blue-700/80 dark:text-blue-400/80">
                            ค้นหาความรู้พื้นฐานจากหนังสือเรียนหรือสารานุกรมที่เกี่ยวข้องกับเรื่องที่เราทำนะ
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <a href="https://www.nlt.go.th/" target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700 rounded text-blue-600 hover:bg-blue-50 transition-colors">หอสมุดแห่งชาติ</a>
                        </div>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                        <h4 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
                            <Globe className="w-6 h-6 flex items-center justify-center bg-indigo-500 text-white rounded-full p-1" />
                            เว็บหน่วยงานรัฐ
                        </h4>
                        <p className="text-sm text-indigo-700/80 dark:text-indigo-400/80">
                            ใช้ข้อมูลจากเว็บทางการที่มีความน่าเชื่อถือสูง เช่น เว็บไซต์กระทรวงต่างๆ จ้า
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <a href="https://www.nso.go.th/" target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 rounded text-indigo-600 hover:bg-indigo-50 transition-colors">สถิติจังหวัด/ชาติ</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t border-slate-200 dark:border-slate-700 pt-8">
                <h4 className="font-semibold text-xl mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <Info className="w-6 h-6 text-sky-500" />
                    เริ่มเก็บสะสมข้อมูลกัน!
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    ใส่ข้อมูลที่น้องๆ หามาได้ในแต่ละส่วน เพื่อให้พี่ AI ช่วยสรุปเป็น <strong>"คลังความรู้"</strong> ให้จ้า
                </p>
                <Topic3DataCollectionFlow projectTitle={projectTitle} setResearchData={setResearchData} />
            </div>

            <div className="mt-10 border-t border-slate-200 dark:border-slate-700 pt-8">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-6 shadow-sm">
                    <h4 className="font-semibold text-xl mb-2 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6" />
                        คลังความรู้ของน้องๆ (Standard Reference Repository)
                    </h4>
                    <p className="text-emerald-700/80 dark:text-emerald-400/80 mb-4 text-sm">
                        ข้อมูลที่จดไว้ที่นี่จะถูกนำไปใช้เขียน <strong>บทที่ 2 (เอกสารที่เกี่ยวข้อง)</strong> ในขั้นตอนต่อไปนะจ๊ะ
                    </p>
                    <textarea
                        value={researchData}
                        onChange={(e) => setResearchData(e.target.value)}
                        placeholder="สรุปข้อมูลที่หามาได้จะปรากฏที่นี่จ้า..."
                        rows={10}
                        className="w-full p-4 rounded-xl border border-emerald-200 dark:border-emerald-700/50 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-y font-mono text-sm"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectTopic3;
