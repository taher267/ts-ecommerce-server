import z from "zod";
import { getColor } from "@/color";

const colorAddSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, { message: "Name must be at least 3 characters!" })
    .max(50, { message: "Name must be 50 characters or less" })
    .trim()
    .refine(
      async (name) => {
        if (!name) return true;
        return !Boolean(await getColor({ name: new RegExp(name, "i") }));
      },
      {
        message: "Name already exists!",
      }
    )
    .optional(),

  code: z
    .string({
      required_error: "Code is required",
    })
    .min(4, { message: "Code must be at least 4 characters!" })
    .max(9, { message: "Code must be 9 characters or less" })
    .trim()
    .refine(
      async (code) => !Boolean(await getColor({ code: new RegExp(code, "i") })),
      {
        message: "Code already exists!",
      }
    ),
});
export default {
  colorAddSchema,
};
