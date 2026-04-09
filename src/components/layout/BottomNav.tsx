import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, QuestionMarkCircleIcon, Cog6ToothIcon, ShareIcon } from '../../ui/icons';
import { useAuth } from '../../contexts/AuthContext';

export const BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { switchRole, user, userRole } = useAuth();

    const navItems = [
        { path: userRole === 'student' ? '/student' : '/', icon: HomeIcon, label: 'หน้าแรก' },
        { path: userRole === 'student' ? '/student/tutorial' : '/tutorial', icon: QuestionMarkCircleIcon, label: 'คู่มือ' },
        { 
            isAction: true, 
            action: switchRole, 
            icon: ShareIcon, 
            label: 'สลับสถานะ', 
            iconClass: 'rotate-180 text-emerald-500' 
        },
        { path: '/settings', icon: Cog6ToothIcon, label: 'ตั้งค่า' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 z-50 px-6 py-2 md:hidden">
            <div className="flex justify-around items-center max-w-md mx-auto">
                {navItems.map((item, idx) => {
                    if (item.isAction && !user) return null;
                    
                    const isActive = !item.isAction && location.pathname === item.path;
                    return (
                        <button
                            key={item.path || idx}
                            onClick={() => item.isAction ? item.action() : navigate(item.path!)}
                            className={`flex flex-col items-center gap-1 p-2 transition-all active:scale-95 ${
                                isActive 
                                    ? 'text-sky-500' 
                                    : 'text-slate-400 dark:text-slate-500'
                            }`}
                        >
                            <item.icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} ${item.iconClass || ''} transition-transform`} />
                            <span className="text-[10px] font-bold">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
