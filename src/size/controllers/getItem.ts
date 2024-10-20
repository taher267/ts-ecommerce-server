import ex from "express";
import { getSize } from "@/size";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    // const {  } = req.body;

    const item = await getSize({});
    res.json({ item, success: true });
  } catch (e) {
    next(e);
  }
};

export default getItem;
