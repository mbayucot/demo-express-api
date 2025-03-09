import { Router } from "express";
import { ProductsController } from "../controllers/productsController";

const router = Router({ mergeParams: true });
const productsController = new ProductsController();

router.get("/", productsController.index);
router.get("/:id", productsController.show);
router.post("/", productsController.create);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.destroy);

export default router;
