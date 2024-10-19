import express from "express";
import { addTag } from "@/tag";
import { newTagProps } from "types";

const addItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { name } = req.body;
    const newObj: newTagProps = {
      name,
    };
    const item = await addTag(newObj);
    // const item = {
    //   name,
    // };
    res.json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default addItem;
