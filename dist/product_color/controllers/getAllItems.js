"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_color_1 = require("../../product_color");
const getAllItems = async (req, res, next) => {
    try {
        // const { query } = req;
        const items = await (0, product_color_1.getProductColors)({});
        res.json({ items });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getAllItems;
//# sourceMappingURL=getAllItems.js.map