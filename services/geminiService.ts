import { GoogleGenAI, Chat, Type, GenerateContentResponse } from "@google/genai";
import { db, auth } from '../src/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFeedbackPrompt } from './prompts/feedbackPrompts';
import { analyzeSourceBasePrompt } from './prompts/analyzeSourcePrompt';
import { presentationSystemInstruction } from './prompts/presentationPrompt';
import { projectTitleSystemInstruction } from './prompts/projectTitlePrompt';
import { reportStructureSystemInstruction } from './prompts/reportStructurePrompt';
import { sectionFeedbackBasePrompt } from './prompts/sectionFeedbackPrompt';
import { fetchImageAsBase64 } from '../src/utils/imageUtils';


export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// Simple cache for GoogleGenAI instances to avoid re-creating them on every call.
const aiClients: { [key: string]: GoogleGenAI } = {};

const getAiClient = (): GoogleGenAI => {
    const customApiKey = localStorage.getItem('custom_gemini_api_key');
    const apiKey = customApiKey || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        throw new Error("ไม่พบ API Key ในระบบ กรุณาตรวจสอบการตั้งค่า");
    }
    if (!aiClients[apiKey]) {
        aiClients[apiKey] = new GoogleGenAI({ apiKey });
    }
    return aiClients[apiKey];
};

async function hashPrompt(prompt: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(prompt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function checkAndConsumeQuota(): Promise<boolean> {
    const customApiKey = localStorage.getItem('custom_gemini_api_key');
    if (customApiKey) return true; // Unlimited if using own key
    
    const useFreeQuota = localStorage.getItem('use_free_quota') === 'true';
    if (!useFreeQuota) {
        if (typeof window !== 'undefined') window.dispatchEvent(new Event('quota_exceeded'));
        throw new Error("QUOTA_EXCEEDED");
    }

    const user = auth.currentUser;
    if (!user) {
        if (typeof window !== 'undefined') window.dispatchEvent(new Event('quota_exceeded'));
        throw new Error("QUOTA_EXCEEDED");
    }

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
        if (typeof window !== 'undefined') window.dispatchEvent(new Event('quota_exceeded'));
        throw new Error("QUOTA_EXCEEDED");
    }

    // Consume quota
    await setDoc(docRef, { 
        aiQuotaUsed: currentUsed + 1, 
        lastQuotaDate: today,
        uid: user.uid,
        email: user.email || ''
    }, { merge: true });
    
    return true;
}

async function executeWithCacheAndQuota(
    promptStringForHash: string, 
    apiCall: () => Promise<string>
): Promise<string> {
    const promptHash = await hashPrompt(promptStringForHash);
    const cacheRef = doc(db, 'ai_cache', promptHash);
    
    try {
        const cacheSnap = await getDoc(cacheRef);
        if (cacheSnap.exists()) {
            return cacheSnap.data().response;
        }
    } catch (e) {
        console.error("Cache read error", e);
    }

    await checkAndConsumeQuota();

    const responseText = await apiCall();

    try {
        if (auth.currentUser) {
            await setDoc(cacheRef, {
                promptHash,
                response: responseText,
                createdAt: serverTimestamp()
            });
        }
    } catch (e) {
        console.error("Cache write error", e);
    }

    return responseText;
}

/**
 * A centralized error handler for Gemini API calls.
 * It inspects the error and returns a user-friendly, localized message.
 * @param error The error caught from the try/catch block.
 * @returns A string containing a helpful error message in Thai.
 */
export const handleGeminiError = (error: unknown): string => {
    console.error("Gemini Service Error:", error instanceof Error ? error.message : JSON.stringify(error));
    
    let errorMessage = "";
    if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else if (error && typeof error === 'object') {
        try {
            errorMessage = JSON.stringify(error);
        } catch (e) {
            errorMessage = String(error);
        }
    }

    if (errorMessage === "QUOTA_EXCEEDED") {
        return "โควต้าการใช้งาน AI ฟรีของคุณหมดแล้วสำหรับวันนี้ (3 ครั้ง/วัน) กรุณากลับมาใหม่พรุ่งนี้ หรือตั้งค่า API Key ของคุณเองในหน้าตั้งค่า";
    }
    if (errorMessage.includes('API key not valid') || errorMessage.includes('API_KEY_INVALID')) {
        return "API Key ไม่ถูกต้องหรือไม่สามารถใช้งานได้ โปรดติดต่อผู้ดูแลระบบ";
    }
    if (errorMessage.includes('exceeded its spending cap') || errorMessage.includes('RESOURCE_EXHAUSTED') || errorMessage.includes('429')) {
        if (typeof window !== 'undefined') window.dispatchEvent(new Event('system_quota_exceeded'));
        return "โควต้าการใช้งาน AI ของระบบเต็มแล้ว กรุณาไปที่ 'ตั้งค่า' (ไอคอนฟันเฟืองมุมขวาบน) และใส่ API Key ของคุณเองเพื่อใช้งานต่อ";
    }
    
    if (errorMessage.includes('permission denied') || (errorMessage.includes('Generative Language API has not been used') && errorMessage.includes('or it is disabled'))) {
        const projectMatch = errorMessage.match(/project (\d+)/);
        if (projectMatch && projectMatch[1]) {
            const projectId = projectMatch[1];
            const enableUrl = `https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com?project=${projectId}`;
            return `เกิดข้อผิดพลาด: ดูเหมือนว่า Gemini API ยังไม่ได้ถูกเปิดใช้งานสำหรับโปรเจกต์ Google Cloud ของคุณ\n\nโปรดไปที่ลิงก์นี้เพื่อเปิดใช้งาน:\n${enableUrl}\n\nหลังจากเปิดใช้งานแล้ว โปรดรอสักครู่แล้วลองอีกครั้ง`;
        }
        return "เกิดข้อผิดพลาด: ไม่ได้รับอนุญาตให้ใช้ Gemini API โปรดตรวจสอบว่าคุณได้เปิดใช้งาน 'Generative Language API' ใน Google Cloud Console สำหรับโปรเจกต์ของคุณแล้ว";
    }
    
    return "ขออภัย, เกิดข้อผิดพลาดที่ไม่คาดคิดในการสื่อสารกับ AI โปรดลองอีกครั้งในภายหลัง";
};


export const createChatSession = (systemInstruction: string, history?: ChatMessage[]): Chat => {
  const ai = getAiClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: systemInstruction,
    },
    history: history,
  });
  
  const originalSendMessageStream = chat.sendMessageStream.bind(chat);
  chat.sendMessageStream = async function* (request: any) {
      await checkAndConsumeQuota();
      const stream = await originalSendMessageStream(request);
      for await (const chunk of stream) {
          yield chunk;
      }
  } as any;
  
  return chat;
};

