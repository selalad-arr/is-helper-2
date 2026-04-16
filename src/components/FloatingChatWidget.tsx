import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ChatInterface from './ChatInterface';
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon } from '../ui/icons';

interface Config {
    title: string;
    systemPrompt: string;
    welcomeMessage: string;
    chatContext: string;
    suggestedPrompts?: string[];
}

interface FloatingChatWidgetProps {
    config: Config;
}

const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({ config }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="mb-4 w-[calc(100vw-2rem)] sm:w-[400px] origin-bottom-right"
                    >
                         <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden flex flex-col h-[75vh] md:h-[60vh] max-h-[700px] min-h-[400px]">
                             <div className="bg-gradient-to-r from-sky-600 to-indigo-600 p-3 md:p-4 flex items-center justify-between shadow-sm z-10">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                    </div>
                                    <h3 className="font-bold text-white tracking-wide text-sm md:text-base">{config.title}</h3>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors focus:outline-none"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                             </div>
                            <div className="flex-grow overflow-hidden relative bg-slate-50 dark:bg-slate-900/50">
                                <ChatInterface 
                                    systemPrompt={config.systemPrompt} 
                                    welcomeMessage={config.welcomeMessage}
                                    containerClassName="h-full border-0 rounded-none shadow-none bg-transparent"
                                    chatContext={config.chatContext}
                                    suggestedPrompts={config.suggestedPrompts}
                                />
                            </div>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <motion.a
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.1 }}
                    href="mailto:selalad@gmail.com"
                    className="mb-3 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full shadow-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 transition-all"
                    title="ติดต่อ Admin"
                >
                    <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
            )}
            
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 z-50 ${
                    isOpen 
                        ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 focus:ring-slate-500 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900' 
                        : 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700 focus:ring-sky-500 dark:focus:ring-offset-slate-900 shadow-sky-500/30'
                }`}
                aria-label={isOpen ? "ปิดแชท" : "เปิดแชท"}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <XMarkIcon className="w-5 h-5 sm:w-8 sm:h-8"/>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 sm:w-8 sm:h-8"/>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default FloatingChatWidget;
