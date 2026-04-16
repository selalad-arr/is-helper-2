import { Type } from "@google/genai";
import { getAiClient, executeWithCacheAndQuota, handleGeminiError } from './core';
import { presentationSystemInstruction } from '../prompts/presentationPrompt';
import { projectTitleSystemInstruction } from '../prompts/projectTitlePrompt';
import { reportStructureSystemInstruction } from '../prompts/reportStructurePrompt';
import { sectionFeedbackBasePrompt } from '../prompts/sectionFeedbackPrompt';
import { masterDraftSystemInstruction } from '../prompts/masterDraftPrompt';
import { fetchImageAsBase64 } from '../../utils/imageUtils';
import { PresentationContent, ChapterGuideline, ReportStructure } from './types';

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
                title: { type: Type.STRING },
                sections: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            header: { type: Type.STRING },
                            bullet_points: {
                                type: Type.ARRAY,
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
สรุปที่มา, ความสำคัญ, และวัตถุประสงค์ (จากบทที่ 1): "${introduction}"
สรุปวิธีดำเนินการ (จากบทที่ 3): "${methodology}"
สรุปผลการศึกษาที่สำคัญ (จากบทที่ 4): "${results}"
สรุปและอภิปรายผล (จากบทที่ 5): "${conclusion}"
        `;

        const responseText = await executeWithCacheAndQuota("presentation:" + contents, async (modelId, isPremium) => {
            const ai = getAiClient(isPremium);
            const response: any = await ai.models.generateContent({
                model: modelId,
                contents: contents,
                config: {
                    systemInstruction,
                    responseMimeType: 'application/json',
                    responseSchema
                }
            });
            
            if (!response.text) {
                throw new Error("AI ไม่ได้ส่งคืนเนื้อหาใดๆ อาจเป็นเพราะนโยบายความปลอดภัย");
            }
            return response.text;
        });

        const cleanedJson = responseText.trim().replace(/^```(json)?\s*/, '').replace(/```\s*$/, '');
        return JSON.parse(cleanedJson);

    } catch (error) {
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

        const responseText = await executeWithCacheAndQuota("title:" + contents, async (modelId, isPremium) => {
            const ai = getAiClient(isPremium);
            const response: any = await ai.models.generateContent({
                model: modelId,
                contents: contents,
                config: {
                    systemInstruction,
                    responseMimeType: 'application/json',
                    responseSchema
                }
            });
            return response.text || "[]";
        });
        
        const cleanedJson = responseText.trim().replace(/^```(json)?\s*/, '').replace(/```\s*$/, '');
        return JSON.parse(cleanedJson);

    } catch (error) {
       throw new Error(handleGeminiError(error));
    }
};

export const generateChapterGuideline = async (
    projectTitle: string,
    chapterNumber: number,
    coreConcept: string = '',
    researchData: string = '',
    stepNumber?: number,
    fullReportContext?: string
): Promise<ChapterGuideline> => {
    try {
        const systemInstruction = `คุณคือ "หุ่นยนต์ผู้ช่วยนักประดิษฐ์ใจดี" 🤖 ช่วยแนะนำการเขียนรายงานบทที่ ${chapterNumber}...`;
        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                chapter_number: { type: Type.INTEGER },
                title: { type: Type.STRING },
                sections: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            header: { type: Type.STRING },
                            guideline: { type: Type.STRING }
                        },
                        required: ['header', 'guideline']
                    }
                }
            },
            required: ['chapter_number', 'title', 'sections']
        };

        const contents = `ชื่อโครงงาน: "${projectTitle}"
ไอเดีย/ข้อมูลเพิ่มเติม: "${coreConcept} ${researchData}"
${fullReportContext ? `[บริบทเล่มรายงานฉบับปัจจุบัน]\n${fullReportContext}\n\n` : ''}
สร้างคำแนะนำสำหรับการร่างเนื้อหาบทที่ ${chapterNumber}`;

        const responseText = await executeWithCacheAndQuota(`chapter_guideline:${chapterNumber}:${projectTitle}:${fullReportContext?.length || 0}`, async (modelId, isPremium) => {
            const ai = getAiClient(isPremium);
            const response: any = await ai.models.generateContent({
                model: modelId,
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
        const systemInstruction = `คุณคือผู้เชี่ยวชาญด้านการประเมินโครงการ...`;
        const contents = `ชื่อโครงการ: "${projectTitle}"\nสิ่งที่ทำได้ดี: "${wentWell}"\nปัญหาและอุปสรรค: "${problems}"\nสิ่งที่อยากปรับปรุง/ข้อเสนอแนะ: "${improvements}"`;

        const responseText = await executeWithCacheAndQuota(`aar_report:${projectTitle}:${wentWell}:${problems}:${improvements}`, async (modelId, isPremium) => {
            const ai = getAiClient(isPremium);
            const response: any = await ai.models.generateContent({
                model: modelId,
                contents: contents,
                config: {
                    systemInstruction,
                    temperature: 0.7,
                }
            });
            return response.text || '';
        });

        return responseText;
    } catch (error: any) {
        throw new Error(handleGeminiError(error));
    }
};

export const generateReportStructure = async (
    projectTitle: string,
    fullReportContext?: string
): Promise<ReportStructure> => {
    try {
        const systemInstruction = reportStructureSystemInstruction;
        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                chapters: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            chapter_number: { type: Type.INTEGER },
                            title: { type: Type.STRING },
                            sections: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        header: { type: Type.STRING },
                                        guideline: { type: Type.STRING }
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

        const contents = `ชื่อโครงงาน: "${projectTitle}"
${fullReportContext ? `[บริบทข้อมูลที่มีอยู่แล้ว]\n${fullReportContext}\n\n` : ''}
กรุณาออกแบบโครงสร้างรายงาน 5 บทที่เหมาะสม`;

        const responseText = await executeWithCacheAndQuota("structure:" + contents, async (modelId, isPremium) => {
            const ai = getAiClient(isPremium);
            const response: any = await ai.models.generateContent({
                model: modelId,
                contents: contents,
                config: {
                    systemInstruction,
                    responseMimeType: 'application/json',
                    responseSchema
                }
            });
            return response.text || '';
        });
        
        const cleanedJson = responseText.trim().replace(/^```(json)?\s*/, '').replace(/```\s*$/, '');
        return JSON.parse(cleanedJson);

    } catch (error) {
       throw new Error(handleGeminiError(error));
    }
};

export const generateSectionFeedback = async (
    projectTitle: string,
    chapterTitle: string,
    sectionHeader: string,
    studentInput: string,
    imageInput: { data: string; mimeType: string } | null,
    fullReportContext?: string
): Promise<string> => {
    try {
        const basePrompt = sectionFeedbackBasePrompt(projectTitle, chapterTitle, sectionHeader);
        let contents: any;

        const mainText = `
${fullReportContext ? `[บริบทของเล่มรายงานฉบับสมบูรณ์ (ถ้ามี)]\n${fullReportContext}\n\n---` : ''}
เนื้อหาที่นักเรียนส่งมาประเมิน:
${studentInput}
        `;

        if (studentInput.trim() && imageInput) {
            contents = { parts: [{ text: basePrompt }, { text: mainText }, { inlineData: { data: imageInput.data, mimeType: imageInput.mimeType } } ] };
        } else if (imageInput) {
            contents = { parts: [{ text: basePrompt + "\n\n" + (fullReportContext ? `[บริบทเล่มรายงาน]\n${fullReportContext}` : '') }, { inlineData: { data: imageInput.data, mimeType: imageInput.mimeType } } ] };
        } else {
             contents = `${basePrompt}\n\n${mainText}`;
        }

        return await executeWithCacheAndQuota("feedback:" + studentInput, async (modelId, isPremium) => {
            const ai = getAiClient(isPremium);
            const response: any = await ai.models.generateContent({
                model: modelId,
                contents: contents,
            });
            return response.text || '';
        });
    } catch (error: any) {
        return handleGeminiError(error);
    }
};

export const generateFullProjectDraft = async (
    projectTitle: string,
    coreConcept: string = ''
): Promise<any> => {
    try {
        const systemInstruction = masterDraftSystemInstruction;
        const contents = `ชื่อโครงงาน: "${projectTitle}"\nแนวคิดหลัก: "${coreConcept}"\nกรุณาร่างเนื้อหาทั้ง 5 บทตามรูปแบบที่กำหนด`;

        const responseText = await executeWithCacheAndQuota("full_draft:" + contents, async (modelId, isPremium) => {
            const ai = getAiClient(isPremium);
            const response: any = await ai.models.generateContent({
                model: modelId,
                contents,
                config: {
                    systemInstruction,
                    responseMimeType: 'application/json',
                }
            });
            return response.text || "{}";
        });

        const cleanedJson = responseText.trim().replace(/^```(json)?\s*/, '').replace(/```\s*$/, '');
        return JSON.parse(cleanedJson);
    } catch (error: any) {
        throw new Error(handleGeminiError(error));
    }
};
