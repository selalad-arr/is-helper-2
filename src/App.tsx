import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from './contexts/ThemeContext';
import SettingsPage from './pages/SettingsPage';
import LessonPlanPage from './pages/LessonPlanPage';
import TutorialPage from './pages/TutorialPage';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AdminPanel } from './pages/AdminPanel';
import { StudentOnboarding } from './components/StudentOnboarding';
import FloatingChatWidget from './components/FloatingChatWidget';
import { useAuth } from './contexts/AuthContext';
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { LoginModal } from './components/LoginModal';
import { ICONS } from './ui/icons';

// Layout Components
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';

// Page Components
import { HomePage } from './pages/HomePage';
import { ISPage } from './pages/ISPage';
import { TopicPage } from './pages/TopicPage';

const BookOpenIcon = ICONS.BookOpenIcon;

// --- Main App Routes and Onboarding Logic ---

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