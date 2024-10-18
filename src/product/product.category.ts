import mg from "mongoose";
import { newCategoryProps } from "types";

const categorySchema = new mg.Schema({
  category_id: { type: mg.Types.ObjectId, ref: "Category" },
  product_id: { type: mg.Types.ObjectId, ref: "Product" },
});

const Category = mg.model("Category", categorySchema);

export default Category;

export const getCategorys = (query: Record<string, any>) =>
  Category.find(query).exec();

export const addCategory = (query: newCategoryProps) =>
  new Category(query).save().then((data) => data.toObject());
