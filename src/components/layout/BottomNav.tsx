import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, QuestionMarkCircleIcon, Cog6ToothIcon } from '../../ui/icons';

export const BottomNav = () => {
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
