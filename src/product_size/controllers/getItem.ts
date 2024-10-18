import ex from "express";
import { getProductSize } from "@/product_size";
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
    const item = await getProductSize(newObj);
    res.json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default getItem;
