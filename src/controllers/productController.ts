import { Request, Response } from "express";
import { ProductRepository } from "../repositories/productRepository";

const productRepo = new ProductRepository();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, storeId, imageUrl } = req.body;
    const product = await productRepo.createProduct(
      name,
      price,
      storeId,
      imageUrl,
    );
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await productRepo.getAllProducts();
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};
