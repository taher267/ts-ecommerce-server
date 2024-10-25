// In src/middlewares/validate.ts
import { NextFunction, Request, Response } from "express";
import z from "zod";

export default (getSchema: (req: Request) => z.Schema) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const schema = getSchema(req);
      await schema.parseAsync(req.body);
      return next();
    } catch (e) {
      return next(e);
    }
  };
