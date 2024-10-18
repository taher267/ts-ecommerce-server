import ex from "express";
import { getProduct } from "@/product";
import { newProductProps } from "types";

const getItem = async (
  _req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const item = await getProduct();
    res.json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default getItem;
