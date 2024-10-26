"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../size/controllers");
const size_schemas_1 = __importDefault(require("../validation/validation_schemas/size.schemas"));
const zod_schema_validator_1 = __importDefault(require("../validation/zod.schema.validator"));
const zod_schema_paramDependencyValidator_1 = __importDefault(require("../validation/zod.schema.paramDependencyValidator"));
const router = express_1.default.Router();
/**
 * @method GET
 * @url base_url/api/v1/sizes
 * @permession Public
 */
router.get("/", controllers_1.getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/sizes
 * @permession ADMIN
 */
router.post("/", (0, zod_schema_validator_1.default)(size_schemas_1.default.sizeAddSchema), controllers_1.addItem);
/**
 * @method POST
 * @url base_url/api/v1/sizes/:id
 * @permession ADMIN
 */
router
    .route("/:id")
    /**
     * @method GET
     * @url base_url/api/v1/sizes/:id
     * @permession ADMIN
     */
    .get(controllers_1.getItem)
    /**
     * @method PUT
     * @url base_url/api/v1/sizes/:id
     * @permession ADMIN
     */
    .put((0, zod_schema_paramDependencyValidator_1.default)(size_schemas_1.default.sizeUpdateSchema), controllers_1.updateItem)
    /**
     * @method DELETE
     * @url base_url/api/v1/sizes/:id
     * @permession ADMIN
     */
    .delete(controllers_1.removeItem);
exports.default = router;
