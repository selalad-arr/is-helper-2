import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { ICONS } from '../ui/icons';
import { IS_CONFIG } from '../content';
import { useFirestoreData } from '../hooks/useFirestore';

export const ProjectHub = () => {
    const navigate = useNavigate();
    const isKey = 'project_creation';
    const config = IS_CONFIG[isKey];
    
    const { data: progressData, updateData: updateProgressData } = useFirestoreData('user_progress', 'main', { 
        visited_project_creation: [],
        activeScenario: null as string | null
    });
    
    // @ts-ignore
    const visitedTopics = progressData[`visited_${isKey}`] || [];
    
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        // Show onboarding if no topics visited
        if (visitedTopics.length === 0) {
            setShowOnboarding(true);
        }
    }, [visitedTopics.length]);

    const zones = [
        {
            id: 'zone1',
            title: '1. เข็มทิศไอเดีย',
            subtitle: 'ค้นหาหัวข้อและบทนำ (บทที่ 1)',
            icon: 'LightBulbIcon',
            color: 'from-amber-400 to-orange-500',
            topics: [0, 1, 2, 3, 4, 5],
            description: 'สำหรับนักเรียนที่ยังไม่มีหัวข้อ หรือต้องการเกลาไอเดียให้คมชัด'
        },
        {
            id: 'zone2',
            title: '2. ห้องสมุดแห่งความรู้',
            subtitle: 'ทฤษฎีและงานวิจัยที่เกี่ยวข้อง (บทที่ 2)',
            icon: 'BookOpenIcon',
            color: 'from-emerald-400 to-teal-500',
            topics: [6, 7],
            description: 'คลังรวบรวมทฤษฎีอ้างอิงเพื่อสนับสนุนโครงงาน'
        },
        {
            id: 'zone3',
            title: '3. ห้องทดลอง & ผลลัพธ์',
            subtitle: 'วิธีดำเนินงานและผล (บท 3-4)',
            icon: 'BeakerIcon',
            color: 'from-violet-400 to-fuchsia-500',
            topics: [8, 9, 10, 11, 12, 13],
            description: 'ลงมือปฏิบัติ เก็บข้อมูลทดลอง และบันทึกผลทางวิทยาศาสตร์'
        },
        {
            id: 'zone4',
            title: '4. โรงพิมพ์รูปเล่ม',
            subtitle: 'สรุปผลและรายงานสมบูรณ์ (บท 5)',
            icon: 'CheckCircleIcon',
            color: 'from-blue-400 to-indigo-500',
            topics: [14, 15, 16],
            description: 'เตรียมตัวประเมินผล จัดหน้ากระดาษ และส่งพิมพ์รายงาน'
        }
    ];

    const handleSelectPath = async (path: 'lost' | 'maker' | 'perfect' | 'rusher') => {
        setShowOnboarding(false);
        await updateProgressData({ activeScenario: path });
        
        if (path === 'lost') navigate('/student/project_creation/0');
        if (path === 'maker') navigate('/student/project_creation/10'); // ก้าว 11 Method
        if (path === 'perfect') navigate('/student/project_creation/4'); // ก้าว 5 Intro (Start sequence)
        if (path === 'rusher') navigate('/student/project_creation/10'); // ก้าว 11 ด่วน
    };

    return (
        <div className="py-6 md:py-8 px-4 md:px-0 relative">
            <div className="mb-6 md:mb-8">
                <button onClick={() => navigate('/student/dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-medium text-sm md:text-base">
                    <ICONS.ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5"/>
                    กลับหน้าหลัก
                </button>
            </div>

            <div className="text-center mb-10 relative">
                <div className="inline-flex p-4 rounded-[1.5rem] bg-gradient-to-br from-sky-400 to-indigo-500 text-white mb-4 shadow-lg">
                    <ICONS.RocketLaunchIcon className="w-10 h-10" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight">Project Dashboard</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-3 font-medium">แผงควบคุมโครงงาน เลือกโซนที่ต้องการดำเนินการได้ตามใจชอบ ไม่ต้องรอทำเรียงลำดับ!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {zones.map(zone => {
                    // @ts-ignore
                    const Icon = ICONS[zone.icon] || ICONS.CheckCircleIcon;
                    const completedInZone = zone.topics.filter(t => visitedTopics.includes(t)).length;
                    const progress = (completedInZone / zone.topics.length) * 100;

                    return (
                        <div key={zone.id} className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden group">
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${zone.color} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-125`} />
                            
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${zone.color} text-white shadow-lg`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">ดำเนินการแล้ว</span>
                                    <div className="text-xl font-black text-slate-800 dark:text-white">{Math.round(progress)}%</div>
                                </div>
                            </div>
                            
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-1 relative z-10">{zone.title}</h3>
                            <p className="text-sky-600 dark:text-sky-400 font-bold text-sm mb-4 relative z-10">{zone.subtitle}</p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 relative z-10 leading-relaxed min-h-[40px]">{zone.description}</p>
                            
                            <div className="space-y-3 relative z-10">
                                {zone.topics.map(tIdx => {
                                    // @ts-ignore
                                    const topic = config.topics[tIdx];
                                    if (!topic) return null;
                                    const isVisited = visitedTopics.includes(tIdx);
                                    
                                    return (
                                        <Link 
                                            key={tIdx}
                                            to={`/student/${isKey}/${tIdx}`}
                                            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                                                isVisited 
                                                ? 'bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100' 
                                                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-sky-400 hover:shadow-md'
                                            }`}
                                        >
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                                                isVisited 
                                                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                                                : 'bg-slate-100 text-slate-500 dark:bg-slate-700'
                                            }`}>
                                                {isVisited ? <ICONS.CheckIcon className="w-4 h-4"/> : tIdx + 1}
                                            </div>
                                            <span className={`font-medium text-sm line-clamp-1 flex-grow ${isVisited ? 'text-slate-500 dark:text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                                                {topic.title}
                                            </span>
                                            <ICONS.ChevronRightIcon className="w-4 h-4 text-slate-400" />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* AI Onboarding Modal */}
            <AnimatePresence>
                {showOnboarding && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-10 rounded-bl-full -mr-20 -mt-20" />
                            
                            <div className="relative z-10 text-center mb-8">
                                <div className="inline-flex p-4 rounded-3xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 mb-4">
                                    <ICONS.SparklesIcon className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-2">เริ่มโครงงานสไตล์คุณ!</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">บอกสถานการณ์ปัจจุบันของคุณ เพื่อให้ AI แนะนำโซนที่เหมาะสมที่สุด</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                <button onClick={() => handleSelectPath('lost')} className="text-left p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-700 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all group">
                                    <div className="text-amber-500 mb-2"><ICONS.QuestionMarkCircleIcon className="w-8 h-8" /></div>
                                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">นักเรียนผู้หลงทาง</h4>
                                    <p className="text-xs text-slate-500">"หัวโล่งมาก ไม่มีไอเดียเลย พาหาไอเดียหน่อย"</p>
                                </button>
                                
                                <button onClick={() => handleSelectPath('maker')} className="text-left p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-700 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all group">
                                    <div className="text-violet-500 mb-2"><ICONS.BeakerIcon className="w-8 h-8" /></div>
                                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">นักปฏิบัติมือฉมัง</h4>
                                    <p className="text-xs text-slate-500">"ทดลองเสร็จแล้วล่ะ พาเขียนผลกับวิธีทำหน่อย"</p>
                                </button>

                                <button onClick={() => handleSelectPath('perfect')} className="text-left p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-700 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all group">
                                    <div className="text-emerald-500 mb-2"><ICONS.ShieldCheckIcon className="w-8 h-8" /></div>
                                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">ความเนี๊ยบคือที่หนึ่ง</h4>
                                    <p className="text-xs text-slate-500">"โครงงานเกือบเสร็จแล้ว ขอตรวจทานให้เป๊ะที่สุด"</p>
                                </button>

                                <button onClick={() => handleSelectPath('rusher')} className="text-left p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-700 hover:border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all group">
                                    <div className="text-rose-500 mb-2"><ICONS.BoltIcon className="w-8 h-8" /></div>
                                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">สายปั่น (พรุ่งนี้ส่ง!)</h4>
                                    <p className="text-xs text-slate-500">"ไม่มีเวลาแล้ว รีบพาไปหน้าพิมพ์รายงานเลยด่วน!"</p>
                                </button>
                            </div>

                            <div className="mt-8 text-center relative z-10">
                                <button onClick={() => setShowOnboarding(false)} className="text-sm font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                    ข้ามหน้านี้ (เลือกโซนเอง)
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

export default ProjectHub;
