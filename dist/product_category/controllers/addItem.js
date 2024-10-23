"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_category_1 = require("../../product_category");
const addItem = async (req, res, next) => {
    try {
        const { category_ids, product_id } = req.body;
        const newObj = {
            category_ids,
            product_id,
        };
        const product = await (0, product_category_1.addProductCategory)(newObj);
        res.json({ product, success: true });
    }
    catch (e) {
        next(e);
    }
};
exports.default = addItem;
