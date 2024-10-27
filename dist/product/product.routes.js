"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../product/controllers");
const product_schemas_1 = __importDefault(require("../validation/validation_schemas/product.schemas"));
const zod_schema_validator_1 = __importDefault(require("../validation/zod.schema.validator"));
const getProductsLimiter_1 = __importDefault(require("../middleware/rateLimitter/getProductsLimiter"));
const router = express_1.default.Router();
/**
 * @method POST
 * @url base_url/api/v1/products
 * @permession ADMIN
 */
router.post("/", (0, zod_schema_validator_1.default)(product_schemas_1.default.productAddSchema), controllers_1.addItem);
/**
 * @method GET
 * @url base_url/api/v1/products
 * @permession Public
 */
router.get("/", getProductsLimiter_1.default, controllers_1.getAllItems);
/**
 * @method GET
 * @url base_url/api/v1/products/:slug
 * @permession Public
 */
router.route("/:slug").get(controllers_1.getItem);
/**
 * @method GET
 * @url base_url/api/v1/products/:id
 * @permession Public
 */
router
    .route("/:id")
    .put((0, zod_schema_validator_1.default)(product_schemas_1.default.productAddSchema), controllers_1.addItem)
    .delete(controllers_1.removeItem);
exports.default = router;
