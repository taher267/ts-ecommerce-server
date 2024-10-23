"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../category/controllers");
const category_schemas_1 = __importDefault(require("../validation/validation_schemas/category.schemas"));
const zod_schema_validator_1 = __importDefault(require("../validation/zod.schema.validator"));
const router = express_1.default.Router();
/**
 * @method GET
 * @url base_url/api/v1/categories
 * @permession Public
 */
router.get("/", controllers_1.getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/categories
 * @permession ADMIN
 */
router.post("/", (0, zod_schema_validator_1.default)(category_schemas_1.default.categoryAddSchema), controllers_1.addItem);
exports.default = router;
//# sourceMappingURL=category.routes.js.map