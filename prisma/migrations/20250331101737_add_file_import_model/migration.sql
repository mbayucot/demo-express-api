-- CreateTable
CREATE TABLE "FileImport" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "processedRows" INTEGER NOT NULL DEFAULT 0,
    "totalRows" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileImport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileImportLog" (
    "id" SERIAL NOT NULL,
    "fileImportId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileImportLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FileImport" ADD CONSTRAINT "FileImport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileImportLog" ADD CONSTRAINT "FileImportLog_fileImportId_fkey" FOREIGN KEY ("fileImportId") REFERENCES "FileImport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
