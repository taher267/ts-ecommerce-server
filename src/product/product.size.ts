import mg from "mongoose";
import { newProductSizeProps } from "types";

const productSizeSchema = new mg.Schema({
  name: { type: String, required: true },
  size_id: { type: mg.Types.ObjectId, ref: "Size" },
  product_id: { type: mg.Types.ObjectId, ref: "Product" },
  stock: { type: Number, default: 0 },
});

const ProductSize = mg.model("ProductSize", productSizeSchema);

export default ProductSize;

export const getProductSizes = (query: Record<string, any>) =>
  ProductSize.find(query).exec();

export const addProductSize = (query: newProductSizeProps) =>
  new ProductSize(query).save().then((data) => data.toObject());
