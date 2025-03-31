import { UserRepository } from "@/repositories/userRepository";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();
const userRepository = new UserRepository();

describe("UserRepository", () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    afterEach(async () => {
        await prisma.user.deleteMany(); // Cleanup between tests
    });

    it("should create a user", async () => {
        const user = await userRepository.create("test@example.com", "password123");
        expect(user).toMatchObject({
            email: "test@example.com",
        });
        expect(user.id).toBeDefined();
    });

    it("should find a user by id", async () => {
        const created = await userRepository.create("idcheck@example.com", "secret");
        const found = await userRepository.findById(created.id);
        expect(found?.email).toBe("idcheck@example.com");
    });

    it("should find a user by email", async () => {
        await userRepository.create("search@example.com", "hunter2");
        const user = await userRepository.findByEmail("search@example.com");
        expect(user).not.toBeNull();
        expect(user?.email).toBe("search@example.com");
    });

    it("should delete a user", async () => {
        const user = await userRepository.create("deleteme@example.com", "toDelete");
        const deleted = await userRepository.delete(user.id);
        expect(deleted.email).toBe("deleteme@example.com");

        const check = await userRepository.findById(user.id);
        expect(check).toBeNull();
    });

    it("should find all users", async () => {
        await userRepository.create("a@example.com", "pass");
        await userRepository.create("b@example.com", "word");

        const users = await userRepository.findAll();
        expect(users.length).toBe(2);
        expect(users.map(u => u.email)).toContain("a@example.com");
    });
});