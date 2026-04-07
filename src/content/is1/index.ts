import React from 'react';
import { is1Config } from './config';
import CourseDescription from './CourseDescription';
import Topic1 from './topic1';
import Topic2 from './topic2';
import Topic3 from './topic3_new';
import Topic4 from './topic3'; // Re-purposed for 'Searching and Evaluating Sources'
import Topic5 from './topic5_new';
import Topic6 from './topic6';
import Topic7 from './topic7';
import Topic8 from './topic8'; // Corrected from './topic5' to show the right content
import Topic9 from './topic9';
import Topic10 from './topic10';
import AssistantPage from './assistant';

export const is1 = {
    ...is1Config,
    topics: [
      { title: 'คำอธิบายรายวิชา', details: CourseDescription },
      { title: 'บทที่ 1: การตั้งประเด็นปัญหาและความสำคัญ', details: Topic1 },
      { title: 'บทที่ 2: การตั้งสมมติฐาน', details: Topic2 },
      { title: 'บทที่ 3: การออกแบบการค้นคว้า', details: Topic3 },
      { title: 'บทที่ 4: การสืบค้นและประเมินแหล่งข้อมูล', details: Topic4 },
      { title: 'บทที่ 5: การสร้างเครื่องมือและการรวบรวมข้อมูล', details: Topic5 },
      { title: 'บทที่ 6: การวิเคราะห์ข้อมูล', details: Topic6 },
      { title: 'บทที่ 7: การสังเคราะห์และสรุปองค์ความรู้', details: Topic7 },
      { title: 'บทที่ 8: การเขียนรายงาน IS1', details: Topic8 },
      { title: 'บทที่ 9: การนำเสนอผลงาน', details: Topic9 },
      { title: 'บทที่ 10: คุณค่าและประโยชน์ของการทำ IS', details: Topic10 },
      { title: 'ผู้ช่วย AI ทั่วไป', details: AssistantPage },
    ]
};
