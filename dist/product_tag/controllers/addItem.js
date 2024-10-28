"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_tag_1 = require("../../product_tag");
const addItem = async (req, res, next) => {
    try {
        const { tag_ids, product_id } = req.body;
        const newObj = { tag_ids, product_id };
        const product = await (0, product_tag_1.addProductTag)(newObj);
        res.json({ product, success: true });
    }
    catch (e) {
        next(e);
    }
};
exports.default = addItem;
