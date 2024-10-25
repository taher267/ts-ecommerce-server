import express from "express";
import {
  addItem,
  getAllItems,
  getItem,
  updateItem,
  removeItem,
} from "@/category/controllers";
import schemas from "@/validation/validation_schemas/category.schemas";
import validator from "@/validation/zod.schema.validator";
import paramDepvValidator from "@/validation/zod.schema.paramDependencyValidator";
const router = express.Router();
/**
 * @method GET
 * @url base_url/api/v1/categories
 * @permession Public
 */
router.get("/", getAllItems);
/**
 * @method POST
 * @url base_url/api/v1/categories
 * @permession ADMIN
 */
router.post("/", validator(schemas.categoryAddSchema), addItem);

router
  .route("/:id")
  /**
   * @method GET
   * @url base_url/api/v1/categories/:id
   * @permession ADMIN
   */
  .get(getItem)
  /**
   * @method PUT
   * @url base_url/api/v1/categories/:id
   * @permession ADMIN
   */
  .put(paramDepvValidator(schemas.categoryUpdateSchema), updateItem)
  /**
   * @method DELETE
   * @url base_url/api/v1/categories/:id
   * @permession ADMIN
   */
  .delete(removeItem);

export default router;
