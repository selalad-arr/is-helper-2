
import React from 'react';
import { ActivityTextInput } from '../../components/common/ActivityTextInput';

const Activity1 = () => (
    <div className="space-y-4">
        <p><b>คำชี้แจง:</b> ให้นักเรียนทำความรู้จักและสร้างปฏิสัมพันธ์อันดีกับเพื่อนสมาชิกในห้องเรียน จากนั้นให้พิจารณาเลือกตั้งประธานกลุ่มสัมพันธ์ โดยมีการบริหารจัดการสมาชิกในกลุ่ม และการเลือกตั้งประธาน รองประธาน และเลขานุการกลุ่ม</p>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-700">
                    <tr>
                        <th className="p-2 border border-slate-300 dark:border-slate-600">ลำดับที่</th>
                        <th className="p-2 border border-slate-300 dark:border-slate-600">ชื่อ-สกุล</th>
                        <th className="p-2 border border-slate-300 dark:border-slate-600">ชั้น/ห้อง</th>
                        <th className="p-2 border border-slate-300 dark:border-slate-600">เลขที่</th>
                        <th className="p-2 border border-slate-300 dark:border-slate-600">ตำแหน่ง</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(7)].map((_, i) => (
                        <tr key={i}>
                            <td className="p-1 border border-slate-300 dark:border-slate-600 text-center">{i + 1}</td>
                            <td className="p-1 border border-slate-300 dark:border-slate-600"><ActivityTextInput /></td>
                            <td className="p-1 border border-slate-300 dark:border-slate-600"><ActivityTextInput /></td>
                            <td className="p-1 border border-slate-300 dark:border-slate-600"><ActivityTextInput /></td>
                            <td className="p-1 border border-slate-300 dark:border-slate-600"><ActivityTextInput placeholder={i === 0 ? 'ประธาน' : i === 1 ? 'รองประธาน' : i === 2 ? 'เลขานุการ' : 'กรรมการ'} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default Activity1;
