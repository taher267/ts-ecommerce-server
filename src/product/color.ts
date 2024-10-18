import mg from "mongoose";
import { newColorProps } from "types";

const colorSchema = new mg.Schema({
  name: { type: String, required: false },
  code: { type: String, required: true },
});

const Color = mg.model("Color", colorSchema);

export default Color;

export const getColors = (query: Record<string, any>) =>
  Color.find(query).exec();

export const addColor = (query: newColorProps) =>
  new Color(query).save().then((data) => data.toObject());
