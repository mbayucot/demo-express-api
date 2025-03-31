import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ProductRepository } from "../repositories/productRepository";
import { PrismaClient } from "@prisma/client";
import { Express } from "express";

const prisma = new PrismaClient();
const productRepository = new ProductRepository();

export class ProductsController {
  // Get all products
  index = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const products = await productRepository.findAll();
    res.status(200).json(products);
  });

  // Get a single product
  show = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const product = await productRepository.findById(Number(id));
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.status(200).json(product);
  });

  // Create a product
  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { storeId } = req.params;
    const { name, description, price, categoryIds } = req.body;

    const store = await prisma.store.findUnique({
      where: { id: Number(storeId) },
    });
    if (!store) {
      res.status(404).json({ error: "Store not found" });
      return;
    }

    const file = req.file as Express.MulterS3.File;
    const imageUrl = file?.location;

    const product = await productRepository.create(
        name,
        description,
        parseFloat(price),
        Number(storeId),
        categoryIds,
        imageUrl,
    );

    res.status(201).json(product);
  });

  // Update a product
  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description, price, categoryIds } = req.body;

    const file = req.file as Express.MulterS3.File;
    const imageUrl = file?.location;

    const updatedProduct = await productRepository.update(
        Number(id),
        name,
        description,
        price ? parseFloat(price) : undefined,
        categoryIds,
        imageUrl,
    );

    res.status(200).json(updatedProduct);
  });

  // Delete a product
  destroy = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await productRepository.delete(Number(id));
    res.status(204).send();
  });
}