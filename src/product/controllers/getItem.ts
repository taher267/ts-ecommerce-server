import ex from "express";
import { addProduct } from "@/product";
import { newProductProps } from "types";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
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

export default getItem;
