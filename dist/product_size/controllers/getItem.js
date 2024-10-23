"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_size_1 = require("../../product_size");
const getItem = async (_req, res, next) => {
    try {
        const item = await (0, product_size_1.getProductSize)();
        res.json({ item, success: true });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getItem;
