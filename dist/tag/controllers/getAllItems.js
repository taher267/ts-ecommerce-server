"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("../../tag");
const getAllItems = async (req, res, next) => {
    try {
        // const { query } = req;
        const items = await (0, tag_1.getTags)({});
        res.status(200).json({ items, code: 200 });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getAllItems;
//# sourceMappingURL=getAllItems.js.map