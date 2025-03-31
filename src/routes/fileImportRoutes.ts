import { Router } from "express";
import multer from "multer";
import { FileImportController } from "../controllers/fileImportController";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
const fileImportController = new FileImportController();

router.post("/import", upload.single("file"), fileImportController.upload);

export default router;