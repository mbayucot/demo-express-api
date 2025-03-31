// src/repositories/fileImportRepository.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FileImportRepository {
    async create(fileUrl: string, userId: number, totalRows: number) {
        return await prisma.fileImport.create({
            data: {
                fileUrl,
                userId,
                totalRows,
                processedRows: 0,
                status: "pending",
            },
        });
    }

    async updateStatus(id: number, status: string) {
        return await prisma.fileImport.update({
            where: { id },
            data: { status },
        });
    }

    async incrementProcessedRows(id: number, count: number = 1) {
        return await prisma.fileImport.update({
            where: { id },
            data: {
                processedRows: { increment: count },
            },
        });
    }

    async findById(id: number) {
        return await prisma.fileImport.findUnique({
            where: { id },
        });
    }
}
