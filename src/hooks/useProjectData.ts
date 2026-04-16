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
    const { user, userData, isUserDataLoaded } = useAuth();
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
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    // 2. Fetch MAIN Project Data (Titles, Selected Type)
    useEffect(() => {
        if (!user || !isUserDataLoaded) {
            if (!user) setIsLoaded(true);
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
                
                // For IS1/2/3, these come from subcollections, otherwise they come from the main doc (Beginner mode)
                if (!currentIsType || !['is1', 'is2', 'is3'].includes(currentIsType)) {
                    setCoreConcept(data.coreConcept || '');
                    setResearchData(data.researchData || '');
                }
            } else {
                // Clear state only if we don't have existing content yet to avoid flicker/data loss during context transitions
                setIndependentProjectTitle(prev => prev || '');
                setIs1ProjectTitle(prev => prev || '');
                setIs2ProjectTitle(prev => prev || '');
                setIs3ProjectTitle(prev => prev || '');
                setSelectedIS(prev => prev || 'INDEPENDENT');
                setCoreConcept(prev => prev || '');
                setResearchData(prev => prev || '');
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
        if (!user || !isUserDataLoaded) return;
        const compositeId = `${user.uid}_${contextId}`;

        // Split data between MAIN doc and SECTION doc
        const mainDocFields = ['independentProjectTitle', 'is1ProjectTitle', 'is2ProjectTitle', 'is3ProjectTitle', 'selectedIS'];
        const detailFields = ['coreConcept', 'researchData'];

        const mainUpdate: any = { uid: user.uid };
        const detailUpdate: any = { uid: user.uid };
        
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

        setIsSaving(true);
        try {
            await Promise.all(promises);
            setIsDirty(false);
        } catch (error) {
            console.error("Error saving project data:", error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        } finally {
            setIsSaving(false);
        }
    };

    const saveCurrentData = async () => {
        await saveToFirestore({
            independentProjectTitle,
            is1ProjectTitle,
            is2ProjectTitle,
            is3ProjectTitle,
            selectedIS,
            coreConcept,
            researchData
        });
    };

    const wrapSetState = (setter: any) => (val: any) => {
        setter(val);
        setIsDirty(true);
    };

    const projectTitle = (() => {
        const primary = selectedIS === 'IS1' ? is1ProjectTitle :
                        selectedIS === 'IS2' ? is2ProjectTitle :
                        selectedIS === 'IS3' ? is3ProjectTitle :
                        independentProjectTitle;
        // Search for any available title if primary is empty
        return primary || independentProjectTitle || is1ProjectTitle || is2ProjectTitle || is3ProjectTitle || "";
    })();

    const setProjectTitle = (title: string) => {
        if (selectedIS === 'IS1') setIs1ProjectTitle(title);
        else if (selectedIS === 'IS2') setIs2ProjectTitle(title);
        else if (selectedIS === 'IS3') setIs3ProjectTitle(title);
        else setIndependentProjectTitle(title);
        setIsDirty(true);
    };

    // Listen for global save commands (e.g. from the main "Save Progress" button)
    useEffect(() => {
        const handleGlobalSave = () => {
            if (isDirty) {
                saveCurrentData();
            }
        };
        window.addEventListener('saveGlobalProjectData', handleGlobalSave);
        return () => window.removeEventListener('saveGlobalProjectData', handleGlobalSave);
    }, [isDirty, independentProjectTitle, is1ProjectTitle, is2ProjectTitle, is3ProjectTitle, selectedIS, coreConcept, researchData]);

    return { 
        projectTitle, 
        setProjectTitle, 
        is1ProjectTitle, setIs1ProjectTitle: wrapSetState(setIs1ProjectTitle),
        is2ProjectTitle, setIs2ProjectTitle: wrapSetState(setIs2ProjectTitle),
        is3ProjectTitle, setIs3ProjectTitle: wrapSetState(setIs3ProjectTitle),
        selectedIS, setSelectedIS: wrapSetState(setSelectedIS),
        coreConcept, setCoreConcept: wrapSetState(setCoreConcept),
        researchData, setResearchData: wrapSetState(setResearchData),
        isLoaded: isLoaded && isDetailsLoaded,
        currentSection: currentIsType,
        save: saveCurrentData,
        isSaving,
        isDirty
    };
};
