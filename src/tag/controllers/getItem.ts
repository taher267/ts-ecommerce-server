import ex from "express";
import { getTag } from "@/tag";
import idReplacer from "@/utils/idReplacer";
import { notFound } from "@/utils/error";

const getItem = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const { id } = req.params;

    const data = await getTag({ _id: id });

    if (!data) {
      throw notFound();
    }
    const item = idReplacer(data);

    res.status(200).json({
      item,
      links: {
        self: `/tags/${item.id}`,
      },
      // success: true,
    });
  } catch (e) {
    next(e);
  }
};

export default getItem;
