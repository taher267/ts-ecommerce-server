import express from "express";
import { addItem, getAllItems } from "@/category/controllers";
import schemas from "@/validation/validation_schemas/category.schemas";
import validator from "@/validation/zod.schema.validator";
const router = express.Router();
/**
 * @method GET
 * @url base_url/api/v1/categories
 * @permession Public
 */
router.get("/", getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/categories
 * @permession ADMIN
 */
router.post("/", validator(schemas.categoryAddSchema), addItem);
export default router;
