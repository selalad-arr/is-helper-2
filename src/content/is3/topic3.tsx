
import React from 'react';
import { UsersIcon, ChatBubbleOvalLeftEllipsisIcon, Cog6ToothIcon, CheckIcon } from '../../ui/icons';

const ActionCard = ({ icon, title, children }: React.PropsWithChildren<{ icon: React.ReactNode, title: string }>) => (
    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 h-full">
        <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 text-sky-500">{icon}</div>
            <h5 className="font-bold text-lg text-slate-800 dark:text-slate-200">{title}</h5>
        </div>
        <div className="text-slate-700 dark:text-slate-300 space-y-1 pl-9">
            {children}
        </div>
    </div>
);

const Topic3 = () => (
    <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">การลงมือปฏิบัติและการทำงานเป็นทีม</h3>
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>
                เมื่อเรามีแผนโครงการที่ชัดเจนแล้ว ก็ถึงเวลา "ลงมือทำ" (Implementation)! ขั้นตอนนี้คือการนำแผนที่เขียนไว้บนกระดาษมาสร้างให้เกิดขึ้นจริงในสังคม ซึ่งเป็นช่วงเวลาที่ท้าทายและสนุกที่สุดของการทำโครงงาน IS3
            </p>
            <p>
                การลงมือปฏิบัติจริงมักจะไม่ราบรื่นเหมือนที่วางแผนไว้ 100% เสมอไป ดังนั้น "การทำงานเป็นทีม" และ "การแก้ปัญหาเฉพาะหน้า" จึงเป็นทักษะที่สำคัญมากในขั้นตอนนี้
            </p>

            <h4 className="font-semibold text-xl !mt-8 text-slate-800 dark:text-slate-100">หัวใจสำคัญของการลงมือปฏิบัติ</h4>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <ActionCard icon={<UsersIcon className="w-6 h-6" />} title="1. แบ่งหน้าที่ให้ชัดเจน">
                    <p>ทุกคนในทีมควรมีบทบาทและหน้าที่รับผิดชอบที่ชัดเจนตามความถนัด เช่น ฝ่ายประสานงาน, ฝ่ายสถานที่, ฝ่ายสวัสดิการ, ฝ่ายบันทึกภาพ เพื่อให้งานเดินหน้าได้อย่างมีประสิทธิภาพ</p>
                </ActionCard>
                <ActionCard icon={<ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />} title="2. สื่อสารกันอยู่เสมอ">
                    <p>การสื่อสารคือหัวใจของทีมเวิร์ค ควรมีการอัปเดตความคืบหน้า แจ้งปัญหาที่พบ และรับฟังความคิดเห็นของเพื่อนร่วมทีมอย่างเปิดใจ</p>
                </ActionCard>
                <ActionCard icon={<Cog6ToothIcon className="w-6 h-6" />} title="3. ยืดหยุ่นและแก้ปัญหา">
                    <p>เมื่อเจอปัญหาหน้างาน (เช่น ฝนตก, คนมาร่วมน้อย, อุปกรณ์พัง) อย่าเพิ่งท้อ! ให้ตั้งสติ ช่วยกันคิดหาทางออก และปรับเปลี่ยนแผนให้เหมาะสมกับสถานการณ์</p>
                </ActionCard>
                <ActionCard icon={<CheckIcon className="w-6 h-6" />} title="4. คำนึงถึงความปลอดภัย">
                    <p>ในการลงพื้นที่หรือจัดกิจกรรม ต้องคำนึงถึงความปลอดภัยของทั้งทีมงานและผู้เข้าร่วมกิจกรรมเป็นอันดับแรกเสมอ</p>
                </ActionCard>
            </div>

            <h4 className="font-semibold text-xl !mt-8 text-slate-800 dark:text-slate-100">เทคนิคการทำงานให้สำเร็จตามเป้าหมาย</h4>
            <div className="mt-4 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700">
                <ul className="space-y-3 list-disc list-outside pl-5">
                    <li><strong>ยึดแผนเป็นหลัก แต่ปรับเปลี่ยนได้:</strong> ใช้แผนโครงการเป็นเข็มทิศนำทาง แต่อย่ายึดติดจนเกินไป หากสถานการณ์เปลี่ยนไป ต้องพร้อมปรับแผน</li>
                    <li><strong>บันทึกการทำงาน (Logbook):</strong> จดบันทึกสิ่งที่ทำ ปัญหาที่พบ และวิธีแก้ไขในแต่ละวัน ข้อมูลเหล่านี้จะมีประโยชน์มากตอนเขียนรายงานสรุปผล</li>
                    <li><strong>เก็บภาพและวิดีโอ:</strong> ถ่ายภาพหรือวิดีโอระหว่างการทำงานและจัดกิจกรรม เพื่อใช้เป็นหลักฐานและนำไปประกอบการนำเสนอ</li>
                    <li><strong>ให้กำลังใจกันและกัน:</strong> การทำงานเพื่อสังคมอาจเหนื่อยและท้อได้ง่าย การให้กำลังใจและชื่นชมเพื่อนร่วมทีมจะช่วยให้ทุกคนมีแรงก้าวต่อไป</li>
                </ul>
            </div>
        </div>
    </div>
);

export default Topic3;
