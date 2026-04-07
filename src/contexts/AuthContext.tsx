import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, lineProvider, db } from '../firebase';
import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { 
  AuthProvider as FirebaseAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  userData: any | null;
  userRole: 'student' | 'teacher' | 'admin' | null;
  loading: boolean;
  login: (provider?: 'google' | 'facebook' | 'line', role?: 'student' | 'teacher' | 'admin') => Promise<void>;
  loginWithEmail: (email: string, pass: string, isSignUp: boolean, role?: 'student' | 'teacher' | 'admin') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  joinClassroom: (classCode: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  userRole: null,
  loading: true,
  login: async () => {},
  loginWithEmail: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
  joinClassroom: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  // Use refs to track current state for the onAuthStateChanged listener
  const userRef = useRef<any | null>(null);
  const isMockAdminRef = useRef<boolean>(false);

  useEffect(() => {
    let unsubscribeDoc: (() => void) | undefined;
    
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      // If we are in a mock admin session, ignore null updates from Firebase Auth
      if (isMockAdminRef.current && !currentUser) {
        setLoading(false);
        return;
      }

      if (currentUser) {
        isMockAdminRef.current = false;
      }

      userRef.current = currentUser;
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          
          // Listen to user document for real-time updates
          if (unsubscribeDoc) unsubscribeDoc();
          
          unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setUserData(data);
              setUserRole(data.role || 'student');
            } else {
              // Create default doc if missing
              const defaultData = {
                uid: currentUser.uid,
                email: currentUser.email || '',
                displayName: currentUser.displayName || '',
                photoURL: currentUser.photoURL || '',
                createdAt: serverTimestamp(),
                role: 'student',
                onboardingComplete: false
              };
              setUserData(defaultData);
              setUserRole('student');
              setDoc(userDocRef, defaultData, { merge: true });
            }
            setLoading(false);
          }, (error) => {
            console.error("Error fetching user data:", error);
            setLoading(false);
          });

          // Record login history
          await addDoc(collection(db, 'users', currentUser.uid, 'login_history'), {
            uid: currentUser.uid,
            timestamp: serverTimestamp(),
            userAgent: navigator.userAgent
          });
        } catch (error) {
          console.error("Error in auth state change:", error);
          setLoading(false);
        }
      } else {
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
    const { query, where, getDocs, updateDoc, increment } = await import('firebase/firestore');
    const q = query(classroomsRef, where('classCode', '==', classCode));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('ไม่พบรหัสห้องเรียนนี้');
    }
    
    const classroomDoc = querySnapshot.docs[0];
    const classId = classroomDoc.id;
    
    // Update user's classId
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { classId });
    
    // Increment student count in classroom
    await updateDoc(classroomDoc.ref, { studentCount: increment(1) });
  };

  const login = async (providerType: 'google' | 'facebook' | 'line' = 'google', role: 'student' | 'teacher' | 'admin' = 'student') => {
    setLoading(true);
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
        const userSnap = await getDoc(userDocRef);
        if (!userSnap.exists()) {
          await setDoc(userDocRef, {
            uid: result.user.uid,
            email: result.user.email || '',
            displayName: result.user.displayName || '',
            photoURL: result.user.photoURL || '',
            role: role,
            createdAt: serverTimestamp(),
            onboardingComplete: false
          });
        } else {
          await setDoc(userDocRef, { role: role }, { merge: true });
        }
      }
    } catch (error) {
      console.error(`${providerType} login error:`, error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email: string, pass: string, isSignUp: boolean, role: 'student' | 'teacher' | 'admin' = 'student') => {
    setLoading(true);
    try {
      // Hardcoded Admin Credentials
      if ((email === 'admin' && pass === 'admin')) {
        if (isSignUp) {
          throw new Error('การสมัครสมาชิกสำหรับผู้ดูแลระบบถูกปิดใช้งาน');
        }
        
        const mockUser = {
          uid: 'admin-mock-id',
          email: email,
          displayName: 'Administrator',
          photoURL: '',
        };
        
        isMockAdminRef.current = true;
        userRef.current = mockUser;
        setUser(mockUser);
        setUserData({ role: 'admin', name: 'Administrator', onboardingComplete: true });
        setUserRole('admin');
        setLoading(false);
        return;
      }

      isMockAdminRef.current = false;

      if (isSignUp) {
        const result = await createUserWithEmailAndPassword(auth, email, pass);
        if (result.user) {
          const userDocRef = doc(db, 'users', result.user.uid);
          await setDoc(userDocRef, {
            uid: result.user.uid,
            email: result.user.email || '',
            displayName: result.user.displayName || '',
            photoURL: result.user.photoURL || '',
            role: role,
            createdAt: serverTimestamp(),
            onboardingComplete: false
          });
        }
      } else {
        const result = await signInWithEmailAndPassword(auth, email, pass);
        if (result.user) {
          const userDocRef = doc(db, 'users', result.user.uid);
          const docSnap = await getDoc(userDocRef);
          if (!docSnap.exists()) {
            await setDoc(userDocRef, {
              uid: result.user.uid,
              email: result.user.email || '',
              displayName: result.user.displayName || '',
              photoURL: result.user.photoURL || '',
              role: role,
              createdAt: serverTimestamp(),
              onboardingComplete: false
            });
          } else {
            await setDoc(userDocRef, { role: role }, { merge: true });
          }
        }
      }
    } catch (error) {
      console.error("Email auth error:", error);
      throw error;
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
      loginWithEmail, 
      logout,
      updateProfile,
      joinClassroom
    }}>
      {children}
    </AuthContext.Provider>
  );
};
