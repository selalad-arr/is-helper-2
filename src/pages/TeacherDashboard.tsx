import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { ICONS, ChevronRightIcon, PlusIcon, TrashIcon, UsersIcon } from '../ui/icons';

export const TeacherDashboard: React.FC = () => {
  const { user, userData } = useAuth();
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<any | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.uid === 'admin-mock-id') return;
    const q = query(collection(db, 'classrooms'), where('teacherId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setClassrooms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      console.error("Error fetching classrooms:", err);
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!selectedClassroom) {
      setStudents([]);
      return;
    }

    const q = query(
      collection(db, 'users'),
      where('classId', '==', selectedClassroom.id),
      where('role', '==', 'student')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      console.error("Error fetching students:", err);
    });

    return unsubscribe;
  }, [selectedClassroom]);

  const generateClassCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim() || !user) return;
    setLoading(true);
    try {
      const classCode = generateClassCode();
      await addDoc(collection(db, 'classrooms'), {
        classId: '', // Will be updated by Firestore or we can use doc.id
        className: newClassName,
        classCode: classCode,
        teacherId: user.uid,
        teacherName: userData?.displayName || user.email,
        createdAt: serverTimestamp(),
        studentCount: 0
      });
      setNewClassName('');
      setShowCreateModal(false);
    } catch (err) {
      console.error("Error creating class:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClass = async (id: string) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบห้องเรียนนี้?')) {
      try {
        await deleteDoc(doc(db, 'classrooms', id));
      } catch (err) {
        console.error("Error deleting class:", err);
      }
    }
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ห้องเรียนของฉัน 🏫
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">จัดการห้องเรียนและติดตามความก้าวหน้าของนักเรียน</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl shadow-lg shadow-sky-200 dark:shadow-none transition-all transform active:scale-95"
          >
            <PlusIcon className="w-5 h-5" />
            สร้างห้องเรียนใหม่
          </button>
        </div>

        {classrooms.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
            <div className="inline-flex p-6 bg-slate-50 dark:bg-slate-900 rounded-full text-slate-400 mb-4">
              <UsersIcon className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">ยังไม่มีห้องเรียน</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">เริ่มต้นด้วยการสร้างห้องเรียนแรกของคุณ</p>
          </div>
        ) : selectedClassroom ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-800 rounded-[3rem] shadow-sm border-2 border-slate-100 dark:border-slate-700 overflow-hidden"
          >
            <div className="p-8 border-b-2 border-slate-50 dark:border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedClassroom(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                >
                  <ChevronRightIcon className="w-6 h-6 rotate-180" />
                </button>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{selectedClassroom.className}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      CODE: {selectedClassroom.classCode}
                    </span>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                      {students.length} นักเรียน
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {students.length === 0 ? (
                <div className="text-center py-12 text-slate-400 italic">ยังไม่มีนักเรียนเข้าร่วมห้องเรียนนี้</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400 overflow-hidden">
                        {student.photoURL ? (
                          <img src={student.photoURL} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <UsersIcon className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-white">{student.displayName || 'ไม่มีชื่อ'}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">เลขที่ {student.classNo || '-'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map((classroom) => (
              <motion.div
                key={classroom.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border-2 border-slate-100 dark:border-slate-700 hover:border-sky-200 dark:hover:border-sky-900/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-sky-100 dark:bg-sky-900/30 rounded-2xl text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                    <ICONS.BookOpenIcon className="w-8 h-8" />
                  </div>
                  <button
                    onClick={() => handleDeleteClass(classroom.id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-sky-600 transition-colors">
                  {classroom.className}
                </h3>
                
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-1">
                    <UsersIcon className="w-4 h-4" />
                    <span>{classroom.studentCount || 0} นักเรียน</span>
                  </div>
                  <div className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300">
                    CODE: {classroom.classCode}
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedClassroom(classroom)}
                  className="w-full py-4 bg-slate-50 dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-sky-900/20 text-slate-600 dark:text-slate-300 font-bold rounded-2xl border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  ดูรายละเอียด
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Create Class Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-md bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">สร้างห้องเรียนใหม่</h3>
                <form onSubmit={handleCreateClass} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">ชื่อห้องเรียน</label>
                    <input
                      autoFocus
                      type="text"
                      value={newClassName}
                      onChange={(e) => setNewClassName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                      placeholder="เช่น ม.3/1 วิชา IS1"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl transition-colors"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !newClassName.trim()}
                      className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-200 dark:shadow-none transition-all disabled:opacity-50"
                    >
                      {loading ? 'กำลังสร้าง...' : 'สร้างห้องเรียน'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
