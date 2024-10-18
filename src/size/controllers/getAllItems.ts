import express from "express";
import { getSizes } from "@/size";
const getAllItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const { query } = req;
    const sizes = await getSizes({});
    res.status(200).json({ sizes });
  } catch (e) {
    next(e);
  }
};
export default getAllItems;
