import { is2Config } from './config';
import CourseDescription from './CourseDescription';
import Topic0 from './topic0';
import Topic1 from './topic1';
import Topic2 from './topic2';
import Topic3 from './topic3';
import Topic4 from './topic4';
import Topic5 from './topic5';
import Topic6 from './topic6';
import Topic7 from './topic7';
import Topic8 from './topic8';
import Topic9 from './topic9';
import Topic10 from './topic10';
import AssistantPage from './assistant';

export const is2 = {
    ...is2Config,
    topics: [
      { title: 'คำอธิบายรายวิชา', details: CourseDescription },
      { title: 'บททบทวน: ค้นหาและพัฒนาหัวข้อโครงงาน (AI)', details: Topic0 },
      { title: 'บทที่ 1: หลักการเขียนรายงานเชิงวิชาการ', details: Topic1 },
      { title: 'บทที่ 2: การเขียนบทที่ 1 (บทนำ)', details: Topic2 },
      { title: 'บทที่ 3: การเขียนบทที่ 2 (เอกสารที่เกี่ยวข้อง)', details: Topic3 },
      { title: 'บทที่ 4: การเขียนบทที่ 3 (วิธีดำเนินการ)', details: Topic4 },
      { title: 'บทที่ 5: การเขียนบทที่ 4 (ผลการศึกษา)', details: Topic5 },
      { title: 'บทที่ 6: การเขียนบทที่ 5 (สรุปและอภิปรายผล)', details: Topic6 },
      { title: 'บทที่ 7: เครื่องมือช่วยเขียนรายงาน (AI)', details: Topic7 },
      { title: 'บทที่ 8: เครื่องมือช่วยออกแบบสไลด์ (AI)', details: Topic8 },
      { title: 'บทที่ 9: เทคนิคการนำเสนออย่างมีประสิทธิภาพ', details: Topic9 },
      { title: 'บทที่ 10: การเผยแพร่ผลงานสู่สาธารณะ', details: Topic10 },
      { title: 'ผู้ช่วย AI ทั่วไป', details: AssistantPage },
    ],
};