const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- Checking for latest Chat Logs ---');
    try {
        const logs = await prisma.chatLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: { lead: true }
        });

        if (logs.length === 0) {
            console.log('No logs found in the database.');
        } else {
            logs.forEach(log => {
                console.log(`[${log.createdAt.toISOString()}] ${log.sender}: ${log.message} (Lead: ${log.lead.phone})`);
            });
        }
    } catch (e) {
        console.error('Error querying database:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
