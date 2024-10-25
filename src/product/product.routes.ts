import express from "express";
import {
  addItem,
  getAllItems,
  getItem,
  removeItem,
} from "@/product/controllers";
import schemas from "@/validation/validation_schemas/product.schemas";
import validator from "@/validation/zod.schema.validator";
const router = express.Router();
/**
 * @method POST
 * @url base_url/api/v1/products
 * @permession ADMIN
 */
router.post("/", validator(schemas.productAddSchema), addItem);
/**
 * @method GET
 * @url base_url/api/v1/products
 * @permession Public
 */
router.get("/", getAllItems);
/**
 * @method GET
 * @url base_url/api/v1/products/:slug
 * @permession Public
 */
router.route("/:slug").get(getItem);
/**
 * @method GET
 * @url base_url/api/v1/products/:id
 * @permession Public
 */
router.route("/:id").delete(removeItem);
export default router;
