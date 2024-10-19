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
    const { name, description, sku, model, brand, price, images, slug } =
      req.body;
    const s = slug ?? `${slugify(name)}-${sku}`;
    const newObj: newProductProps = {
      name,
      description,
      sku,
      model,
      brand,
      price,
      slug: s,
      images,
    };
    const item = await addProduct(newObj);
    res.status(201).json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default addItem;
