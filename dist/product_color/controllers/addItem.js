"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_color_1 = require("../../product_color");
const addItem = async (req, res, next) => {
    try {
        const { product_id, color_id } = req.body;
        const newObj = {
            product_id,
            color_id,
        };
        const item = await (0, product_color_1.addProductColor)(newObj);
        res.json({ item, success: true });
    }
    catch (e) {
        next(e);
    }
};
exports.default = addItem;
//# sourceMappingURL=addItem.js.map