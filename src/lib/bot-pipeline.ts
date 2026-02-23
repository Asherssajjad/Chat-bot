import { prisma } from '@/lib/prisma';
import { processUserMessage } from '@/lib/bot-engine';
import { NICHE_FLOWS } from '@/lib/niche-flows';

const MAX_AI_PER_LEAD = 3;
const MAX_REPLY_LENGTH = 400;
const DEFAULT_CTA = '\n\nReply with 1-5 to continue 👋';

const CTA_PATTERNS = [
    /reply\s+with/i,
    /choose\s+(a\s+)?number/i,
    /(reply|tap|click|select|tell)\s+(me|us)/i,
    /\?\s*$/,
    /[1-5]\s*[️⃣)]/,
];

function hasCTA(text: string): boolean {
    return CTA_PATTERNS.some((p) => p.test(text));
}

function ensureCTA(text: string): string {
    if (hasCTA(text)) return text;
    return text.trimEnd() + DEFAULT_CTA;
}

function ensureShort(text: string): string {
    const t = text.trim();
    if (t.length <= MAX_REPLY_LENGTH) return t;
    return t.slice(0, MAX_REPLY_LENGTH - 3).trim() + '...';
}

function normalizeReply(text: string): string {
    return ensureShort(ensureCTA(text));
}

export type PipelineInput = {
    client: { id: string; niche: string; systemPrompt?: string | null; websiteContent?: string | null };
    lead: { id: string };
    incomingMessage: string;
};

export type PipelineOutput = {
    text: string;
    tag: 'HOT' | 'WARM' | 'COLD';
    source: string;
};

export async function runBotPipeline({
    client,
    lead,
    incomingMessage,
}: PipelineInput): Promise<PipelineOutput> {
    const text = incomingMessage.trim();

    // Safety check for empty messages
    if (!text) {
        const fallback = NICHE_FLOWS[client.niche] || NICHE_FLOWS['LEAD_REPLY_AGENT'];
        return {
            text: normalizeReply(fallback.initialMessage),
            tag: 'COLD',
            source: 'FLOW',
        };
    }

    const [aiCount, botMessageCount] = await Promise.all([
        prisma.chatLog.count({ where: { leadId: lead.id, type: 'AI' } }),
        prisma.chatLog.count({ where: { leadId: lead.id, sender: 'BOT' } }),
    ]);

    const isFirstResponse = botMessageCount === 0;

    // First response must be a conversion menu
    if (isFirstResponse) {
        const flow = NICHE_FLOWS[client.niche] || NICHE_FLOWS['LEAD_REPLY_AGENT'];
        const menu = flow.initialMessage;
        return {
            text: normalizeReply(menu),
            tag: 'COLD',
            source: 'FLOW',
        };
    }

    // Call existing bot logic (menu → flow → website KB → AI)
    let result = await processUserMessage(
        client.id,
        text,
        'text',
        client.niche,
        undefined,
        client.systemPrompt ?? undefined,
        client.websiteContent ?? undefined
    );

    // AI can be used max 3 times per lead
    if (result.source === 'AI' && aiCount >= MAX_AI_PER_LEAD) {
        result = {
            text: "Got it. " + DEFAULT_CTA.trim(),
            source: 'FLOW',
            tag: 'COLD',
        };
    }

    // Tag lead as HOT / WARM / COLD
    const tag = (result.tag?.toUpperCase() === 'HOT' || result.tag?.toUpperCase() === 'WARM' || result.tag?.toUpperCase() === 'COLD'
        ? result.tag?.toUpperCase()
        : 'COLD') as 'HOT' | 'WARM' | 'COLD';

    return {
        // Every reply must contain CTA and be short (WhatsApp style)
        text: normalizeReply(result.text),
        tag,
        source: result.source,
    };
}
