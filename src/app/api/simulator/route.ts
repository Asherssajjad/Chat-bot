import { NextRequest, NextResponse } from 'next/server';
import { processUserMessage } from '@/lib/bot-engine';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        // In a real app, we use the session user. For simulator, we might want the logged in user too.
        const session = await getServerSession(authOptions);
        const { message, niche, type } = await req.json();

        let customFlow = [];
        let systemPrompt = undefined;
        let websiteContent = undefined; // Fixed duplicates

        if (session && session.user && session.user.email) {
            const user = await prisma.user.findUnique({
                where: { email: session.user.email }
            });
            if (user) {
                if (user.customFlow) customFlow = JSON.parse(user.customFlow);
                if (user.systemPrompt) systemPrompt = user.systemPrompt;
                if (user.websiteContent) websiteContent = user.websiteContent;
            }
        }

        // Use the shared bot logic with DYNAMIC config
        const response = await processUserMessage(
            'simulator_user',
            message,
            type || 'text',
            niche || 'LEAD_REPLY_AGENT',
            customFlow,
            systemPrompt,
            websiteContent // Pass CONTENT not URL
        );

        return NextResponse.json({
            success: true,
            botResponse: response
        });

    } catch (error) {
        console.error("Simulator Error:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to process message' },
            { status: 500 }
        );
    }
}
