import { Request, Response } from "express";
import { StoreRepository } from "../repositories/storeRepository";

const storeRepo = new StoreRepository();

export const createStore = async (req: Request, res: Response) => {
  try {
    const store = await storeRepo.createStore(req.body.name);
    res.status(201).json(store);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create store", error: error.message });
  }
};

export const getAllStores = async (_: Request, res: Response) => {
  try {
    const stores = await storeRepo.getAllStores();
    res.json(stores);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch stores", error: error.message });
  }
};
