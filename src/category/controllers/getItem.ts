import ex from "express";
import { addCategory } from "@/category";
import { newCategoryProps } from "types";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const { name, description, prod_code, drive_id } = req.body;
    const newObj: newCategoryProps = {
      name,
    };
    const product = await addCategory(newObj);
    res.json({ product, success: true });
  } catch (e) {
    next(e);
  }
};

export default getItem;
