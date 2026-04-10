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
import ProjectTopic13 from './topic13';
import ProjectTopic14 from './topic14';
import ProjectTopic15 from './topic15';
import ProjectTopic16 from './topic16';
import ProjectTopic17 from './topic17';

import AssistantPage from './assistant';

export const project_creation = {
    ...projectCreationConfig,
    phases: [
      {
        title: 'ช่วงที่ 1: เตรียมตัวออกเดินทาง 🚩',
        description: 'เริ่มต้นด้วยข้อมูลพื้นฐานและค้นหาไอเดียที่คุณหลงใหล',
        topicIndices: [0, 1, 2]
      },
      {
        title: 'ช่วงที่ 2: บทที่ 1 - เปิดหัวใจปัญหา 📝',
        description: 'วิเคราะห์ปัญหาที่แฝงอยู่และร่างจุดเริ่มต้นของโครงงาน',
        topicIndices: [3, 4, 5]
      },
      {
        title: 'ช่วงที่ 3: บทที่ 2 - ขุมทรัพย์ความรู้ 📚',
        description: 'สืบค้นข้อมูลสนับสนุนเพื่อให้โครงงานมีความน่าเชื่อถือ',
        topicIndices: [6, 7]
      },
      {
        title: 'ช่วงที่ 4: บทที่ 3 - วางแผนการรบ 🧪',
        description: 'ออกแบบการทดลองและวิธีการทำงานอย่างเป็นระบบ',
        topicIndices: [8, 9, 10]
      },
      {
        title: 'ช่วงที่ 5: บทที่ 4 - โชว์ผลลัพธ์ 📊',
        description: 'บันทึกสิ่งที่ค้นพบและนำเสนอผ่านกราฟ/ตารางที่เหมาะสม',
        topicIndices: [11, 12]
      },
      {
        title: 'ช่วงที่ 6: บทที่ 5 - บทเรียนและความสำเร็จ 🏁',
        description: 'สรุปสิ่งที่ได้เรียนรู้และแนวทางการพัฒนาต่อในอนาคต',
        topicIndices: [13, 14]
      },
      {
        title: 'ช่วงที่ 7: เข้าเส้นชัย 📚',
        description: 'จัดทำบทคัดย่อ อ้างอิง และรวบรวมเล่มรายงานฉบับสมบูรณ์',
        topicIndices: [15, 16]
      }
    ],
    topics: [
      { title: 'ก้าวที่ 1: แนะนำตัวนักประดิษฐ์ ✍️', details: ProjectTopic1 },
      { title: 'ก้าวที่ 2: ค้นหาไอเดียที่คุณหลงใหล 💡', details: ProjectTopic2 },
      { title: 'ก้าวที่ 3: ตั้งชื่อเรื่องสุดปัง 🏷️', details: ProjectTopic3 },
      { title: 'ก้าวที่ 4: วิเคราะห์ปัญหาที่อยากแก้ (AI) 🔍', details: ProjectTopic4 },
      { title: 'ก้าวที่ 5: ร่างบทนำและความสำคัญ (บทที่ 1) 📝', details: ProjectTopic5 },
      { title: 'ก้าวที่ 6: เป้าหมายและสมมติฐาน 🎯', details: ProjectTopic6 },
      { title: 'ก้าวที่ 7: กุญแจสู่การค้นความรู้ (AI) 🔑', details: ProjectTopic7 },
      { title: 'ก้าวที่ 8: สะสมแต้มความรู้ (บทที่ 2) 📚', details: ProjectTopic8 },
      { title: 'ก้าวที่ 9: วางกลยุทธ์การทดลอง (AI) 🧪', details: ProjectTopic9 },
      { title: 'ก้าวที่ 10: ความแม่นยำและการออกแบบ 🛠️', details: ProjectTopic10 },
      { title: 'ก้าวที่ 11: วิธีทำอย่างละเอียด (บทที่ 3) 📋', details: ProjectTopic11 },
      { title: 'ก้าวที่ 12: กราฟและตารางที่เหมาะสม (AI) 📊', details: ProjectTopic12 },
      { title: 'ก้าวที่ 13: บันทึกความว้าว (บทที่ 4) 🔍', details: ProjectTopic13 },
      { title: 'ก้าวที่ 14: ถอดรหัสผลการทดลอง (AI) 🔮', details: ProjectTopic14 },
      { title: 'ก้าวที่ 15: สรุปผลและข้อเสนอแนะ (บทที่ 5) 🏁', details: ProjectTopic15 },
      { title: 'ก้าวที่ 16: บทคัดย่อและเอกสารอ้างอิง ✍️', details: ProjectTopic16 },
      { title: 'ก้าวที่ 17: ตรวจสอบและดาวน์โหลดเล่มรายงาน 📚', details: ProjectTopic17 },

      { title: 'ผู้ช่วย AI ทั่วไป 🤖', details: AssistantPage },
    ]
};
