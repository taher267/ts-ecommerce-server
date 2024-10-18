import express from "express";
import { addItem, getAllItems } from "@/product_color/controllers";
import validations from "./product_color.validation";
const router = express.Router();
/**
 * @method GET
 * @url base_url/api/v1/product_colors
 * @permession Public
 */
router.get("/", getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/product_colors
 * @permession ADMIN
 */
router.post("/", validations.isValidNewProduct, addItem);
export default router;
