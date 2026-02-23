import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'ashersajjad.dmp@gmail.com';
    const name = 'Asher Sajjad';
    const passwordRaw = 'admin123';
    const passwordHash = await bcrypt.hash(passwordRaw, 10);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        console.log(`User ${email} already exists. Updating to ADMIN...`);
        await prisma.user.update({
            where: { email },
            data: {
                role: 'ADMIN',
                password: passwordHash, // Reset password just in case
            },
        });
    } else {
        console.log(`Creating Admin User: ${email}`);
        await prisma.user.create({
            data: {
                email,
                name,
                password: passwordHash,
                role: 'ADMIN',
            },
        });
    }

    console.log('✅ Admin user configured successfully.');
    console.log('📧 Email: ashersajjad.dmp@gmail.com');
    console.log('🔑 Password: admin123');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
