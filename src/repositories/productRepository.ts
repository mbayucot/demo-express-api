import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductRepository {
  async createProduct(
    name: string,
    price: number,
    storeId: number,
    imageUrl?: string,
  ) {
    return prisma.product.create({
      data: {
        name,
        price,
        storeId,
        imageUrl,
      },
    });
  }

  async getProductById(id: number) {
    return prisma.product.findUnique({
      where: { id },
      include: { categories: true, store: true },
    });
  }

  async getAllProducts() {
    return prisma.product.findMany({
      include: { store: true, categories: true },
    });
  }

  async updateProduct(
    id: number,
    data: Partial<{ name: string; price: number; imageUrl: string }>,
  ) {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: number) {
    return prisma.product.delete({
      where: { id },
    });
  }
}
