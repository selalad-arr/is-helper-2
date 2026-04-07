import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { IS_CONFIG } from './content';
import { ICONS, Cog6ToothIcon, ChevronRightIcon, DocumentTextIcon, CheckIcon, HomeIcon, QuestionMarkCircleIcon } from './ui/icons';
import { ThemeProvider } from './contexts/ThemeContext';
import SettingsPage from './pages/SettingsPage';
import LessonPlanPage from './pages/LessonPlanPage';
import TutorialPage from './pages/TutorialPage';
import { TeacherDashboard } from './src/pages/TeacherDashboard';
import { AdminPanel } from './src/pages/AdminPanel';
import { StudentOnboarding } from './components/StudentOnboarding';
import { trackEvent } from './services/analyticsService';
import FloatingChatWidget from './components/FloatingChatWidget';
import { useAuth } from './src/contexts/AuthContext';
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { LoginModal } from './components/LoginModal';
import { useApiSettings } from './src/contexts/ApiSettingsContext';
import { ReactionSystem } from './components/ReactionSystem';


// --- Reusable Icon Components ---
const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

// --- Page Components ---

const Header = () => {
    const appUrl = window.location.origin;
    const { user, login, logout } = useAuth();
    const { useFreeQuota, quotaUsed, customApiKey } = useApiSettings();

    const handleShare = async () => {
        // Use the shared app URL if available, otherwise fallback to the current origin
        const shareUrl = import.meta.env.VITE_SHARED_APP_URL || window.location.origin;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'IS Helper - ผู้ช่วยทำโครงงาน',
                    text: 'มาลองใช้ IS Helper ผู้ช่วยทำโครงงาน IS ด้วย AI ที่จะทำให้การเรียนและการทำโครงงานของคุณง่ายขึ้น!',
                    url: shareUrl,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(`มาลองใช้ IS Helper ผู้ช่วยทำโครงงาน IS ด้วย AI ที่จะทำให้การเรียนของคุณง่ายขึ้น! ${shareUrl}`);
            alert('คัดลอกข้อความและลิงก์แอปแล้ว! คุณสามารถนำไปวางเพื่อส่งต่อให้เพื่อนได้เลย');
        }
    };

    return (
        <header className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200/50 dark:border-slate-800/50">
            <div className="container mx-auto flex items-center justify-between">
                 <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-sky-500/10 text-sky-600 dark:text-sky-400 p-2 rounded-xl group-hover:bg-sky-500/20 transition-colors">
                        <BookOpenIcon className="w-6 h-6" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300">
                        IS Helper
                    </h1>
                </Link>
                <div className="flex items-center gap-2">
                    {useFreeQuota && (
                        <div className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-lg text-xs font-medium border border-sky-200 dark:border-sky-800">
                            <span>โควต้าฟรี:</span>
                            <span className="font-bold">{Math.max(0, 3 - quotaUsed)}/3</span>
                        </div>
                    )}
                    {customApiKey && (
                        <div className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-medium border border-emerald-200 dark:border-emerald-800" title="ใช้ API Key ของคุณเอง">
                            <CheckIcon className="w-3 h-3" />
                            <span>API Key</span>
                        </div>
                    )}
                    {user ? (
                        <div className="flex items-center gap-2 mr-2 ml-2">
                            {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" referrerPolicy="no-referrer" />}
                            <button onClick={logout} className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                                ออกจากระบบ
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => login()} className="mr-2 ml-2 px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                            เข้าสู่ระบบ
                        </button>
                    )}
                    <Link to="/" title="หน้าแรก" className="hidden md:flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors font-bold text-sm">
                        <HomeIcon className="w-5 h-5" />
                        หน้าแรก
                    </Link>
                    <button 
                        onClick={handleShare}
                        title="แชร์แอป"
                        className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <ShareIcon className="w-6 h-6" />
                    </button>
                    <Link to="/settings" title="การตั้งค่า" className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <Cog6ToothIcon className="w-6 h-6"/>
                    </Link>
                </div>
            </div>
        </header>
    );
};

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
);

const BookOpenIcon = ICONS.BookOpenIcon;

