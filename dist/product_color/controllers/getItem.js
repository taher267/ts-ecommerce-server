"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_color_1 = require("../../product_color");
const getItem = async (req, res, next) => {
    try {
        // const { name, description, prod_code, drive_id } = req.body;
        const product = await (0, product_color_1.getProductColor)();
        res.json({ product, success: true });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getItem;
//# sourceMappingURL=getItem.js.map