"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../user");
const getItem = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ code: 400, message: `Invalid parameters!` });
        }
        const item = await (0, user_1.getUserByEmail)(email);
        if (!item) {
            return res
                .sendStatus(404)
                .json({ code: 404, message: `User doesn't exist` });
        }
        return res.status(200).json({ item, code: 200 });
    }
    catch (e) {
        return next(e);
    }
};
exports.default = getItem;
//# sourceMappingURL=getItem.js.map