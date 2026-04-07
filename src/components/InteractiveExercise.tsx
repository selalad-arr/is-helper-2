import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateFeedback } from '../services/geminiService';
import { LightBulbIcon, PaperAirplaneIcon, ChatBubbleOvalLeftEllipsisIcon, SparklesIcon, UserCircleIcon } from '../ui/icons';
import { Chat } from '@google/genai';
import { createChatSession, type ChatMessage, handleGeminiError } from '../services/geminiService';
import { trackEvent } from '../services/analyticsService';

import { useParams } from 'react-router-dom';
import { useProjectData } from '../hooks/useProjectData';
import { useFirestoreData } from '../hooks/useFirestore';

interface InteractiveExerciseProps {
  question: string;
  context: string;
  rows?: number;
}

const InteractiveExercise: React.FC<InteractiveExerciseProps> = ({ question, context, rows = 3 }) => {
  const { isKey } = useParams<{ isKey: string }>();
  const { projectTitle, is1ProjectTitle, is2ProjectTitle, is3ProjectTitle } = useProjectData();
  
  let projectName = '';
  if (isKey === 'is1') projectName = is1ProjectTitle;
  else if (isKey === 'is2') projectName = is2ProjectTitle;
  else if (isKey === 'is3') projectName = is3ProjectTitle;
  else projectName = projectTitle;

  const { data: exerciseData, updateData: updateExerciseData } = useFirestoreData('user_exercises', context, {
    answer: '',
    feedback: '',
    chatHistory: '[]'
  });

  const answer = exerciseData.answer;
  const feedback = exerciseData.feedback;
  const chatHistory = JSON.parse(exerciseData.chatHistory || '[]');

  const setAnswer = (newAnswer: string) => {
    updateExerciseData({ answer: newAnswer });
  };

  const setFeedback = (newFeedback: string) => {
    updateExerciseData({ feedback: newFeedback });
  };

  const setChatHistory = (newHistory: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => {
    const updatedHistory = typeof newHistory === 'function' ? newHistory(chatHistory) : newHistory;
    updateExerciseData({ chatHistory: JSON.stringify(updatedHistory) });
  };

  const [isLoading, setIsLoading] = useState(false);
  
  // --- States for follow-up chatbot ---
  const [followUpChat, setFollowUpChat] = useState<Chat | null>(null);

  useEffect(() => {
    if (chatHistory.length > 0 && !followUpChat && feedback) {
        const chatSystemPrompt = `คุณคือ AI ผู้ช่วยสอนด้านสถิติที่กำลังสนทนาต่อยอดกับนักเรียนใน "คลินิกให้คำปรึกษาสถิติ"
        
นี่คือบริบทของการสนทนาก่อนหน้านี้:
- ชื่อโครงงานของนักเรียน: "${projectName || 'ไม่ได้ระบุ'}"
- คำอธิบายวิธีการทดลอง/เก็บข้อมูลของนักเรียน: "${answer}"
- คำแนะนำเบื้องต้นที่คุณ (AI) เพิ่งให้ไป: "${feedback}"

ภารกิจของคุณ:
- สวมบทบาทเป็นที่ปรึกษาส่วนตัวที่พร้อมตอบคำถามของนักเรียนที่ยังสงสัยเกี่ยวกับคำแนะนำที่คุณให้ไป
- ช่วยนักเรียนวางแผนขั้นตอนต่อไปอย่างเป็นรูปธรรม
- ใช้ภาษาที่เป็นมิตร ให้กำลังใจ และเข้าใจง่าย`;

        try {
            const chatSession = createChatSession(chatSystemPrompt, chatHistory.slice(0, -1));
            setFollowUpChat(chatSession);
        } catch (e) {
            console.error("Failed to resume follow-up chat", e);
        }
    }
  }, [feedback]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    setIsLoading(true);
    setFeedback('');
    setFollowUpChat(null);
    setChatHistory([]);
    setChatInput('');

    trackEvent('submit_exercise', {
        exercise_context: context,
        project_name: projectName,
        answer_length: answer.trim().length,
    });

    const aiFeedback = await generateFeedback(question, answer, context, projectName);
    setFeedback(aiFeedback);
    setIsLoading(false);

    // --- INITIALIZE CHATBOT AFTER GETTING FEEDBACK (ONLY FOR TOPIC 6) ---
    if (context === "บทที่ 6: การวิเคราะห์ข้อมูลเบื้องต้น" && aiFeedback && !aiFeedback.startsWith("เกิดข้อผิดพลาด") && !aiFeedback.startsWith("ขออภัย") && !aiFeedback.startsWith("API Key")) {
      const chatSystemPrompt = `คุณคือ AI ผู้ช่วยสอนด้านสถิติที่กำลังสนทนาต่อยอดกับนักเรียนใน "คลินิกให้คำปรึกษาสถิติ"
        
นี่คือบริบทของการสนทนาก่อนหน้านี้:
- ชื่อโครงงานของนักเรียน: "${projectName || 'ไม่ได้ระบุ'}"
- คำอธิบายวิธีการทดลอง/เก็บข้อมูลของนักเรียน: "${answer}"
- คำแนะนำเบื้องต้นที่คุณ (AI) เพิ่งให้ไป: "${aiFeedback}"

ภารกิจของคุณ:
- สวมบทบาทเป็นที่ปรึกษาส่วนตัวที่พร้อมตอบคำถามของนักเรียนที่ยังสงสัยเกี่ยวกับคำแนะนำที่คุณให้ไป
- ช่วยนักเรียนวางแผนขั้นตอนต่อไปอย่างเป็นรูปธรรม ตัวอย่างเช่น:
    - ถ้าเขาเลือกใช้ "ร้อยละ" ถามต่อว่า "เยี่ยมเลยครับ/ค่ะ แล้วเราจะเก็บข้อมูลมาคำนวณร้อยละได้อย่างไรบ้าง? จะทำเป็นแบบสอบถามกี่ข้อดี?"
    - ถ้าเขาเลือกใช้ "ค่าเฉลี่ย" ถามต่อว่า "ดีเลยครับ/ค่ะ แล้วเราจะวัดค่าอะไรมาหาค่าเฉลี่ย? ต้องวัดกี่ครั้งถึงจะน่าเชื่อถือ?"
- หากนักเรียนต้องการตัวอย่าง ให้ช่วยยกตัวอย่างการออกแบบตารางเก็บข้อมูล หรือตัวอย่างคำถามในแบบสอบถามที่สอดคล้องกับโครงงานของเขา
- ใช้ภาษาที่เป็นมิตร ให้กำลังใจ และเข้าใจง่าย
- สนทนาต่อไปเรื่อยๆ เพื่อคลายข้อสงสัยและช่วยให้นักเรียนเห็นภาพการทำงานขั้นต่อไปได้ชัดเจนที่สุด`;

      try {
          const chatSession = createChatSession(chatSystemPrompt);
          setFollowUpChat(chatSession);
          setChatHistory([{ role: 'model', parts: [{ text: "มีคำถามเพิ่มเติมเกี่ยวกับคำแนะนำ หรืออยากให้ช่วยวางแผนขั้นต่อไป ถามได้เลยนะครับ/คะ" }] }]);
      } catch (error) {
          console.error("Failed to init follow-up chat", error);
          setChatHistory([{ role: 'model', parts: [{ text: "ขออภัย, ไม่สามารถเริ่มแชทติดตามได้" }] }]);
      }
    }
  };
  
  const handleSendChatMessage = useCallback(async () => {
      if (!chatInput.trim() || isChatLoading || !followUpChat) return;

      const text = chatInput;
      setChatInput('');
      setIsChatLoading(true);

      trackEvent('send_follow_up_message', {
          exercise_context: context,
          message_length: text.length,
      });

      const userMessage: ChatMessage = { role: 'user', parts: [{ text }] };
      setChatHistory(prev => [...prev, userMessage, { role: 'model', parts: [{ text: '' }] }]);

      try {
          const stream = await followUpChat.sendMessageStream({ message: text });
          
          for await (const chunk of stream) {
              const chunkText = chunk.text;
              if (chunkText) {
                 setChatHistory(prev => {
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
          setChatHistory(prev => {
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
          setIsChatLoading(false);
      }
  }, [chatInput, isChatLoading, followUpChat, context]);

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 first:mt-0 p-6 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="mb-5">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 whitespace-pre-wrap">{question}</label>
        <textarea
            rows={rows}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3.5 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-sky-400/50 focus:border-sky-500 dark:focus:border-sky-400 transition-all text-slate-800 dark:text-slate-200 disabled:opacity-60 resize-y"
            placeholder="พิมพ์คำตอบของคุณที่นี่..."
            disabled={isLoading}
        />
      </div>
      <div className="flex justify-end">
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isLoading || !answer.trim()}
            className="inline-flex items-center gap-2 justify-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed transition-all"
        >
            {isLoading ? (
                <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    กำลังวิเคราะห์...
                </>
            ) : (
                 <>
                    <PaperAirplaneIcon className="w-4 h-4" />
                    ส่งคำตอบ
                 </>
            )}
        </motion.button>
      </div>

      <AnimatePresence>
          {feedback && (
            <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
            >
                <div className="p-5 rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 border border-sky-100 dark:border-sky-800/30">
                  <h5 className="flex items-center gap-2 font-bold text-sky-800 dark:text-sky-300 mb-3">
                    <LightBulbIcon className="w-5 h-5 text-sky-500"/>
                    ผลการวิเคราะห์จาก AI
                  </h5>
                  <div className="prose prose-sm sm:prose-base prose-slate dark:prose-invert max-w-none">
                      <p className="whitespace-pre-wrap leading-relaxed">{feedback}</p>
                  </div>
                </div>
            </motion.div>
          )}

          {feedback && followUpChat && (
            <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden border-t border-slate-200 dark:border-slate-700 pt-6"
            >
                <h5 className="flex items-center gap-2 font-bold text-sky-800 dark:text-sky-300 mb-4">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-sky-500" />
                    คลินิกให้คำปรึกษาสถิติ (ถาม-ตอบ กับ AI)
                </h5>
                <div ref={chatContainerRef} className="max-h-[350px] overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl mb-4 border border-slate-200/50 dark:border-slate-700/50 scroll-smooth">
                    <AnimatePresence initial={false}>
                        {chatHistory.map((msg, index) => (
                            <motion.div 
                                key={index} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'model' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-sm">
                                        <SparklesIcon className="w-4 h-4 text-white" />
                                    </div>
                                )}
                                <div className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-2xl shadow-sm text-sm sm:text-base ${
                                    msg.role === 'user' 
                                        ? 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white rounded-br-sm' 
                                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm border border-slate-100 dark:border-slate-700'
                                }`}>
                                    <p className="whitespace-pre-wrap leading-relaxed">
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
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendChatMessage()}
                        placeholder={isChatLoading ? "กำลังประมวลผล..." : "ถามคำถามเกี่ยวกับคำแนะนำต่อที่นี่..."}
                        disabled={isChatLoading || !followUpChat}
                        className="w-full py-3 pl-4 pr-12 text-sm sm:text-base text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 transition-all disabled:opacity-60 disabled:bg-slate-100 dark:disabled:bg-slate-800 shadow-sm"
                        aria-label="ถามคำถามต่อที่นี่"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendChatMessage}
                        disabled={isChatLoading || !chatInput.trim() || !followUpChat}
                        className="absolute right-1.5 p-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed transition-all shadow-sm"
                        aria-label="ส่งคำถาม"
                    >
                        {isChatLoading ? 
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :
                            <PaperAirplaneIcon className="w-5 h-5 ml-0.5" />
                        }
                    </motion.button>
                </div>
            </motion.div>
          )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InteractiveExercise;