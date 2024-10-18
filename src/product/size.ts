import mg from "mongoose";
import { newSizeProps } from "types";

const sizeSchema = new mg.Schema({
  name: { type: String, required: true },
});

const Size = mg.model("Size", sizeSchema);

export default Size;

export const getSizes = (query: Record<string, any>) => Size.find(query).exec();

export const addSize = (query: newSizeProps) =>
  new Size(query).save().then((data) => data.toObject());
