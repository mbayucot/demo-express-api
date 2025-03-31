import multer from "multer";
import path from "path";

// Store files temporarily in memory before uploading to S3
export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // limit to 5MB
    fileFilter: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if ([".png", ".jpg", ".jpeg", ".pdf"].includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error("Only .png, .jpg, .jpeg, .pdf files are allowed!"));
        }
    },
});