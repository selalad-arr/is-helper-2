import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

/**
 * Hook to manage project data with lazy loading.
 * Automatically detects the IS level (is1, is2, is3) from the URL params.
 * 
 * Data Structure:
 * - user_projects/{uid}: Global metadata (titles, selected IS type)
 * - user_projects/{uid}/details/{isType}: Heavy content (research data, concepts)
 */
export const useProjectData = (sectionOverride?: string) => {
    // 1. Auto-detect IS section from URL (e.g., /is1/0 -> isKey = 'is1')
    const { isKey } = useParams<{ isKey: string }>();
    const currentIsType = (sectionOverride || isKey)?.toLowerCase();

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
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                const docRef = doc(db, 'user_projects', user.uid);
                const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data.independentProjectTitle !== undefined) setIndependentProjectTitle(data.independentProjectTitle);
                        if (data.is1ProjectTitle !== undefined) setIs1ProjectTitle(data.is1ProjectTitle);
                        if (data.is2ProjectTitle !== undefined) setIs2ProjectTitle(data.is2ProjectTitle);
                        if (data.is3ProjectTitle !== undefined) setIs3ProjectTitle(data.is3ProjectTitle);
                        if (data.selectedIS !== undefined) setSelectedIS(data.selectedIS);
                        
                        // FALLBACK: If no specific section detail is requested or found, load from main doc
                        // This ensures reverse compatibility with existing data
                        if (!currentIsType) {
                            if (data.coreConcept !== undefined) setCoreConcept(data.coreConcept);
                            if (data.researchData !== undefined) setResearchData(data.researchData);
                        }
                    }
                    setIsLoaded(true);
                }, (error) => {
                    console.error("Error fetching main project data:", error);
                    setIsLoaded(true);
                });
                return () => unsubscribeSnapshot();
            } else {
                setIsLoaded(true);
            }
        });
        return () => unsubscribeAuth();
    }, [currentIsType]);

    // 3. Fetch SECTION-SPECIFIC Detailed Data (Selective Loading)
    useEffect(() => {
        if (!currentIsType || !['is1', 'is2', 'is3'].includes(currentIsType)) {
            setIsDetailsLoaded(true);
            return;
        }

        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                const detailsRef = doc(db, 'user_projects', user.uid, 'details', currentIsType);
                const unsubscribeSnapshot = onSnapshot(detailsRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data.coreConcept !== undefined) setCoreConcept(data.coreConcept);
                        if (data.researchData !== undefined) setResearchData(data.researchData);
                    } else {
                        // If detail doc doesn't exist yet, we don't clear (might be using main doc data)
                    }
                    setIsDetailsLoaded(true);
                }, (error) => {
                    console.error(`Error fetching ${currentIsType} details:`, error);
                    setIsDetailsLoaded(true);
                });
                return () => unsubscribeSnapshot();
            }
        });
        return () => unsubscribeAuth();
    }, [currentIsType]);

    const saveToFirestore = async (dataToUpdate: any) => {
        const user = auth.currentUser;
        if (!user) return;

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
        if (hasMainUpdate) {
            promises.push(setDoc(doc(db, 'user_projects', user.uid), mainUpdate, { merge: true }));
        }
        
        if (hasDetailUpdate && currentIsType && ['is1', 'is2', 'is3'].includes(currentIsType)) {
            const detailsRef = doc(db, 'user_projects', user.uid, 'details', currentIsType);
            promises.push(setDoc(detailsRef, detailUpdate, { merge: true }));
        } else if (hasDetailUpdate) {
            // Save to main doc if no specific section is active
            promises.push(setDoc(doc(db, 'user_projects', user.uid), detailUpdate, { merge: true }));
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
