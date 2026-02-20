import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const phoneId = process.env.WHATSAPP_PHONE_ID;
        const wabaId = process.env.WHATSAPP_WABA_ID;
        const token = process.env.WHATSAPP_TOKEN;

        if (!phoneId || !token) {
            return NextResponse.json({ error: 'WhatsApp credentials not properly configured in .env' }, { status: 400 });
        }

        // Fetch Phone Number Info
        const phoneRes = await fetch(`https://graph.facebook.com/v18.0/${phoneId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const phoneData = await phoneRes.json();

        // Fetch WABA Info (if we have wabaId)
        let wabaData = null;
        if (wabaId) {
            const wabaRes = await fetch(`https://graph.facebook.com/v18.0/${wabaId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            wabaData = await wabaRes.json();
        }

        if (phoneData.error) {
            return NextResponse.json({ success: false, error: phoneData.error.message, details: phoneData.error });
        }

        return NextResponse.json({
            success: true,
            phone: phoneData,
            waba: wabaData
        });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { toPhone, message } = await req.json();
        const phoneId = process.env.WHATSAPP_PHONE_ID;
        const token = process.env.WHATSAPP_TOKEN;

        if (!phoneId || !token) {
            return NextResponse.json({ error: 'WhatsApp credentials missing' }, { status: 400 });
        }

        const res = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: toPhone.replace(/\D/g, ''), // Strip non-numeric chars
                type: "text",
                text: { preview_url: false, body: message }
            })
        });

        const data = await res.json();
        if (data.error) {
            return NextResponse.json({ success: false, error: data.error.message, details: data.error });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
