import morgan from "morgan";
import expressWinston from "express-winston";
import winston from "winston";

const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  meta: true,
});

export { logger, morgan };
