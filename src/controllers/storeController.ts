import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { StoreRepository } from "../repositories/storeRepository";

const storeRepository = new StoreRepository();

export class StoreController {
  // Create a new store
  create = asyncHandler(async (req: Request, res: Response) => {
    const { name, address } = req.body;
    const store = await storeRepository.create(name, address);
    res.status(201).json(store);
  });

  // Get all stores
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const stores = await storeRepository.findAll();
    res.json(stores);
  });

  // Get a single store by ID
  getById = asyncHandler(async (req: Request, res: Response) => {
    const store = await storeRepository.findById(Number(req.params.id));
    if (!store) {
      res.status(404).json({ error: "Store not found" });
      return;
    }
    res.json(store);
  });

  // Update a store
  update = asyncHandler(async (req: Request, res: Response) => {
    const { name, address } = req.body;
    const updatedStore = await storeRepository.update(
      Number(req.params.id),
      name,
      address,
    );
    res.json(updatedStore);
  });

  // Delete a store
  delete = asyncHandler(async (req: Request, res: Response) => {
    await storeRepository.delete(Number(req.params.id));
    res.json({ message: "Store deleted successfully" });
  });
}
