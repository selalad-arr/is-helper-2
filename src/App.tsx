import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from './contexts/ThemeContext';

// --- Lazy Load Pages ---
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ISPage = lazy(() => import('./pages/ISPage').then(m => ({ default: m.ISPage })));
const TopicPage = lazy(() => import('./pages/TopicPage').then(m => ({ default: m.TopicPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const LessonPlanPage = lazy(() => import('./pages/LessonPlanPage'));
const TutorialPage = lazy(() => import('./pages/TutorialPage'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard').then(m => ({ default: m.TeacherDashboard })));
const AdminPanel = lazy(() => import('./pages/AdminPanel').then(m => ({ default: m.AdminPanel })));
const RoleSelectionPage = lazy(() => import('./pages/RoleSelectionPage').then(m => ({ default: m.RoleSelectionPage })));
import { StudentOnboarding } from './components/StudentOnboarding';
import FloatingChatWidget from './components/FloatingChatWidget';
import { useAuth } from './contexts/AuthContext';
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { LoginModal } from './components/LoginModal';
import { ICONS } from './ui/icons';

// Layout Components
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';

// --- Loading Component ---
const PageLoader = () => (
    <div className="flex flex-col items-center justify-center p-12 min-h-[50vh] animate-in fade-in duration-500">
        <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-sky-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-sky-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium animate-pulse text-sm">กำลังเปิดหน้า...</p>
    </div>
);

const BookOpenIcon = ICONS.BookOpenIcon;

// --- Main App Routes and Onboarding Logic ---

const MainRoutes = () => {
    const location = useLocation();
    const { user, userData, userRole } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const renderHome = () => {
        return <HomePage />;
    };

    return (
        <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
                <Routes location={location}>
                    <Route path="/" element={
                        user ? (
                            !userRole ? <Navigate to="/menu" replace /> :
                            userRole === 'admin' ? <Navigate to="/admin" replace /> :
                            userRole === 'teacher' ? <Navigate to="/teacher" replace /> :
                            <Navigate to="/student" replace />
                        ) : renderHome()
                    } />
                    
                    {/* Role Selection */}
                    <Route path="/menu" element={user ? <RoleSelectionPage /> : <Navigate to="/" replace />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/*" element={userRole === 'admin' ? <AdminPanel /> : <Navigate to="/menu" replace />} />
                    
                    {/* Teacher Routes */}
                    <Route path="/teacher/*" element={userRole === 'teacher' ? <TeacherDashboard /> : <Navigate to="/menu" replace />} />
                    
                    {/* Student Routes */}
                    <Route path="/student" element={userRole === 'student' ? <HomePage /> : <Navigate to="/menu" replace />} />
                    <Route path="/student/onboarding" element={userRole === 'student' ? <StudentOnboarding /> : <Navigate to="/menu" replace />} />
                    <Route path="/student/:isKey" element={userRole === 'student' ? <ISPage /> : <Navigate to="/menu" replace />} />
                    <Route path="/student/:isKey/:topicIndex" element={userRole === 'student' ? <TopicPage /> : <Navigate to="/menu" replace />} />
                    <Route path="/student/lesson-plan/:isKey/:topicIndex" element={userRole === 'student' ? <LessonPlanPage /> : <Navigate to="/menu" replace />} />
                    <Route path="/student/tutorial" element={userRole === 'student' ? <TutorialPage /> : <Navigate to="/menu" replace />} />
                    
                    {/* Global Routes */}
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AnimatePresence>
        </Suspense>
    );
};


const AppContent = () => {
    const { loading } = useAuth();
    const [loadingProgress, setLoadingProgress] = React.useState(0);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (loading) {
            setLoadingProgress(0);
            interval = setInterval(() => {
                setLoadingProgress(prev => {
                    const increment = Math.floor(Math.random() * 10) + 2; 
                    const next = prev + increment;
                    return next > 90 ? 90 : next;
                });
            }, 300);
        } else {
            setLoadingProgress(100);
        }
        return () => clearInterval(interval);
    }, [loading]);

    const chatConfig = {
        title: "ผู้ช่วย IS",
        systemPrompt: "คุณคือผู้ช่วยให้คำปรึกษาสำหรับนักเรียนที่ทำโครงงาน IS (Independent Study) หน้าที่ของคุณคือตอบคำถาม ให้คำแนะนำ และช่วยอธิบายเนื้อหาที่ซับซ้อนให้เข้าใจง่ายขึ้น โดยใช้ภาษาที่เป็นกันเองแต่สุภาพ",
        welcomeMessage: "สวัสดีครับ มีคำถามหรืออยากให้ช่วยอธิบายส่วนไหนของโครงงาน IS ไหมครับ?",
        chatContext: "global_assistant"
    };

    // Local override for loading state to prevent stalls
    const [forceNotLoading, setForceNotLoading] = useState(false);
    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
                console.warn("Loading timeout reached. Forcing UI to show.");
                setForceNotLoading(true);
            }, 10000);
            return () => clearTimeout(timer);
        } else {
            setForceNotLoading(false);
        }
    }, [loading]);

    if (loading && !forceNotLoading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-6 w-full max-w-xs">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-sky-600 dark:text-sky-400">
                            {loadingProgress}%
                        </div>
                    </div>
                    <div className="w-full space-y-2">
                        <div className="flex justify-between items-end">
                            <span className="text-slate-500 dark:text-slate-400 text-sm animate-pulse font-medium">กำลังโหลดข้อมูลและซิงค์กับฐานข้อมูล...</span>
                        </div>
                        <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 shadow-inner">
                            <div 
                                className="h-full rounded-full bg-linear-to-r from-sky-400 to-indigo-500 transition-all duration-300 ease-out flex items-center justify-end px-2"
                                style={{ width: `${loadingProgress}%` }}
                            >
                                {loadingProgress > 20 && (
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-75"></div>
                                )}
                            </div>
                        </div>
                    </div>
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
                        {/*@ts-ignore */}
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