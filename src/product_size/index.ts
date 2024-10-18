import mg from "mongoose";
import { newProductSizeProps } from "types";

const productSizeSchema = new mg.Schema(
  {
    size_id: { type: mg.Types.ObjectId, ref: "Size" },
    product_id: { type: mg.Types.ObjectId, ref: "Product" },
    stock: { type: Number, default: 0 },
  },
  { collection: "productSizes" }
);

const ProductSize = mg.model("ProductSize", productSizeSchema);

export default ProductSize;

export const getProductSizes = (query: Record<string, any>) =>
  ProductSize.find(query);
export const getProductSize = (
  query: Record<string, any> = {},
  select: string = ""
) => ProductSize.findOne(query).select(select).exec();
export const addProductSize = (query: newProductSizeProps) =>
  new ProductSize(query).save().then((data) => data.toObject());
