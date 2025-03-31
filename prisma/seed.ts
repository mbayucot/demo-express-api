// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            { email: 'admin@example.com', password: 'hashedpassword1' },
            { email: 'user@example.com', password: 'hashedpassword2' },
        ],
    });

    await prisma.store.createMany({
        data: [
            { name: 'Main Store', address: '123 Street' },
            { name: 'Second Store', address: '456 Avenue' },
        ],
    });
}

main()
    .then(() => {
        console.log('🌱 Seed data inserted');
        return prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });