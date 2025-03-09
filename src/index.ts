import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { logger, morgan } from "./middlewares/logger";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler";
import { corsOptions, csrfProtection, limiter, helmet, compression, cookieParser, cors } from "./middlewares/security";

dotenv.config();

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
app.use(csrfProtection);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
