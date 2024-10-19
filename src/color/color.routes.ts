import express from "express";
import { addItem, getAllItems } from "@/color/controllers";
import validator from "@/validation/zod.schema.validator";
import colorSchemas from "@/validation/validation_schemas/color.schemas";
const router = express.Router();
/**
 * @method GET
 * @url base_url/api/v1/colors
 * @permession Public
 */
router.get("/", getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/colors
 * @permession ADMIN
 */
router.post("/", validator(colorSchemas.colorAddSchema), addItem);
export default router;
