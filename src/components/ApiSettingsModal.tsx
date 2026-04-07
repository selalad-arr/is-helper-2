import React, { useState } from 'react';
import { useApiSettings } from '../contexts/ApiSettingsContext';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export const ApiSettingsModal: React.FC = () => {
    const { isSettingsComplete, setCustomApiKey, setUseFreeQuota, quotaExceededError, systemQuotaExceeded, setSystemQuotaExceeded } = useApiSettings();
    const { user, login, loading } = useAuth();
    const [apiKeyInput, setApiKeyInput] = useState('');
    const [error, setError] = useState('');

    if (loading || !user || isSettingsComplete) return null;

    const handleSaveKey = () => {
        if (!apiKeyInput.trim()) {
            setError('กรุณากรอก API Key');
            return;
        }
        setCustomApiKey(apiKeyInput.trim());
    };

    const handleUseQuota = () => {
        setUseFreeQuota(true);
    };

    const handleClose = () => {
        // Only allow closing if it's just a system quota warning and they want to ignore it for now
        // But actually, if they close it, they still can't use AI until they set a key.
        // Let's just let them close it if they want to browse without AI.
        setSystemQuotaExceeded(false);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
                >
                    {systemQuotaExceeded && (
                        <button 
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                    <div className="p-6">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${systemQuotaExceeded ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400' : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'}`}>
                            {systemQuotaExceeded ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                </svg>
                            )}
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                            {systemQuotaExceeded ? 'โควต้า AI ของระบบเต็มแล้ว ⚠️' : quotaExceededError ? 'โควต้าฟรีหมดแล้ว 😢' : 'ตั้งค่าการใช้งาน AI'}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            {systemQuotaExceeded
                                ? 'ขณะนี้มีผู้ใช้งานระบบเป็นจำนวนมาก ทำให้โควต้า API หลักของระบบเต็มชั่วคราว เพื่อการใช้งานที่ต่อเนื่อง กรุณาใส่ API Key ของคุณเอง'
                                : quotaExceededError 
                                ? 'โควต้าการใช้งาน AI ฟรีของคุณหมดแล้วสำหรับวันนี้ กรุณากรอก API Key ของคุณเองเพื่อใช้งานต่ออย่างไม่จำกัด' 
                                : 'เพื่อการใช้งานที่ต่อเนื่อง คุณสามารถเลือกใช้ API Key ของตัวเอง หรือใช้โควต้าฟรีประจำวันได้'}
                        </p>

                        <div className="space-y-4">
                            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex justify-between items-center">
                                    <span>{(quotaExceededError || systemQuotaExceeded) ? 'ใช้ API Key ของคุณเอง' : 'ตัวเลือกที่ 1: ใช้ API Key ของคุณเอง (ไม่จำกัด)'}</span>
                                    <a 
                                        href="https://aistudio.google.com/app/apikey" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                                    >
                                        รับ API Key ที่นี่
                                    </a>
                                </h3>
                                
                                <input
                                    type="password"
                                    value={apiKeyInput}
                                    onChange={(e) => setApiKeyInput(e.target.value)}
                                    placeholder="กรอก Gemini API Key"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all mb-2"
                                />
                                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                                <button
                                    onClick={handleSaveKey}
                                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                                >
                                    บันทึก API Key
                                </button>
                                <p className="text-xs text-slate-500 mt-2">
                                    * API Key จะถูกเก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น
                                </p>
                            </div>

                            {(!quotaExceededError && !systemQuotaExceeded) && (
                                <>
                                    <div className="relative flex items-center py-2">
                                        <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                                        <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">หรือ</span>
                                        <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                                    </div>

                                    <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">ตัวเลือกที่ 2: ใช้โควต้าฟรี</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                            ใช้งาน AI ได้ฟรี 3 ครั้งต่อวัน (รีเซ็ตทุกเที่ยงคืน) เหมาะสำหรับผู้เริ่มต้น
                                        </p>
                                        <button
                                            onClick={handleUseQuota}
                                            className="w-full py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                                        >
                                            ใช้โควต้าฟรี (3 ครั้ง/วัน)
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
