"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../user");
const getAllItems = async (_req, res, next) => {
    try {
        const items = await (0, user_1.getUsers)();
        return res.status(200).json({ items, code: 200 }).end();
    }
    catch (e) {
        return next(e);
    }
};
exports.default = getAllItems;
//# sourceMappingURL=getAllItems.js.map