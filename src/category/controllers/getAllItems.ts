import express from "express";
import { getCategories } from "@/category";
const getAllItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const { query } = req;
    const items = await getCategories({});
    res.json({ items });
  } catch (e) {
    next(e);
  }
};
export default getAllItems;
