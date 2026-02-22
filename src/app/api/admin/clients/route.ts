import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const VALID_NICHES = ['LEAD_REPLY_AGENT', 'CAR_BOOKING', 'REAL_ESTATE'];
const VALID_STATUSES = ['ACTIVE', 'PAUSED'];

export async function GET() {
    try {
        const clients = await prisma.client.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                businessName: true,
                phoneNumberId: true,
                niche: true,
                messageLimit: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                _count: { select: { leads: true } },
            },
        });
        return NextResponse.json({ clients });
    } catch (error) {
        console.error('[admin/clients GET]', error);
        return NextResponse.json(
            { error: 'Failed to list clients' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { phoneNumberId, businessName, accessToken, niche, websiteContent, systemPrompt, messageLimit } = body;

        if (!phoneNumberId || typeof phoneNumberId !== 'string' || !phoneNumberId.trim()) {
            return NextResponse.json(
                { error: 'phoneNumberId is required' },
                { status: 400 }
            );
        }

        const existing = await prisma.client.findUnique({
            where: { phoneNumberId: phoneNumberId.trim() },
        });
        if (existing) {
            return NextResponse.json(
                { error: 'A client with this phoneNumberId already exists' },
                { status: 400 }
            );
        }

        const data: {
            phoneNumberId: string;
            businessName?: string;
            accessToken?: string;
            niche?: string;
            websiteContent?: string;
            systemPrompt?: string;
            messageLimit?: number;
        } = {
            phoneNumberId: phoneNumberId.trim(),
        };
        if (businessName != null) data.businessName = String(businessName).trim() || undefined;
        if (accessToken != null) data.accessToken = String(accessToken) || undefined;
        if (niche != null && VALID_NICHES.includes(niche)) data.niche = niche;
        if (websiteContent != null) data.websiteContent = String(websiteContent) || undefined;
        if (systemPrompt != null) data.systemPrompt = String(systemPrompt) || undefined;
        if (messageLimit != null) {
            const n = Number(messageLimit);
            if (Number.isInteger(n) && n >= 0) data.messageLimit = n;
        }

        const client = await prisma.client.create({ data });
        return NextResponse.json({ client }, { status: 201 });
    } catch (error) {
        console.error('[admin/clients POST]', error);
        return NextResponse.json(
            { error: 'Failed to create client' },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, businessName, phoneNumberId, accessToken, niche, websiteContent, systemPrompt, messageLimit, status } = body;

        if (!id || typeof id !== 'string' || !id.trim()) {
            return NextResponse.json(
                { error: 'id is required' },
                { status: 400 }
            );
        }

        const existing = await prisma.client.findUnique({
            where: { id: id.trim() },
        });
        if (!existing) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            );
        }

        const updateData: {
            businessName?: string | null;
            phoneNumberId?: string;
            accessToken?: string | null;
            niche?: string;
            websiteContent?: string | null;
            systemPrompt?: string | null;
            messageLimit?: number;
            status?: 'ACTIVE' | 'PAUSED';
        } = {};
        if (businessName !== undefined) updateData.businessName = businessName === '' ? null : String(businessName).trim();
        if (phoneNumberId !== undefined) {
            const val = String(phoneNumberId).trim();
            if (!val) {
                return NextResponse.json({ error: 'phoneNumberId cannot be empty' }, { status: 400 });
            }
            const duplicate = await prisma.client.findFirst({
                where: { phoneNumberId: val, id: { not: id.trim() } },
            });
            if (duplicate) {
                return NextResponse.json(
                    { error: 'Another client already uses this phoneNumberId' },
                    { status: 400 }
                );
            }
            updateData.phoneNumberId = val;
        }
        if (accessToken !== undefined) updateData.accessToken = accessToken === '' ? null : accessToken;
        if (niche !== undefined && VALID_NICHES.includes(niche)) updateData.niche = niche;
        if (websiteContent !== undefined) updateData.websiteContent = websiteContent === '' ? null : websiteContent;
        if (systemPrompt !== undefined) updateData.systemPrompt = systemPrompt === '' ? null : systemPrompt;
        if (messageLimit !== undefined) {
            const n = Number(messageLimit);
            if (!Number.isInteger(n) || n < 0) {
                return NextResponse.json({ error: 'messageLimit must be a non-negative integer' }, { status: 400 });
            }
            updateData.messageLimit = n;
        }
        if (status !== undefined && VALID_STATUSES.includes(status)) updateData.status = status as 'ACTIVE' | 'PAUSED';

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
        }

        const client = await prisma.client.update({
            where: { id: id.trim() },
            data: updateData,
        });
        return NextResponse.json({ client });
    } catch (error) {
        console.error('[admin/clients PUT]', error);
        return NextResponse.json(
            { error: 'Failed to update client' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const id = body.id ?? req.nextUrl.searchParams.get('id');

        if (!id || typeof id !== 'string' || !id.trim()) {
            return NextResponse.json(
                { error: 'id is required' },
                { status: 400 }
            );
        }

        const existing = await prisma.client.findUnique({
            where: { id: id.trim() },
        });
        if (!existing) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            );
        }

        const client = await prisma.client.update({
            where: { id: id.trim() },
            data: { status: 'PAUSED' },
        });
        return NextResponse.json({ client });
    } catch (error) {
        console.error('[admin/clients DELETE]', error);
        return NextResponse.json(
            { error: 'Failed to soft delete client' },
            { status: 500 }
        );
    }
}
