"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const size_1 = require("../../size");
const addItem = async (req, res, next) => {
    try {
        const { name } = req.body;
        const newObj = {
            name,
        };
        const item = await (0, size_1.addSize)(newObj);
        // const item = {
        //   name,
        // };
        res.json({ item, success: true });
    }
    catch (e) {
        next(e);
    }
};
exports.default = addItem;