export const generateFeedback = async (question: string, answer: string, context: string, projectName?: string): Promise<string> => {
  try {
    const prompt = getFeedbackPrompt(context, question, answer, projectName);

    return await executeWithCacheAndQuota(prompt, async () => {
        const ai = getAiClient();
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        
        if (!response.text) {
            if (response.promptFeedback?.blockReason) {
                throw new Error(`คำขอของคุณถูกบล็อกเนื่องจากนโยบายความปลอดภัย: ${response.promptFeedback.blockReason}. โปรดปรับแก้เนื้อหาของคุณ`);
            }
            throw new Error("ขออภัย, AI ไม่สามารถสร้างคำตอบได้ในขณะนี้ อาจเนื่องมาจากนโยบายความปลอดภัย");
        }

        return response.text;
    });
  } catch (error) {
    return handleGeminiError(error);
  }
};

/**
 * Generates content based on a simple prompt string.
 * Useful for general purpose AI tasks that don't fit specialized feedback models.
 */
export const generateSimpleContent = async (prompt: string): Promise<string> => {
  try {
    return await executeWithCacheAndQuota(prompt, async () => {
        const ai = getAiClient();
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        
        if (!response.text) {
            if (response.promptFeedback?.blockReason) {
                throw new Error(`คำขอของคุณถูกบล็อกเนื่องจากนโยบายความปลอดภัย: ${response.promptFeedback.blockReason}. โปรดปรับแก้เนื้อหาของคุณ`);
            }
            throw new Error("ขออภัย, AI ไม่สามารถสร้างคำตอบได้ในขณะนี้ อาจเนื่องมาจากนโยบายความปลอดภัย");
        }

        return response.text;
    });
  } catch (error) {
    return handleGeminiError(error);
  }
};

