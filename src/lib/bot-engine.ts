import { NICHE_FLOWS, getResponseForMessage } from './niche-flows';
import OpenAI from 'openai';

// Initialize OpenAI Client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-openai-key-missing',
    dangerouslyAllowBrowser: true // Only for demo/dev, usually backend only
});

// Mock AI Service (OpenAI GPT-4o-Mini as a cost-effective alternative to Claude if User Prefers)
// But for now, let's keep the mock response logic for simplicity until keys are added.
async function getAIResponse(userMessage: string, context: string, systemPrompt?: string) {
    if (!process.env.OPENAI_API_KEY) {
        console.warn("⚠️ No OPENAI_API_KEY found. Using mock response.");
        await new Promise(resolve => setTimeout(resolve, 1000));
        return `[System: AI Key Missing] I simulate intelligence. You asked: "${userMessage}".\n(Prompt: ${systemPrompt})`;
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt || `You are a helpful assistant for '${context}'. be concise.` },
                { role: "user", content: userMessage }
            ],
            model: "gpt-4o-mini",
        });

        return completion.choices[0].message.content || "I'm sorry, I built a blank response.";
    } catch (error) {
        console.error("OpenAI Error:", error);
        return "Thinking process failed.";
    }
}

// REAL Voice Transcription using OpenAI Whisper
async function transcribeAudio(audioUrl: string) {
    if (!process.env.OPENAI_API_KEY) {
        console.warn("⚠️ No OPENAI_API_KEY found. Using mock transcription.");
        await new Promise(resolve => setTimeout(resolve, 1500));
        return "Can you tell me more about your company culture and values?";
    }

    try {
        // In a real scenario, we would need to fetch the audio file from the URL first
        // const audioFile = await fetch(audioUrl).then(res => res.blob());
        // const translation = await openai.audio.transcriptions.create({
        //     file: audioFile,
        //     model: "whisper-1",
        // });
        // return translation.text;

        return "This is a placeholder for real Whisper API integration. It requires file handling.";
    } catch (error) {
        console.error("Whisper Error:", error);
        return "Audio transcription failed.";
    }
}

export type BotResponse = {
    text: string;
    source: 'FLOW' | 'AI' | 'VOICE_FLOW' | 'CUSTOM_FLOW';
    tag?: string;
    data?: any;
};

export async function processUserMessage(
    userId: string,
    message: string,
    messageType: 'text' | 'audio',
    nicheId: string,
    customFlow?: any[],
    systemPrompt?: string,
    websiteData?: string // Changed from websiteUrl. Now expects raw content.
): Promise<BotResponse> {

    let processedText = message;

    // 1. Handle Voice (Simulated for now, but ready for Whisper)
    if (messageType === 'audio') {
        processedText = await transcribeAudio(message);
    }

    // 2. Check Custom Flows (Database Config) FIRST
    if (customFlow && customFlow.length > 0) {
        const matchedStep = customFlow.find(step =>
            processedText.toLowerCase().includes(step.trigger.toLowerCase())
        );

        if (matchedStep) {
            return {
                text: matchedStep.text,
                source: 'CUSTOM_FLOW',
                tag: matchedStep.type
            };
        }
    }

    const flow = NICHE_FLOWS[nicheId] || NICHE_FLOWS['LEAD_REPLY_AGENT'];

    // 3. Check Hardcoded Niche Flows (Fallback)
    const flowResult = getResponseForMessage(processedText, nicheId);

    if (flowResult) {
        return {
            text: flowResult.response,
            source: messageType === 'audio' ? 'VOICE_FLOW' : 'FLOW',
            tag: flowResult.tag
        };
    }

    // --- NEW: Website Knowledge Engine (Cached Content) ---
    // Now instant! No fetching.
    if (websiteData) {
        const knowledgeAnswer = findKnowledgeMatch(processedText, websiteData);
        if (knowledgeAnswer) {
            return {
                text: `(From Website): ${knowledgeAnswer}`,
                source: 'FLOW',
                tag: 'KNOWLEDGE_BASE'
            };
        }
    }

    // 4. Fallback to AI (Real Call or Default)
    if (!process.env.OPENAI_API_KEY) {
        return {
            text: systemPrompt ? `[AI Disabled] I would usually say: "${systemPrompt}..."` : "I'm sorry, I couldn't find that information in my flows or your website.",
            source: 'FLOW'
        };
    }

    const aiResponse = await getAIResponse(processedText, flow.name, systemPrompt);

    return {
        text: aiResponse,
        source: 'AI'
    };
}

// --- Helper Functions (Outside of main function) ---

// function readWebsiteContent removed (scrapers moved to api/config)

function findKnowledgeMatch(userMessage: string, websiteContent: string) {
    if (!websiteContent) return null;

    const keywords = userMessage.toLowerCase().split(' ').filter(w => w.length > 4);
    const sentences = websiteContent.split('.');

    for (const sentence of sentences) {
        let matchCount = 0;
        for (const word of keywords) {
            if (sentence.toLowerCase().includes(word)) matchCount++;
        }
        if (matchCount >= 2) {
            return sentence.trim() + ".";
        }
    }
    return null;
}
