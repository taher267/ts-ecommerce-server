import express from "express";
import { getProductSizes } from "@/product_size";
const getAllItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const { query } = req;
    const items = await getProductSizes({});
    res.json({ items });
  } catch (e) {
    next(e);
  }
};
export default getAllItems;
