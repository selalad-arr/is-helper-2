import React from 'react';
import { motion } from 'motion/react';
import { ICONS } from '../ui/icons';

const ShareIcon = ICONS.ShareIcon || ((props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
  </svg>
));

const TutorialPage = () => {
  const appUrl = import.meta.env.VITE_SHARED_APP_URL || window.location.origin;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IS Helper - ผู้ช่วยทำโครงงาน',
          text: 'มาลองใช้ IS Helper ผู้ช่วยทำโครงงาน IS ด้วย AI ที่จะทำให้การเรียนและการทำโครงงานของคุณง่ายขึ้น!',
          url: appUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`มาลองใช้ IS Helper ผู้ช่วยทำโครงงาน IS ด้วย AI ที่จะทำให้การเรียนของคุณง่ายขึ้น! ${appUrl}`);
      alert('คัดลอกข้อความและลิงก์แอปแล้ว! คุณสามารถนำไปวางเพื่อส่งต่อให้เพื่อนได้เลย');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-6 md:py-8 max-w-4xl"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-slate-800 dark:text-slate-100 flex items-center gap-2 md:gap-3">
          <ICONS.QuestionMarkCircleIcon className="w-6 h-6 md:w-8 md:h-8 text-sky-500 flex-shrink-0" />
          คู่มือการใช้งานและการแชร์
        </h2>

        <div className="space-y-6 md:space-y-8">
          <section>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-slate-800 dark:text-slate-100">1. การใช้งานเบื้องต้น</h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              IS Helper ถูกออกแบบมาเพื่อช่วยเหลือนักเรียนในการทำโครงงาน IS (Independent Study) 
              โดยแบ่งเนื้อหาออกเป็นส่วนๆ ตั้งแต่การคิดหัวข้อ การสืบค้นข้อมูล ไปจนถึงการเขียนรายงาน
            </p>
          </section>

          <section>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-slate-800 dark:text-slate-100">2. การใช้ AI ช่วยเหลือ</h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              ในแต่ละบทเรียน จะมีส่วนที่ให้คุณสามารถพิมพ์ข้อความเพื่อปรึกษา AI ได้ 
              AI จะช่วยวิเคราะห์หัวข้อ แนะนำแหล่งข้อมูล หรือช่วยเกลาภาษาในรายงานของคุณ
            </p>
          </section>

          <section className="p-5 md:p-6 bg-sky-50 dark:bg-sky-900/20 rounded-xl md:rounded-2xl border border-sky-100 dark:border-sky-800">
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-sky-800 dark:text-sky-300 flex items-center gap-2">
              <ShareIcon className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              3. วิธีการแชร์แอปให้เพื่อน
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-4">
              คุณสามารถแชร์แอปนี้ให้เพื่อนๆ ใช้งานได้ง่ายๆ โดยการส่งลิงก์ URL ของแอป 
              หรือกดปุ่มแชร์ด้านล่างนี้:
            </p>
            <button
              onClick={handleShare}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-medium transition-all active:scale-95 shadow-lg shadow-sky-500/20 text-sm md:text-base"
            >
              <ShareIcon className="w-5 h-5" />
              แชร์แอปให้เพื่อน
            </button>
            <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded-lg border border-sky-200 dark:border-sky-700 text-xs md:text-sm font-mono text-slate-500 break-all">
              {appUrl}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorialPage;
