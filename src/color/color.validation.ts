import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const fileUploadSchema = Joi.object({
  name: Joi.string().allow(...[null, ""]),
  description: Joi.string().allow(...[null, ""]),
  price: Joi.number()
    .integer()
    .allow(...[null, ""]),
  prod_code: Joi.string().required(),
  drive_id: Joi.string().required(),
}).required();

export default {
  isValidNewProduct: (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { error } = fileUploadSchema.validate(req?.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({ success: false, errors: error.details });
    }
    return next();
  },
};
