"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("../../color");
const getAllItems = async (req, res, next) => {
    try {
        // const { query } = req;
        const items = await (0, color_1.getColors)({});
        res.json({ items });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getAllItems;
//# sourceMappingURL=getAllItems.js.map