import ex from "express";
import { getProduct } from "@/product";
import createHttpError from "http-errors";
import idReplacer from "@/utils/idReplacer";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const { slug } = req.params;
    const data = await getProduct({ slug });
    if (!data) throw createHttpError(404, "Resource not found!");
    const item = idReplacer(data);

    res.json({
      item,
      links: {
        self: `/products/${item.id}`,
        "self-slug": `/products/${slug}`,
      },
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

export default getItem;