const HomePage = () => {
    const { user, userData, joinClassroom } = useAuth();
    const [classCode, setClassCode] = useState('');
    const [isJoining, setIsJoining] = useState(false);
    const [joinError, setJoinError] = useState('');
    const [showJoinForm, setShowJoinForm] = useState(false);

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!classCode.trim()) return;
        setIsJoining(true);
        setJoinError('');
        try {
            await joinClassroom(classCode);
            setShowJoinForm(false);
            setClassCode('');
            alert('เข้าร่วมห้องเรียนสำเร็จ!');
        } catch (err: any) {
            setJoinError(err.message);
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-8 md:py-20"
        >
            <div className="text-center mb-10 md:mb-16 px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs md:text-sm font-semibold mb-4">
                        ยินดีต้อนรับสู่ IS Helper 👋 {userData?.displayName}
                    </span>
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tight">
                    เริ่มทำโครงงาน IS ง่ายๆ ด้วย AI 🚀
                </h2>

                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    เลือกเส้นทางที่คุณต้องการให้เราช่วย ไม่ว่าจะเป็นมือใหม่หัดทำ หรือทำตามรายวิชา IS1-IS3
                </p>

                {user && !userData?.classId && (
                    <div className="mt-8">
                        {!showJoinForm ? (
                            <button 
                                onClick={() => setShowJoinForm(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold rounded-2xl border-2 border-sky-200 dark:border-sky-900/30 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all shadow-sm"
                            >
                                <ICONS.UsersIcon className="w-5 h-5" />
                                เข้าร่วมห้องเรียนของครู
                            </button>
                        ) : (
                            <motion.form 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onSubmit={handleJoin}
                                className="max-w-sm mx-auto p-6 bg-white dark:bg-slate-800 rounded-[2rem] border-2 border-sky-200 dark:border-sky-900/30 shadow-lg"
                            >
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">กรอกรหัสห้องเรียน</h3>
                                <input 
                                    type="text"
                                    value={classCode}
                                    onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                                    placeholder="รหัส 6 หลัก"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-bold text-xl tracking-widest focus:ring-2 focus:ring-sky-500 outline-none mb-4"
                                    maxLength={6}
                                />
                                {joinError && <p className="text-red-500 text-xs mb-4">{joinError}</p>}
                                <div className="flex gap-2">
                                    <button 
                                        type="button"
                                        onClick={() => setShowJoinForm(false)}
                                        className="flex-1 py-2 text-slate-500 font-bold"
                                    >
                                        ยกเลิก
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={isJoining}
                                        className="flex-1 py-2 bg-sky-500 text-white font-bold rounded-xl shadow-md disabled:opacity-50"
                                    >
                                        {isJoining ? 'กำลังเข้าร่วม...' : 'เข้าร่วม'}
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </div>
                )}

                {userData?.classId && (
                    <div className="mt-8">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-bold border border-emerald-200 dark:border-emerald-800/50">
                            <ICONS.CheckIcon className="w-4 h-4" />
                            คุณอยู่ในห้องเรียนแล้ว
                        </span>
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-3xl mx-auto px-4">
                {Object.values(IS_CONFIG).map((is, idx) => {
                    const Icon = ICONS[is.icon];
                    return (
                        <motion.div
                            key={is.key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (idx + 1) }}
                        >
                            <Link 
                                to={is.path} 
                                className={`group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
                                onClick={() => {
                                    trackEvent('select_is_card', {
                                        card_key: is.key,
                                        card_title: is.title,
                                    });
                                }}
                            >
                                {/* Cute background blobs */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br ${is.color} opacity-10 dark:opacity-20 rounded-full blur-2xl transition-transform group-hover:scale-150 duration-500`} />
                                <div className={`absolute -bottom-10 -left-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-tr ${is.color} opacity-10 dark:opacity-20 rounded-full blur-2xl transition-transform group-hover:scale-150 duration-500`} />
                                
                                <div className={`relative z-10 inline-flex flex-shrink-0 p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] bg-gradient-to-br ${is.color} text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                    {Icon && <Icon className="h-8 w-8 md:h-10 md:w-10" />}
                                    <span className="absolute -top-2 -right-2 text-lg md:text-xl animate-bounce">✨</span>
                                </div>
                                
                                <div className="flex-grow relative z-10">
                                    <div className="flex flex-wrap items-center gap-2 mb-1 md:mb-2">
                                        <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{is.title}</h3>
                                        {is.key === 'project_creation' && (
                                            <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full border border-emerald-200 dark:border-emerald-800/50 shadow-sm animate-pulse">
                                                แนะนำสำหรับมือใหม่ 🌟
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-3 md:mb-4 font-medium line-clamp-2">{is.subtitle}</p>
                                    
                                    <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-sky-50 dark:bg-slate-700/50 text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/30 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                        {is.buttonText || 'เริ่มต้นเรียนรู้'}
                                        <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    );
};

import { useFirestoreData } from './src/hooks/useFirestore';

const ISPage = () => {
    const { isKey } = useParams<{ isKey: string }>();
    const navigate = useNavigate();
    const config = IS_CONFIG[isKey as keyof typeof IS_CONFIG];
    
    const { data: progressData } = useFirestoreData('user_progress', 'main', { 
        visited_is1: [],
        visited_is2: [],
        visited_is3: []
    });
    
    // Calculate progress
    const visitedTopics = progressData[`visited_${isKey}` as keyof typeof progressData] || [];
    const totalTopics = config && 'topics' in config ? config.topics.length : 0;
    const progress = totalTopics > 0 ? (visitedTopics.length / totalTopics) * 100 : 0;

    useEffect(() => {
        if (config && !('topics' in config)) {
            navigate('/');
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
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-medium text-sm md:text-base">
                    <ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5"/>
                    กลับหน้าหลัก
                </button>
            </div>

            <div className="text-center mb-8 md:mb-12 relative">
                {/* Decorative background elements */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br ${config.color} opacity-10 dark:opacity-20 rounded-full blur-3xl -z-10`} />
                
                <div className={`inline-flex p-4 md:p-5 rounded-2xl md:rounded-[1.5rem] bg-gradient-to-br ${config.color} text-white mb-4 md:mb-6 shadow-lg transform hover:scale-110 hover:rotate-3 transition-all duration-300 relative`}>
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
                            return (
                                <Link 
                                    to={`/${isKey}/${index}`} 
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

const TopicPage = () => {
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
            const visitedTopics = progressData[`visited_${isKey}` as keyof typeof progressData] || [];
            const totalTopics = config.topics.length;
            const currentProgress = totalTopics > 0 ? (visitedTopics.length / totalTopics) * 100 : 0;
            setProgress(currentProgress);
        }
    }, [config, isKey, progressData]);

    useEffect(() => {
        if (!config || !('topics' in config)) {
            navigate('/');
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
                to={`/lesson-plan/${isKey}/${topicIndexNum}`} 
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
            const visited = progressData[`visited_${isKey}` as keyof typeof progressData] || [];
            if (!visited.includes(topicIndexNum)) {
                const newVisited = [...visited, topicIndexNum];
                updateProgressData({ [`visited_${isKey}`]: newVisited });
            }
        }
        navigate(`/${isKey}`);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-6 md:py-8 px-4 md:px-0"
        >
             <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <button onClick={() => navigate(`/${isKey}`)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-medium text-sm md:text-base">
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

// --- Main App Routes and Onboarding Logic ---
const BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { path: '/', icon: HomeIcon, label: 'หน้าแรก' },
        { path: '/tutorial', icon: QuestionMarkCircleIcon, label: 'คู่มือ' },
        { path: '/settings', icon: Cog6ToothIcon, label: 'ตั้งค่า' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 z-50 px-6 py-2 md:hidden">
            <div className="flex justify-around items-center max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                                isActive 
                                    ? 'text-sky-500' 
                                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                            }`}
                        >
                            <item.icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                            <span className="text-[10px] font-bold">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

const MainRoutes = () => {
    const location = useLocation();
    const { user, userData, userRole } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const renderHome = () => {
        if (!user) return <HomePage />;
        if (userRole === 'admin') return <AdminPanel />;
        if (userRole === 'teacher') return <TeacherDashboard />;
        
        // Student logic
        if (userData && !userData.onboardingComplete) {
            return <StudentOnboarding />;
        }
        
        return <HomePage />;
    };

    return (
        <AnimatePresence mode="wait">
            <Routes location={location}>
                <Route path="/" element={renderHome()} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/tutorial" element={<TutorialPage />} />
                <Route path="/:isKey" element={<ISPage />} />
                <Route path="/:isKey/:topicIndex" element={<TopicPage />} />
                <Route path="/lesson-plan/:isKey/:topicIndex" element={<LessonPlanPage />} />
                <Route path="*" element={renderHome()} />
            </Routes>
        </AnimatePresence>
    );
};


const AppContent = () => {
    const { loading } = useAuth();
    const chatConfig = {
        title: "ผู้ช่วย IS",
        systemPrompt: "คุณคือผู้ช่วยให้คำปรึกษาสำหรับนักเรียนที่ทำโครงงาน IS (Independent Study) หน้าที่ของคุณคือตอบคำถาม ให้คำแนะนำ และช่วยอธิบายเนื้อหาที่ซับซ้อนให้เข้าใจง่ายขึ้น โดยใช้ภาษาที่เป็นกันเองแต่สุภาพ",
        welcomeMessage: "สวัสดีครับ มีคำถามหรืออยากให้ช่วยอธิบายส่วนไหนของโครงงาน IS ไหมครับ?",
        chatContext: "global_assistant"
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm animate-pulse font-medium">กำลังโหลดข้อมูล...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-transparent font-sans selection:bg-sky-200 dark:selection:bg-sky-900/50 flex flex-col relative">
            {/* Galaxy Background - only visible in dark mode or forced */}
            <div className="hidden dark:block galaxy-bg">
                <div className="galaxy-stars"></div>
            </div>

            <Header />
            <LoginModal />
            <ApiSettingsModal />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-16 relative z-10">
                <MainRoutes />
            </main>
            <BottomNav />
            <FloatingChatWidget config={chatConfig} />
            <footer className="border-t border-slate-200 dark:border-slate-800/50 bg-white dark:bg-slate-950/50 backdrop-blur-sm py-8 text-center text-slate-500 dark:text-slate-400 text-sm relative z-10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <BookOpenIcon className="w-5 h-5 text-slate-400" />
                        <span className="font-semibold text-slate-600 dark:text-slate-300">IS Helper</span>
                    </div>
                    <p>พัฒนาเพื่อการศึกษา</p>
                    <p className="mt-1">&copy; 2025 IS Helper.</p>
                </div>
            </footer>
        </div>
    );
}

const App = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

export default App;