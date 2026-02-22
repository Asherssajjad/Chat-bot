import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function escapeCsvCell(value: string): string {
    if (value.includes('"') || value.includes(',') || value.includes('\n') || value.includes('\r')) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}

function formatDate(d: Date): string {
    return d.toISOString().replace('T', ' ').slice(0, 19);
}

export async function GET(req: NextRequest) {
    try {
        const clientId = req.nextUrl.searchParams.get('clientId');
        if (!clientId || !clientId.trim()) {
            return NextResponse.json(
                { error: 'clientId is required' },
                { status: 400 }
            );
        }

        const client = await prisma.client.findUnique({
            where: { id: clientId.trim() },
            select: { id: true, businessName: true },
        });
        if (!client) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            );
        }

        const leads = await prisma.lead.findMany({
            where: { clientId: clientId.trim() },
            orderBy: { updatedAt: 'desc' },
            select: {
                phone: true,
                name: true,
                status: true,
                interest: true,
                updatedAt: true,
            },
        });

        const headers = ['phone', 'name', 'status', 'interest', 'lastInteractionAt'];
        const rows = leads.map((lead) => [
            escapeCsvCell(lead.phone),
            escapeCsvCell(lead.name ?? ''),
            escapeCsvCell(lead.status),
            escapeCsvCell(lead.interest ?? ''),
            escapeCsvCell(formatDate(lead.updatedAt)),
        ]);
        const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

        const filename = `leads-${(client.businessName || client.id).replace(/[^a-zA-Z0-9-_]/g, '-')}.csv`;
        return new NextResponse(csv, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error('[admin/export/leads]', error);
        return NextResponse.json(
            { error: 'Failed to export leads' },
            { status: 500 }
        );
    }
}
