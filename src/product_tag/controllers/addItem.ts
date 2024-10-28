import ex from "express";
import { addProductTag } from "@/product_tag";
import { newProductTagProps } from "types";

const addItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const { tag_ids, product_id } = req.body;
    const newObj: newProductTagProps = { tag_ids, product_id };
    const product = await addProductTag(newObj);
    res.json({ product, success: true });
  } catch (e) {
    next(e);
  }
};

export default addItem;
