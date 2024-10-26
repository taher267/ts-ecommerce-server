import express from "express";
import {
  addItem,
  getAllItems,
  getItem,
  removeItem,
  updateItem,
} from "@/size/controllers";
import schemas from "@/validation/validation_schemas/size.schemas";
import validator from "@/validation/zod.schema.validator";
import zodSchemaParamDependencyValidator from "@/validation/zod.schema.paramDependencyValidator";
const router = express.Router();
/**
 * @method GET
 * @url base_url/api/v1/sizes
 * @permession Public
 */
router.get("/", getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/sizes
 * @permession ADMIN
 */
router.post("/", validator(schemas.sizeAddSchema), addItem);
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
  .get(getItem)
  /**
   * @method PUT
   * @url base_url/api/v1/sizes/:id
   * @permession ADMIN
   */
  .put(zodSchemaParamDependencyValidator(schemas.sizeUpdateSchema), updateItem)
  /**
   * @method DELETE
   * @url base_url/api/v1/sizes/:id
   * @permession ADMIN
   */
  .delete(removeItem);

export default router;
