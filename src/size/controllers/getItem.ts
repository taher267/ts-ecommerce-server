import ex from "express";
import { getSize } from "@/size";
import { newSizeProps } from "types";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    // const {  } = req.body;

    const Size = await getSize({});
    res.json({ Size, success: true });
  } catch (e) {
    next(e);
  }
};

export default getItem;
