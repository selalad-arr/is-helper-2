
import { is3Config } from './config';
import Topic1 from './topic1';
import Topic2 from './topic2';
import Topic3 from './topic3';
import Topic4 from './topic4';
import AssistantPage from './assistant';

export const is3 = {
    ...is3Config,
    topics: [
      { title: 'การสำรวจและวิเคราะห์ปัญหาสังคม', details: Topic1 },
      { title: 'การวางแผนโครงการเพื่อบริการสังคม', details: Topic2 },
      { title: 'การลงมือปฏิบัติและแก้ไขปัญหา', details: Topic3 },
      { title: 'การประเมินและสรุปผลโครงการ', details: Topic4 },
      { title: 'ผู้ช่วย AI ทั่วไป', details: AssistantPage },
    ],
};