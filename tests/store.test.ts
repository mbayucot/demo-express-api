import request from "supertest";
import app from "../src"; // Ensure this matches your Express app export
import { prisma } from "./setup"; // Import prisma from setup.ts

describe("Store API", () => {
  it("should create a store", async () => {
    const response = await request(app)
      .post("/stores")
      .send({ name: "Test Store", address: "123 Test Street" })
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test Store");
  });

  it("should retrieve all stores", async () => {
    await prisma.store.create({
      data: { name: "Test Store", address: "123 Test Street" },
    });

    const response = await request(app).get("/stores").expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should retrieve a single store", async () => {
    const store = await prisma.store.create({
      data: { name: "Test Store", address: "123 Test Street" },
    });

    const response = await request(app).get(`/stores/${store.id}`).expect(200);
    expect(response.body.name).toBe("Test Store");
  });

  it("should update a store", async () => {
    const store = await prisma.store.create({
      data: { name: "Test Store", address: "123 Test Street" },
    });

    const response = await request(app)
      .put(`/stores/${store.id}`)
      .send({ name: "Updated Store", address: "456 Updated Street" })
      .expect(200);

    expect(response.body.name).toBe("Updated Store");
  });

  it("should delete a store", async () => {
    const store = await prisma.store.create({
      data: { name: "Test Store", address: "123 Test Street" },
    });

    await request(app).delete(`/stores/${store.id}`).expect(200);
    const deletedStore = await prisma.store.findUnique({
      where: { id: store.id },
    });
    expect(deletedStore).toBeNull();
  });
});
