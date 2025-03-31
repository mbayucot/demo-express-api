// src/middlewares/upload.ts
import multer from "multer";
import multerS3 from "multer-s3";
import { s3Client } from "../lib/s3Client";
import { randomUUID } from "crypto";

const bucket = process.env.AWS_S3_BUCKET!;

export const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (_req, file, cb) => {
            const fileName = `products/${Date.now()}-${randomUUID()}-${file.originalname}`;
            cb(null, fileName);
        },
    }),
});