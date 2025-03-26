import csrf from "csurf";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const limiter =
  process.env.NODE_ENV === "test"
    ? (req: any, res: any, next: any) => next() // Disable rate limiting in tests
    : rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per window
      });

export {
  corsOptions,
  limiter,
  helmet,
  compression,
  cookieParser,
  cors,
};
