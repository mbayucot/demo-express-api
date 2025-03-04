import express from "express";
import { createStore, getAllStores } from "../controllers/storeController";
import { validateRequest } from "../middleware/validationMiddleware";
import { storeSchema } from "../validators/storeValidator";

const router = express.Router();

router.post("/", validateRequest(storeSchema), createStore);
router.get("/", getAllStores);

export default router;
