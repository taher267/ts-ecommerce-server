import ex from "express";
import { getColor } from "@/color";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    // const { name, description, prod_code, drive_id } = req.body;

    const product = await getColor();
    res.json({ product, success: true });
  } catch (e) {
    next(e);
  }
};

export default getItem;
