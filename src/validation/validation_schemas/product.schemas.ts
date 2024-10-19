import z from "zod";
import { getProduct } from "@/product";

const productAddSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(10, { message: "Name must be at least 10 characters!" })
    .max(300, { message: "Name must be 300 characters or less" })
    .trim()
    .refine(async (name) => !Boolean(await getProduct({ name })), {
      message: "Name already exists!",
    }),
  slug: z
    .string({
      required_error: "Slug is required",
    })
    .min(10, { message: "Slug must be at least 10 characters!" })
    .max(300, { message: "Slug must be 300 characters or less" })
    .trim()
    .refine(
      async (slug) => {
        if (!slug) return true;
        return !Boolean(await getProduct({ slug }));
      },
      {
        message: "Slug already exists!",
      }
    )
    .optional(),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(10, { message: "Description must be at least 10 characters!" })
    .max(300, { message: "Description must be 300 characters or less" })
    .trim(),
  sku: z
    .string({
      required_error: "SKU is required",
    })
    .min(1, { message: "SKU must be at least 1 characters!" })
    .max(50, { message: "SKU must be 50 characters or less" })
    .trim(),
  model: z
    .string({
      required_error: "Model is required",
    })
    .min(1, { message: "Model must be at least 1 characters!" })
    .max(100, { message: "Model must be 100 characters or less" })
    .trim()
    .optional(),
  brand: z
    .string({
      required_error: "Brand is required",
    })
    .min(1, { message: "Brand must be at least 1 characters!" })
    .max(100, { message: "Brand must be 100 characters or less" })
    .trim()
    .optional(),
  price: z
    .number({
      required_error: "Price is required",
    })
    .min(1, { message: "Price must be at least 1 digits!" })
    .max(9999999999, { message: "Price must be 9999999999 digits or less" }),
  currency: z
    .string({
      required_error: "Currency is required",
    })
    .min(1, { message: "Currency must be at least 1 characters!" })
    .max(5, { message: "Currency must be 5 characters or less" })
    .trim()
    .optional(),
  images: z
    .array(
      z.object({
        url: z.string().url().trim(),
      })
    )
    .optional(),
});
export default {
  productAddSchema,
};
