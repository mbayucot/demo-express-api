import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class StoreRepository {
  async createStore(name: string) {
    return prisma.store.create({
      data: { name },
    });
  }

  async getStoreById(id: number) {
    return prisma.store.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  async getAllStores() {
    return prisma.store.findMany({
      include: { products: true },
    });
  }

  async deleteStore(id: number) {
    return prisma.store.delete({
      where: { id },
    });
  }
}
