import mg from "mongoose";
import { newCategoryProps } from "types";

const categorySchema = new mg.Schema({
  name: { type: String, required: true, minlength: 4, maxlength: 50 },
});

const Category = mg.model("Category", categorySchema);

export default Category;

export const getCategories = (query: Record<string, any>) =>
  Category.find(query);

export const getCategory = (query: Record<string, any> = {}) =>
  Category.findOne(query);

export const addCategory = (query: newCategoryProps) =>
  new Category(query).save().then((data) => data.toObject());
