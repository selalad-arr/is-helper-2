import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LESSON_PLANS } from '../content/lesson_plans';
import { IS_CONFIG } from '../content';

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

const LessonPlanPage: React.FC = () => {
    const { isKey, topicIndex } = useParams<{ isKey: string; topicIndex: string }>();
    const navigate = useNavigate();

    // Type guard to ensure isKey is valid and has topics
    if (!isKey || !topicIndex || !(isKey in IS_CONFIG) || !('topics' in IS_CONFIG[isKey as keyof typeof IS_CONFIG])) {
         return <div className="text-center p-8 text-red-500">Error: Invalid subject key or configuration.</div>;
    }
    
    const config = IS_CONFIG[isKey as 'is1' | 'is2']; // Assuming only is1 and is2 have plans
    const topic = config.topics[parseInt(topicIndex, 10)];

    // Type guard for lesson plan components
    const lessonPlanIsKey = isKey as 'is1' | 'is2';
    const lessonPlanTopicIndex = topicIndex as any;

    if (!isKey || !topicIndex || !(lessonPlanIsKey in LESSON_PLANS) || !(lessonPlanTopicIndex in LESSON_PLANS[lessonPlanIsKey])) {
        return <div className="text-center p-8">ไม่พบแผนการสอนสำหรับหัวข้อนี้</div>;
    }
    
    const PlanComponent = LESSON_PLANS[lessonPlanIsKey][lessonPlanTopicIndex];

    if (!PlanComponent || !topic) {
        return <div className="text-center p-8">ไม่พบแผนการสอน</div>;
    }

    return (
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-6 md:py-8 px-4 md:px-0"
        >
             <div className="mb-6 md:mb-8">
                <button 
                    onClick={() => navigate(`/student/${isKey}/${topicIndex}`)} 
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-medium text-sm md:text-base"
                >
                    <ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5"/>
                    กลับไปที่เนื้อหาบทเรียน
                </button>
            </div>
             <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6 md:p-10 text-base md:text-lg text-slate-700 dark:text-slate-300 space-y-4 md:space-y-6 leading-relaxed prose prose-slate dark:prose-invert max-w-none">
                    <PlanComponent />
                </div>
             </div>
        </motion.div>
    );
};

export default LessonPlanPage;
