import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface ApiSettingsContextType {
    customApiKey: string | null;
    useFreeQuota: boolean;
    quotaUsed: number;
    setCustomApiKey: (key: string | null) => void;
    setUseFreeQuota: (use: boolean) => void;
    checkAndConsumeQuota: () => Promise<boolean>;
    isSettingsComplete: boolean;
    quotaExceededError: boolean;
    systemQuotaExceeded: boolean;
    setSystemQuotaExceeded: (val: boolean) => void;
}

const ApiSettingsContext = createContext<ApiSettingsContextType | undefined>(undefined);

export const ApiSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [customApiKey, setCustomApiKeyState] = useState<string | null>(() => localStorage.getItem('custom_gemini_api_key'));
    const [useFreeQuota, setUseFreeQuotaState] = useState<boolean>(() => localStorage.getItem('use_free_quota') === 'true');
    const [quotaUsed, setQuotaUsed] = useState<number>(0);
    const [isSettingsComplete, setIsSettingsComplete] = useState<boolean>(false);
    const [quotaExceededError, setQuotaExceededError] = useState<boolean>(false);
    const [systemQuotaExceeded, setSystemQuotaExceeded] = useState<boolean>(false);
    
    const lastUserProcessedRef = React.useRef<string | null>(null);
    const lastDateProcessedRef = React.useRef<string | null>(null);

    useEffect(() => {
        const handleQuotaExceeded = () => {
            setUseFreeQuotaState(false);
            localStorage.removeItem('use_free_quota');
            setQuotaExceededError(true);
        };
        const handleSystemQuotaExceeded = () => {
            setSystemQuotaExceeded(true);
            setIsSettingsComplete(false); // Force modal to show
        };
        window.addEventListener('quota_exceeded', handleQuotaExceeded);
        window.addEventListener('system_quota_exceeded', handleSystemQuotaExceeded);
        return () => {
            window.removeEventListener('quota_exceeded', handleQuotaExceeded);
            window.removeEventListener('system_quota_exceeded', handleSystemQuotaExceeded);
        };
    }, []);

    useEffect(() => {
        if (!systemQuotaExceeded) {
            if (customApiKey || useFreeQuota) {
                setIsSettingsComplete(true);
            } else {
                setIsSettingsComplete(false);
            }
        }
    }, [customApiKey, useFreeQuota, systemQuotaExceeded]);

    useEffect(() => {
        const fetchQuota = async () => {
            if (!user || !useFreeQuota) {
                lastUserProcessedRef.current = null;
                return;
            }
            
            const docRef = doc(db, 'users', user.uid);
            const today = new Date().toISOString().split('T')[0];
            
            // Skip if already fetched for this user today
            if (lastUserProcessedRef.current === user.uid && lastDateProcessedRef.current === today) {
                return;
            }

            try {
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.lastQuotaDate === today) {
                        setQuotaUsed(data.aiQuotaUsed || 0);
                    } else {
                        // Reset quota for a new day
                        await updateDoc(docRef, { aiQuotaUsed: 0, lastQuotaDate: today });
                        setQuotaUsed(0);
                    }
                    lastUserProcessedRef.current = user.uid;
                    lastDateProcessedRef.current = today;
                }
            } catch (error) {
                console.error("Error fetching quota:", error);
            }
        };
        fetchQuota();
    }, [user, useFreeQuota]);

    const setCustomApiKey = (key: string | null) => {
        if (key) {
            localStorage.setItem('custom_gemini_api_key', key);
            localStorage.removeItem('use_free_quota');
            setUseFreeQuotaState(false);
            setQuotaExceededError(false);
            setSystemQuotaExceeded(false);
        } else {
            localStorage.removeItem('custom_gemini_api_key');
        }
        setCustomApiKeyState(key);
    };

    const setUseFreeQuota = (use: boolean) => {
        if (use) {
            localStorage.setItem('use_free_quota', 'true');
            localStorage.removeItem('custom_gemini_api_key');
            setCustomApiKeyState(null);
            setSystemQuotaExceeded(false);
        } else {
            localStorage.removeItem('use_free_quota');
        }
        setUseFreeQuotaState(use);
    };

    const checkAndConsumeQuota = async (): Promise<boolean> => {
        if (customApiKey) return true; // Unlimited if using own key
        if (!useFreeQuota || !user) return false;

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        const today = new Date().toISOString().split('T')[0];

        let currentUsed = 0;
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.lastQuotaDate === today) {
                currentUsed = data.aiQuotaUsed || 0;
            }
        }

        if (currentUsed >= 3) {
            return false; // Quota exceeded
        }

        // Consume quota
        await setDoc(docRef, { 
            aiQuotaUsed: currentUsed + 1, 
            lastQuotaDate: today,
            uid: user.uid,
            email: user.email
        }, { merge: true });
        
        setQuotaUsed(currentUsed + 1);
        return true;
    };

    return (
        <ApiSettingsContext.Provider value={{
            customApiKey,
            useFreeQuota,
            quotaUsed,
            setCustomApiKey,
            setUseFreeQuota,
            checkAndConsumeQuota,
            isSettingsComplete,
            quotaExceededError,
            systemQuotaExceeded,
            setSystemQuotaExceeded
        }}>
            {children}
        </ApiSettingsContext.Provider>
    );
};

export const useApiSettings = () => {
    const context = useContext(ApiSettingsContext);
    if (context === undefined) {
        throw new Error('useApiSettings must be used within an ApiSettingsProvider');
    }
    return context;
};
