import { fileDelete } from "@/cloud-file-upload";
import ex from "express";

export default async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const { id } = req.params;
    const item = await fileDelete(id);
    res.status(201).json({ message: "message", item });
  } catch (e) {
    next(e);
  }
};
