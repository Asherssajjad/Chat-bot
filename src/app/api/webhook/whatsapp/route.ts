import { NextRequest, NextResponse } from 'next/server';
import { getResponseForMessage } from '@/lib/niche-flows';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // 1. Identify User and Bot (Mocked for now)
        const botNiche = 'LEAD_REPLY_AGENT';
        const message = body.message?.text || '';
        const sender = body.sender?.phone || 'Unknown';

        console.log(`[WHATSAPP WEBHOOK] Message from ${sender}: ${message}`);

        // 🧪 STRICT RULE: NEVER reply to inactive leads (Handled by timeout in real implementation)
        // 🧪 STRICT RULE: Sound professional. No emojis except 👋 or 👍.

        // 2. Try Deterministic Flow (Step 1 & 2 Logic)
        const flowResult = getResponseForMessage(message, botNiche);

        if (flowResult) {
            const { response, tag } = flowResult;

            // 🧪 STRICT RULE: Combined messages, under 3 lines (Formatting applied in NICHE_FLOWS)
            console.log(`[BOT LOGIC] Flow triggered. Tag: ${tag}. Response: ${response}`);

            // If Tag is HOT, in a real app we'd stop AI and notify human via WebSocket
            if (tag === 'HOT') {
                console.log(`[ALERTER] Escalating lead ${sender} to human team. AI Paused.`);
            }

            return NextResponse.json({
                success: true,
                source: 'flow',
                tag: tag || 'WARM',
                response: response
            });
        }

        // 3. Fallback to AI Brain (Deterministic Fallback)
        // 🧪 STRICT RULE: Short, clear, combined. Push towards selecting options.
        const aiResponse = `I apologize, I didn't quite catch that. Please reply with a number (1-5) so I can assist you better 👋`;

        console.log(`[BOT LOGIC] AI Fallback triggered. Response: ${aiResponse}`);

        return NextResponse.json({
            success: true,
            source: 'ai',
            tag: 'COLD',
            response: aiResponse
        });

    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
