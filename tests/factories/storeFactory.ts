import { PrismaClient, Store } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export const createStore = async (): Promise<Store> => {
  return prisma.store.create({
    data: {
      name: faker.company.name(),
      address: faker.address.streetAddress(),
    },
  });
};
