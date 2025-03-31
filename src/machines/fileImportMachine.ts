import { PrismaClient } from '@prisma/client';
import { fileImportMachine } from '../machines/fileImportMachine';
import { createMachineInterpreter } from '../utils/stateInterpreter';

const prisma = new PrismaClient();

export const updateFileImportStatus = async (id: number, event: string) => {
    const fileImport = await prisma.fileImport.findUnique({ where: { id } });
    if (!fileImport) throw new Error('FileImport not found');

    const interpreter = createMachineInterpreter(fileImportMachine, fileImport.status, {
        processedRows: fileImport.processedRows,
        totalRows: fileImport.totalRows
    });

    interpreter.send({ type: event, ...fileImport });

    const newState = interpreter.state.value as string;

    await prisma.fileImport.update({
        where: { id },
        data: { status: newState }
    });

    return newState;
};