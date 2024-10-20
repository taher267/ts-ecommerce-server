import express from "express";
import { addItem, getAllItems } from "@/size/controllers";
import schemas from "@/validation/validation_schemas/size.schemas";
import validator from "@/validation/zod.schema.validator";
const router = express.Router();
/**
 * @method GET
 * @url base_url/api/v1/sizes
 * @permession Public
 */
router.get("/", getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/sizes
 * @permession ADMIN
 */
router.post("/", validator(schemas.sizeAddSchema), addItem);
export default router;
