import express from "express";
import { addColor } from "@/color";
import { newColorProps } from "types";

const addItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { name, code } = req.body;
    const newObj: newColorProps = {
      name,
      code,
    };
    const item = await addColor(newObj);
    res.json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default addItem;
