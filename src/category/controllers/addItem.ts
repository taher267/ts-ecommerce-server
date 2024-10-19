import express from "express";
import { addCategory } from "@/category";
import { newCategoryProps } from "types";

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
    const item = await addCategory(newObj);
    res.json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default addItem;
