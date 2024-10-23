"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("../../tag");
const addItem = async (req, res, next) => {
    try {
        const { name } = req.body;
        const newObj = {
            name,
        };
        const item = await (0, tag_1.addTag)(newObj);
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
