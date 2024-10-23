"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_size_1 = require("../../product_size");
const addItem = async (req, res, next) => {
    try {
        const { size_id, product_id, stock } = req.body;
        const newObj = { size_id, product_id, stock };
        const product = await (0, product_size_1.addProductSize)(newObj);
        res.json({ product, success: true });
    }
    catch (e) {
        next(e);
    }
};
exports.default = addItem;
//# sourceMappingURL=addItem.js.map