import { PrismaClient, ProductCategory } from "@prisma/client";
import { createProduct } from "./productFactory";
import { createCategory } from "./categoryFactory";

const prisma = new PrismaClient();

export const createProductCategory = async (): Promise<ProductCategory> => {
  const product = await createProduct();
  const category = await createCategory();

  return prisma.productCategory.create({
    data: {
      productId: product.id,
      categoryId: category.id,
    },
  });
};
