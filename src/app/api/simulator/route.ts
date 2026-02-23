import { NextRequest, NextResponse } from 'next/server';
import { processUserMessage } from '@/lib/bot-engine';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const { message, niche, type, clientId } = await req.json();

        let systemPrompt = undefined;
        let websiteContent = undefined;

        const client = clientId
            ? await prisma.client.findUnique({ where: { id: clientId } })
            : await prisma.client.findFirst();

        if (client) {
            if (client.systemPrompt) systemPrompt = client.systemPrompt;
            if (client.websiteContent) websiteContent = client.websiteContent;
        }

        const response = await processUserMessage(
            client?.id || 'simulator_user',
            message,
            type || 'text',
            niche || client?.niche || 'LEAD_REPLY_AGENT',
            undefined, // No custom flows
            systemPrompt,
            websiteContent
        );

        return NextResponse.json({ success: true, botResponse: response });
    } catch (error) {
        console.error("Simulator Error:", error);
        return NextResponse.json({ success: false, error: 'Failed to process' }, { status: 500 });
    }
}
