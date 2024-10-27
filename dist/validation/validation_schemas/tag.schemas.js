"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const tag_1 = require("../../tag");
const tagAddSchema = zod_1.default.object({
    name: zod_1.default
        .string({
        required_error: "Name is required",
    })
        .min(3, { message: "Name must be at least 3 characters!" })
        .max(50, { message: "Name must be 50 characters or less" })
        .trim()
        .refine(async (name) => !Boolean(await (0, tag_1.getTag)({ name: new RegExp(name, "i") })), {
        message: "Name already exists!",
    }),
});
exports.default = {
    tagAddSchema,
};
