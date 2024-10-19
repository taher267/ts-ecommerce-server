import mg from "mongoose";
import { newColorProps } from "types";

const colorSchema = new mg.Schema({
  name: { type: String, required: false, minlength: 3, maxlength: 50 },
  code: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 9,
  },
});

const Color = mg.model("Color", colorSchema);

export default Color;

export const getColors = (query: Record<string, any>) => Color.find(query);
export const getColor = (query: Record<string, any> = {}) =>
  Color.findOne(query);

export const addColor = (query: newColorProps) =>
  new Color(query).save().then((data) => data.toObject());
