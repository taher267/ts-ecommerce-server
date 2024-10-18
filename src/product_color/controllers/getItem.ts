import ex from "express";
import { getProductColor } from "@/product_color";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    // const { name, description, prod_code, drive_id } = req.body;

    const product = await getProductColor();
    res.json({ product, success: true });
  } catch (e) {
    next(e);
  }
};

export default getItem;
