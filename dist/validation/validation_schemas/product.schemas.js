"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const product_1 = require("../../product");
const productAddSchema = zod_1.default.object({
    name: zod_1.default
        .string({
        required_error: "Name is required",
    })
        .min(10, { message: "Name must be at least 10 characters!" })
        .max(300, { message: "Name must be 300 characters or less" })
        .trim(),
    slug: zod_1.default
        .string({
        required_error: "Slug is required",
    })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format")
        .min(10, { message: "Slug must be at least 10 characters!" })
        .max(300, { message: "Slug must be 300 characters or less" })
        .trim()
        .refine(async (slug) => {
        if (!slug)
            return true;
        return !Boolean(await (0, product_1.getProduct)({ slug }));
    }, {
        message: "Slug already exists!",
    })
        .optional(),
    description: zod_1.default
        .string({
        required_error: "Description is required",
    })
        .min(10, { message: "Description must be at least 10 characters!" })
        .max(2500, { message: "Description must be 2500 characters or less" })
        .trim(),
    features: zod_1.default.array(zod_1.default.string().trim()).optional(),
    sku: zod_1.default
        .string({
        required_error: "SKU is required",
    })
        .min(1, { message: "SKU must be at least 1 characters!" })
        .max(50, { message: "SKU must be 50 characters or less" })
        .trim()
        .refine(async (sku) => {
        if (!sku)
            return true;
        return !Boolean(await (0, product_1.getProduct)({ sku: new RegExp(sku, "i") }));
    }, {
        message: "SKU already exists!",
    }),
    model: zod_1.default
        .string({
        required_error: "Model is required",
    })
        .min(1, { message: "Model must be at least 1 characters!" })
        .max(100, { message: "Model must be 100 characters or less" })
        .trim()
        .optional(),
    brand: zod_1.default
        .string({
        required_error: "Brand is required",
    })
        .min(1, { message: "Brand must be at least 1 characters!" })
        .max(100, { message: "Brand must be 100 characters or less" })
        .trim()
        .optional(),
    regular_price: zod_1.default
        .number({
        required_error: "Price is required",
    })
        .min(1, { message: "Price must be at least 1 digits!" })
        .max(99999999, { message: "Price must be 99999999 digits or less" }),
    sale_price: zod_1.default
        .number({
        required_error: "Sale price is required",
    })
        .min(1, { message: "Sale price must be at least 1 digits!" })
        .max(99999999, { message: "Sale price must be 99999999 digits or less" })
        .optional(),
    categories: zod_1.default.array(zod_1.default.string().trim()).optional(),
    tags: zod_1.default.array(zod_1.default.string().trim()).optional(),
    sizes: zod_1.default.array(zod_1.default.string().trim()).optional(),
    colors: zod_1.default
        .array(zod_1.default.object({
        name: zod_1.default
            .string({
            required_error: "Name is required",
        })
            .optional(),
        code: zod_1.default.string({
            required_error: "Code is required",
        }),
    }))
        .optional(),
    currency: zod_1.default
        .string({
        required_error: "Currency is required",
    })
        .min(1, { message: "Currency must be at least 1 characters!" })
        .max(5, { message: "Currency must be 5 characters or less" })
        .trim()
        .optional(),
    images: zod_1.default
        .array(zod_1.default.object({
        url: zod_1.default.string().url().trim(),
    }))
        .optional(),
});
const productUpdateSchema = (req) => zod_1.default.object({
    name: zod_1.default
        .string({
        required_error: "Name is required",
    })
        // .min(1, { message: "Name must be at least 3 characters!" })
        .max(50, { message: "Name must be 50 characters or less" })
        .trim(),
    // .refine(
    //   async (name) => {
    //     const exist = await getCategory({ name: new RegExp(name, "i") });
    //     if (!exist) return true;
    //     if (exist._id.toString() !== req.params.id) {
    //       return false;
    //     }
    //     return true;
    //   },
    //   {
    //     message: "Name already exists!",
    //   }
    // ),
});
exports.default = {
    productAddSchema,
    productUpdateSchema,
};
