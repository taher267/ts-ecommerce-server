import express from "express";
import { getTag } from "@/tag";
import idReplacer from "@/utils/idReplacer";
import { notFound } from "@/utils/error";

const updateItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      body: { name },
      params: { id: _id },
    } = req;

    const data = await getTag({ _id });
    if (!data) {
      throw notFound();
    }
    if (name) {
      data.name = name;
    }
    const updated = await data.save();
    const item = idReplacer(updated);
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

export default updateItem;
