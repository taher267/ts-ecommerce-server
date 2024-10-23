"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../color/controllers");
const zod_schema_validator_1 = __importDefault(require("../validation/zod.schema.validator"));
const color_schemas_1 = __importDefault(require("../validation/validation_schemas/color.schemas"));
const router = express_1.default.Router();
/**
 * @method GET
 * @url base_url/api/v1/colors
 * @permession Public
 */
router.get("/", controllers_1.getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/colors
 * @permession ADMIN
 */
router.post("/", (0, zod_schema_validator_1.default)(color_schemas_1.default.colorAddSchema), controllers_1.addItem);
exports.default = router;
//# sourceMappingURL=color.routes.js.map