// tests/auth.test.ts
import request from "supertest";
import app from "../src/app"; // Your Express app
import prisma from "../src/lib/prisma"; // Prisma client

describe("AuthController", () => {
    const testUser = {
        email: "testuser@example.com",
        password: "password123",
    };

    beforeAll(async () => {
        // Cleanup test user if exists
        await prisma.user.deleteMany({ where: { email: testUser.email } });
    });

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { email: testUser.email } });
        await prisma.$disconnect();
    });

    describe("POST /auth/signup", () => {
        it("should register a new user", async () => {
            const res = await request(app).post("/auth/signup").send(testUser);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty("message", "User created");
            expect(res.body).toHaveProperty("user.id");
            expect(res.body.user.email).toBe(testUser.email);
        });

        it("should return 400 if email already in use", async () => {
            const res = await request(app).post("/auth/signup").send(testUser);
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("error", "Email already in use");
        });
    });

    describe("POST /auth/login", () => {
        it("should login a valid user and return a token", async () => {
            const res = await request(app).post("/auth/login").send(testUser);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("token");
        });

        it("should return 401 for invalid credentials", async () => {
            const res = await request(app).post("/auth/login").send({
                email: testUser.email,
                password: "wrongpassword",
            });
            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty("error", "Invalid email or password");
        });
    });

    describe("POST /auth/logout", () => {
        it("should respond with logout message", async () => {
            const res = await request(app).post("/auth/logout");
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("message", "Logged out");
        });
    });
});
