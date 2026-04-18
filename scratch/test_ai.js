import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local from project root
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ Error: No API Key found in .env.local");
    process.exit(1);
}

console.log(`Using API Key starting with: ${apiKey.substring(0, 7)}...`);

async function testAi() {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        console.log("⏳ Sending test prompt to Gemini...");
        const result = await model.generateContent("Hello, are you working? Answer with 'Yes, I am working!'");
        const response = await result.response;
        const text = response.text();

        console.log("✅ Success!");
        console.log(`🤖 AI Response: ${text}`);
    } catch (error) {
        console.error("❌ AI Test Failed:");
        console.error(error.message);
        if (error.stack) {
            // Check for specific error types
            if (error.message.includes('API_KEY_INVALID')) {
                console.error("👉 Reason: The API Key is invalid.");
            } else if (error.message.includes('quota')) {
                console.error("👉 Reason: Quota exceeded.");
            }
        }
    }
}

testAi();
