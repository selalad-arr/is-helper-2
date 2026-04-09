import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { IS_CONFIG } from '../content';
import { ArrowLeftIcon, DocumentTextIcon } from '../ui/icons';
import { useFirestoreData } from '../hooks/useFirestore';
import { ReactionSystem } from '../components/ReactionSystem';

export const TopicPage = () => {
    const { isKey, topicIndex } = useParams<{ isKey: string; topicIndex: string }>();
    const navigate = useNavigate();
    
    const { data: progressData, updateData: updateProgressData } = useFirestoreData('user_progress', 'main', { 
        visited_is1: [],
        visited_is2: [],
        visited_is3: []
    });
    
    const config = IS_CONFIG[isKey as keyof typeof IS_CONFIG];

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (config && 'topics' in config) {
            // @ts-ignore
            const visitedTopics = progressData[`visited_${isKey}`] || [];
            const totalTopics = config.topics.length;
            const currentProgress = totalTopics > 0 ? (visitedTopics.length / totalTopics) * 100 : 0;
            setProgress(currentProgress);
        }
    }, [config, isKey, progressData]);

    useEffect(() => {
        if (!config || !('topics' in config)) {
            navigate('/menu');
        }
    }, [config, navigate]);

    if (!config || !('topics' in config)) {
        return null;
    }
    
    const topicIndexNum = parseInt(topicIndex || '0', 10);
    const topic = config.topics[topicIndexNum];

    if (!topic) {
        return <div className="text-center p-8">ไม่พบหัวข้อที่ต้องการ</div>;
    }
    
    const DetailsComponent = topic.details as React.ElementType;

    let lessonPlanLink = null;
    if (isKey === 'is1' || isKey === 'is2') {
        let fullLinkText = `แผนการจัดการเรียนการสอน เรื่อง ${topic.title}`;
        let shortLinkText = 'แผนการสอน';
        const chapterMatch = topic.title.match(/บทที่ (\d+): (.*)/);

        if (chapterMatch) {
            const chapterNumber = chapterMatch[1];
            const chapterName = chapterMatch[2];
            fullLinkText = `แผนการจัดการเรียนการสอน บทที่ ${chapterNumber} เรื่อง ${chapterName}`;
            shortLinkText = `แผนการสอน บทที่ ${chapterNumber}`;
        } else {
            const reviewMatch = topic.title.match(/บททบทวน: (.*)/);
            if (reviewMatch) {
                fullLinkText = `แผนการจัดการเรียนการสอน บททบทวน เรื่อง ${reviewMatch[1]}`;
                shortLinkText = `แผนการสอน (ทบทวน)`;
            }
        }
        
        lessonPlanLink = (
            <Link 
                to={`/student/lesson-plan/${isKey}/${topicIndexNum}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                title={fullLinkText}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700/50 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-sky-100 hover:text-sky-700 dark:hover:bg-sky-900/30 dark:hover:text-sky-400 transition-colors"
            >
                <DocumentTextIcon className="w-4 h-4" />
                <span>{shortLinkText}</span>
            </Link>
        );
    }

    const handleSaveProgress = () => {
        if (isKey && topicIndex) {
            // @ts-ignore
            const visited = progressData[`visited_${isKey}`] || [];
            if (!visited.includes(topicIndexNum)) {
                const newVisited = [...visited, topicIndexNum];
                updateProgressData({ [`visited_${isKey}`]: newVisited });
            }
        }
        navigate(`/student/${isKey}`);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-6 md:py-8 px-4 md:px-0"
        >
             <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <button onClick={() => navigate(`/student/${isKey}`)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-medium text-sm md:text-base">
                    <ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5"/>
                    กลับไปที่เนื้อหา
                </button>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-sky-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{Math.round(progress)}%</span>
                    </div>
                </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border-2 border-slate-100 dark:border-slate-700 overflow-hidden relative">
                     {/* Cute decorative elements */}
                     <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-sky-400 to-indigo-400 opacity-10 dark:opacity-20 rounded-bl-full -mr-8 -mt-8" />
                     
                     <div className="p-6 md:p-10 border-b-2 border-slate-100 dark:border-slate-700/50 bg-sky-50/50 dark:bg-slate-800/50 relative z-10">
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                             <div>
                                <p className="inline-block px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-3">หัวข้อที่ {topicIndexNum + 1}</p>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight flex items-center gap-2 md:gap-3 leading-tight">
                                    {topic.title}
                                    <span className="text-xl md:text-2xl animate-bounce flex-shrink-0">✨</span>
                                </h3>
                             </div>
                             {lessonPlanLink && <div className="mt-2 md:mt-0">{lessonPlanLink}</div>}
                         </div>
                     </div>
                     <div className="p-6 md:p-10 text-base md:text-lg text-slate-700 dark:text-slate-300 space-y-4 md:space-y-6 leading-relaxed prose prose-slate dark:prose-invert max-w-none relative z-10">
                        <DetailsComponent />
                     </div>
                     <div className="p-6 md:p-8 bg-sky-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
                        <ReactionSystem topicId={`${isKey}_${topicIndexNum}`} />
                        <button 
                            onClick={handleSaveProgress}
                            className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm md:text-base hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md"
                        >
                            บันทึกความก้าวหน้า
                        </button>
                     </div>
                </div>
            </div>
        </motion.div>
    );
};
