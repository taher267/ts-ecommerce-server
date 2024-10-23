"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_category_1 = require("../../product_category");
const getAllItems = async (req, res, next) => {
    try {
        // const { query } = req;
        const products = await (0, product_category_1.getProductCategories)({});
        res.json({ products });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getAllItems;
