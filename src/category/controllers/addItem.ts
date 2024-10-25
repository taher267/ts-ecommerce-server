import express from "express";
import { addCategory } from "@/category";
import { newCategoryProps } from "types";
import idReplacer from "@/utils/idReplacer";

const addItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { name } = req.body;
    const newObj: newCategoryProps = {
      name,
    };
    const data = await addCategory(newObj);
    const item = idReplacer(data);
    res.json({
      item,
      links: {
        self: `/categories/${item.id}`,
      },
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

export default addItem;