export interface ManualSource {
    type: 'manual';
    topic: string;
    author: string;
    publication: string;
}

export interface ImageSource {
    type: 'image';
    value: string;
    mimeType: string;
}

export const analyzeSource = async (source: ManualSource | ImageSource): Promise<string> => {
   try {
    const basePrompt = analyzeSourceBasePrompt;

    let contents: any;
    let promptStringForHash = '';

    if (source.type === 'manual') {
      contents = `${basePrompt}\n\nนี่คือข้อมูลที่นักเรียนกรอกมาเพื่อวิเคราะห์:
- **หัวข้อ/ชื่อเรื่อง:** ${source.topic || '(ไม่ได้ระบุ)'}
- **ผู้เขียน/ผู้แต่ง/องค์กร:** ${source.author || '(ไม่ได้ระบุ)'}
- **แหล่งตีพิมพ์/เผยแพร่ (เช่น ชื่อวารสาร, เว็บไซต์):** ${source.publication || '(ไม่ได้ระบุ)'}
- **โปรดให้คำแนะนำเกี่ยวกับความน่าเชื่อถือของแหล่งข้อมูลตามข้อมูลที่ให้มา. หากข้อมูลส่วนใดขาดหายไป (เช่น ไม่ได้ระบุผู้เขียน) ให้แนะนำนักเรียนว่าควรหาข้อมูลส่วนนั้นเพิ่มเติมเพื่อการประเมินที่สมบูรณ์ขึ้น และอธิบายว่าทำไมข้อมูลส่วนนั้นจึงสำคัญ.`;
      promptStringForHash = contents;
    } else { // image
      let base64Data = source.value;
      if (source.value.startsWith('http')) {
          base64Data = await fetchImageAsBase64(source.value);
      } else if (source.value.startsWith('data:')) {
          base64Data = source.value.split(',')[1];
      }

      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: source.mimeType,
        },
      };
      contents = { parts: [{ text: basePrompt }, imagePart, {text: "\n\nนี่คือรูปภาพของแหล่งข้อมูล (เช่น หนังสือ, บทความ) ที่นักเรียนส่งมาเพื่อวิเคราะห์. โปรดให้คำแนะนำเกี่ยวกับความน่าเชื่อถือของแหล่งข้อมูลในภาพนี้."}] };
      promptStringForHash = basePrompt + base64Data.substring(0, 100); // Hash part of image data
    }
  
    return await executeWithCacheAndQuota(promptStringForHash, async () => {
        const ai = getAiClient();
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: contents,
        });
        
        if (!response.text) {
            if (response.promptFeedback?.blockReason) {
                throw new Error(`คำขอของคุณถูกบล็อกเนื่องจากนโยบายความปลอดภัย: ${response.promptFeedback.blockReason}. โปรดปรับแก้เนื้อหาของคุณ`);
            }
            throw new Error("ขออภัย, AI ไม่สามารถสร้างคำตอบได้ในขณะนี้ อาจเนื่องมาจากนโยบายความปลอดภัย");
        }

        return response.text;
    });
  } catch(error) {
    return handleGeminiError(error);
  }
};

// --- IS2 Services ---

export interface PresentationSection {
    header: string;
    bullet_points: string[];
}

export interface PresentationContent {
    title: string;
    sections: PresentationSection[];
}

