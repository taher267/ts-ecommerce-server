import express from "express";
import { getProducts } from "@/product";
const getAllItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const { query } = req;
    const products = await getProducts({});
    res.json({ products });
  } catch (e) {
    next(e);
  }
};
export default getAllItems;
