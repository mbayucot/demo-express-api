import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductCategoryRepository {
  // Assign a product to a category
  async assignCategory(productId: number, categoryId: number) {
    return await prisma.productCategory.create({
      data: {
        product: { connect: { id: productId } },
        category: { connect: { id: categoryId } },
      },
    });
  }

  // Remove a category from a product
  async removeCategory(productId: number, categoryId: number) {
    return await prisma.productCategory.deleteMany({
      where: { productId, categoryId },
    });
  }

  // Find all product-category relations
  async findAll() {
    return await prisma.productCategory.findMany({
      include: { product: true, category: true },
    });
  }
}
