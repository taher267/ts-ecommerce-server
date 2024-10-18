import express from "express";
import { login, register } from "@/auth/controllers";
const router = express.Router();

/**
 * @route base_url/api/v1/auth/login
 * @method POST
 * @permession Public
 */

router.post("/login", login);
/**
 * @route base_url/api/v1/auth/register
 * @method POST
 * @permession Public
 */
router.post("/register", register);
// router.get("/github/callback", controllers.githubSession2);
export default router;
