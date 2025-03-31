import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { FileImportRepository } from "../repositories/fileImportRepository";
import { uploadFileToS3 } from "../services/s3Service";
import { runFileImport } from "../services/fileImportService";

const fileImportRepo = new FileImportRepository();

export class FileImportController {
    upload = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id; // Assuming you use auth middleware
        const file = req.file;

        if (!file || !userId) {
            res.status(400).json({ error: "Missing file or user" });
            return;
        }

        const fileUrl = await uploadFileToS3(file);
        const totalRows = 100; // Just a placeholder, ideally parsed from file

        const fileImport = await fileImportRepo.create(fileUrl, userId, totalRows);

        await runFileImport(fileImport.id, fileUrl); // triggers async process

        res.status(201).json(fileImport);
    });
}