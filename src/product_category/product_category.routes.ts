import express from "express";
import { addItem, getAllItems } from "@/product_category/controllers";
import validations from "./product_category.validation";
const router = express.Router();
/**
 * @method GET
 * @url base_url/api/v1/product-categories
 * @permession Public
 */
router.get("/", getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/product-categories
 * @permession ADMIN
 */
router.post("/", validations.isValidNewProduct, addItem);
export default router;
