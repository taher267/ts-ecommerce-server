import mg from "mongoose";
import { newProductProps } from "types";
const Image = {
  url: { type: mg.Types.ObjectId, ref: "Image", required: true },
  _id: false,
};
const productSchema = new mg.Schema(
  {
    name: { type: String, required: true, index: 1 },
    description: { type: String, required: true, index: 1 },
    sku: { type: String, required: true, unique: true, index: 1 },
    model: { type: String, index: 1 },
    brand: { type: String, index: 1 },
    price: { type: Number, required: true },
    images: [Image],
  },
  { timestamps: true }
);
const Product = mg.model("Product", productSchema);

export default Product;

export const getProducts = (query: Record<string, any>) => Product.find(query);
export const getProduct = (query: Record<string, any> = {}, select = "") =>
  Product.findOne(query).select(select).exec();

export const addProduct = (query: newProductProps) =>
  new Product(query).save().then((data) => data.toObject());
