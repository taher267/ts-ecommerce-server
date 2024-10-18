import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const fileUploadSchema = Joi.object({
  name: Joi.string().required(),
  // mv(path: string, callback: (err: any) => void): void;
  mv: Joi.function().required(),
  /** Encoding type of the file */
  encoding: Joi.string().required(),
  /** The mimetype of your file */
  mimetype: Joi.string().valid(...['image/png','image/jpeg']).required(),
  /** A buffer representation of your file, returns empty buffer in case useTempFiles option was set to true. */
  data: Joi.binary().required(),
  /** A path to the temporary file in case useTempFiles option was set to true. */
  tempFilePath: Joi.string().required(),
  /** A boolean that represents if the file is over the size limit */
  truncated: Joi.boolean().required(),
  /** Uploaded size in bytes */
  size: Joi.number().integer().required(),
  /** MD5 checksum of the uploaded file */
  md5: Joi.string().required(),
}).required();


export default {
  isValidUploadFile: (req: Request, res: Response, next: NextFunction) => {
    const { error } = fileUploadSchema.validate(req?.files?.image, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({ success: false, errors: error.details });
    }
    return next();
  },
};
