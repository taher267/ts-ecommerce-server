import express from "express";
import { addItem, getAllItems } from "@/color/controllers";
import validations from "./color.validation";
const router = express.Router();
/**
 * @method GET
 * @url base_url/api/v1/colors
 * @permession Public
 */
router.get("/", getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/colors
 * @permession ADMIN
 */
router.post("/", validations.isValidNewProduct, addItem);
export default router;
