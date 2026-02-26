import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ leadId: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { leadId } = await params;

        const chatLogs = await prisma.chatLog.findMany({
            where: { leadId },
            orderBy: { createdAt: 'asc' }
        });

        const lead = await prisma.lead.findUnique({
            where: { id: leadId }
        });

        return NextResponse.json({
            messages: chatLogs,
            lead: lead
        });
    } catch (error) {
        console.error('[CHAT_DETAIL_API]', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
