import express from "express";
import { getProductColors } from "@/product_color";
const getAllItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const { query } = req;
    const items = await getProductColors({});
    res.json({ items });
  } catch (e) {
    next(e);
  }
};
export default getAllItems;
