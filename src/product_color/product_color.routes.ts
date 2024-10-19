import express from "express";
import { addItem, getAllItems } from "@/product_color/controllers";
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
router.post("/", addItem);
export default router;
