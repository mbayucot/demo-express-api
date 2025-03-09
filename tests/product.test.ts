import request from "supertest";
import app from "../src/index"; // Ensure this matches your Express app export
import { prisma } from "./setup"; // Import Prisma test setup

describe("Product API", () => {
  let storeId: number;

  beforeEach(async () => {
    // Ensure a fresh store exists before each test
    const store = await prisma.store.create({
      data: { name: "Test Store", address: "123 Test Street" },
    });
    storeId = store.id;
  });

  afterEach(async () => {
    await prisma.product.deleteMany(); // Cleanup products
    await prisma.store.deleteMany(); // Cleanup stores
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post(`/stores/${storeId}/products`)
      .send({
        name: "Test Product",
        description: "Test Description",
        price: 19.99,
      })
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test Product");
  });

  it("should retrieve all products for a store", async () => {
    await prisma.product.create({
      data: {
        name: "Test Product",
        description: "Test Desc",
        price: 19.99,
        storeId,
      },
    });

    const response = await request(app)
      .get(`/stores/${storeId}/products`)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should retrieve a single product", async () => {
    const product = await prisma.product.create({
      data: {
        name: "Test Product",
        description: "Test Desc",
        price: 19.99,
        storeId,
      },
    });

    const response = await request(app)
      .get(`/stores/${storeId}/products/${product.id}`)
      .expect(200);

    expect(response.body.name).toBe("Test Product");
  });

  it("should update a product", async () => {
    const product = await prisma.product.create({
      data: {
        name: "Old Product",
        description: "Old Desc",
        price: 9.99,
        storeId,
      },
    });

    const response = await request(app)
      .put(`/stores/${storeId}/products/${product.id}`)
      .send({
        name: "Updated Product",
        description: "Updated Desc",
        price: 29.99,
      })
      .expect(200);

    expect(response.body.name).toBe("Updated Product");
  });

  it("should delete a product", async () => {
    const product = await prisma.product.create({
      data: {
        name: "Test Product",
        description: "Test Desc",
        price: 19.99,
        storeId,
      },
    });

    await request(app)
      .delete(`/stores/${storeId}/products/${product.id}`)
      .expect(204);

    const deletedProduct = await prisma.product.findUnique({
      where: { id: product.id },
    });
    expect(deletedProduct).toBeNull();
  });
});
