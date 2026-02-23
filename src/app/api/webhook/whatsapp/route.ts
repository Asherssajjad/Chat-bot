import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { processUserMessage } from '@/lib/bot-engine';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
        return new NextResponse(challenge, { status: 200 });
    }

    return new NextResponse('Forbidden', { status: 403 });
}

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

            // 2. Ignore non-text messages for now
            if (msg.type !== 'text' || !msg.text?.body) {
                continue;
            }
            const textBody = msg.text.body.trim();

            // 4. Prevent duplicates
            const alreadyProcessed = await prisma.processedWebhookMessage.findUnique({
                where: { id: messageId },
            });
            if (alreadyProcessed) continue;

            // 3. Resolve Client
            const client = await prisma.client.findUnique({
                where: { phoneNumberId: phoneNumberId },
            });
            if (!client) {
                return new NextResponse(null, { status: 200 });
            }

            // 5. Lead handling
            let lead = await prisma.lead.findFirst({
                where: { clientId: client.id, phone: senderPhone },
            });

            if (!lead) {
                const contactName = value.contacts?.find((c: any) => c.wa_id === senderPhone)?.profile?.name;
                lead = await prisma.lead.create({
                    data: {
                        clientId: client.id,
                        phone: senderPhone,
                        name: contactName || null,
                        status: 'COLD',
                    },
                });
            } else {
                lead = await prisma.lead.update({
                    where: { id: lead.id },
                    data: { updatedAt: new Date() },
                });
            }

            // 6. Bot logic
            const botResponse = await processUserMessage(
                client.id,
                textBody,
                'text',
                client.niche,
                undefined, // Custom flows removed from Client requirements
                client.systemPrompt ?? undefined,
                client.websiteContent ?? undefined
            );

            const tag = botResponse.tag?.toUpperCase();
            if (tag === 'HOT' || tag === 'WARM' || tag === 'COLD') {
                await prisma.lead.update({
                    where: { id: lead.id },
                    data: { status: tag },
                });
            }

            // 7. Save ChatLog
            await prisma.chatLog.createMany({
                data: [
                    { leadId: lead.id, clientId: client.id, sender: 'USER', message: textBody, type: 'USER' },
                    { leadId: lead.id, clientId: client.id, sender: 'BOT', message: botResponse.text, type: botResponse.source },
                ],
            });

            // 8. Send reply
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

