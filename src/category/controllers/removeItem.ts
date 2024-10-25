import express from "express";
import { removeCategory } from "@/category";
// import { newCategoryProps } from "types";
import { notFound } from "@/utils/error";

const updateItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      params: { id: _id },
    } = req;
    const { deletedCount } = await removeCategory({ _id });
    if (!deletedCount) {
      throw notFound();
    }
    res.status(202).json({
      id: _id,
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

export default updateItem;
