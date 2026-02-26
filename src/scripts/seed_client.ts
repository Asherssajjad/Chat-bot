
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const phoneNumberId = "885921134615257"
    const wabaId = "1951262062413464"

    console.log(`Checking client for ${phoneNumberId}...`)

    const existing = await prisma.client.findUnique({
        where: { phoneNumberId }
    })

    if (existing) {
        console.log("Client already exists in database.")
        return
    }

    const client = await prisma.client.create({
        data: {
            name: "Star Skyline",
            phoneNumberId: phoneNumberId,
            wabaId: wabaId,
            accessToken: process.env.WHATSAPP_TOKEN,
            status: "ACTIVE",
            niche: "REAL_ESTATE", // Default
            systemPrompt: "You are the Star Skyline Assistant. Be helpful and professional."
        }
    })

    console.log("Successfully created client:", client.name)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
