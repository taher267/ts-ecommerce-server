import express from "express";
import { addSize } from "@/size";
import { newSizeProps } from "types";

const addItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { name } = req.body;
    const newObj: newSizeProps = {
      name,
    };
    const item = await addSize(newObj);
    res.json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default addItem;
