import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const userId = (session.user as any).id;

        const [totalLeads, hotLeads, warmLeads, coldLeads] = await Promise.all([
            prisma.lead.count({ where: { userId } }),
            prisma.lead.count({ where: { userId, status: "HOT" } }),
            prisma.lead.count({ where: { userId, status: "WARM" } }),
            prisma.lead.count({ where: { userId, status: "COLD" } }),
        ]);

        return NextResponse.json({
            total: totalLeads,
            hot: hotLeads,
            warm: warmLeads,
            cold: coldLeads,
            efficiency: totalLeads > 0 ? Math.round(((hotLeads + warmLeads) / totalLeads) * 100) : 0
        });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
