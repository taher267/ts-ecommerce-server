import { fileupload } from "@/cloud-file-upload";
import ex from "express";
import { UploadedFile } from "express-fileupload";
import { ObjectId } from "mongodb";

export default async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const image = <UploadedFile>req.files?.image;
    const { data } = image;
    const public_id = new ObjectId().toString();
    const item = await fileupload(data, {
      folder: "e-com/products",
      public_id,
    });
    res.status(201).json({ message: "message", item });
  } catch (e) {
    next(e);
  }
};
