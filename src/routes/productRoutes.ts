import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController";
import { validateRequest } from "../middleware/validationMiddleware";
import { productSchema } from "../validators/productValidator";

const router = express.Router();

// Route: /stores/:storeId/products
router.post(
  "/:storeId/products",
  validateRequest(productSchema),
  createProduct,
);
router.get("/:storeId/products", getAllProducts);

export default router;
