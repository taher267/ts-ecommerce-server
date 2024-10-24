"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../user/controllers");
const router = express_1.default.Router();
/**
 * @method GET
 * @url base_url/api/v1/users
 * @permession ADMIN
 */
router.get("/", controllers_1.getAllItems);
/**
 * @method GET
 * @url base_url/api/v1/users/:id
 * @permession ADMIN
 */
router.get("/:id", controllers_1.getItem);
exports.default = router;
