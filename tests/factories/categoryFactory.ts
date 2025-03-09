import { PrismaClient, Category } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export const createCategory = async (): Promise<Category> => {
  return prisma.category.create({
    data: {
      name: faker.commerce.department(),
    },
  });
};
