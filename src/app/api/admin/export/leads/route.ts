import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        // Enforce Admin Access
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'ADMIN') {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const searchParams = req.nextUrl.searchParams;
        const clientId = searchParams.get('clientId');

        if (!clientId) {
            return new NextResponse('Missing clientId parameter', { status: 400 });
        }

        // Fetch leads for the given client
        const leads = await prisma.lead.findMany({
            where: { clientId },
            orderBy: { updatedAt: 'desc' },
            select: {
                phone: true,
                status: true,
                updatedAt: true,
            },
        });

        // Construct CSV without external libraries
        const headers = ['Phone', 'Status', 'Last Interaction'];
        const rows = leads.map(lead => [
            lead.phone,
            lead.status,
            // Convert to a readable date (ISO or locale string)
            lead.updatedAt.toISOString(),
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(',')),
        ].join('\n');

        // Return as a downloadable CSV file
        return new NextResponse(csvContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="leads_export_${clientId}.csv"`,
            },
        });
    } catch (error) {
        console.error('[EXPORT_LEADS]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
