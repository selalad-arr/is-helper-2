import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { IS_CONFIG } from '../../content';
import { ICONS, ChevronRightIcon } from '../../ui/icons';
import { trackEvent } from '../../services/analyticsService';

const ProjectConfigCards = () => {
    return (
        <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-3xl mx-auto">
            {Object.values(IS_CONFIG).map((is, idx) => {
                const Icon = ICONS[is.icon as keyof typeof ICONS] as React.ElementType;
                return (
                    <motion.div
                        key={is.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * (idx + 1) }}
                    >
                        <Link 
                            to={is.path} 
                            className={`group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 p-6 md:p-8 rounded-4xl md:rounded-[2.5rem] bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
                            onClick={() => {
                                trackEvent('select_is_card', {
                                    card_key: is.key,
                                    card_title: is.title,
                                });
                            }}
                        >
                            <div className={`absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-linear-to-br ${is.color} opacity-10 dark:opacity-20 rounded-full blur-2xl transition-transform group-hover:scale-150 duration-500`} />
                            <div className={`absolute -bottom-10 -left-10 w-24 h-24 md:w-32 md:h-32 bg-linear-to-tr ${is.color} opacity-10 dark:opacity-20 rounded-full blur-2xl transition-transform group-hover:scale-150 duration-500`} />
                            
                            <div className={`relative z-10 inline-flex shrink-0 p-4 md:p-5 rounded-2xl md:rounded-3xl bg-linear-to-br ${is.color} text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                {Icon && <Icon className="h-8 w-8 md:h-10 md:w-10" />}
                                <span className="absolute -top-2 -right-2 text-lg md:text-xl animate-bounce">✨</span>
                            </div>
                            
                            <div className="grow relative z-10">
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
    );
};

export default ProjectConfigCards;
