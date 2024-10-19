import ex from "express";
import { deleteProduct } from "@/product";
import httpError from "http-errors";

const removeItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const { id } = req.params;
    const { deletedCount } = await deleteProduct({ _id: id });
    if (!deletedCount) {
      throw httpError(404, "Product not found");
    }
    res.status(200).json({ item: { id }, success: true });
  } catch (e) {
    next(e);
  }
};

export default removeItem;
