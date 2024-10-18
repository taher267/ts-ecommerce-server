import mg from "mongoose";
import { newProductColorProps } from "types";

const productColorSchema = new mg.Schema({
  product_id: { type: mg.Types.ObjectId, ref: "Product" },
  color_id: { type: mg.Types.ObjectId, ref: "Color" },
});

const ProductColor = mg.model("ProductColor", productColorSchema);

export default ProductColor;

export const getProductColors = (query: Record<string, any>) =>
  ProductColor.find(query).exec();

export const addProductColor = (query: newProductColorProps) =>
  new ProductColor(query).save().then((data) => data.toObject());