export const generatePresentationContent = async (
    projectTitle: string,
    introduction: string,
    methodology: string,
    results: string,
    conclusion: string
): Promise<PresentationContent> => {
    try {
        const systemInstruction = presentationSystemInstruction;
        
        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: 'ชื่อโครงงานที่น่าสนใจและสรุปใจความสำคัญ' },
                sections: {
                    type: Type.ARRAY,
                    description: 'ลำดับเนื้อหาในสไลด์หรือโปสเตอร์',
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            header: { type: Type.STRING, description: 'หัวข้อของส่วนนั้นๆ เช่น "ที่มาและความสำคัญ" (ไม่ต้องใส่ตัวเลขนำหน้า)' },
                            bullet_points: {
                                type: Type.ARRAY,
                                description: 'เนื้อหาสำคัญในรูปแบบรายการ (bullet points)',
                                items: { type: Type.STRING }
                            }
                        },
                        required: ['header', 'bullet_points']
                    }
                }
            },
            required: ['title', 'sections']
        };

        const contents = `
ชื่อโครงงาน: "${projectTitle}"

สรุปที่มา, ความสำคัญ, และวัตถุประสงค์ (จากบทที่ 1): 
"${introduction}"

สรุปวิธีดำเนินการ (จากบทที่ 3):
"${methodology}"

สรุปผลการศึกษาที่สำคัญ (จากบทที่ 4):
"${results}"

สรุปและอภิปรายผล (จากบทที่ 5):
"${conclusion}"
        `;

        const responseText = await executeWithCacheAndQuota("presentation:" + contents, async () => {
            const ai = getAiClient();
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: contents,
                config: {
                    systemInstruction,
                    responseMimeType: 'application/json',
                    responseSchema
                }
            });
            
            if (!response.text) {
                if (response.promptFeedback?.blockReason) {
                    throw new Error(`คำขอถูกบล็อกเนื่องจากนโยบายความปลอดภัย: ${response.promptFeedback.blockReason}.`);
                }
                throw new Error("AI ไม่ได้ส่งคืนเนื้อหาใดๆ อาจเป็นเพราะนโยบายความปลอดภัย");
            }
            return response.text;
        });

        const cleanedJson = responseText.trim().replace(/^```(json)?\s*/, '').replace(/```\s*$/, '');
        return JSON.parse(cleanedJson);

    } catch (error) {
        if (error instanceof SyntaxError) {
           throw new Error("AI ตอบกลับในรูปแบบที่ไม่ใช่ JSON ที่ถูกต้อง โปรดลองอีกครั้ง");
        }
        throw new Error(handleGeminiError(error));
    }
};

export const generateProjectTitleSuggestions = async (
    studentInterest: string
): Promise<string[]> => {
    try {
        const systemInstruction = projectTitleSystemInstruction;

        const responseSchema = {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        };

        const contents = `หัวข้อที่นักเรียนสนใจ: "${studentInterest}"`;

        const responseText = await executeWithCacheAndQuota("title:" + contents, async () => {
            const ai = getAiClient();
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: contents,
                config: {
                    systemInstruction,
                    responseMimeType: 'application/json',
                    responseSchema
                }
            });
            
            if (!response.text) {
                if (response.promptFeedback?.blockReason) {
                    throw new Error(`คำขอถูกบล็อกเนื่องจากนโยบายความปลอดภัย: ${response.promptFeedback.blockReason}.`);
                }
                throw new Error("AI ไม่ได้ส่งคืนเนื้อหาใดๆ อาจเป็นเพราะนโยบายความปลอดภัย");
            }
            return response.text;
        });
        
        const cleanedJson = responseText.trim().replace(/^```(json)?\s*/, '').replace(/```\s*$/, '');
        return JSON.parse(cleanedJson);

    } catch (error) {
       if (error instanceof SyntaxError) {
           throw new Error("AI ตอบกลับในรูปแบบที่ไม่ใช่ JSON ที่ถูกต้อง โปรดลองอีกครั้ง");
       }
       throw new Error(handleGeminiError(error));
    }
};

export interface ReportSection {
    header: string;
    guideline: string;
}

export interface ReportChapter {
    chapter_number: number;
    title: string;
    sections: ReportSection[];
}

export interface ReportStructure {
    title: string;
    chapters: ReportChapter[];
}

export interface ChapterGuideline {
    chapter_number: number;
    title: string;
    sections: ReportSection[];
}

