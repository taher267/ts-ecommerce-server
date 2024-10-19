import ex from "express";
import { getProductSize } from "@/product_size";

const getItem = async (
  _req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const item = await getProductSize();
    res.json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default getItem;
