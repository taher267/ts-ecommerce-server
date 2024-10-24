import ex from "express";
import { addCategory } from "@/category";
import { newCategoryProps } from "types";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const { name } = req.body;
    const newObj: newCategoryProps = {
      name,
    };
    const item = await addCategory(newObj);
    res.json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default getItem;
