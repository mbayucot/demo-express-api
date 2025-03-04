import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryRepository {
  async createCategory(name: string) {
    return prisma.category.create({
      data: { name },
    });
  }

  async getCategoryById(id: number) {
    return prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  async getAllCategories() {
    return prisma.category.findMany({
      include: { products: true },
    });
  }

  async deleteCategory(id: number) {
    return prisma.category.delete({
      where: { id },
    });
  }
}