export const generateChapterGuideline = async (
    projectTitle: string,
    chapterNumber: number,
    coreConcept: string = '',
    researchData: string = '',
    stepNumber?: number
): Promise<ChapterGuideline> => {
    try {
        const systemInstruction = `คุณคือ "หุ่นยนต์ผู้ช่วยนักประดิษฐ์ใจดี" 🤖 ภารกิจของคุณคือช่วยเด็กๆ วางโครงสร้างการทำโครงงานวิทยาศาสตร์ให้สนุกและเข้าใจง่าย!
ใช้ภาษาที่เป็นมิตร ให้กำลังใจ เหมือนพี่สอนน้อง หลีกเลี่ยงคำศัพท์วิชาการที่ยากเกินไป ถ้าต้องใช้ให้เปรียบเทียบให้เห็นภาพ

**คำแนะนำสำหรับแต่ละก้าว/บท (ให้เน้นก้าวที่เด็กกำลังทำอยู่):**

- **ก้าวที่ 4: จัดหน้ากระดาษให้สวยเป๊ะ (การจัดรูปแบบรายงาน)**
  - ให้คำแนะนำเรื่องการตั้งค่าหน้ากระดาษ ฟอนต์ และขนาดตัวอักษรที่เหมาะสม
  - แนะนำการเขียนส่วนประกอบสำคัญ เช่น บทคัดย่อ สารบัญ และบรรณานุกรม
  - เน้นย้ำความสำคัญของการอ้างอิงแหล่งที่มา

- **บทที่ 1 (ก้าวที่ 5): จุดเริ่มต้นการผจญภัย (บทนำ)**
  - เล่าว่าทำไมเราถึงสนใจเรื่องนี้ (ปัญหาคืออะไร ทำไมถึงอยากแก้)
  - เป้าหมายของเราคืออะไร (ทำไปเพื่ออะไร)
  - ขอบเขตการสำรวจของเรา (เราจะศึกษาแค่ไหน)

- **บทที่ 2 (ก้าวที่ 6): รวบรวมเสบียงความรู้ (เอกสารที่เกี่ยวข้อง)**
  - สรุปความรู้ ข้อมูล หรือทฤษฎีที่ไปค้นคว้ามา (จากก้าวที่ 3)
  - เล่าว่ามีใครเคยทำอะไรคล้ายๆ แบบนี้บ้าง แล้วของเราเจ๋งกว่ายังไง

- **บทที่ 3 (ก้าวที่ 7-9): วางแผนและลงมือทำ (วิธีดำเนินการ)**
  - ก้าวที่ 7: ออกแบบการทดลองแบบนักสืบ (ตัวแปรต้น ตัวแปรตาม ตัวแปรควบคุม)
  - ก้าวที่ 8: เตรียมอุปกรณ์และสร้างชิ้นงาน
  - ก้าวที่ 9: เขียนขั้นตอนการทำทีละสเต็ปให้เพื่อนๆ อ่านแล้วทำตามได้

- **บทที่ 4 (ก้าวที่ 10): โชว์ผลงาน (ผลการศึกษา)**
  - นำเสนอข้อมูลที่ได้จากการทดลองแบบตรงไปตรงมา (ห้ามใส่ความรู้สึก)
  - แนะนำให้ใช้ตารางหรือกราฟสวยๆ เพื่อให้ดูง่าย

- **บทที่ 5 (ก้าวที่ 11): สรุปผลการผจญภัย (สรุปและอภิปรายผล)**
  - สรุปว่าผลการทดลองตรงกับเป้าหมายที่ตั้งไว้ไหม
  - วิเคราะห์ว่าทำไมถึงเป็นแบบนั้น
  - มีข้อเสนอแนะอะไรให้เพื่อนๆ ที่อยากทำต่อบ้าง

- **ก้าวที่ 12: เตรียมตัวพรีเซนต์ (การนำเสนอและจัดบอร์ด)**
  - แนะนำวิธีทำป้ายนิเทศหรือโปสเตอร์ให้ดึงดูดใจ
  - เทคนิคการเล่าเรื่องให้สนุกและน่าติดตาม

- **ก้าวที่ 13: วัดพลังความสำเร็จ (การประเมินผล)**
  - แนะนำวิธีเช็คว่าโครงงานของเราสำเร็จตามเป้าหมายไหม
  - สิ่งที่ได้เรียนรู้จากการทำโครงงานนี้

จงสร้างโครงร่างสำหรับ **ก้าวที่ ${stepNumber || chapterNumber} (บทที่ ${chapterNumber})** ในรูปแบบ JSON ที่กำหนดให้ โดยปรับ guideline ให้เข้ากับชื่อโครงงานและข้อมูลของเด็กๆ`;

        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                chapter_number: { type: Type.INTEGER, description: 'หมายเลขบท' },
                title: { type: Type.STRING, description: 'ชื่อบท เช่น "บทนำ"' },
                sections: {
                    type: Type.ARRAY,
                    description: 'หัวข้อย่อยในบทนี้',
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            header: { type: Type.STRING, description: 'ชื่อหัวข้อย่อย เช่น "ความเป็นมาและความสำคัญ"' },
                            guideline: { type: Type.STRING, description: 'คำแนะนำสั้นๆ ว่าควรเขียนอะไรในส่วนนี้' }
                        },
                        required: ['header', 'guideline']
                    }
                }
            },
            required: ['chapter_number', 'title', 'sections']
        };

        const contents = `ชื่อโครงงาน: "${projectTitle}"\nข้อมูลแกนหลัก: "${coreConcept}"\nข้อมูลการสืบค้น: "${researchData}"\n\nสร้างคำแนะนำสำหรับก้าวที่ ${stepNumber || chapterNumber} (บทที่ ${chapterNumber})`;

        const responseText = await executeWithCacheAndQuota(`chapter_guideline:${stepNumber || chapterNumber}:${contents}`, async () => {
            const ai = getAiClient();
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents,
                config: {
                    systemInstruction,
                    responseMimeType: 'application/json',
                    responseSchema,
                }
            });
            return response.text || "{}";
        });

        return JSON.parse(responseText) as ChapterGuideline;
    } catch (error: any) {
        console.error("Error generating chapter guideline:", error);
        throw new Error(handleGeminiError(error));
    }
};

