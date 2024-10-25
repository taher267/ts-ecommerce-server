"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../product");
const http_errors_1 = __importDefault(require("http-errors"));
const getItem = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const item = await (0, product_1.getProduct)({ slug });
        if (!item)
            throw (0, http_errors_1.default)(404, "Resource not found!");
        res.json({
            item,
            links: {
                self: `/products/${slug}`,
            },
            success: true,
        });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getItem;
