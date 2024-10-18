import mg from "mongoose";
import { newCategoryProps } from "types";

const categorySchema = new mg.Schema({
  name: { type: String, required: true },
});

const Category = mg.model("Category", categorySchema);

export default Category;

export const getCategorys = (query: Record<string, any>) =>
  Category.find(query).exec();

export const addCategory = (query: newCategoryProps) =>
  new Category(query).save().then((data) => data.toObject());
