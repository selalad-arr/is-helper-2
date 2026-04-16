import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, limit, getCountFromServer, updateDoc, doc } from 'firebase/firestore';

// Sub-components
import AIUsageModal from './AIUsageModal';
import { AdminHeader } from './AdminHeader';
import UserTable from './UserTable';
import { AddUserForm, QuickStats } from './SidePanel';

const FOUNDER_EMAIL = 'selalad@gmail.com';

export const AdminPanel: React.FC = () => {
    const { user } = useAuth();
    
    if (user?.email !== FOUNDER_EMAIL) {
        return <Navigate to="/menu" replace />;
    }

    const [users, setUsers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [viewingUsageId, setViewingUsageId] = useState<string | null>(null);
    const [stats, setStats] = useState({
        totalUsers: 0,
        premiumUsers: 0,
        freeUsers: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const usersCol = collection(db, 'users');
            const totalSnap = await getCountFromServer(usersCol);
            const premiumSnap = await getCountFromServer(query(usersCol, where('isPremium', '==', true)));
            
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
        if (!window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการเปลี่ยนสถานะ Premium?`)) return;
        
        try {
            await updateDoc(doc(db, 'users', uId), {
                isPremium: nextStatus,
                subscriptionExpires: nextStatus ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null
            });
        } catch (err) { console.error(err); }
    };

    return (
        <div className="py-8 px-4 max-w-7xl mx-auto">
            <AdminHeader totalUsers={stats.totalUsers} premiumUsers={stats.premiumUsers} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="lg:col-span-2">
                    <UserTable 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filteredUsers={users.filter(u => 
                            u.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            u.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
                        )}
                        onViewUsage={setViewingUsageId}
                        onTogglePremium={handleTogglePremium}
                    />
                </div>

                <div className="space-y-6">
                    <QuickStats 
                        premiumUsers={stats.premiumUsers}
                        totalUsers={stats.totalUsers}
                    />
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

export default AdminPanel;
