
import { is1 } from './is1';
import { is2 } from './is2';
import { is3 } from './is3';
import { project_creation } from './project_creation';

// Configuration for the new tutorial card on the homepage
export const tutorialCard = {
    key: 'tutorial',
    title: 'คู่มือการใช้งานแอป',
    subtitle: 'เริ่มต้นใช้งาน IS Helper',
    description: 'เรียนรู้วิธีการใช้งานฟีเจอร์ต่างๆ ของแอปพลิเคชัน ตั้งแต่การตั้งค่าครั้งแรกไปจนถึงการใช้ AI ช่วยทำโครงงาน',
    icon: 'QuestionMarkCircleIcon',
    color: 'from-slate-500 to-slate-700',
    path: '/student/tutorial',
    buttonText: 'ดูวิธีใช้',
};

export const IS_CONFIG = {
  tutorial: tutorialCard,
  project_creation,
  is1,
  is2,
  is3,
};
