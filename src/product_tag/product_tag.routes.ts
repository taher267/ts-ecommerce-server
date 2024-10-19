import express from "express";
import { addItem, getAllItems } from "@/product_tag/controllers";
const router = express.Router();
/**
 * @method GET
 * @url base_url/api/v1/product-sizes
 * @permession Public
 */
router.get("/", getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/product-sizes
 * @permession ADMIN
 */
router.post("/", addItem);
export default router;
