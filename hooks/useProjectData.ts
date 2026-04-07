import { useState, useEffect } from 'react';
import { db, auth } from '../src/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export const useProjectData = () => {
    const [independentProjectTitle, setIndependentProjectTitle] = useState('');
    const [is1ProjectTitle, setIs1ProjectTitle] = useState('');
    const [is2ProjectTitle, setIs2ProjectTitle] = useState('');
    const [is3ProjectTitle, setIs3ProjectTitle] = useState('');
    const [selectedIS, setSelectedIS] = useState<'INDEPENDENT' | 'IS1' | 'IS2' | 'IS3'>('INDEPENDENT');
    const [coreConcept, setCoreConcept] = useState('');
    const [researchData, setResearchData] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

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
                        if (data.coreConcept !== undefined) setCoreConcept(data.coreConcept);
                        if (data.researchData !== undefined) setResearchData(data.researchData);
                    }
                    setIsLoaded(true);
                }, (error) => {
                    console.error("Error fetching project data:", error);
                    setIsLoaded(true);
                });
                return () => unsubscribeSnapshot();
            } else {
                setIsLoaded(true);
            }
        });
        return () => unsubscribeAuth();
    }, []);

    const saveToFirestore = async (dataToUpdate: any) => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, 'user_projects', user.uid);
            try {
                await setDoc(docRef, { ...dataToUpdate, uid: user.uid }, { merge: true });
            } catch (error) {
                console.error("Error saving project data:", error);
            }
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
        isLoaded
    };
};
