import z from "zod";
import { getSize } from "@/size";
import { Request } from "express";

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
const sizeUpdateSchema = (req: Request) =>
  z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      // .min(1, { message: "Name must be at least 3 characters!" })
      .max(50, { message: "Name must be 50 characters or less" })
      .trim()
      .refine(
        async (name) => {
          const exist = await getSize({ name: new RegExp(name, "i") });
          if (!exist) return true;
          if (exist._id.toString() !== req?.params?.id) {
            return false;
          }
          return true;
        },
        {
          message: "Name already exists!",
        }
      ),
  });
export default {
  sizeAddSchema,
  sizeUpdateSchema,
};
