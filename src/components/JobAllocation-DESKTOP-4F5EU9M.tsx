import React, { useState, useEffect } from 'react';
import { Users, UserPlus, CheckCircle2, Circle, Clock } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { ProjectCollaborator } from '../types';

const JobAllocation: React.FC = () => {
    const { user, userData } = useAuth();
    const [collaborators, setCollaborators] = useState<ProjectCollaborator[]>([]);
    const [newName, setNewName] = useState('');
    const [newRole, setNewRole] = useState('');
    const contextId = userData?.classId || 'personal';

    const fetchCollaborators = async () => {
        if (!user) return;
        const compositeId = `${user.uid}_${contextId}`;
        const collRef = doc(db, 'user_collaborators', compositeId);
        const snap = await getDoc(collRef);
        if (snap.exists()) {
            setCollaborators(snap.data().members || []);
        }
    };

    useEffect(() => {
        fetchCollaborators();
    }, [user, contextId]);

    const saveCollaborators = async (newList: ProjectCollaborator[]) => {
        if (!user) return;
        const compositeId = `${user.uid}_${contextId}`;
        const collRef = doc(db, 'user_collaborators', compositeId);
        await setDoc(collRef, { members: newList, lastUpdated: new Date() });
        setCollaborators(newList);
    };

    const addCollaborator = () => {
        if (!newName.trim()) return;
        const newMember: ProjectCollaborator = {
            name: newName,
            role: newRole || 'ผู้ช่วยวิจัย',
            assignedSections: [],
            status: 'active'
        };
        saveCollaborators([...collaborators, newMember]);
        setNewName('');
        setNewRole('');
    };

    const toggleStatus = (index: number) => {
        const newList = [...collaborators];
        newList[index].status = newList[index].status === 'completed' ? 'active' : 'completed';
        saveCollaborators(newList);
    };

    const removeCollaborator = (index: number) => {
        const newList = collaborators.filter((_, i) => i !== index);
        saveCollaborators(newList);
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <Users className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 italic">Job Allocation 👥</h3>
                    <p className="text-sm text-slate-500">แบ่งหน้าที่การตรวจเล่มรายงาน</p>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                {collaborators.map((c, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <button onClick={() => toggleStatus(idx)} className="text-slate-400 hover:text-emerald-500 transition-colors">
                                {c.status === 'completed' ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6" />}
                            </button>
                            <div>
                                <p className={`font-bold ${c.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>{c.name}</p>
                                <p className="text-xs text-slate-500">{c.role}</p>
                            </div>
                        </div>
                        <button onClick={() => removeCollaborator(idx)} className="text-xs text-red-400 hover:text-red-500 px-3 py-1 bg-red-50 dark:bg-red-900/10 rounded-lg">ลบ</button>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="ชื่อสมาชิก" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)}
                        className="flex-1 bg-white dark:bg-slate-700 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <input 
                        type="text" 
                        placeholder="บทบาท" 
                        value={newRole} 
                        onChange={(e) => setNewRole(e.target.value)}
                        className="flex-1 bg-white dark:bg-slate-700 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <button 
                    onClick={addCollaborator}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
                >
                    <UserPlus className="w-4 h-4" /> เพิ่มสมาชิก
                </button>
            </div>
        </div>
    );
};

export default JobAllocation;
