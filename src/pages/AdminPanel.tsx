import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, limit, orderBy, getCountFromServer, updateDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ICONS, UsersIcon, UserCircleIcon, AcademicCapIcon, MagnifyingGlassIcon, SparklesIcon, XMarkIcon, PlusIcon, TrashIcon } from '../ui/icons';

const FOUNDER_EMAIL = 'selalad@gmail.com';

// --- Sub-components ---

const AIUsageModal = ({ userId, onClose }: { userId: string, onClose: () => void }) => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsage = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    setStats(userDoc.data());
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsage();
    }, [userId]);

    return (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl overflow-hidden"
            >
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <SparklesIcon className="w-5 h-5 text-sky-500" />
                        ประวัติการใช้งาน AI
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                        <ICONS.XMarkIcon className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
                <div className="p-6">
                    {loading ? (
                        <div className="py-10 text-center animate-pulse text-slate-400">กำลังโหลด...</div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">จำนวนการเรียกใช้ AI ทั้งหมด</span>
                                <span className="text-2xl font-black text-sky-600 dark:text-sky-400">{stats?.aiUsageCount || 0} ครั้ง</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">จำนวนโปรเจกต์ที่สร้าง</span>
                                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{stats?.projectCount || 0} ชุด</span>
                            </div>
                            <p className="text-xs text-center text-slate-400 mt-4 italic">
                                หมายเหตุ: ข้อมูลนี้เป็นยอดสะสมตั้งแต่เริ่มใช้งาน
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

// --- Main Component ---

export const AdminPanel: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // Safety check - double verify email
    if (user?.email !== FOUNDER_EMAIL) {
        return <Navigate to="/menu" replace />;
    }

    const [users, setUsers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [viewingUsageId, setViewingUsageId] = useState<string | null>(null);
    const [stats, setStats] = useState({
        totalUsers: 0,
        premiumUsers: 0,
        freeUsers: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const usersCol = collection(db, 'users');
            const [totalSnap, premiumSnap] = await Promise.all([
                getCountFromServer(usersCol),
                getCountFromServer(query(usersCol, where('isPremium', '==', true)))
            ]);
            setStats({
                totalUsers: totalSnap.data().count,
                premiumUsers: premiumSnap.data().count,
                freeUsers: totalSnap.data().count - premiumSnap.data().count
            });
        };
        fetchStats();
    }, [users]);

    useEffect(() => {
        setLoading(true);
        const q = query(collection(db, 'users'), limit(100));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleTogglePremium = async (uId: string, currentStatus: boolean) => {
        const nextStatus = !currentStatus;
        if (!window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการ ${nextStatus ? 'เพิ่มสิทธิ์ Premium' : 'ยกเลิกสิทธิ์ Premium'} ให้กับผู้ใช้รายนี้?`)) return;
        
        try {
            await updateDoc(doc(db, 'users', uId), {
                isPremium: nextStatus,
                subscriptionExpires: nextStatus ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null
            });
        } catch (err) {
            console.error(err);
            alert("เกิดข้อผิดพลาด");
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail.trim().includes('@')) return;
        setIsAdding(true);
        try {
            // Check if user exists by searching email
            const q = query(collection(db, 'users'), where('email', '==', newEmail.trim()));
            const snap = await getCountFromServer(q);
            
            if (snap.data().count > 0) {
                alert("ผู้ใช้นี้มีในระบบอยู่แล้ว กรุณาค้นหาและจัดการสิทธิ์ในตาราง");
            } else {
                // Pre-authorize access by creating a placeholder doc (using email as ID or random)
                // Here we just alert and let you know it's better to manage existing users
                // For a real app, you might want to create a 'pre_authorized' collection
                alert("สำหรับเฟสนี้ แนะนำให้ผู้ใช้ Log in เข้ามาก่อน แล้วค่อยค้นหาอีเมลเพื่อเปิดสิทธิ์จากตารางครับ");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsAdding(false);
            setNewEmail('');
        }
    };

    const filteredUsers = users.filter(u => 
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-8 px-4 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-widest mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                         Founder Exclusive Access
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                        Founder Dashboard <span className="text-rose-500">🛡️</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">จัดการสิทธิ์สมาชิกและตรวจสอบความเรียบร้อยของระบบ โดยคุณ {FOUNDER_EMAIL}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm min-w-[120px]">
                        <div className="text-xs font-bold text-slate-400 mb-1 uppercase">สมาชิกรวม</div>
                        <div className="text-2xl font-black text-slate-800 dark:text-white">{stats.totalUsers}</div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-3xl border border-amber-100 dark:border-amber-900/20 shadow-sm min-w-[120px]">
                        <div className="text-xs font-bold text-amber-500 mb-1 uppercase">Premium</div>
                        <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{stats.premiumUsers}</div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden">
                        <div className="p-6 md:p-8 border-b border-slate-50 dark:border-slate-700/50 flex flex-col md:flex-row gap-4 justify-between items-center">
                            <div className="relative w-full max-w-sm">
                                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="ค้นหาด้วย Email หรือชื่อ..."
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none transition-all text-sm font-medium"
                                />
                            </div>
                            <div className="text-xs font-bold text-slate-400 uppercase">
                                แสดงผลล่าสุด {filteredUsers.length} รายการ
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-slate-900/30 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                                        <th className="px-8 py-5">ผู้ใช้งาน / Email</th>
                                        <th className="px-8 py-5 text-center">สถานะ</th>
                                        <th className="px-8 py-5">วันที่หมดอายุ</th>
                                        <th className="px-8 py-5 text-right">การจัดการ</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-700/30">
                                    {filteredUsers.map((u) => (
                                        <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/10 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 overflow-hidden border border-slate-200 dark:border-slate-600">
                                                        {u.photoURL ? <img src={u.photoURL} alt="" className="w-full h-full object-cover" /> : <UserCircleIcon className="w-6 h-6" />}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-slate-800 dark:text-white text-sm leading-tight mb-1">{u.displayName || 'No Name'}</div>
                                                        <div className="text-xs font-medium text-slate-400">{u.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                {u.isPremium ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] font-black rounded-lg uppercase tracking-wider border border-amber-200 dark:border-amber-800">
                                                        <SparklesIcon className="w-3 h-3" /> Premium
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-black rounded-lg uppercase tracking-wider border border-slate-200 dark:border-slate-600">
                                                        Free User
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                                                    {u.subscriptionExpires?.toDate ? u.subscriptionExpires.toDate().toLocaleDateString('th-TH') : '-'}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right space-x-2">
                                                <button
                                                    onClick={() => setViewingUsageId(u.id)}
                                                    className="p-2 text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-xl transition-all"
                                                    title="ดูประวัติการใช้งาน AI"
                                                >
                                                    <SparklesIcon className="w-5 h-5" />
                                                </button>
                                                
                                                {u.isPremium ? (
                                                    <button
                                                        onClick={() => handleTogglePremium(u.id, true)}
                                                        className="px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-[10px] font-black rounded-lg hover:bg-rose-100 transition-all border border-rose-100 dark:border-rose-800"
                                                    >
                                                        ยกเลิกสิทธิ์
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleTogglePremium(u.id, false)}
                                                        className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-lg hover:bg-emerald-100 transition-all border border-emerald-100 dark:border-emerald-800"
                                                    >
                                                        ให้ Premium
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl group-hover:bg-rose-500/30 transition-all duration-700"></div>
                        <h3 className="text-xl font-black mb-4 relative z-10 flex items-center gap-2">
                            <PlusIcon className="w-6 h-6 text-rose-500" />
                            เพิ่มสิทธิ์ด้วย Email
                        </h3>
                        <p className="text-slate-400 text-sm mb-6 relative z-10 leading-relaxed font-medium">
                            กรอก Email ผู้ใช้ที่ต้องการอัปเกรดเป็น Premium โดยระบบจะทำการเปิดสิทธิ์ 30 วันนับจากนี้
                        </p>
                        <form onSubmit={handleAddUser} className="space-y-4 relative z-10">
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="name@email.com"
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none transition-all text-sm font-bold text-white placeholder-white/30"
                            />
                            <button
                                type="submit"
                                disabled={isAdding}
                                className="w-full py-4 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-rose-500/30 active:scale-[0.98] transition-all"
                            >
                                {isAdding ? 'กำลังดำเนินการ...' : 'สั่งเปิดสิทธิ์ Premium ✨'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-black text-slate-800 dark:text-white mb-4">Founder Quick Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Free Conversion</span>
                                <span className="font-black text-slate-800 dark:text-white">
                                    {stats.totalUsers > 0 ? ((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1) : 0}%
                                </span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-rose-500" 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stats.premiumUsers / (stats.totalUsers || 1)) * 100}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-slate-400 italic">
                                * ข้อมูลอัปเดตแบบเรียลไทม์จาก Firestore
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {viewingUsageId && (
                    <AIUsageModal userId={viewingUsageId} onClose={() => setViewingUsageId(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};
