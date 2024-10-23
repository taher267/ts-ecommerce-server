"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const size_1 = require("../../size");
const getAllItems = async (req, res, next) => {
    try {
        // const { query } = req;
        const items = await (0, size_1.getSizes)({});
        res.status(200).json({ items, code: 200 });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getAllItems;
