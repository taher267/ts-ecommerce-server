import express from "express";
import { getColors } from "@/color";
const getAllItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const { query } = req;
    const items = await getColors({});
    res.json({ items });
  } catch (e) {
    next(e);
  }
};
export default getAllItems;
