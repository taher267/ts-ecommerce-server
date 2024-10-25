import ex from "express";
import { getProduct } from "@/product";
import createHttpError from "http-errors";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const { slug } = req.params;
    const item = await getProduct({ slug });
    if (!item) throw createHttpError(404, "Resource not found!");

    res.json({
      item,
      links: {
        self: `/products/${slug}`,
      },
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

export default getItem;
