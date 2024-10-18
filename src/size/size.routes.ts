import express from "express";
import { addItem, getAllItems } from "@/size/controllers";
import validations from "./size.validation";
const router = express.Router();
/**
 * @method GET
 * @url base_url/api/v1/sizes
 * @permession Public
 */
router.get("/", getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/sizes
 * @permession ADMIN
 */
router.post("/", validations.isValidNewProduct, addItem);
export default router;
