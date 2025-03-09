import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const csrfProtection = csrf({ cookie: true });

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});

export {
  corsOptions,
  csrfProtection,
  limiter,
  helmet,
  compression,
  cookieParser,
  cors,
};
