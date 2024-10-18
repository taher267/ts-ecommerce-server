import express from "express";
import { addProductCategory } from "@/product_category";
import { newProductCategoryProps } from "types";

const addItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
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

export default addItem;
