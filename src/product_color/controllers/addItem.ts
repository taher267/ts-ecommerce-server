import express from "express";
import { addProductColor } from "@/product_color";
import { newProductColorProps } from "types";

const addItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { product_id, color_ids } = req.body;
    const newObj: newProductColorProps = {
      product_id,
      color_ids,
    };
    const item = await addProductColor(newObj);
    res.json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default addItem;
