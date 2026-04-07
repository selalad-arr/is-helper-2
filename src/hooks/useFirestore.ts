import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function useFirestoreData<T>(collectionName: string, documentId: string, initialData: T) {
  const { user } = useAuth();
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);

  const getDocRef = () => {
    if (!user) return null;
    
    // Map paths to match firestore.rules
    if (collectionName === 'user_exercises') {
      return doc(db, 'user_exercises', user.uid, 'exercises', documentId);
    } else if (collectionName === 'user_chats') {
      return doc(db, 'user_chats', user.uid, 'chats', documentId);
    } else if (collectionName === 'user_chapters') {
      return doc(db, 'user_chapters', user.uid, 'chapters', documentId);
    } else {
      // For user_projects and user_progress, the document ID should be the user's UID
      return doc(db, collectionName, user.uid);
    }
  };

  useEffect(() => {
    if (!user) {
      setData(initialData);
      setLoading(false);
      return;
    }

    const docRef = getDocRef();
    if (!docRef) return;
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData({ ...initialData, ...docSnap.data() });
      } else {
        setData(initialData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firestore error in useFirestoreData:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, collectionName, documentId]);

  const updateData = async (newData: Partial<T>) => {
    if (!user) return;
    try {
      const docRef = getDocRef();
      if (!docRef) return;
      await setDoc(docRef, { uid: user.uid, ...newData }, { merge: true });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return { data, updateData, loading };
}
