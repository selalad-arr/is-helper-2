import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, limit, orderBy, getCountFromServer, updateDoc, doc, getDoc } from 'firebase/firestore';
import { ICONS, UsersIcon, UserCircleIcon, AcademicCapIcon, MagnifyingGlassIcon, PresentationChartBarIcon as ChartBarIcon, BookOpenIcon, XMarkIcon } from '../ui/icons';

// --- Sub-components ---

const UserDetailModal = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    const baseTab = location.pathname.includes('/students') ? 'students' : 'teachers';

    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        const fetchUser = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    setSelectedUser({ id: userDoc.id, ...userDoc.data() });
                }
            } catch (err) {
                console.error("Error fetching user details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    const handleUpdateRole = async (uId: string, newRole: string) => {
        if (!window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการเปลี่ยนบทบาทเป็น ${newRole}?`)) return;
        try {
            await updateDoc(doc(db, 'users', uId), { role: newRole });
            setSelectedUser((prev: any) => prev ? { ...prev, role: newRole } : prev);
        } catch (err) {
            console.error("Error updating user role:", err);
            alert("เกิดข้อผิดพลาดในการเปลี่ยนบทบาท");
        }
    };

    const onClose = () => {
        navigate(`/admin/${baseTab}`);
    };

    if (!userId) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
                {!selectedUser && loading ? (
                    <div className="p-20 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500"></div>
                    </div>
                ) : !selectedUser ? (
                    <div className="p-20 text-center text-slate-500 font-bold">ไม่พบข้อมูลผู้ใช้งาน</div>
                ) : (
                    <>
                        <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">รายละเอียดผู้ใช้งาน</h3>
                            <button 
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                            >
                                <XMarkIcon className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>
                        
                        <div className="p-8">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 text-3xl overflow-hidden shadow-inner">
                                    {selectedUser.photoURL ? <img src={selectedUser.photoURL} alt="" className="w-full h-full object-cover" /> : <UserCircleIcon className="w-12 h-12" />}
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-slate-800 dark:text-white mb-1">{selectedUser.displayName || 'ไม่มีชื่อ'}</div>
                                    <div className="text-slate-500 dark:text-slate-400 font-medium">{selectedUser.email}</div>
                                    <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                        selectedUser.role === 'admin' ? 'bg-rose-100 text-rose-600' :
                                        selectedUser.role === 'teacher' ? 'bg-purple-100 text-purple-600' :
                                        'bg-emerald-100 text-emerald-600'
                                    }`}>
                                        {selectedUser.role}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">โรงเรียน / สถาบัน</div>
                                    <div className="font-bold text-slate-700 dark:text-slate-300">{selectedUser.school || '-'}</div>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">ชั้น / ห้อง</div>
                                    <div className="font-bold text-slate-700 dark:text-slate-300">
                                        {selectedUser.grade ? `ม.${selectedUser.grade}` : ''} {selectedUser.classNo ? `/${selectedUser.classNo}` : '-'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">จัดการบทบาทผู้ใช้งาน</div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleUpdateRole(selectedUser.id, 'student')}
                                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                                            selectedUser.role === 'student' 
                                                ? 'bg-emerald-500 text-white border-emerald-500 cursor-default shadow-lg shadow-emerald-200' 
                                                : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-emerald-200 hover:text-emerald-500'
                                        }`}
                                    >
                                        นักเรียน
                                    </button>
                                    <button
                                        onClick={() => handleUpdateRole(selectedUser.id, 'teacher')}
                                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                                            selectedUser.role === 'teacher' 
                                                ? 'bg-purple-500 text-white border-purple-500 cursor-default shadow-lg shadow-purple-200' 
                                                : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-purple-200 hover:text-purple-500'
                                        }`}
                                    >
                                        คุณครู
                                    </button>
                                    <button
                                        onClick={() => handleUpdateRole(selectedUser.id, 'admin')}
                                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                                            selectedUser.role === 'admin' 
                                                ? 'bg-rose-500 text-white border-rose-500 cursor-default shadow-lg shadow-rose-200' 
                                                : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-rose-200 hover:text-rose-500'
                                        }`}
                                    >
                                        แอดมิน
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
                            <div className="text-xs text-slate-400 italic text-center">
                                UID: {selectedUser.uid} | ผู้ใช้นี้สมัครเมื่อ {selectedUser.createdAt?.toDate ? selectedUser.createdAt.toDate().toLocaleString('th-TH') : '-'}
                            </div>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

// --- Main Component ---

export const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Derive activeTab from URL path
  const activeTab = location.pathname.includes('/students') ? 'student' : 'teacher';
  const baseTab = activeTab === 'student' ? 'students' : 'teachers';
  
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTeachers: 0,
    totalStudents: 0,
    totalClassrooms: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersCol = collection(db, 'users');
        const classroomsCol = collection(db, 'classrooms');
        
        const [totalSnap, teacherSnap, studentSnap, classSnap] = await Promise.all([
          getCountFromServer(usersCol),
          getCountFromServer(query(usersCol, where('role', '==', 'teacher'))),
          getCountFromServer(query(usersCol, where('role', '==', 'student'))),
          getCountFromServer(classroomsCol)
        ]);

        setStats({
          totalUsers: totalSnap.data().count,
          totalTeachers: teacherSnap.data().count,
          totalStudents: studentSnap.data().count,
          totalClassrooms: classSnap.data().count
        });
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      }
    };
    fetchStats();
  }, []);

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

  const renderListView = () => (
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
              <>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={`skeleton-${i}`} className="animate-pulse">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700"></div>
                        <div className="space-y-2">
                          <div className="h-3 w-24 bg-slate-100 dark:bg-slate-700 rounded"></div>
                          <div className="h-2 w-32 bg-slate-50 dark:bg-slate-800 rounded"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="space-y-1">
                        <div className="h-3 w-20 bg-slate-100 dark:bg-slate-700 rounded"></div>
                        <div className="h-2 w-16 bg-slate-50 dark:bg-slate-800 rounded"></div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="h-2 w-16 bg-slate-50 dark:bg-slate-800 rounded"></div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="h-8 w-24 bg-slate-100 dark:bg-slate-700 rounded-lg ml-auto"></div>
                    </td>
                  </tr>
                ))}
              </>
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
                    <Link 
                      to={`/admin/${baseTab}/${u.id}`}
                      className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline px-4 py-2 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors"
                    >
                      ดูรายละเอียด
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-grow max-w-3xl">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border-2 border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                        <UsersIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400">ผู้ใช้ทั้งหมด</div>
                        <div className="text-xl font-black text-slate-800 dark:text-white">{stats.totalUsers}</div>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border-2 border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
                        <AcademicCapIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400">คุณครู</div>
                        <div className="text-xl font-black text-slate-800 dark:text-white">{stats.totalTeachers}</div>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border-2 border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                        <UserCircleIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400">นักเรียน</div>
                        <div className="text-xl font-black text-slate-800 dark:text-white">{stats.totalStudents}</div>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border-2 border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400">
                        <BookOpenIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400">ห้องเรียน</div>
                        <div className="text-xl font-black text-slate-800 dark:text-white">{stats.totalClassrooms}</div>
                    </div>
                </div>
            </div>
          </div>
          
          <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <Link
              to="/admin/teachers"
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'teacher' 
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 dark:shadow-none' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <AcademicCapIcon className="w-4 h-4" />
              คุณครู
            </Link>
            <Link
              to="/admin/students"
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'student' 
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 dark:shadow-none' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <UserCircleIcon className="w-4 h-4" />
              นักเรียน
            </Link>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/admin/teachers" replace />} />
          <Route path="/teachers" element={renderListView()} />
          <Route path="/students" element={renderListView()} />
          <Route path="/teachers/:userId" element={
            <>
                {renderListView()}
                <UserDetailModal />
            </>
          } />
          <Route path="/students/:userId" element={
            <>
                {renderListView()}
                <UserDetailModal />
            </>
          } />
          <Route path="*" element={<Navigate to="/admin/teachers" replace />} />
        </Routes>
      </div>
    </div>
  );
};
