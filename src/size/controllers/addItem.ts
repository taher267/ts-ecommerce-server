import express from "express";
import { addSize } from "@/size";
import { newSizeProps } from "types";
import idReplacer from "@/utils/idReplacer";

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
    const data = await addSize(newObj);
    const item = idReplacer(data);
    res.json({
      item,
      links: {
        self: `/sizes/${item.id}`,
      },
      // success: true,
    });
  } catch (e) {
    next(e);
  }
};

export default addItem;
