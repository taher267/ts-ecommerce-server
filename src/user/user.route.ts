import express from "express";
import { getItem, getAllItems } from "@/user/controllers";
const router = express.Router();
/**
 * @method GET
 * @url base_url/api/v1/users
 * @permession ADMIN
 */
router.get("/", getAllItems);
/**
 * @method GET
 * @url base_url/api/v1/users/:id
 * @permession ADMIN
 */
router.get("/:id", getItem);

export default router;
