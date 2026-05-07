import { GoogleGenerativeAI } from '@google/generative-ai';

const initGemini = () => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key') {
    console.warn("⚠️  Gemini API key is missing or not configured.");
    return null;
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI;
};

export default initGemini;
