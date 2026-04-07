import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SunIcon, MoonIcon, ComputerDesktopIcon, KeyIcon, EyeIcon, EyeSlashIcon } from '../ui/icons';
import { useTheme } from '../contexts/ThemeContext';
import { trackEvent } from '../services/analyticsService';
import { useApiSettings } from '../contexts/ApiSettingsContext';
import { useAuth } from '../contexts/AuthContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const options: { name: string; value: 'light' | 'dark' | 'system'; icon: React.ElementType }[] = [
    { name: 'สว่าง', value: 'light', icon: SunIcon },
    { name: 'มืด', value: 'dark', icon: MoonIcon },
    { name: 'ตามระบบ', value: 'system', icon: ComputerDesktopIcon },
  ];

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
      setTheme(newTheme);
      trackEvent('change_theme', { theme: newTheme });
  };

  return (
    <div className="p-2 bg-slate-100 dark:bg-slate-700/50 rounded-2xl flex items-center justify-center space-x-1 sm:space-x-2">
      {options.map((option) => {
        const isActive = theme === option.value;
        return (
          <button
            key={option.value}
            onClick={() => handleThemeChange(option.value)}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
              isActive
                ? 'bg-white dark:bg-slate-800 shadow-sm text-sky-600 dark:text-sky-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600/50'
            }`}
            aria-pressed={isActive}
          >
            <option.icon className="w-5 h-5" />
            <span>{option.name}</span>
          </button>
        );
      })}
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const { customApiKey, useFreeQuota, quotaUsed, setCustomApiKey, setUseFreeQuota } = useApiSettings();
  const { user, login } = useAuth();
  const [isEditingKey, setIsEditingKey] = useState(false);
  const [tempKey, setTempKey] = useState(customApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [keyError, setKeyError] = useState('');

  const handleSaveKey = () => {
      const keyToSave = tempKey.trim();
      
      if (keyToSave) {
          // Basic validation for Gemini API key
          if (!keyToSave.startsWith('AIzaSy') || keyToSave.length < 30) {
              setKeyError('รูปแบบ API Key ไม่ถูกต้อง (ควรขึ้นต้นด้วย AIzaSy)');
              return;
          }
      }
      
      setKeyError('');
      setCustomApiKey(keyToSave || null);
      setIsEditingKey(false);
  };

  const handleUseFreeQuota = () => {
      setUseFreeQuota(true);
      setTempKey('');
      setKeyError('');
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-3xl mx-auto py-8 md:py-12 px-4 md:px-0"
    >
      <div className="mb-8 md:mb-10 text-center sm:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 md:mb-3 tracking-tight">การตั้งค่า</h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">จัดการธีมสีและการเชื่อมต่อ AI</p>
      </div>

      <div className="space-y-6 md:space-y-8">
        <div className="p-6 md:p-8 bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2.5 md:p-3 rounded-xl md:rounded-2xl text-indigo-600 dark:text-indigo-400">
                  <SunIcon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">ลักษณะที่ปรากฏ (Theme)</h3>
          </div>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            เลือกธีมสีของแอปพลิเคชันที่คุณต้องการ
          </p>
          <ThemeSwitcher />
        </div>

        <div className="p-6 md:p-8 bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2.5 md:p-3 rounded-xl md:rounded-2xl text-emerald-600 dark:text-emerald-400">
                  <KeyIcon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">การตั้งค่า API Key</h3>
          </div>
          
          <div className="space-y-4">
              {useFreeQuota && !customApiKey && (
                  <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl border border-sky-100 dark:border-sky-800">
                      <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sky-800 dark:text-sky-300">กำลังใช้โควต้าฟรี</span>
                          <span className="text-sm font-bold bg-sky-200 dark:bg-sky-800 text-sky-800 dark:text-sky-200 px-2 py-1 rounded-md">
                              {Math.max(0, 3 - quotaUsed)} / 3 ครั้ง
                          </span>
                      </div>
                      <p className="text-sm text-sky-700 dark:text-sky-400 mb-4">
                          คุณสามารถใช้ AI ได้ฟรี 3 ครั้งต่อวัน หากต้องการใช้งานไม่จำกัด กรุณาใส่ API Key ของคุณเอง
                      </p>
                      <button 
                          onClick={() => setIsEditingKey(true)}
                          className="text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 underline"
                      >
                          เปลี่ยนไปใช้ API Key ของตัวเอง
                      </button>
                  </div>
              )}

              {(customApiKey || isEditingKey || (!useFreeQuota && !customApiKey)) && (
                  <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Gemini API Key ของคุณ
                      </label>
                      {!user ? (
                          <div className="text-center py-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                  กรุณาเข้าสู่ระบบก่อนเพื่อตั้งค่า API Key ของคุณ
                              </p>
                              <button
                                  onClick={() => login()}
                                  className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors shadow-sm"
                              >
                                  เข้าสู่ระบบด้วย Google
                              </button>
                          </div>
                      ) : (
                          <>
                              <div className="flex flex-col sm:flex-row gap-2">
                                  <div className="relative flex-1">
                                      <input
                                          type={showKey ? "text" : "password"}
                                          value={tempKey}
                                          onChange={(e) => {
                                              setTempKey(e.target.value);
                                              if (keyError) setKeyError('');
                                          }}
                                          placeholder="AIzaSy..."
                                          className={`w-full px-4 py-2 pr-10 border ${keyError ? 'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500'} rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 outline-none transition-colors`}
                                          disabled={!isEditingKey && !!customApiKey}
                                      />
                                      {(isEditingKey || (!useFreeQuota && !customApiKey)) && (
                                          <button
                                              type="button"
                                              onClick={() => setShowKey(!showKey)}
                                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                          >
                                              {showKey ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                          </button>
                                      )}
                                  </div>
                                  {isEditingKey || (!useFreeQuota && !customApiKey) ? (
                                      <div className="flex gap-2">
                                          <button
                                              onClick={handleSaveKey}
                                              className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors whitespace-nowrap"
                                          >
                                              บันทึก
                                          </button>
                                          {customApiKey && (
                                              <button
                                                  onClick={() => {
                                                      setIsEditingKey(false);
                                                      setTempKey(customApiKey || '');
                                                      setKeyError('');
                                                  }}
                                                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors whitespace-nowrap"
                                              >
                                                  ยกเลิก
                                              </button>
                                          )}
                                      </div>
                                  ) : (
                                      <button
                                          onClick={() => setIsEditingKey(true)}
                                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors whitespace-nowrap"
                                      >
                                          แก้ไข
                                      </button>
                                  )}
                              </div>
                              {keyError && (
                                  <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                                      {keyError}
                                  </p>
                              )}
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                  รับ API Key ฟรีได้ที่ <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">Google AI Studio</a>
                              </p>
                              
                              {customApiKey && !isEditingKey && (
                                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                                      <button 
                                          onClick={handleUseFreeQuota}
                                          className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 underline"
                                      >
                                          กลับไปใช้โควต้าฟรี (3 ครั้ง/วัน)
                                      </button>
                                  </div>
                              )}
                          </>
                      )}
                  </div>
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;