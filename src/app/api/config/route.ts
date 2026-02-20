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
        const user = await prisma.user.findUnique({
            where: { email: session.user.email! },
            select: { niche: true, systemPrompt: true, customFlow: true, websiteUrl: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Return current config
        return NextResponse.json({
            niche: user.niche || 'LEAD_REPLY_AGENT',
            systemPrompt: user.systemPrompt || '',
            websiteUrl: user.websiteUrl || '',
            customFlow: user.customFlow ? JSON.parse(user.customFlow) : []
        });

    } catch (error) {
        console.error("Error fetching config:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { niche, systemPrompt, customFlow, websiteUrl } = await req.json();

        let websiteContent = undefined;
        if (websiteUrl) {
            try {
                const response = await fetch(websiteUrl, { signal: AbortSignal.timeout(5000) }); // 5s timeout
                if (response.ok) {
                    const html = await response.text();
                    // Simple extraction: remove tags and excess whitespace
                    websiteContent = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gmid, "")
                        .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gmid, "")
                        .replace(/<[^>]*>?/gm, ' ')
                        .replace(/\s+/g, ' ')
                        .trim()
                        .slice(0, 20000); // Limit to 20k chars
                }
            } catch (e) {
                console.error("Failed to scrape website:", e);
                // Keep undefined to not overwrite if just a temporary fetch failure? 
                // Or maybe null to clear it if the URL is bad? 
                // Let's assume if fetch fails, we don't update content but keep URL.
                // But if user changed URL to a bad one, we might want to clear content.
                // For now, let's set it to null if fetch completely fails to avoid stale content for new URL.
                websiteContent = null;
            }
        }

        // Update User Config
        const updatedUser = await prisma.user.update({
            where: { email: session.user.email! },
            data: {
                niche,
                systemPrompt,
                websiteUrl,
                websiteContent, // Save the scraped text!
                customFlow: JSON.stringify(customFlow)
            }
        });

        return NextResponse.json({ success: true, user: updatedUser });

    } catch (error) {
        console.error("Error updating config:", error);
        return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
    }
}
