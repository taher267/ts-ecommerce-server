import mg from "mongoose";
import { newTagProps } from "types";

const TagSchema = new mg.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Tag = mg.model("Tag", TagSchema);

export default Tag;

export const getTags = (query: Record<string, any>) => Tag.find(query);
export const getTag = (query: Record<string, any> = {}, select = "") =>
  Tag.findOne(query).select(select).exec();
export const addTag = (query: newTagProps) =>
  new Tag(query).save().then((data) => data.toObject());
