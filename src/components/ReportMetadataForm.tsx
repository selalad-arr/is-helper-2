import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface ReportMetadata {
    authorName: string;
    schoolName: string;
    semester: string;
    subjectName: string;
    subjectCode: string;
    acknowledgements: string;
    projectAbstract: string;
    references: string;
}

interface Props {
    mode: 'early' | 'late';
}

const ReportMetadataForm: React.FC<Props> = ({ mode }) => {
    const [metadata, setMetadata] = useState<ReportMetadata>({
        authorName: '',
        schoolName: '',
        semester: `ภาคเรียนที่ 1 ปีการศึกษา ${new Date().getFullYear() + 543}`,
        subjectName: '',
        subjectCode: '',
        acknowledgements: '',
        projectAbstract: '',
        references: ''
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                const reportRef = doc(db, 'user_reports', user.uid);
                const unsubscribeSnapshot = onSnapshot(reportRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data() as Partial<ReportMetadata>;
                        setMetadata(prev => ({
                            ...prev,
                            ...data
                        }));
                    }
                    setIsLoading(false);
                }, (error) => {
                    console.error("Error fetching report metadata:", error);
                    setIsLoading(false);
                });
                return () => unsubscribeSnapshot();
            } else {
                setIsLoading(false);
            }
        });
        return () => unsubscribeAuth();
    }, []);

    const handleSave = async (field: keyof ReportMetadata, value: string) => {
        const user = auth.currentUser;
        if (!user) return;
        
        // Update local state immediately for responsiveness
        setMetadata(prev => ({ ...prev, [field]: value }));

        try {
            const reportRef = doc(db, 'user_reports', user.uid);
            await setDoc(reportRef, { [field]: value, uid: user.uid }, { merge: true });
        } catch (err) {
            console.error(`Error saving ${field}:`, err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-4">
                <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
            </div>
        );
    }

    if (mode === 'early') {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">ชื่อผู้จัดทำ (ระบุทีละคน ครั้งละบรรทัด)</label>
                        <textarea 
                            value={metadata.authorName} 
                            onChange={e => handleSave('authorName', e.target.value)}
                            placeholder="เช่น&#10;1. นายสมชาย ใจดี&#10;2. นางสาวสวย เรียนเก่ง"
                            rows={3} 
                            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 transition-all text-slate-800 dark:text-slate-200"
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">ชื่อโรงเรียน</label>
                            <input 
                                value={metadata.schoolName} 
                                onChange={e => handleSave('schoolName', e.target.value)}
                                placeholder="เช่น โรงเรียนวิทยาศาสตร์..."
                                type="text" 
                                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 transition-all text-slate-800 dark:text-slate-200"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">ภาคเรียน/ปีการศึกษา</label>
                            <input 
                                value={metadata.semester} 
                                onChange={e => handleSave('semester', e.target.value)}
                                type="text" 
                                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 transition-all text-slate-800 dark:text-slate-200"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">ชื่อวิชาที่เรียน</label>
                        <input 
                            value={metadata.subjectName} 
                            onChange={e => handleSave('subjectName', e.target.value)}
                            placeholder="เช่น วิชาวิทยาศาสตร์ (IS2)"
                            type="text" 
                            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 transition-all text-slate-800 dark:text-slate-200"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">รหัสวิชา</label>
                        <input 
                            value={metadata.subjectCode} 
                            onChange={e => handleSave('subjectCode', e.target.value)}
                            placeholder="เช่น ว30202"
                            type="text" 
                            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 transition-all text-slate-800 dark:text-slate-200"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">กิตติกรรมประกาศ (ขอบคุณผู้ช่วยเหลือ/ที่ปรึกษา)</label>
                    <textarea 
                        value={metadata.acknowledgements} 
                        onChange={e => handleSave('acknowledgements', e.target.value)}
                        placeholder="เขียนขอบคุณคุณครูที่ปรึกษา ผู้ปกครอง หรือผู้ที่มีส่วนร่วมในการทำให้โครงงานนี้สำเร็จจ้า..."
                        rows={3} 
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 transition-all text-slate-800 dark:text-slate-200"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">บทคัดย่อ (ย่อหน้าเดียว สรุปภาพรวมจากบทที่ 1-5)</label>
                <textarea 
                    value={metadata.projectAbstract} 
                    onChange={e => handleSave('projectAbstract', e.target.value)}
                    placeholder="เล่าว่าทำอะไร ทำอย่างไร และผลเป็นอย่างไร แบบสั้นๆ ในย่อหน้าเดียวจ้า..."
                    rows={4} 
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 transition-all text-slate-800 dark:text-slate-200"
                />
            </div>
            <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">เอกสารอ้างอิง</label>
                <textarea 
                    value={metadata.references} 
                    onChange={e => handleSave('references', e.target.value)}
                    placeholder="เช่น&#10;1. ชื่อผู้แต่ง. (ปีที่พิมพ์). ชื่อหนังสือ. สำนักพิมพ์.&#10;2. เว็บไซต์..."
                    rows={4} 
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-500 transition-all text-slate-800 dark:text-slate-200"
                />
            </div>
        </div>
    );
};

export default ReportMetadataForm;
