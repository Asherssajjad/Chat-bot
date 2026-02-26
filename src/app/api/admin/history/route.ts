import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const clientId = req.nextUrl.searchParams.get('clientId');

        // Fetch leads first to get sender names/phones
        const leads = await prisma.lead.findMany({
            where: clientId ? { clientId } : {},
            include: {
                chatLogs: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            },
            orderBy: { updatedAt: 'desc' }
        });

        const formattedLogs = leads.map(lead => {
            const lastLog = lead.chatLogs[0];
            return {
                id: lead.id,
                sender: lead.phone,
                name: lead.name || 'Unknown User',
                lastMessage: lastLog ? lastLog.message : 'No messages yet',
                time: lastLog ? lastLog.createdAt : lead.updatedAt,
                type: lastLog ? lastLog.type : 'INITIAL',
                tag: lead.status
            };
        });

        return NextResponse.json({ logs: formattedLogs });
    } catch (error) {
        console.error('[HISTORY_API]', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
