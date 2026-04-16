import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import { collection, query, orderBy, limit, onSnapshot, where, doc } from 'firebase/firestore';
import { Task } from '../../types';

// Sub-components
import HeroSection from './HeroSection';
import { ConsultationFeed, TaskFeed } from './Feeds';
import ProjectConfigCards from './ProjectConfigCards';
import { StudentOnboarding } from '../../components/StudentOnboarding';

export const HomePage = () => {
    const { user, userData, userRole, selectClassroom } = useAuth();
    const navigate = useNavigate();
    const [consultations, setConsultations] = useState<any[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (!user || userRole !== 'student') return;

        const q = query(
            collection(db, 'users', user.uid, 'consultations'),
            orderBy('createdAt', 'desc'),
            limit(3)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setConsultations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return unsubscribe;
    }, [user, userRole]);

    useEffect(() => {
        if (!user || userRole !== 'student' || !userData?.classId) return;

        const q = query(
            collection(db, 'tasks'),
            where('classId', 'in', [userData.classId, 'all']),
            orderBy('createdAt', 'desc'),
            limit(5)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task)));
        });

        return unsubscribe;
    }, [user, userRole, userData?.classId]);

    // Redirect if classroom deleted
    useEffect(() => {
        if (userRole === 'student' && userData?.classId) {
            const classroomRef = doc(db, 'classrooms', userData.classId);
            const unsubscribe = onSnapshot(classroomRef, (docSnap) => {
                if (!docSnap.exists()) {
                    console.log("Current classroom deleted, redirecting to selection...");
                    selectClassroom(null);
                    navigate('/student');
                }
            });

            return () => {
                if (unsubscribe) unsubscribe();
            };
        }
    }, [userRole, userData?.classId, navigate, selectClassroom]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-10 md:py-20 max-w-7xl mx-auto px-4"
        >
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="grow w-full space-y-12">
                    <HeroSection user={user} userRole={userRole} userData={userData} />
                    
                    <ConsultationFeed consultations={consultations} />
                    
                    <TaskFeed tasks={tasks} />
                    
                    <ProjectConfigCards />
                </div>

                {user && userRole === 'student' && !userData?.onboardingComplete && (
                    <div className="w-full lg:w-80 lg:sticky lg:top-24 shrink-0">
                        <StudentOnboarding />
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default HomePage;
