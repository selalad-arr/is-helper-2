import { getAiClient, executeWithCacheAndQuota, handleGeminiError } from './core';
import { Type } from "@google/genai";
import { ManualSource, ImageSource } from './types';

export const generateSimpleContent = async (prompt: string): Promise<string> => {
    try {
        return await executeWithCacheAndQuota("simple:" + prompt, async (modelId, isPremium) => {
            const ai = getAiClient(isPremium);
            const response: any = await ai.models.generateContent({
                model: modelId,
                contents: prompt,
            });
            return response.text || '';
        });
    } catch (error) {
        throw new Error(handleGeminiError(error));
    }
};

export const generateFeedback = async (
    question: string,
    answer: string,
    context: string = '',
    projectName: string = ''
): Promise<string> => {
    try {
        const prompt = `คุณคือครูผู้ช่วยสอน AI
โครงงานหัวข้อ: "${projectName}"
คำถาม: "${question}"
คำตอบของนักเรียน: "${answer}"
บริบทเพิ่มเติม: "${context}"

กรุณาให้ข้อเสนอแนะที่สร้างสรรค์กับนักเรียนว่าตอบได้ดีเพียงใด และควรปรับปรุงส่วนไหนบ้างเพื่อให้เนื้อหาครบถ้วนตรงตามหลักวิชาการ`;
        
        return await generateSimpleContent(prompt);
    } catch (error) {
        throw new Error(handleGeminiError(error));
    }
};

export const analyzeSource = async (
    prompt: string,
    sources: (ManualSource | ImageSource)[]
): Promise<string> => {
    try {
        const parts: any[] = [{ text: prompt }];
        
        for (const source of sources) {
            if (source.type === 'manual') {
                parts.push({ text: `Source Context: ${source.topic} by ${source.author} (${source.publication})` });
            } else if (source.type === 'image') {
                parts.push({
                    inlineData: {
                        data: source.value.split(',')[1] || source.value,
                        mimeType: source.mimeType
                    }
                });
            }
        }

        return await executeWithCacheAndQuota("analyze:" + prompt + sources.length, async (modelId, isPremium) => {
            const ai = getAiClient(isPremium);
            const response: any = await ai.models.generateContent({
                model: modelId,
                contents: { parts },
            });
            return response.text || '';
        });
    } catch (error) {
        throw new Error(handleGeminiError(error));
    }
};
