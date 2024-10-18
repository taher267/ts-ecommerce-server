import ex from "express";
import { addProductCategory } from "@/product_category";
import { newProductCategoryProps } from "types";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const { category_id, product_id } = req.body;
    const newObj: newProductCategoryProps = {
      category_id,
      product_id,
    };
    const product = await addProductCategory(newObj);
    res.json({ product, success: true });
  } catch (e) {
    next(e);
  }
};

export default getItem;
