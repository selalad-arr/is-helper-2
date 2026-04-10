import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, lineProvider, db } from '../firebase';
import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { 
  AuthProvider as FirebaseAuthProvider 
} from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  userData: any | null;
  userRole: 'student' | 'teacher' | 'admin' | null;
  loading: boolean;
  login: (provider?: 'google' | 'facebook' | 'line') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  joinClassroom: (classCode: string) => Promise<void>;
  selectClassroom: (classId: string | null) => Promise<void>;
  selectRole: (role: 'student' | 'teacher' | 'admin') => Promise<void>;
  switchRole: () => Promise<void>;
  authError: string | null;
  clearError: () => void;
}

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
  authError: null,
  clearError: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Use refs to track current state for the onAuthStateChanged listener
  const userRef = useRef<any | null>(null);
  const isMockAdminRef = useRef<boolean>(false);
  const processedUidRef = useRef<string | null>(null);
  const isLoggingInRef = useRef<boolean>(false);

  useEffect(() => {
    let unsubscribeDoc: (() => void) | undefined;
    
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      // If we are in a mock admin session, ignore null updates from Firebase Auth
      if (isMockAdminRef.current && !currentUser) {
        setLoading(false);
        return;
      }

      userRef.current = currentUser;
      
      if (currentUser) {
        // Prevent infinite loops by checking if we have already processed this user UID
        if (processedUidRef.current === currentUser.uid) {
          setUser(currentUser);
          setLoading(false);
          return;
        }

        processedUidRef.current = currentUser.uid;
        isMockAdminRef.current = false;
        setUser(currentUser);

        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          
          // Listen to user document for real-time updates
          if (unsubscribeDoc) unsubscribeDoc();
          
          unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
            if (isLoggingInRef.current) {
              return; // Ignore snapshots during active manual login to prevent role revert
            }
            if (docSnap.exists()) {
              const data = docSnap.data();
              setUserData(data);
              setUserRole(data.role || null);
            } else {
              // Create default doc if missing (e.g. session restored but no DB record exists)
              const defaultData = {
                uid: currentUser.uid,
                email: currentUser.email || '',
                displayName: currentUser.displayName || '',
                photoURL: currentUser.photoURL || '',
                createdAt: serverTimestamp(),
                role: null,
                onboardingComplete: false
              };
              setUserData(defaultData);
              setUserRole(null);
              setDoc(userDocRef, defaultData, { merge: true });
            }
            setLoading(false);
          }, (error) => {
            console.error("Error fetching user data:", error);
            setLoading(false);
          });

          // Record login history (non-blocking)
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
    
    // Find classroom by code
    const classroomsRef = collection(db, 'classrooms');
    const { query, where, getDocs, updateDoc, increment, arrayUnion } = await import('firebase/firestore');
    const q = query(classroomsRef, where('classCode', '==', classCode));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('ไม่พบรหัสห้องเรียนนี้');
    }
    
    const classroomDoc = querySnapshot.docs[0];
    const classId = classroomDoc.id;
    
    // Update user's classId and add to history
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { 
      classId,
      classroomIds: arrayUnion(classId)
    });
    
    // Increment student count in classroom
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
        
        // Ensure the admin mock email retains admin role automatically
        if (result.user.email === 'admin') {
          setUserRole('admin');
          setUserData((prev: any) => ({ ...prev, role: 'admin' }));
          await setDoc(userDocRef, { role: 'admin' }, { merge: true });
        }
        
        // We do a merge. We don't set a role here anymore; it will be handled by the Role Selection UI if missing.
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
      // Explicitly set role to null in Firestore to trigger the modal correctly across sessions
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
      authError,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};
