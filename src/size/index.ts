import mg from "mongoose";
import { newSizeProps } from "types";

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

export const getSizes = (query: Record<string, any>) => Size.find(query);
export const getSize = (query: Record<string, any> = {}, select = "") =>
  Size.findOne(query).select(select).exec();
export const addSize = (query: newSizeProps) =>
  new Size(query).save().then((data) => data.toObject());
