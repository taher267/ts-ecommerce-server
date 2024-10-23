"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../product_size/controllers");
const router = express_1.default.Router();
/**
 * @method GET
 * @url base_url/api/v1/product-sizes
 * @permession Public
 */
router.get("/", controllers_1.getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/product-sizes
 * @permession ADMIN
 */
router.post("/", controllers_1.addItem);
exports.default = router;
