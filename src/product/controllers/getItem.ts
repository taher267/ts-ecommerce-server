import ex from "express";
import { getProduct } from "@/product";
import createHttpError from "http-errors";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const { id } = req.params;
    const item = await getProduct({ _id: id });
    if (!item) throw createHttpError(404, "Resource not found!");
    res.json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default getItem;
