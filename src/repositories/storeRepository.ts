import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class StoreRepository {
  // Create a store
  async create(name: string, address: string) {
    return await prisma.store.create({
      data: { name, address },
    });
  }

  // Fetch all stores
  async findAll() {
    return await prisma.store.findMany();
  }

  // Find store by ID
  async findById(id: number) {
    return await prisma.store.findUnique({
      where: { id },
    });
  }

  // Update a store
  async update(id: number, name: string, address: string) {
    return await prisma.store.update({
      where: { id },
      data: { name, address },
    });
  }

  // Delete a store
  async delete(id: number) {
    return await prisma.store.delete({
      where: { id },
    });
  }
}
