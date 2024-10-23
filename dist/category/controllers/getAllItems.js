"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../category");
const getAllItems = async (req, res, next) => {
    try {
        // const { query } = req;
        const items = await (0, category_1.getCategories)({});
        res.json({ items });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getAllItems;
