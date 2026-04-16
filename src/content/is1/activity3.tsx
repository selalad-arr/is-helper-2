
import React from 'react';
import { ActivityTextInput } from '../../components/common/ActivityTextInput';

const Activity3 = () => (
     <div className="space-y-4">
         <p><b>คำชี้แจง:</b> ให้นักเรียนตั้งสมมติฐานจากประเด็นที่นักเรียนสนใจจากตนเอง โรงเรียน ชุมชน สถานการณ์ปัจจุบันและสังคมโลก คนละ 3 ประเด็น ประเด็นละ 2 สมมติฐาน</p>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-100 dark:bg-slate-700">
                    <tr>
                        <th className="p-2 border border-slate-300 dark:border-slate-600">ประเด็น (Topic)</th>
                        <th className="p-2 border border-slate-300 dark:border-slate-600">สมมติฐาน</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(3)].map((_, i) => (
                        <React.Fragment key={i}>
                        <tr>
                            <td className="p-1 border border-slate-300 dark:border-slate-600" rowSpan={2}><textarea rows={3} className="w-full p-2 h-full border-0 rounded-md bg-slate-50 dark:bg-slate-700 focus:ring-0" placeholder={`ประเด็นที่ ${i+1}`}></textarea></td>
                            <td className="p-1 border border-slate-300 dark:border-slate-600"><ActivityTextInput placeholder="สมมติฐานที่ 1" /></td>
                        </tr>
                         <tr>
                             <td className="p-1 border border-slate-300 dark:border-slate-600"><ActivityTextInput placeholder="สมมติฐานที่ 2" /></td>
                         </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
         </div>
         <div className="mt-4">
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 whitespace-pre-wrap">ข้อคิดเห็นและข้อเสนอแนะของครูที่ปรึกษาประจำวิชา</label>
             <textarea rows={3} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"></textarea>
         </div>
    </div>
);

export default Activity3;
