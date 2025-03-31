// src/workers/fileImportWorker.ts

import { Worker, Job } from "bullmq";
import { createRedisConnection } from "../lib/queue";
import { prisma } from "../lib/prisma";
import { parseRowDataAndSave } from "../services/importRowProcessor";
import { updateFileImportProgress } from "../services/runFileImport";

const connection = createRedisConnection();

export const fileImportWorker = new Worker(
    "fileImportRows",
    async (job: Job) => {
        const { row, importId } = job.data;

        try {
            await parseRowDataAndSave(row);

            // Update processed_rows
            await updateFileImportProgress(importId);
        } catch (error) {
            console.error("Error processing row:", error);
            await prisma.fileImportLog.create({
                data: {
                    fileImportId: importId,
                    status: "failed",
                    message: error.message || "Unknown error",
                },
            });
        }
    },
    { connection }
);

fileImportWorker.on("completed", (job) => {
    console.log(`✅ Job ${job.id} completed`);
});

fileImportWorker.on("failed", (job, err) => {
    console.error(`❌ Job ${job?.id} failed:`, err);
});