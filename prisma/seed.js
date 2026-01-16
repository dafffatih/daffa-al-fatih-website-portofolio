const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const prisma = new PrismaClient()

console.log("Seeding database...")

async function main() {
    const email = "admin@example.com"
    const password = "admin123"

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
        },
        create: {
            email,
            name: "Admin",
            password: hashedPassword,
        },
    })

    console.log({ user })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
