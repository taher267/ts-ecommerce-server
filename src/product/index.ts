import mg from "mongoose";
import { newProductProps } from "types";
const Image = {
  url: { type: String, required: true },
  // url: { type: mg.Types.ObjectId, ref: "Image", required: true },
  _id: false,
};
const productSchema = new mg.Schema(
  {
    name: {
      type: String,
      required: true,
      index: 1,
      minlength: 10,
      maxlength: 300,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: 1,
      minlength: 10,
      maxlength: 300,
    },
    description: {
      type: String,
      required: true,
      index: 1,
      minLength: 10,
      maxLength: 3000,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      index: 1,
      minlength: 1,
      maxlength: 50,
    },
    model: { type: String, index: 1, minlength: 1, maxlength: 100 },
    brand: { type: String, index: 1, minlength: 1, maxlength: 100 },
    regular_price: { type: Number, required: true },
    sale_price: { type: Number },
    currenty: { type: String, required: true, default: "$" },
    features: [String],
    images: [Image],
  },
  { timestamps: true }
);
const Product = mg.model("Product", productSchema);

export default Product;

export const getProducts = (query: Record<string, any>) => Product.find(query);
export const getProduct = (query: Record<string, any> = {}, select = "") =>
  Product.findOne(query).select(select).exec();
export const deleteProduct = (query: Record<string, any> = {}) =>
  Product.deleteOne(query).exec();

export const addProduct = (query: newProductProps) =>
  new Product(query).save().then((data) => data.toObject());
