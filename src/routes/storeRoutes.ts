import { Router } from "express";
import { StoreController } from "../controllers/storeController";

const router = Router();
const storeController = new StoreController();

router.post("/", storeController.create);
router.get("/", storeController.getAll);
router.get("/:id", storeController.getById);
router.put("/:id", storeController.update);
router.delete("/:id", storeController.delete);

export default router;
