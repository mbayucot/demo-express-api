import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductRepository {
  // Create a product with optional categories
  async create(
    name: string,
    description: string,
    price: number,
    storeId: number,
    categoryIds?: number[],
  ) {
    return await prisma.product.create({
      data: {
        name,
        description,
        price,
        storeId,
        categories: categoryIds
          ? {
              create: categoryIds.map((categoryId) => ({
                category: { connect: { id: categoryId } },
              })),
            }
          : undefined,
      },
      include: { categories: { include: { category: true } } },
    });
  }

  // Find all products, including categories and store
  async findAll() {
    return await prisma.product.findMany({
      include: { store: true, categories: { include: { category: true } } },
    });
  }

  // Find a product by ID
  async findById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
      include: { categories: { include: { category: true } } },
    });
  }

  // Update a product and its categories
  async update(
    id: number,
    name?: string,
    description?: string,
    price?: number,
    categoryIds?: number[],
  ) {
    return await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        categories: categoryIds
          ? {
              set: [], // Remove old categories
              create: categoryIds.map((categoryId) => ({
                category: { connect: { id: categoryId } },
              })),
            }
          : undefined,
      },
      include: { categories: { include: { category: true } } },
    });
  }

  // Delete a product
  async delete(id: number) {
    return await prisma.product.delete({ where: { id } });
  }
}
