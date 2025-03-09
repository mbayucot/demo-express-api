import { PrismaClient, Product } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { createStore } from "./storeFactory";

const prisma = new PrismaClient();

export const createProduct = async (storeId?: number): Promise<Product> => {
  let store = storeId
    ? await prisma.store.findUnique({ where: { id: storeId } })
    : await createStore();

  if (!store) {
    store = await createStore(); // Ensure store is created
  }

  return prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      storeId: store.id, // Now guaranteed to exist
    },
  });
};
