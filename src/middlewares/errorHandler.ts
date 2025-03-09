import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next(createHttpError(404, "Route Not Found"));
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
}
