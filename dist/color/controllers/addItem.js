"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("../../color");
const addItem = async (req, res, next) => {
    try {
        const { name, code } = req.body;
        const newObj = {
            name,
            code,
        };
        const item = await (0, color_1.addColor)(newObj);
        res.json({ item, success: true });
    }
    catch (e) {
        next(e);
    }
};
exports.default = addItem;
