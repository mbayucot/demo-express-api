import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryRepository {
  // Create a category
  async create(name: string) {
    return await prisma.category.create({
      data: { name },
    });
  }

  // Find all categories
  async findAll() {
    return await prisma.category.findMany();
  }

  // Find a category by ID
  async findById(id: number) {
    return await prisma.category.findUnique({ where: { id } });
  }

  // Update a category
  async update(id: number, name: string) {
    return await prisma.category.update({
      where: { id },
      data: { name },
    });
  }

  // Delete a category
  async delete(id: number) {
    return await prisma.category.delete({ where: { id } });
  }
}
