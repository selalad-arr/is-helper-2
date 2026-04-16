import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, AuthProvider as FirebaseAuthProvider } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, lineProvider, db } from '../../firebase';
import { doc, setDoc, collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { AuthContextType } from './types';

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  userRole: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
  joinClassroom: async () => {},
  selectClassroom: async () => {},
  selectRole: async () => {},
  switchRole: async () => {},
  checkAccess: () => false,
  authError: null,
  clearError: () => {},
  isUserDataLoaded: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

  const userRef = useRef<any | null>(null);
  const isMockAdminRef = useRef<boolean>(false);
  const processedUidRef = useRef<string | null>(null);
  const isLoggingInRef = useRef<boolean>(false);

  useEffect(() => {
    let unsubscribeDoc: (() => void) | undefined;
    
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (isMockAdminRef.current && !currentUser) {
        setLoading(false);
        return;
      }

      userRef.current = currentUser;
      
      if (currentUser) {
        if (processedUidRef.current === currentUser.uid) {
          setUser(currentUser);
          setIsUserDataLoaded(true);
          setLoading(false);
          return;
        }

        processedUidRef.current = currentUser.uid;
        isMockAdminRef.current = false;
        setUser(currentUser);

        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          if (unsubscribeDoc) unsubscribeDoc();
          
          unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              const finalRole = currentUser.email === 'selalad@gmail.com' ? 'admin' : (data.role || null);
              setUserData(data);
              setUserRole(finalRole);
            } else {
              const finalRole = currentUser.email === 'selalad@gmail.com' ? 'admin' : null;
              const defaultData: any = {
                uid: currentUser.uid,
                email: currentUser.email || '',
                displayName: currentUser.displayName || '',
                photoURL: currentUser.photoURL || '',
                createdAt: serverTimestamp(),
                onboardingComplete: false,
                isPremium: false,
                aiUsageCount: 0,
                projectCount: 0
              };
              if (finalRole) defaultData.role = finalRole;
              setUserData(defaultData);
              setUserRole(finalRole);
              setDoc(userDocRef, defaultData, { merge: true });
            }
            setIsUserDataLoaded(true);
            setLoading(false);
          }, (error) => {
            console.error("Error fetching user data:", error);
            setIsUserDataLoaded(true);
            setLoading(false);
          });

          addDoc(collection(db, 'users', currentUser.uid, 'login_history'), {
            uid: currentUser.uid,
            timestamp: serverTimestamp(),
            userAgent: navigator.userAgent
          }).catch(err => console.error("Error recording login history:", err));
        } catch (error) {
          console.error("Error in auth state change:", error);
          setLoading(false);
        }
      } else {
        processedUidRef.current = null;
        setUser(null);
        setUserData(null);
        setUserRole(null);
        if (unsubscribeDoc) unsubscribeDoc();
        setIsUserDataLoaded(false);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, []);

  const updateProfile = async (data: any) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { ...data, onboardingComplete: true }, { merge: true });
  };

  const joinClassroom = async (classCode: string) => {
    if (!user || userRole !== 'student') throw new Error('Only students can join classrooms');
    const hasCustomKey = typeof window !== 'undefined' && !!localStorage.getItem('custom_gemini_api_key');
    if (!userData?.isPremium && !hasCustomKey && (userData?.projectCount || 0) >= 3) {
      throw new Error('LIMIT_EXCEEDED');
    }
    
    const classroomsRef = collection(db, 'classrooms');
    const { query, where, getDocs, updateDoc, increment, arrayUnion } = await import('firebase/firestore');
    const q = query(classroomsRef, where('classCode', '==', classCode));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('ไม่พบรหัสห้องเรียนนี้');
    }
    
    const classroomDoc = querySnapshot.docs[0];
    const classId = classroomDoc.id;

    if (userData?.classroomIds?.includes(classId)) {
        throw new Error('คุณอยู่ในห้องเรียนนี้อยู่แล้ว');
    }
    
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { 
      classId,
      classroomIds: arrayUnion(classId),
      projectCount: increment(1)
    });
    
    await updateDoc(classroomDoc.ref, { studentCount: increment(1) });
  };

  const selectClassroom = async (classId: string | null) => {
    if (!user) return;
    const { updateDoc } = await import('firebase/firestore');
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { classId });
  };

  const clearError = () => setAuthError(null);
  
  const login = async (providerType: 'google' | 'facebook' | 'line' = 'google') => {
    setLoading(true);
    setAuthError(null);
    isLoggingInRef.current = true;
    isMockAdminRef.current = false;
    try {
      let provider: FirebaseAuthProvider;
      switch (providerType) {
        case 'facebook':
          provider = facebookProvider;
          break;
        case 'line':
          provider = lineProvider;
          break;
        default:
          provider = googleProvider;
      }
      const result = await signInWithPopup(auth, provider);
      
      if (result.user) {
        const userDocRef = doc(db, 'users', result.user.uid);
        if (result.user.email === 'admin') {
          setUserRole('admin');
          setUserData((prev: any) => ({ ...prev, role: 'admin' }));
          await setDoc(userDocRef, { role: 'admin' }, { merge: true });
        }
        
        await setDoc(userDocRef, { 
            uid: result.user.uid,
            email: result.user.email || '',
            displayName: result.user.displayName || '',
            photoURL: result.user.photoURL || '',
        }, { merge: true });
      }
    } catch (error: any) {
      console.error(`${providerType} login error:`, error);
      let message = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
      if (error.code === 'auth/popup-closed-by-user') message = 'การเข้าสู่ระบบถูกยกเลิก';
      else if (error.code === 'auth/cancelled-popup-request') message = 'คำขอทับซ้อนกัน โปรดลองใหม่';
      else if (error.code === 'auth/unauthorized-domain') message = 'โดเมนนี้ไม่ได้รับอนุญาตให้ใช้ Login';
      
      setAuthError(message);
      throw error;
    } finally {
      isLoggingInRef.current = false;
      setLoading(false);
    }
  };

  const selectRole = async (role: 'student' | 'teacher' | 'admin') => {
    if (!user) return;
    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { role }, { merge: true });
      setUserRole(role);
      setUserData((prev: any) => ({ ...prev, role }));
    } catch (error) {
      console.error("Error selecting role:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const switchRole = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { role: null }, { merge: true });
      setUserRole(null);
      setUserData((prev: any) => ({ ...prev, role: null }));
    } catch (error) {
      console.error("Error switching role:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    isMockAdminRef.current = false;
    userRef.current = null;
    try {
      if (user?.uid === 'admin-mock-id') {
        setUser(null);
        setUserData(null);
        setUserRole(null);
      } else {
        await signOut(auth);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAccess = (type: 'ai' | 'project'): boolean => {
    if (!userData) return false;
    const hasCustomKey = typeof window !== 'undefined' && !!localStorage.getItem('custom_gemini_api_key');
    if (userData.isPremium || hasCustomKey) return true;
    if (type === 'project') return (userData.projectCount || 0) < 3;
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userData,
      userRole, 
      loading, 
      login, 
      logout,
      updateProfile,
      joinClassroom,
      selectClassroom,
      selectRole,
      switchRole,
      checkAccess,
      authError,
      clearError,
      isUserDataLoaded
    }}>
      {children}
    </AuthContext.Provider>
  );
};
