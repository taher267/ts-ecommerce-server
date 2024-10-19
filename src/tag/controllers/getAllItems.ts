import express from "express";
import { getTags } from "@/tag";
const getAllItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const { query } = req;
    const items = await getTags({});
    res.status(200).json({ items, code: 200 });
  } catch (e) {
    next(e);
  }
};
export default getAllItems;
