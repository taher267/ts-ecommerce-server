import express from "express";
import { addItem, getAllItems } from "@/product/controllers";
import validations from "./product.validation";
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
router.post("/", validations.isValidNewProduct, addItem);
export default router;
