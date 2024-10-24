import mg from "mongoose";
import { newProductCategoryProps } from "types";

const productCategorySchema = new mg.Schema(
  {
    category_ids: [
      { type: mg.Types.ObjectId, ref: "Category", required: true },
    ],
    product_id: { type: mg.Types.ObjectId, ref: "Product" },
  },
  { collection: "productCategories" }
);

const ProductCategory = mg.model("ProductCategory", productCategorySchema);

export default ProductCategory;

export const getProductCategories = (query: Record<string, any>) =>
  ProductCategory.find(query);
export const getProductCategory = (
  query: Record<string, any> = {},
  select = ""
) => ProductCategory.findOne(query).select(select).exec();

export const addProductCategory = (query: newProductCategoryProps) =>
  new ProductCategory(query).save().then((data) => data.toObject());
