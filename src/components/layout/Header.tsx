import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useApiSettings } from '../../contexts/ApiSettingsContext';
import { BookOpenIcon, Cog6ToothIcon, CheckIcon, HomeIcon, ShareIcon, AcademicCapIcon, CheckCircleIcon, SparklesIcon } from '../../ui/icons';

export const Header = () => {
    const { user, userData, userRole, login, logout, switchRole } = useAuth();
    const { useFreeQuota, quotaUsed, customApiKey } = useApiSettings();
    const navigate = useNavigate();

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
                    <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-400">
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
                        <div className="flex items-center gap-3 mr-2 ml-2">
                            {user.photoURL && (
                                <img 
                                    src={user.photoURL} 
                                    alt="Profile" 
                                    className="w-8 h-8 rounded-full border-2 border-sky-200 dark:border-sky-800 shadow-sm" 
                                    referrerPolicy="no-referrer" 
                                />
                            )}
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-1">
                                    {userRole === 'admin' ? 'ผู้ดูแลระบบ' : userRole === 'teacher' ? 'คุณครู' : 'นักเรียน'}
                                </span>
                                <button 
                                    onClick={logout} 
                                    className="text-xs font-bold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors text-left"
                                >
                                    ออกจากระบบ
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => login()} className="mr-2 ml-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-sky-500/20 active:scale-95">
                            เข้าสู่ระบบ
                        </button>
                    )}

                    {user && (
                        <div className="hidden md:flex items-center gap-2">
                             <Link to="/" title="หน้าแรก" className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all font-bold text-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                <HomeIcon className="w-5 h-5 text-sky-500" />
                                <span>หน้าแรก</span>
                            </Link>

                            {userRole === 'admin' && (
                                <Link to="/admin" title="แผงควบคุมผู้ดูแล" className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all font-bold text-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                    <CheckCircleIcon className="w-5 h-5 text-rose-500" />
                                    <span>จัดการระบบ</span>
                                </Link>
                            )}

                            {userRole === 'teacher' && (
                                <Link to="/teacher" title="แดชบอร์ดคุณครู" className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all font-bold text-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                    <AcademicCapIcon className="w-5 h-5 text-emerald-500" />
                                    <span>แดชบอร์ดครู</span>
                                </Link>
                            )}
                            
                            <button 
                                onClick={async () => {
                                    await switchRole();
                                    navigate('/menu');
                                }}
                                title="สลับสถานะการใช้งาน"
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-sm"
                            >
                                <ShareIcon className="w-4 h-4 rotate-180 text-emerald-500" />
                                <span>สลับสถานะ</span>
                            </button>

                            {!userData?.isPremium ? (
                                <Link 
                                    to="/pricing" 
                                    className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl transition-all font-black text-sm shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 animate-pulse"
                                >
                                    <SparklesIcon className="w-4 h-4" />
                                    Upgrade
                                </Link>
                            ) : (
                                <Link 
                                    to="/pricing"
                                    className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-400 to-indigo-500 text-white rounded-xl font-black text-sm shadow-md shadow-sky-500/20"
                                >
                                    <SparklesIcon className="w-4 h-4" />
                                    Premium
                                </Link>
                            )}
                        </div>
                    )}
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
