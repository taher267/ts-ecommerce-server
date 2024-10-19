import mg from "mongoose";
import { newProductTagProps } from "types";

const productTagSchema = new mg.Schema(
  {
    tag_id: { type: mg.Types.ObjectId, ref: "Tag" },
    product_id: { type: mg.Types.ObjectId, ref: "Product" },
    stock: { type: Number, default: 0 },
  },
  { collection: "productTags" }
);

const ProductTag = mg.model("ProductTag", productTagSchema);

export default ProductTag;

export const getProductTags = (query: Record<string, any>) =>
  ProductTag.find(query);
export const getProductTag = (
  query: Record<string, any> = {},
  select: string = ""
) => ProductTag.findOne(query).select(select).exec();
export const addProductTag = (query: newProductTagProps) =>
  new ProductTag(query).save().then((data) => data.toObject());
