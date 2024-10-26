import express from "express";
import { addTag } from "@/tag";
import { newTagProps } from "types";
import idReplacer from "@/utils/idReplacer";

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
    const data = await addTag(newObj);
    const item = idReplacer(data);

    res.json({
      item,
      links: {
        self: `/tags/${item.id}`,
      },
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

export default addItem;
