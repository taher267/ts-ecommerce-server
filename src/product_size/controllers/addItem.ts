import express from "express";
import { addProductSize } from "@/product_size";
import { newProductSizeProps } from "types";

const addItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { size_ids, product_id, stock } = req.body;
    const newObj: newProductSizeProps = { size_ids, product_id, stock };
    const product = await addProductSize(newObj);
    res.json({ product, success: true });
  } catch (e) {
    next(e);
  }
};

export default addItem;
