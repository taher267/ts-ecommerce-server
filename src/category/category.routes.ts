import express from "express";
import { addItem, getAllItems } from "@/category/controllers";
import validations from "./category.validation";
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
router.post("/", validations.isValidNewProduct, addItem);
export default router;
