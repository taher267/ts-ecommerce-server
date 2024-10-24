import express from "express";
import { getSizes } from "@/size";
const getAllItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const { query } = req;
    const items = await getSizes({});
    res.status(200).json({ items, code: 200 });
  } catch (e) {
    next(e);
  }
};
export default getAllItems;
