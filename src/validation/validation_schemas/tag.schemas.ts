import z from "zod";
import { getTag } from "@/tag";

const tagAddSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, { message: "Name must be at least 3 characters!" })
    .max(50, { message: "Name must be 50 characters or less" })
    .trim()
    .refine(async (name) => !Boolean(await getTag({ name })), {
      message: "Name already exists!",
    }),
});
export default {
  tagAddSchema,
};
