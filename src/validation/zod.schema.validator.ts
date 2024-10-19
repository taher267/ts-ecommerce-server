import { NextFunction, Request, Response } from "express";
import z from "zod";

export default (validationSchema: z.Schema) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await validationSchema.parseAsync(req.body);
      return next();
    } catch (e) {
      return next(e);
    }
  };