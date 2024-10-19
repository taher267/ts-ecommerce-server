import express from "express";
import { addItem, getAllItems } from "@/tag/controllers";
import schemas from "@/validation/validation_schemas/tag.schemas";
import validator from "@/validation/zod.schema.validator";

const router = express.Router();
/**
 * @method GET
 * @url base_url/api/v1/tags
 * @permession Public
 */
router.get("/", getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/tags
 * @permession ADMIN
 */
router.post("/", validator(schemas.tagAddSchema), addItem);
export default router;
