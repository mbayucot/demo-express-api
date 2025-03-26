import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { logger, morgan } from "./middlewares/logger";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler";
import { corsOptions, limiter, helmet, compression, cookieParser, cors } from "./middlewares/security";
import storeRoutes from "./routes/storeRoutes";
import authRoutes from "./routes/authRoutes";
import passport from "./config/passport";
import { swaggerUi, swaggerSpec } from "./config/swagger";

// Load environment variables based on NODE_ENV
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const app = express();
const PORT = process.env.PORT || 3000;

// Apply Middlewares
app.use(morgan("dev"));
app.use(logger);
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);

app.use(express.json());

app.use(passport.initialize());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount Routes
app.use("/stores", storeRoutes);
app.use("/auth", authRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