export const generateAARReport = async (
    projectTitle: string,
    wentWell: string,
    problems: string,
    improvements: string
): Promise<string> => {
    try {
        const systemInstruction = `คุณคือ "ผู้เชี่ยวชาญด้านการประเมินโครงการ (Project Evaluator)" ภารกิจของคุณคือช่วยนักเรียนเขียน "รายงานถอดบทเรียน (After Action Review - AAR)" สำหรับโครงการบริการสังคม (IS3)
คุณต้องนำข้อมูลที่นักเรียนให้มา (สิ่งที่ทำได้ดี, ปัญหา/อุปสรรค, สิ่งที่อยากปรับปรุง) มาเรียบเรียงใหม่ให้เป็นรายงานที่สละสลวย เป็นทางการ แต่ยังคงอ่านง่ายและให้กำลังใจ
รูปแบบการเขียนควรแบ่งเป็นหัวข้อชัดเจน เช่น:
1. ภาพรวมความสำเร็จของโครงการ
2. ปัญหาและอุปสรรคที่พบ
3. บทเรียนที่ได้รับและแนวทางพัฒนาในอนาคต
4. บทสรุปความประทับใจ

ใช้ภาษาไทยที่ถูกต้อง เหมาะสมกับการเขียนรายงานวิชาการ แต่ไม่น่าเบื่อ`;

        const contents = `ชื่อโครงการ: "${projectTitle}"\nสิ่งที่ทำได้ดี: "${wentWell}"\nปัญหาและอุปสรรค: "${problems}"\nสิ่งที่อยากปรับปรุง/ข้อเสนอแนะ: "${improvements}"\n\nช่วยเขียนรายงานถอดบทเรียน (AAR) ให้หน่อย`;

        const responseText = await executeWithCacheAndQuota(`aar_report:${projectTitle}:${wentWell}:${problems}:${improvements}`, async () => {
            const ai = getAiClient();
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: contents,
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.7,
                }
            });
            return response.text || '';
        });

        return responseText;
    } catch (error: any) {
        console.error("Error generating AAR report:", error);
        throw new Error(handleGeminiError(error));
    }
};

