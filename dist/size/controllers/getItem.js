"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const size_1 = require("../../size");
const getItem = async (req, res, next) => {
    try {
        // const {  } = req.body;
        const item = await (0, size_1.getSize)({});
        res.json({ item, success: true });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getItem;
//# sourceMappingURL=getItem.js.map