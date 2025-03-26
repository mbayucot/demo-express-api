import passport from "passport";
import { Request, Response, NextFunction } from "express";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  })(req, res, next);
};