export const generateReportStructure = async (
    projectTitle: string
): Promise<ReportStructure> => {
    try {
        const systemInstruction = reportStructureSystemInstruction;

        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: 'ชื่อโครงงานฉบับสมบูรณ์' },
                chapters: {
                    type: Type.ARRAY,
                    description: 'โครงสร้างรายงาน 5 บท',
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            chapter_number: { type: Type.INTEGER, description: 'หมายเลขบท' },
                            title: { type: Type.STRING, description: 'ชื่อบท เช่น "บทนำ"' },
                            sections: {
                                type: Type.ARRAY,
                                description: 'หัวข้อย่อยในแต่ละบท',
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        header: { type: Type.STRING, description: 'ชื่อหัวข้อย่อย เช่น "ความเป็นมาและความสำคัญ"' },
                                        guideline: { type: Type.STRING, description: 'คำแนะนำสั้นๆ ว่าควรเขียนอะไรในส่วนนี้' }
                                    },
                                    required: ['header', 'guideline']
                                }
                            }
                        },
                        required: ['chapter_number', 'title', 'sections']
                    }
                }
            },
            required: ['title', 'chapters']
        };

        const contents = `ชื่อโครงงาน: "${projectTitle}"`;

        const responseText = await executeWithCacheAndQuota("structure:" + contents, async () => {
            const ai = getAiClient();
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: contents,
                config: {
                    systemInstruction,
                    responseMimeType: 'application/json',
                    responseSchema
                }
            });
            
            if (!response.text) {
                if (response.promptFeedback?.blockReason) {
                    throw new Error(`คำขอถูกบล็อกเนื่องจากนโยบายความปลอดภัย: ${response.promptFeedback.blockReason}.`);
                }
                throw new Error("AI ไม่ได้ส่งคืนเนื้อหาใดๆ อาจเป็นเพราะนโยบายความปลอดภัย");
            }
            return response.text;
        });
        
        const cleanedJson = responseText.trim().replace(/^```(json)?\s*/, '').replace(/```\s*$/, '');
        return JSON.parse(cleanedJson);

    } catch (error) {
       if (error instanceof SyntaxError) {
           throw new Error("AI ตอบกลับในรูปแบบที่ไม่ใช่ JSON ที่ถูกต้อง โปรดลองอีกครั้ง");
       }
       throw new Error(handleGeminiError(error));
    }
};

export const generateSectionFeedback = async (
    projectTitle: string,
    chapterTitle: string,
    sectionHeader: string,
    studentInput: string,
    imageInput: { data: string; mimeType: string } | null
): Promise<string> => {
    try {
        const basePrompt = sectionFeedbackBasePrompt(projectTitle, chapterTitle, sectionHeader);

        let contents: any;
        let promptStringForHash = '';

        if (studentInput.trim() && imageInput) {
            let base64Data = imageInput.data;
            if (imageInput.data.startsWith('http')) {
                base64Data = await fetchImageAsBase64(imageInput.data);
            } else if (imageInput.data.startsWith('data:')) {
                base64Data = imageInput.data.split(',')[1];
            }

            const textPart = { text: `${basePrompt}\n\nนี่คือเนื้อหาที่นักเรียนเขียนและรูปภาพที่แนบมาสำหรับส่วนนี้ โปรดประเมินทั้งสองอย่าง:` };
            const studentTextPart = { text: `--- TEXT ---\n${studentInput}\n------------` };
            const imagePart = {
                inlineData: {
                    data: base64Data,
                    mimeType: imageInput.mimeType,
                },
            };
            contents = { parts: [textPart, studentTextPart, imagePart] };
            promptStringForHash = basePrompt + studentInput + base64Data.substring(0, 100);
        } else if (imageInput) {
             let base64Data = imageInput.data;
             if (imageInput.data.startsWith('http')) {
                 base64Data = await fetchImageAsBase64(imageInput.data);
             } else if (imageInput.data.startsWith('data:')) {
                 base64Data = imageInput.data.split(',')[1];
             }

             const textPart = { text: `${basePrompt}\n\nนักเรียนไม่ได้เขียนเนื้อหา แต่ได้ส่งรูปภาพนี้มาสำหรับส่วนนี้ โปรดประเมินรูปภาพ:` };
             const imagePart = {
                inlineData: {
                    data: base64Data,
                    mimeType: imageInput.mimeType,
                },
            };
            contents = { parts: [textPart, imagePart] };
            promptStringForHash = basePrompt + base64Data.substring(0, 100);
        } else {
             contents = `${basePrompt}\n\nนี่คือเนื้อหาที่นักเรียนเขียนสำหรับส่วนนี้:\n---\n${studentInput}\n---`;
             promptStringForHash = contents;
        }

        return await executeWithCacheAndQuota(promptStringForHash, async () => {
            const ai = getAiClient();
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: contents,
            });
            
            if (!response.text) {
                if (response.promptFeedback?.blockReason) {
                    throw new Error(`คำขอของคุณถูกบล็อกเนื่องจากนโยบายความปลอดภัย: ${response.promptFeedback.blockReason}. โปรดปรับแก้เนื้อหาของคุณ`);
                }
                throw new Error("ขออภัย, AI ไม่สามารถสร้างคำตอบได้ในขณะนี้ อาจเนื่องมาจากนโยบายความปลอดภัย");
            }

            return response.text;
        });

    } catch (error) {
        return handleGeminiError(error);
    }
};
