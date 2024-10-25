"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const category_1 = require("../../category");
const categoryAddSchema = zod_1.default.object({
    name: zod_1.default
        .string({
        required_error: "Name is required",
    })
        // .min(1, { message: "Name must be at least 3 characters!" })
        .max(50, { message: "Name must be 50 characters or less" })
        .trim()
        .refine(async (name) => !Boolean(await (0, category_1.getCategory)({ name: new RegExp(name, "i") })), {
        message: "Name already exists!",
    }),
});
const categoryUpdateSchema = (req) => zod_1.default.object({
    name: zod_1.default
        .string({
        required_error: "Name is required",
    })
        // .min(1, { message: "Name must be at least 3 characters!" })
        .max(50, { message: "Name must be 50 characters or less" })
        .trim()
        .refine(async (name) => {
        const exist = await (0, category_1.getCategory)({ name: new RegExp(name, "i") });
        if (!exist)
            return true;
        if (exist._id.toString() !== req.params.id) {
            return false;
        }
        return true;
    }, {
        message: "Name already exists!",
    }),
});
exports.default = {
    categoryAddSchema,
    categoryUpdateSchema,
};
