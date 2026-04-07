import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chat } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import type { ChatMessage } from '../types';
import { createChatSession, handleGeminiError } from '../services/geminiService';
import { SparklesIcon, UserCircleIcon, PaperAirplaneIcon } from '../ui/icons';
import { trackEvent } from '../services/analyticsService';
import { useFirestoreData } from '../hooks/useFirestore';

interface ChatInterfaceProps {
    systemPrompt: string;
    welcomeMessage: string;
    containerClassName?: string;
    chatContext: string; // New prop for analytics
    suggestedPrompts?: string[]; // New prop for suggested prompts
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ systemPrompt, welcomeMessage, containerClassName = "h-[70vh] max-h-[700px]", chatContext, suggestedPrompts }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    
    const { data: chatData, updateData: updateChatData, loading: isDataLoading } = useFirestoreData('user_chats', chatContext, {
        messages: JSON.stringify([{ role: 'model', parts: [{ text: welcomeMessage }] }])
    });

    const messages: ChatMessage[] = JSON.parse(chatData.messages || '[]');

    const setMessages = (newMessages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => {
        const updatedMessages = typeof newMessages === 'function' ? newMessages(messages) : newMessages;
        updateChatData({ messages: JSON.stringify(updatedMessages) });
    };

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isDataLoading) return;

        const initChat = () => {
            if (messages.length > 1) {
                try {
                    const chatSession = createChatSession(systemPrompt, messages.slice(0, -1));
                    setChat(chatSession);
                } catch (e) {
                    console.error("Failed to resume chat:", e);
                }
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const chatSession = createChatSession(systemPrompt);
                setChat(chatSession);
            } catch (error) {
                console.error("Failed to initialize chat session:", error);
                setMessages([{ role: 'model', parts: [{ text: "ขออภัย, ไม่สามารถเริ่มการสนทนาได้ในขณะนี้" }] }]);
            } finally {
                setIsLoading(false);
            }
        };
        initChat();
    }, [systemPrompt, welcomeMessage, isDataLoading]);

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
    }, [input, isLoading, chat, chatContext]);
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
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
                {suggestedPrompts && suggestedPrompts.length > 0 && messages.length <= 2 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {suggestedPrompts.map((prompt, idx) => (
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
                )}
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