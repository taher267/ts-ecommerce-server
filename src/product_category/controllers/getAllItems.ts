import express from "express";
import { getProductCategories } from "@/product_category";
const getAllItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const { query } = req;
    const products = await getProductCategories({});
    res.json({ products });
  } catch (e) {
    next(e);
  }
};
export default getAllItems;
