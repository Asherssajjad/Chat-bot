import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const clientId = req.nextUrl.searchParams.get('clientId');
        const whereClause = clientId ? { clientId } : {};

        const leads = await prisma.lead.findMany({
            where: whereClause,
            orderBy: { updatedAt: 'desc' }
        });

        const formattedLeads = leads.map(lead => ({
            id: lead.id,
            name: lead.name || 'Unknown User',
            phone: lead.phone,
            status: lead.status || 'NEW',
            interest: lead.interest || 'General Inquiry',
            date: lead.updatedAt.toLocaleDateString(),
            location: lead.location || 'Unknown'
        }));

        return NextResponse.json({ leads: formattedLeads });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { name, phone, interest, location, clientId } = await req.json();

        let targetClientId = clientId;
        if (!targetClientId) {
            const firstClient = await prisma.client.findFirst();
            if (!firstClient) return NextResponse.json({ error: 'No clients found to attach lead' }, { status: 404 });
            targetClientId = firstClient.id;
        }

        const newLead = await prisma.lead.create({
            data: { name, phone, interest, location, clientId: targetClientId }
        });

        return NextResponse.json({ success: true, lead: newLead });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
    }
}
