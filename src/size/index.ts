import mg from "mongoose";
import { newSizeProps } from "types";
interface SizesProps {
  query?: Record<string, any>;
  select?: string;
  sort?: string;
  limit?: number;
  skip?: number;
}
const sizeSchema = new mg.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 50,
  },
});

const Size = mg.model("Size", sizeSchema);

export default Size;

export const getSizes = ({
  query = {},
  select = "",
  sort = "name",
  limit = 10,
  skip = 0,
}: SizesProps) =>
  Size.find(query).select(select).sort(sort).limit(limit).skip(skip).exec();
export const getSize = (query: Record<string, any> = {}, select = "") =>
  Size.findOne(query).select(select).exec();
export const addSize = (query: newSizeProps) =>
  new Size(query).save().then((data) => data.toObject());
export const sizesCount = (query: Record<string, any>) =>
  Size.countDocuments(query || {});
