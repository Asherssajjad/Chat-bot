import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const userId = (session.user as any).id;
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const leads = await prisma.lead.findMany({
            where: { userId },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        // Map data to match frontend expectations if necessary
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
        console.error("Error fetching leads:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { name, phone, interest, location } = await req.json();

        // Get user ID
        const user = await prisma.user.findUnique({
            where: { email: session.user.email! }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const newLead = await prisma.lead.create({
            data: {
                name,
                phone,
                interest,
                location,
                userId: user.id
            }
        });

        return NextResponse.json({ success: true, lead: newLead });
    } catch (error) {
        console.error("Error creating lead:", error);
        return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
    }
}
