"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../auth/controllers");
const router = express_1.default.Router();
/**
 * @route base_url/api/v1/auth/login
 * @method POST
 * @permession Public
 */
router.post("/login", controllers_1.login);
/**
 * @route base_url/api/v1/auth/register
 * @method POST
 * @permession Public
 */
router.post("/register", controllers_1.register);
// router.get("/github/callback", controllers.githubSession2);
exports.default = router;
