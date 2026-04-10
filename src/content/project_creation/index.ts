import { projectCreationConfig } from './config';
import ProjectTopic1 from './topic1';
import ProjectTopic2 from './topic2';
import ProjectTopic3 from './topic3';
import ProjectTopic4 from './topic4';
import ProjectTopic5 from './topic5';
import ProjectTopic6 from './topic6';
import ProjectTopic7 from './topic7';
import ProjectTopic8 from './topic8';
import ProjectTopic9 from './topic9';
import ProjectTopic10 from './topic10';
import ProjectTopic11 from './topic11';
import ProjectTopic12 from './topic12';

import AssistantPage from './assistant';

export const project_creation = {
    ...projectCreationConfig,
    topics: [
      { title: 'ก้าวที่ 1: หาไอเดียทำโครงงาน 💡', details: ProjectTopic1 },
      { title: 'ก้าวที่ 2: สิ่งที่อยากจะแก้ไข 🎯', details: ProjectTopic2 },
      { title: 'ก้าวที่ 3: วิธีการหาข้อมูล 🕒', details: ProjectTopic3 },
      { title: 'ก้าวที่ 4: ช่วยในการจัดรูปแบบการทำรายงาน 📚', details: ProjectTopic4 },
      { title: 'ก้าวที่ 5: การเขียนบทนำ (บทที่ 1) 📝', details: ProjectTopic5 },
      { title: 'ก้าวที่ 6: การเขียนเอกสารที่เกี่ยวข้อง (บทที่ 2) 📊', details: ProjectTopic6 },
      { title: 'ก้าวที่ 7: ข้อกำหนดความเชื่อมั่นและความหมายของชุดการทดลอง 🔮', details: ProjectTopic7 },
      { title: 'ก้าวที่ 8: การออกแบบสิ่งประดิษฐ์ การทดลอง และการวางแผนเก็บข้อมูล 🛠️', details: ProjectTopic8 },
      { title: 'ก้าวที่ 9: การเขียนรายงานวิธีการทดลอง วิธีทำ หรือวิธีสำรวจ (บทที่ 3) 🧪', details: ProjectTopic9 },
      { title: 'ก้าวที่ 10: การเขียนและออกแบบการแสดงผลการทดลอง (บทที่ 4) 🔍', details: ProjectTopic10 },
      { title: 'ก้าวที่ 11: การเขียนสรุปผล อภิปรายผล และข้อเสนอแนะ (บทที่ 5) 🏁', details: ProjectTopic11 },
      { title: 'ก้าวที่ 12: การนำเสนอโครงงาน การทำบอร์ดโครงงาน และโปสเตอร์โครงงาน 🖼️', details: ProjectTopic12 },

      { title: 'ผู้ช่วย AI ทั่วไป 🤖', details: AssistantPage },
    ]
};
