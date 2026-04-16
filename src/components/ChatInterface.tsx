import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chat } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import type { ChatMessage } from '../types';
import { createChatSession, handleGeminiError } from '../services/gemini';
import { SparklesIcon, UserCircleIcon, PaperAirplaneIcon, TrashIcon } from '../ui/icons';
import { trackEvent } from '../services/analyticsService';
import { useFirestoreData } from '../hooks/useFirestore';

import { useAuth } from '../contexts/AuthContext/AuthProvider';

interface ChatInterfaceProps {
    systemPrompt: string;
    welcomeMessage: string;
    containerClassName?: string;
    chatContext: string; // New prop for analytics
    suggestedPrompts?: string[]; // New prop for suggested prompts
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ systemPrompt, welcomeMessage, containerClassName = "h-[70vh] max-h-[700px]", chatContext, suggestedPrompts }) => {
    const { userData } = useAuth();
    const isPremium = userData?.isPremium || false;
    
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessagesState] = useState<ChatMessage[]>([]);
    
    const { data: chatData, updateData: updateChatData, loading: isDataLoading } = useFirestoreData('user_chats', chatContext, {
        messages: JSON.stringify([{ role: 'model', parts: [{ text: welcomeMessage }] }])
    });

    // Update local messages when Firestore data changes
    useEffect(() => {
        if (!isDataLoading && chatData?.messages) {
            try {
                const parsed = JSON.parse(chatData.messages);
                setMessagesState(parsed);
            } catch (e) {
                console.error("Failed to parse messages from Firestore:", e);
            }
        }
    }, [chatData.messages, isDataLoading]);

    const setMessages = useCallback((newMessages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => {
        setMessagesState(prev => {
            const updatedMessages = typeof newMessages === 'function' ? newMessages(prev) : newMessages;
            // Sync to Firestore in a "fire and forget" way
            updateChatData({ messages: JSON.stringify(updatedMessages) });
            return updatedMessages;
        });
    }, [updateChatData]);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isDataLoading) return;

        const initChat = async () => {
            const currentMessages = JSON.parse(chatData.messages || '[]');
            if (currentMessages.length > 1) {
                try {
                    const chatSession = await createChatSession(systemPrompt, currentMessages.slice(0, -1), isPremium);
                    setChat(chatSession);
                } catch (e) {
                    console.error("Failed to resume chat:", e);
                }
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const chatSession = await createChatSession(systemPrompt, [], isPremium);
                setChat(chatSession);
            } catch (error) {
                console.error("Failed to initialize chat session:", error);
                setMessages([{ role: 'model', parts: [{ text: "ขออภัย, ไม่สามารถเริ่มการสนทนาได้ในขณะนี้" }] }]);
            } finally {
                setIsLoading(false);
            }
        };
        initChat();
    }, [systemPrompt, welcomeMessage, isDataLoading, chatData.messages === undefined, isPremium]); // Use a stable key for initial load

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = useCallback(async () => {
        if (!input.trim() || isLoading || !chat) return;

        const text = input;
        setInput('');
        setIsLoading(true);

        trackEvent('send_chat_message', {
            chat_context: chatContext,
            message_length: text.length,
        });

        const userMessage: ChatMessage = { role: 'user', parts: [{ text }] };
        setMessages(prev => [...prev, userMessage, { role: 'model', parts: [{ text: '' }] }]);

        try {
            const stream = await chat.sendMessageStream({ message: text });
            
            for await (const chunk of stream) {
                const chunkText = chunk.text;
                if(chunkText){
                   setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage.role === 'model') {
                            lastMessage.parts[0].text += chunkText;
                        }
                        return newMessages;
                    });
                }
            }
        } catch (error) {
            const errorMessage = handleGeminiError(error);
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'model' && lastMessage.parts[0].text === '') {
                     lastMessage.parts[0].text = errorMessage;
                } else {
                    newMessages.push({ role: 'model', parts: [{ text: errorMessage }] });
                }
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, chat, chatContext, setMessages]);
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleClearChat = async () => {
        if (!window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบประวัติการสนทนาทั้งหมด?')) return;
        
        setIsLoading(true);
        setMessages([{ role: 'model', parts: [{ text: welcomeMessage }] }]);
        
        try {
            const chatSession = await createChatSession(systemPrompt, [], isPremium);
            setChat(chatSession);
        } catch (error) {
            console.error("Failed to initialize chat session:", error);
            setMessages([{ role: 'model', parts: [{ text: "ขออภัย, ไม่สามารถเริ่มการสนทนาใหม่ได้ในขณะนี้" }] }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden ${containerClassName}`}>
            <div ref={chatContainerRef} className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto scroll-smooth">
                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'model' && (
                                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-sm">
                                    <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                            )}
                            <div className={`max-w-[85%] sm:max-w-[75%] p-3 sm:p-4 rounded-2xl shadow-sm ${
                                msg.role === 'user' 
                                    ? 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white rounded-br-sm' 
                                    : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-sm border border-slate-100 dark:border-slate-600'
                            }`}>
                                <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                                    {msg.parts[0].text || (
                                        <span className="flex gap-1 items-center h-5">
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </span>
                                    )}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                {(suggestedPrompts && suggestedPrompts.length > 0 && messages.length <= 2) || messages.length > 1 ? (
                    <div className="flex justify-between items-end mb-3 gap-2 w-full">
                        <div className="flex flex-wrap gap-2 flex-1">
                            {suggestedPrompts && suggestedPrompts.length > 0 && messages.length <= 2 && suggestedPrompts.map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setInput(prompt);
                                        // We use a small timeout to ensure setInput has finished before handleSendMessage is called if we were to trigger it automatically
                                        // But for better UX, let's just set the input and let the user click send, or trigger it immediately:
                                        setTimeout(() => {
                                            const sendBtn = document.getElementById('chat-send-btn');
                                            sendBtn?.click();
                                        }, 10);
                                    }}
                                    className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-colors shadow-sm"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                        {messages.length > 1 && (
                            <button
                                onClick={handleClearChat}
                                disabled={isLoading}
                                className="flex-shrink-0 text-xs px-3 py-1.5 flex items-center gap-1.5 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                title="ลบประวัติการสนทนา"
                            >
                                <TrashIcon className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">ลบประวัติ</span>
                            </button>
                        )}
                    </div>
                ) : null}
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={isLoading ? "กำลังประมวลผล..." : "พิมพ์ข้อความที่นี่..."}
                        disabled={isLoading || !chat}
                        className="w-full py-3 pl-4 pr-12 text-sm sm:text-base text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 transition-all disabled:opacity-60 disabled:bg-slate-100 dark:disabled:bg-slate-800 shadow-sm"
                    />
                    <motion.button
                        id="chat-send-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={isLoading || !input.trim() || !chat}
                        className="absolute right-1.5 p-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                         {isLoading ? 
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :
                            <PaperAirplaneIcon className="w-5 h-5 ml-0.5" />
                         }
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
