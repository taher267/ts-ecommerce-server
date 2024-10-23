"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../category");
const addItem = async (req, res, next) => {
    try {
        const { name } = req.body;
        const newObj = {
            name,
        };
        const item = await (0, category_1.addCategory)(newObj);
        res.json({ item, success: true });
    }
    catch (e) {
        next(e);
    }
};
exports.default = addItem;
