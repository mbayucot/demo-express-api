// src/services/runFileImport.ts
import { FileImportStatus, PrismaClient } from "@prisma/client";
import { fileImportQueue } from "../lib/queue";
import { fileImportMachine } from "../machines/fileImportMachine";
import { interpret } from "xstate";
import { parse } from "csv-parse/sync";
import { getObjectStream } from "../lib/s3"; // stream file from S3
import { Readable } from "stream";
import { FileImportLogStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function runFileImport(fileImportId: number) {
    const fileImport = await prisma.fileImport.findUnique({
        where: { id: fileImportId },
    });
    if (!fileImport) throw new Error("File import not found");

    const machine = interpret(fileImportMachine.withContext({ status: fileImport.status }))
        .onTransition((state) => {
            if (state.changed) {
                prisma.fileImport.update({
                    where: { id: fileImportId },
                    data: { status: state.value as FileImportStatus },
                });
            }
        })
        .start();

    machine.send("START_IMPORT");

    try {
        const stream = await getObjectStream(fileImport.s3Key);
        const content = await streamToString(stream);
        const records = parse(content, {
            columns: true,
            skip_empty_lines: true,
        });

        await prisma.fileImport.update({
            where: { id: fileImportId },
            data: {
                totalRows: records.length,
                processedRows: 0,
            },
        });

        // Add all records to the queue
        await fileImportQueue.addBulk(
            records.map((record, index) => ({
                name: `row-${index}`,
                data: { record, fileImportId },
            }))
        );
    } catch (error: any) {
        await prisma.fileImport.update({
            where: { id: fileImportId },
            data: { status: FileImportStatus.FAILED },
        });
        await prisma.fileImportLog.create({
            data: {
                fileImportId,
                status: FileImportLogStatus.failed,
                message: error.message,
            },
        });
    }
}

function streamToString(stream: Readable): Promise<string> {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
        stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
        stream.on("error", reject);
    });
}
