import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { IS_CONFIG } from '../content';
import { ICONS, CheckIcon, ChevronRightIcon, ArrowLeftIcon } from '../ui/icons';
import { useFirestoreData } from '../hooks/useFirestore';
import { trackEvent } from '../services/analyticsService';

export const ISPage = () => {
    const { isKey } = useParams<{ isKey: string }>();
    const navigate = useNavigate();
    const config = IS_CONFIG[isKey as keyof typeof IS_CONFIG];
    
    const { data: progressData } = useFirestoreData('user_progress', 'main', { 
        visited_is1: [],
        visited_is2: [],
        visited_is3: []
    });
    
    // @ts-ignore
    const visitedTopics = progressData[`visited_${isKey}`] || [];
    const totalTopics = config && 'topics' in config ? config.topics.length : 0;
    const progress = totalTopics > 0 ? (visitedTopics.length / totalTopics) * 100 : 0;

    useEffect(() => {
        if (config && !('topics' in config)) {
            navigate('/menu');
        }
    }, [config, navigate]);

    if (!config) {
        return <div className="text-center p-8">ไม่พบรายวิชาที่ต้องการ</div>;
    }

    if (!('topics' in config)) {
        return null;
    }

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="py-6 md:py-8 px-4 md:px-0"
        >
            <div className="mb-6 md:mb-8">
                <button onClick={() => navigate('/menu')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-medium text-sm md:text-base">
                    <ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5"/>
                    กลับหน้าหลัก
                </button>
            </div>

            <div className="text-center mb-8 md:mb-12 relative">
                {/* Decorative background elements */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br ${config.color} opacity-10 dark:opacity-20 rounded-full blur-3xl -z-10`} />
                
                <div className={`inline-flex p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] bg-gradient-to-br ${config.color} text-white mb-4 md:mb-6 shadow-lg transform hover:scale-110 hover:rotate-3 transition-all duration-300 relative`}>
                    {/* @ts-ignore */}
                    {ICONS[config.icon] && React.createElement(ICONS[config.icon], { className: "h-8 w-8 md:h-12 md:w-12" })}
                    <span className="absolute -top-2 -right-2 md:-top-3 md:-right-3 text-xl md:text-2xl animate-bounce">✨</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight">{config.title}</h2>
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-3 md:mt-4 max-w-2xl mx-auto font-medium">{config.subtitle}</p>
            </div>

            <div className="max-w-3xl mx-auto mb-8 md:mb-10">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">ความคืบหน้า</span>
                    <span className="text-xs md:text-sm font-medium text-sky-600 dark:text-sky-400">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-1.5 md:h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-sky-500"
                    />
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border-2 border-slate-100 dark:border-slate-700 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-sky-400 to-indigo-400 opacity-10 dark:opacity-20 rounded-bl-full -mr-8 -mt-8" />
                    
                    <div className="p-5 md:p-8 border-b-2 border-slate-100 dark:border-slate-700/50 bg-sky-50/50 dark:bg-slate-800/50 relative z-10">
                        <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-100">เนื้อหาบทเรียน</h3>
                        <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">ศึกษาตามลำดับขั้นตอนเพื่อความเข้าใจที่ครบถ้วน</p>
                    </div>
                    <div className="divide-y-2 divide-slate-50 dark:divide-slate-700/30 relative z-10">
                        {config.topics.map((topic, index) => {
                            const isVisited = visitedTopics.includes(index);
                             // @ts-ignore
                            const Icon = ICONS[config.icon] || CheckIcon;
                            return (
                                <Link 
                                    to={`/student/${isKey}/${index}`} 
                                    key={index} 
                                    className="group flex items-center justify-between p-4 md:p-6 hover:bg-sky-50 dark:hover:bg-slate-700/30 transition-colors duration-200"
                                    onClick={() => {
                                        trackEvent('select_topic', {
                                            is_key: isKey,
                                            topic_index: index,
                                            topic_title: topic.title,
                                        });
                                    }}
                                >
                                    <div className="flex items-center gap-3 md:gap-5">
                                        <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-[1rem] flex items-center justify-center text-sm md:text-base font-bold transition-all transform group-hover:scale-110 group-hover:rotate-3 ${
                                            isVisited 
                                                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 shadow-sm' 
                                                : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400 group-hover:bg-sky-100 group-hover:text-sky-600 dark:group-hover:bg-sky-900/40 dark:group-hover:text-sky-400 shadow-sm'
                                        }`}>
                                            {isVisited ? <CheckIcon className="w-5 h-5 md:w-6 md:h-6" /> : index + 1}
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-base md:text-lg transition-colors ${
                                                isVisited ? 'text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400'
                                            }`}>{topic.title}</h4>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-transparent group-hover:bg-white dark:group-hover:bg-slate-800 shadow-none group-hover:shadow-sm transition-all flex-shrink-0 ml-2">
                                        <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-sky-500 transform group-hover:translate-x-1 transition-all" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
