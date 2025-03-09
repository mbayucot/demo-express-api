import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const prisma = new PrismaClient();

beforeAll(async () => {
  console.log("🚀 Resetting test database...");

  // Drop and recreate schema
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS public CASCADE;`);
  await prisma.$executeRawUnsafe(`CREATE SCHEMA public;`);
  await prisma.$executeRawUnsafe(`GRANT ALL ON SCHEMA public TO postgres;`);
  await prisma.$executeRawUnsafe(`GRANT ALL ON SCHEMA public TO public;`);

  // Run migrations after resetting database
  console.log("🔄 Running migrations...");
  execSync("npx prisma migrate dev --schema=prisma/schema.prisma", {
    stdio: "inherit",
  });

  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.store.deleteMany(); // Clear test data before each test
});

afterAll(async () => {
  console.log("🧹 Cleaning up test database...");
  await prisma.$disconnect();
});

export { prisma };
