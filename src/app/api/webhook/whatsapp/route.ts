import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { processUserMessage } from '@/lib/bot-engine';

// 1. GET verification: hub.verify_token vs WHATSAPP_VERIFY_TOKEN, return hub.challenge
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode && token && challenge) {
        if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
            return new NextResponse(challenge, { status: 200 });
        }
        return new NextResponse('Forbidden', { status: 403 });
    }
    return new NextResponse('Bad Request', { status: 400 });
}

// 2–8. POST: parse payload → resolve client → dedupe → lead → bot → chat → reply
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const entry = body.entry?.[0];
        const change = entry?.changes?.[0];
        const value = change?.value;

        if (!value || change?.field !== 'messages') {
            return new NextResponse(null, { status: 200 });
        }

        const phoneNumberId = value.metadata?.phone_number_id;
        const messages = value.messages;

        if (!phoneNumberId || !messages?.length) {
            return new NextResponse(null, { status: 200 });
        }

        for (const msg of messages) {
            const messageId = msg.id;
            const senderPhone = String(msg.from);
            const msgType = msg.type;
            const textBody = msgType === 'text' ? msg.text?.body?.trim() : null;

            // 2. Ignore non-text messages
            if (msgType !== 'text' || !textBody) {
                continue;
            }

            // 4. Prevent duplicates: if message_id already processed, exit
            const alreadyProcessed = await prisma.processedWebhookMessage.findUnique({
                where: { id: messageId },
            });
            if (alreadyProcessed) {
                return new NextResponse(null, { status: 200 });
            }

            // 3. Resolve client: find by phoneNumberId; if not found, return 200 OK
            const client = await prisma.user.findFirst({
                where: { phoneId: phoneNumberId },
            });
            if (!client) {
                return new NextResponse(null, { status: 200 });
            }

            // 5. Lead: find or create by phone + clientId; update lastInteractionAt (updatedAt)
            let lead = await prisma.lead.findFirst({
                where: { userId: client.id, phone: senderPhone },
            });
            if (!lead) {
                const contactName = value.contacts?.find((c: { wa_id: string }) => c.wa_id === senderPhone)?.profile?.name;
                lead = await prisma.lead.create({
                    data: {
                        userId: client.id,
                        phone: senderPhone,
                        name: contactName || null,
                        status: 'COLD',
                    },
                });
            }
            await prisma.lead.update({
                where: { id: lead.id },
                data: { updatedAt: new Date() },
            });

            // 6. Bot logic: menu → hardcoded flow → website KB → AI fallback (existing processUserMessage)
            const customFlow = client.customFlow ? JSON.parse(client.customFlow) : [];
            const niche = client.niche || 'LEAD_REPLY_AGENT';
            const botResponse = await processUserMessage(
                client.id,
                textBody,
                'text',
                niche,
                customFlow,
                client.systemPrompt ?? undefined,
                client.websiteContent ?? undefined
            );

            const tag = botResponse.tag?.toUpperCase();
            const leadStatus = tag === 'HOT' || tag === 'WARM' || tag === 'COLD' ? tag : null;
            if (leadStatus) {
                await prisma.lead.update({
                    where: { id: lead.id },
                    data: { status: leadStatus, updatedAt: new Date() },
                });
            }

            // 7. Save ChatLog: USER message, then BOT reply
            await prisma.chatLog.createMany({
                data: [
                    { leadId: lead.id, userId: client.id, sender: 'USER', message: textBody, type: 'USER' },
                    {
                        leadId: lead.id,
                        userId: client.id,
                        sender: 'BOT',
                        message: botResponse.text,
                        type: botResponse.source,
                    },
                ],
            });

            // 8. Send reply via WhatsApp Graph API using client's accessToken
            const accessToken = client.accessToken || process.env.WHATSAPP_TOKEN;
            if (accessToken) {
                await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messaging_product: 'whatsapp',
                        recipient_type: 'individual',
                        to: senderPhone.replace(/\D/g, ''),
                        type: 'text',
                        text: { preview_url: false, body: botResponse.text },
                    }),
                });
            }

            await prisma.processedWebhookMessage.create({
                data: { id: messageId },
            });
        }

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        console.error('[WEBHOOK]', error);
        return new NextResponse(null, { status: 200 });
    }
}
