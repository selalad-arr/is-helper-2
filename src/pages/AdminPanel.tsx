import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, limit, orderBy } from 'firebase/firestore';
import { ICONS, UsersIcon, UserCircleIcon, AcademicCapIcon, MagnifyingGlassIcon } from '../ui/icons';

export const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'teacher' | 'student'>('teacher');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const q = query(
      collection(db, 'users'), 
      where('role', '==', activeTab),
      orderBy('createdAt', 'desc'),
      limit(100)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => {
      console.error("Admin query error:", err);
      setLoading(false);
    });
    
    return unsubscribe;
  }, [user, activeTab]);

  const filteredUsers = users.filter(u => 
    (u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     u.school?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ระบบผู้ดูแลระบบ 🛡️
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">จัดการผู้ใช้งานและตรวจสอบความเรียบร้อยของระบบ</p>
          </div>
          
          <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('teacher')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'teacher' 
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 dark:shadow-none' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <AcademicCapIcon className="w-4 h-4" />
              คุณครู
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'student' 
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 dark:shadow-none' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <UserCircleIcon className="w-4 h-4" />
              นักเรียน
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[3rem] shadow-sm border-2 border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="p-6 md:p-8 border-b-2 border-slate-50 dark:border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาชื่อ, อีเมล หรือโรงเรียน..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition-all"
              />
            </div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
              พบทั้งหมด <span className="text-sky-600 dark:text-sky-400 font-bold">{filteredUsers.length}</span> รายการ
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="px-8 py-4">ผู้ใช้งาน</th>
                  <th className="px-8 py-4">โรงเรียน / ชั้น</th>
                  <th className="px-8 py-4">วันที่สมัคร</th>
                  <th className="px-8 py-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/30">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-medium italic">กำลังโหลดข้อมูล...</td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-medium italic">ไม่พบข้อมูลผู้ใช้งาน</td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-sky-50/30 dark:hover:bg-slate-700/20 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 overflow-hidden">
                            {u.photoURL ? <img src={u.photoURL} alt="" className="w-full h-full object-cover" /> : <UserCircleIcon className="w-6 h-6" />}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 dark:text-white">{u.displayName || 'ไม่มีชื่อ'}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{u.school || '-'}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{u.grade ? `ชั้น ${u.grade}` : ''} {u.classNo ? `เลขที่ ${u.classNo}` : ''}</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString('th-TH') : '-'}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline">
                          ดูรายละเอียด
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
