import { NextRequest, NextResponse } from 'next/server';
import { getResponseForMessage } from '@/lib/niche-flows';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // 1. Identify User and Bot (Mocked for now)
        // In a real app, you'd verify the Token/Phone Number
        const botNiche = 'CAR_BOOKING';
        const message = body.message?.text || '';
        const sender = body.sender?.phone;

        console.log(`Received message from ${sender}: ${message}`);

        // 2. Try Hardcoded Flow first
        const flowResponse = getResponseForMessage(message, botNiche);

        if (flowResponse) {
            // Send message via provided WhatsApp API (Mocked)
            console.log(`Sending Hardcoded Response: ${flowResponse}`);

            return NextResponse.json({
                success: true,
                source: 'flow',
                response: flowResponse
            });
        }

        // 3. Fallback to Claude AI (Mocked)
        // In a real app, you'd call Anthropic API here using the user's key
        const aiResponse = `I'm not quite sure about that, but I can help you book a car if you provide your destination! (AI Fallback)`;

        console.log(`Sending AI Fallback: ${aiResponse}`);

        // 4. Save Lead Data (Mocked)
        // Extract info from message and save to DB

        return NextResponse.json({
            success: true,
            source: 'ai',
            response: aiResponse
        });

    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
