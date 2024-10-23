"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("../../tag");
const getItem = async (req, res, next) => {
    try {
        // const {  } = req.body;
        const item = await (0, tag_1.getTag)({});
        res.json({ item, success: true });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getItem;
//# sourceMappingURL=getItem.js.map