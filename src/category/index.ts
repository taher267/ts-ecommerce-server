import mg from "mongoose";
import { newCategoryProps } from "types";

const categorySchema = new mg.Schema({
  name: { type: String, required: true, minlength: 4, maxlength: 50 },
});

const Category = mg.model("Category", categorySchema);

export default Category;

export const getCategories = ({
  query = {},
  select = "",
  sort = "name",
  limit = 10,
  skip = 0,
}: {
  query?: Record<string, any>;
  select?: string;
  sort?: string;
  limit?: number;
  skip?: number;
}) =>
  Category.find(query).select(select).sort(sort).limit(limit).skip(skip).exec();

export const categoriesCount = (query: Record<string, any>) =>
  Category.countDocuments(query || {});
export const getCategory = (query: Record<string, any> = {}) =>
  Category.findOne(query);

export const addCategory = (query: newCategoryProps) =>
  new Category(query).save().then((data) => data.toObject());
