import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const clientId = req.nextUrl.searchParams.get('clientId');
        const client = clientId
            ? await prisma.client.findUnique({ where: { id: clientId } })
            : await prisma.client.findFirst();

        if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

        return NextResponse.json({
            niche: client.niche || 'LEAD_REPLY_AGENT',
            systemPrompt: client.systemPrompt || '',
            websiteContent: client.websiteContent || '',
            customFlow: [] // Deprecated in schema
        });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { clientId, niche, systemPrompt, websiteContent } = await req.json();

        const clientToUpdate = clientId
            ? await prisma.client.findUnique({ where: { id: clientId } })
            : await prisma.client.findFirst();

        if (!clientToUpdate) return NextResponse.json({ error: 'Client not found' }, { status: 404 });

        const updatedClient = await prisma.client.update({
            where: { id: clientToUpdate.id },
            data: { niche, systemPrompt, websiteContent }
        });

        return NextResponse.json({ success: true, client: updatedClient });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
    }
}
