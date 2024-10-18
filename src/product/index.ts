import mg from "mongoose";
import { newProductProps } from "types";
const Image = {
  image: { type: mg.Types.ObjectId, ref: "Image", required: true },
  _id: false,
};
const productSchema = new mg.Schema(
  {
    name: { type: String, required: true, index: 1 },
    description: { type: String, required: true, index: 1 },
    sku: { type: String, required: true, index: 1 },
    model: { type: String, index: 1 },
    brand: { type: String, index: 1 },
    price: { type: Number, required: true },
    images: [Image],
  },
  { timestamps: true }
);
productSchema.index({ prod_code: 1 });
const Product = mg.model("Product", productSchema);

export default Product;

export const getProducts = (query: Record<string, any>) =>
  Product.find(query).exec();

export const addProduct = (query: newProductProps) =>
  new Product(query).save().then((data) => data.toObject());
