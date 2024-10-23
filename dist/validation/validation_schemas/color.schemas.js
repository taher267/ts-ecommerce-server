"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const color_1 = require("../../color");
const colorAddSchema = zod_1.default.object({
    name: zod_1.default
        .string({
        required_error: "Name is required",
    })
        .min(3, { message: "Name must be at least 3 characters!" })
        .max(50, { message: "Name must be 50 characters or less" })
        .trim()
        .refine(async (name) => {
        if (!name)
            return true;
        return !Boolean(await (0, color_1.getColor)({ name: new RegExp(name, "i") }));
    }, {
        message: "Name already exists!",
    })
        .optional(),
    code: zod_1.default
        .string({
        required_error: "Code is required",
    })
        .min(4, { message: "Code must be at least 4 characters!" })
        .max(9, { message: "Code must be 9 characters or less" })
        .trim()
        .refine(async (code) => !Boolean(await (0, color_1.getColor)({ code: new RegExp(code, "i") })), {
        message: "Code already exists!",
    }),
});
exports.default = {
    colorAddSchema,
};
