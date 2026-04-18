import { GoogleGenAI, Chat } from "@google/genai";
import { db, auth } from '../../firebase';
import { collection, query, where, getDocs, limit, orderBy, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';

const getApiKey = (isPremium?: boolean): string | undefined => {
    const customApiKey = localStorage.getItem('custom_gemini_api_key');
    // Try multiple possible environment variable names defined in vite.config.ts
    // In Vite, these are replaced at build time.
    const envApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || 
                      (process as any).env?.GEMINI_API_KEY || 
                      (process as any).env?.API_KEY;
    
    // If premium, prioritize the system key (env key), but fallback to custom key if env key is missing
    if (isPremium) {
        return envApiKey || customApiKey;
    }
    
    // Otherwise, prefer custom key if provided by user, else fallback to env key
    return customApiKey || envApiKey;
};

const aiClients: { [key: string]: GoogleGenAI } = {};

export const getAiClient = (config?: { customApiKey?: string, isPremium?: boolean } | boolean): GoogleGenAI => {
    // Handle both old and new argument styles
    const isPremium = typeof config === 'boolean' ? config : config?.isPremium;
    const customApiKey = typeof config === 'object' ? config?.customApiKey : undefined;
    
    const apiKey = customApiKey || getApiKey(isPremium);
    
    if (!apiKey) {
        throw new Error("ไม่พบ API Key ในระบบ กรุณาตรวจสอบการตั้งค่า (Settings)");
    }
    
    // Use v1 as it is the most stable version for standard projects
    return new GoogleGenAI({ 
        apiKey,
        apiVersion: 'v1'
    });
}

export const getModelConfig = () => {
    return { modelId: 'gemini-2.5-flash' };
};

export const createChatSession = async (systemInstruction: string, history: any[] = [], isPremium: boolean = false) => {
    const ai = getAiClient(isPremium);
    const { modelId } = getModelConfig();
    
    // Filter history to ensure it's valid for the SDK
    const baseHistory = history.length > 0 && history[0].role === 'model' ? history.slice(1) : history;

    return ai.chats.create({
        model: modelId,
        history: baseHistory,
        config: {
            systemInstruction
        }
    });
};

// --- Cache & Quota Management ---

export const executeWithCacheAndQuota = async (
    promptHash: string,
    executeFn: (modelId: string, isPremium: boolean) => Promise<string>
): Promise<string> => {
    const user = auth.currentUser;
    if (!user) throw new Error("Please log in to use AI features.");

    // 1. Check Cache
    try {
        const cacheDoc = await getDoc(doc(db, 'ai_cache', promptHash));
        if (cacheDoc.exists()) {
            console.log("Using cached AI response");
            return cacheDoc.data().response;
        }
    } catch (e) {
        console.warn("Cache check failed", e);
    }

    // 2. Check Quota (for free users)
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();
    const isPremium = userData?.isPremium || false;
    const hasCustomKey = !!localStorage.getItem('custom_gemini_api_key');

    if (!isPremium && !hasCustomKey) {
        const today = new Date().toISOString().split('T')[0];
        const usageRef = doc(db, 'users', user.uid, 'ai_usage', today);
        const usageDoc = await getDoc(usageRef);
        const count = usageDoc.exists() ? usageDoc.data().count : 0;

        if (count >= 3) {
            throw new Error("วันนี้คุณใช้งาน AI ครบ 3 ครั้งแล้ว (โควต้าสำหรับนักเรียนฟรี) กรุณาลองใหม่พรุ่งนี้ หรืออัปเกรดเป็น Premium ครับ");
        }

        // Increment count
        await setDoc(usageRef, { 
            count: count + 1, 
            lastUsed: Timestamp.now(),
            email: user.email 
        }, { merge: true });
    }

    // 3. Log Analytics
    try {
        await setDoc(doc(collection(db, 'ai_usage_logs')), {
            uid: user.uid,
            email: user.email,
            promptHash: promptHash.substring(0, 50) + "...",
            timestamp: Timestamp.now(),
            isPremium,
            hasCustomKey
        });
    } catch (e) { console.warn("Log failed", e); }

    // 4. Execute
    const { modelId } = getModelConfig();
    const result = await executeFn(modelId, isPremium);

    // 5. Save Cache
    try {
        await setDoc(doc(db, 'ai_cache', promptHash), {
            response: result,
            createdAt: Timestamp.now()
        });
    } catch (e) { console.warn("Cache save failed", e); }

    return result;
};

export const handleGeminiError = (error: any): string => {
    console.error("Gemini Service Error:", error);
    const errorMessage = error?.message || String(error);

    if (errorMessage.includes('API key not valid') || errorMessage.includes('API_KEY_INVALID')) {
        return "API Key ไม่ถูกต้อง กรุณาตรวจสอบการตั้งค่าในหน้า Settings หรืออัปเกรดเป็น Premium";
    }
    if (errorMessage.includes('quota') || errorMessage.includes('429')) {
        return "ขณะนี้มีการใช้งานหนาแน่น (Quota Exceeded) กรุณารอสักครู่แล้วลองใหม่ครับ";
    }
    if (errorMessage.includes('safety') || errorMessage.includes('blocked')) {
        return "เนื้อหานี้ถูกบล็อกโดยระบบความปลอดภัยของ AI กรุณาลองปรับเปลี่ยนคำถามใหม่ครับ";
    }
    
    return "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI: " + errorMessage;
};
