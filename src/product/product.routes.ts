import express from "express";
import { addItem, getAllItems } from "@/product/controllers";
import schemas from "@/validation/validation_schemas/product.schemas";
import validator from "@/validation/zod.schema.validator";
const router = express.Router();
/**
 * @method GET
 * @url base_url/api/v1/products
 * @permession Public
 */
router.get("/", getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/products
 * @permession ADMIN
 */
router.post("/", validator(schemas.productAddSchema), addItem);
export default router;
