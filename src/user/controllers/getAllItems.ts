import { Request, Response, NextFunction } from "express";
import { getUsers } from "@/user";
const getAllItems = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await getUsers();
    return res.status(200).json({ items, code: 200 }).end();
  } catch (e) {
    return next(e);
  }
};

export default getAllItems;
