import ex from "express";
import { getSize } from "@/size";
import idReplacer from "@/utils/idReplacer";
import { notFound } from "@/utils/error";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const { id } = req.params;

    const data = await getSize({ _id: id });

    if (!data) {
      throw notFound();
    }
    const item = idReplacer(data);

    res.status(200).json({
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

export default getItem;
