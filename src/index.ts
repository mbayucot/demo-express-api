import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import winston from "winston";
import expressWinston from "express-winston";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import csrf from "csurf";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Winston Logger Configuration
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" })
    ],
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression()); // Enables Gzip compression for responses
app.use(cookieParser());

// Morgan HTTP Request Logging
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

// Rate Limiting (100 requests per 15 minutes per IP)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later",
    headers: true,
});
app.use(limiter);

// CSRF Protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Express Winston Request Logging
app.use(
    expressWinston.logger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: "logs/requests.log" }),
        ],
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        meta: true,
        expressFormat: true,
        colorize: false,
    })
);

// Routes
app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Express + TypeScript Server is running! 🚀",
        csrfToken: req.csrfToken() // Send CSRF token to the client
    });
});

// Express Winston Error Logging
app.use(
    expressWinston.errorLogger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: "logs/errors.log" }),
        ],
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
    })
);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).json({ error: "Something went wrong" });
});

// Start Server
app.listen(PORT, () => {
    logger.info(`🚀 Server is running on http://localhost:${PORT}`);
});
