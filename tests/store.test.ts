import request from "supertest";
import app from "../src"; // Ensure this matches your Express app export
import { prisma } from "./setup"; // Import Prisma setup
import { createStore } from "./factories/storeFactory"; // ✅ Import Store Factory
import { faker } from "@faker-js/faker";

describe("Store API", () => {
  it("should create a store", async () => {
    const storeData = {
      name: faker.company.name(),
      address: faker.address.streetAddress(),
    };

    const response = await request(app)
      .post("/stores")
      .send(storeData)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(storeData.name);
  });

  it("should retrieve all stores", async () => {
    await createStore(); // ✅ Using factory instead of direct Prisma call

    const response = await request(app).get("/stores").expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should retrieve a single store", async () => {
    const store = await createStore(); // ✅ Using factory

    const response = await request(app).get(`/stores/${store.id}`).expect(200);
    expect(response.body.name).toBe(store.name);
  });

  it("should update a store", async () => {
    const store = await createStore(); // ✅ Using factory

    const updatedData = {
      name: faker.company.name(),
      address: faker.address.streetAddress(),
    };

    const response = await request(app)
      .put(`/stores/${store.id}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.address).toBe(updatedData.address);
  });

  it("should delete a store", async () => {
    const store = await createStore(); // ✅ Using factory

    await request(app).delete(`/stores/${store.id}`).expect(200);

    const deletedStore = await prisma.store.findUnique({
      where: { id: store.id },
    });

    expect(deletedStore).toBeNull();
  });
});
