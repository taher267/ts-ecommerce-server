import express from "express";
import { addProduct } from "@/product";
import { newProductProps } from "types";

const addItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { name, description, prod_code, drive_id } = req.body;
    const newObj: newProductProps = {
      name,
      description,
      prod_code,
      drive_id,
    };
    const product = await addProduct(newObj);
    res.json({ product, success: true });
  } catch (e) {
    next(e);
  }
};

export default addItem;
