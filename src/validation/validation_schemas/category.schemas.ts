import z from "zod";
import { getCategory } from "@/category";

const categoryAddSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    // .min(1, { message: "Name must be at least 3 characters!" })
    .max(50, { message: "Name must be 50 characters or less" })
    .trim()
    .refine(async (name) => !Boolean(await getCategory({ name })), {
      message: "Name already exists!",
    }),
});
export default {
  categoryAddSchema,
};
