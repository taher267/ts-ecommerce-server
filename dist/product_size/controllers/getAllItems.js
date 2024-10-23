"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_size_1 = require("../../product_size");
const getAllItems = async (req, res, next) => {
    try {
        // const { query } = req;
        const items = await (0, product_size_1.getProductSizes)({});
        res.json({ items });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getAllItems;
