import express from "express";
import { getCategory } from "@/category";
// import { newCategoryProps } from "types";
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
    // const updateObj: newCategoryProps = {
    //   name,
    // };
    const data = await getCategory({ _id });
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
        self: `/categories/${item.id}`,
      },
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

export default updateItem;
