import express from "express";
import { getProducts } from "@/product";
const getAllItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const { query } = req;
    const items = await getProducts({}).sort("-createdAt");
    res.json({ items });
  } catch (e) {
    next(e);
  }
};
export default getAllItems;
