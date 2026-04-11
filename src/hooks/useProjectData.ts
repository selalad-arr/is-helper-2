import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook to manage project data with lazy loading.
 * Automatically detects the IS level (is1, is2, is3) from the URL params.
 * 
 * Data Structure:
 * - user_projects/{uid}: Global metadata (titles, selected IS type)
 * - user_projects/{uid}/details/{isType}: Heavy content (research data, concepts)
 */
export const useProjectData = (sectionOverride?: string) => {
    const { user, userData } = useAuth();
    // 1. Auto-detect IS section from URL (e.g., /is1/0 -> isKey = 'is1')
    const { isKey } = useParams<{ isKey: string }>();
    const currentIsType = (sectionOverride || isKey)?.toLowerCase();

    // Context Info
    const contextId = userData?.classId || 'personal';

    // Basic fields (always from main doc)
    const [independentProjectTitle, setIndependentProjectTitle] = useState('');
    const [is1ProjectTitle, setIs1ProjectTitle] = useState('');
    const [is2ProjectTitle, setIs2ProjectTitle] = useState('');
    const [is3ProjectTitle, setIs3ProjectTitle] = useState('');
    const [selectedIS, setSelectedIS] = useState<'INDEPENDENT' | 'IS1' | 'IS2' | 'IS3'>('INDEPENDENT');
    
    // Heavy fields (lazy loaded if section is detected)
    const [coreConcept, setCoreConcept] = useState('');
    const [researchData, setResearchData] = useState('');
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDetailsLoaded, setIsDetailsLoaded] = useState(false);

    // 2. Fetch MAIN Project Data (Titles, Selected Type)
    useEffect(() => {
        if (!user) {
            setIsLoaded(true);
            return;
        }

        const compositeId = `${user.uid}_${contextId}`;
        const docRef = doc(db, 'user_projects', compositeId);
        
        const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setIndependentProjectTitle(data.independentProjectTitle || '');
                setIs1ProjectTitle(data.is1ProjectTitle || '');
                setIs2ProjectTitle(data.is2ProjectTitle || '');
                setIs3ProjectTitle(data.is3ProjectTitle || '');
                setSelectedIS(data.selectedIS || 'INDEPENDENT');
                
                if (!currentIsType) {
                    setCoreConcept(data.coreConcept || '');
                    setResearchData(data.researchData || '');
                }
            } else {
                // Clear state if document doesn't exist for this context
                setIndependentProjectTitle('');
                setIs1ProjectTitle('');
                setIs2ProjectTitle('');
                setIs3ProjectTitle('');
                setSelectedIS('INDEPENDENT');
                setCoreConcept('');
                setResearchData('');
            }
            setIsLoaded(true);
        }, (error) => {
            console.error("Error fetching main project data:", error);
            setIsLoaded(true);
        });
        
        return () => unsubscribeSnapshot();
    }, [user, contextId, currentIsType]);

    // 3. Fetch SECTION-SPECIFIC Detailed Data (Selective Loading)
    useEffect(() => {
        if (!user || !currentIsType || !['is1', 'is2', 'is3'].includes(currentIsType)) {
            setIsDetailsLoaded(true);
            return;
        }

        const compositeId = `${user.uid}_${contextId}`;
        const detailsRef = doc(db, 'user_projects', compositeId, 'details', currentIsType);
        
        const unsubscribeSnapshot = onSnapshot(detailsRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setCoreConcept(data.coreConcept || '');
                setResearchData(data.researchData || '');
            } else {
                // Not clearing if using main doc data (reverse compat handled in fetch 2)
            }
            setIsDetailsLoaded(true);
        }, (error) => {
            console.error(`Error fetching ${currentIsType} details:`, error);
            setIsDetailsLoaded(true);
        });
        
        return () => unsubscribeSnapshot();
    }, [user, contextId, currentIsType]);

    const saveToFirestore = async (dataToUpdate: any) => {
        if (!user) return;
        const compositeId = `${user.uid}_${contextId}`;

        // Split data between MAIN doc and SECTION doc
        const mainDocFields = ['independentProjectTitle', 'is1ProjectTitle', 'is2ProjectTitle', 'is3ProjectTitle', 'selectedIS'];
        const detailFields = ['coreConcept', 'researchData'];

        const mainUpdate: any = { uid: user.uid, lastUpdated: new Date() };
        const detailUpdate: any = { uid: user.uid, lastUpdated: new Date() };
        
        let hasMainUpdate = false;
        let hasDetailUpdate = false;

        Object.keys(dataToUpdate).forEach(key => {
            if (mainDocFields.includes(key)) {
                mainUpdate[key] = dataToUpdate[key];
                hasMainUpdate = true;
            } else if (detailFields.includes(key)) {
                detailUpdate[key] = dataToUpdate[key];
                hasDetailUpdate = true;
            } else {
                mainUpdate[key] = dataToUpdate[key];
                hasMainUpdate = true;
            }
        });

        const promises = [];
        const { getDoc, increment } = await import('firebase/firestore');

        if (hasMainUpdate) {
            const mainDocRef = doc(db, 'user_projects', compositeId);
            const mainDocSnap = await getDoc(mainDocRef);
            
            // If starting a NEW project (doc doesn't exist)
            if (!mainDocSnap.exists()) {
                // Check limit for free users
                const hasCustomKey = typeof window !== 'undefined' && !!localStorage.getItem('custom_gemini_api_key');
                if (!userData?.isPremium && !hasCustomKey && (userData?.projectCount || 0) >= 3) {
                    alert("คุณเกินขีดจำกัดจำนวนโครงงานฟรีแล้ว (3 โครงงาน) กรุณาอัปเกรดเป็นพรีเมี่ยมเพื่อทำโครงงานต่อ");
                    return;
                }
                
                // Increment project count in user profile
                const userRef = doc(db, 'users', user.uid);
                promises.push(setDoc(userRef, { projectCount: increment(1) }, { merge: true }));
            }

            promises.push(setDoc(mainDocRef, mainUpdate, { merge: true }));
        }
        
        if (hasDetailUpdate && currentIsType && ['is1', 'is2', 'is3'].includes(currentIsType)) {
            const detailsRef = doc(db, 'user_projects', compositeId, 'details', currentIsType);
            promises.push(setDoc(detailsRef, detailUpdate, { merge: true }));
        } else if (hasDetailUpdate) {
            // Save to main doc if no specific section is active
            promises.push(setDoc(doc(db, 'user_projects', compositeId), detailUpdate, { merge: true }));
        }

        try {
            await Promise.all(promises);
        } catch (error) {
            console.error("Error saving project data:", error);
        }
    };

    const handleSetIndependentProjectTitle = (val: string) => { setIndependentProjectTitle(val); saveToFirestore({ independentProjectTitle: val }); };
    const handleSetIs1ProjectTitle = (val: string) => { setIs1ProjectTitle(val); saveToFirestore({ is1ProjectTitle: val }); };
    const handleSetIs2ProjectTitle = (val: string) => { setIs2ProjectTitle(val); saveToFirestore({ is2ProjectTitle: val }); };
    const handleSetIs3ProjectTitle = (val: string) => { setIs3ProjectTitle(val); saveToFirestore({ is3ProjectTitle: val }); };
    const handleSetSelectedIS = (val: 'INDEPENDENT' | 'IS1' | 'IS2' | 'IS3') => { setSelectedIS(val); saveToFirestore({ selectedIS: val }); };
    const handleSetCoreConcept = (val: string) => { setCoreConcept(val); saveToFirestore({ coreConcept: val }); };
    const handleSetResearchData = (val: string) => { setResearchData(val); saveToFirestore({ researchData: val }); };

    const projectTitle = selectedIS === 'IS1' ? is1ProjectTitle :
                         selectedIS === 'IS2' ? is2ProjectTitle :
                         selectedIS === 'IS3' ? is3ProjectTitle :
                         independentProjectTitle;

    const setProjectTitle = (title: string) => {
        if (selectedIS === 'IS1') handleSetIs1ProjectTitle(title);
        else if (selectedIS === 'IS2') handleSetIs2ProjectTitle(title);
        else if (selectedIS === 'IS3') handleSetIs3ProjectTitle(title);
        else handleSetIndependentProjectTitle(title);
    };

    return { 
        projectTitle, 
        setProjectTitle, 
        is1ProjectTitle, setIs1ProjectTitle: handleSetIs1ProjectTitle,
        is2ProjectTitle, setIs2ProjectTitle: handleSetIs2ProjectTitle,
        is3ProjectTitle, setIs3ProjectTitle: handleSetIs3ProjectTitle,
        selectedIS, setSelectedIS: handleSetSelectedIS,
        coreConcept, setCoreConcept: handleSetCoreConcept,
        researchData, setResearchData: handleSetResearchData,
        isLoaded: isLoaded && isDetailsLoaded,
        currentSection: currentIsType
    };
};
