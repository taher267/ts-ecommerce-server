import z from "zod";
import { getSize } from "@/size";

const sizeAddSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    // .min(1, { message: "Name must be at least 3 characters!" })
    .max(50, { message: "Name must be 50 characters or less" })
    .trim()
    .refine(async (name) => !Boolean(await getSize({ name })), {
      message: "Name already exists!",
    }),
});
export default {
  sizeAddSchema,
};
