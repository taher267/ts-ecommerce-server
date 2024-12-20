"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../product_color/controllers");
const router = express_1.default.Router();
/**
 * @method GET
 * @url base_url/api/v1/product_colors
 * @permession Public
 */
router.get("/", controllers_1.getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/product_colors
 * @permession ADMIN
 */
router.post("/", controllers_1.addItem);
exports.default = router;
