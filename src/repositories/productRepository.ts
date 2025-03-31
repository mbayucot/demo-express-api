import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductRepository {
  // Create a product with optional categories and image
  async create(
      name: string,
      description: string,
      price: number,
      storeId: number,
      categoryIds?: number[],
      imageUrl?: string,
  ) {
    return await prisma.product.create({
      data: {
        name,
        description,
        price,
        storeId,
        imageUrl,
        categories: categoryIds
            ? {
              create: categoryIds.map((categoryId) => ({
                category: { connect: { id: categoryId } },
              })),
            }
            : undefined,
      },
      include: {
        store: true,
        categories: { include: { category: true } },
      },
    });
  }

  // Find all products, including categories and store
  async findAll() {
    return await prisma.product.findMany({
      include: {
        store: true,
        categories: { include: { category: true } },
      },
    });
  }

  // Find a product by ID
  async findById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        store: true,
        categories: { include: { category: true } },
      },
    });
  }

  // Update a product and its categories and image
  async update(
      id: number,
      name?: string,
      description?: string,
      price?: number,
      categoryIds?: number[],
      imageUrl?: string,
  ) {
    return await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        imageUrl,
        categories: categoryIds
            ? {
              set: [],
              create: categoryIds.map((categoryId) => ({
                category: { connect: { id: categoryId } },
              })),
            }
            : undefined,
      },
      include: {
        store: true,
        categories: { include: { category: true } },
      },
    });
  }

  // Delete a product
  async delete(id: number) {
    return await prisma.product.delete({ where: { id } });
  }
}