import ex from "express";
import { getTag } from "@/tag";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    // const {  } = req.body;

    const item = await getTag({});
    res.json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default getItem;
