import express from "express";
import { addProduct } from "@/product";
import { newProductProps } from "types";
import slugify from "slugify";

const addItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      name,
      description,
      sku,
      model,
      brand,
      regular_price,
      sale_price,
      images,
      slug,
      currency = "$",
      features,
    } = req.body;
    const s = slug ?? `${slugify(name)}-${sku}`.toLowerCase();
    const newObj: newProductProps = {
      name,
      description,
      sku,
      model,
      brand,
      regular_price,
      sale_price,
      slug: s,
      images,
      currency,
      features,
    };
    const item = await addProduct(newObj);
    res.status(201).json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default addItem;
