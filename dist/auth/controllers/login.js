"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../user");
const helpers_1 = require("../../helpers");
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const user = await (0, user_1.getUserByEmail)(email).select("+authentication.salt +authentication.password");
        if (!user || !user?.authentication?.salt) {
            return res
                .sendStatus(400)
                .json({ code: 400, message: `User doesn't exist!` });
        }
        const expectedHash = (0, helpers_1.authentication)(user.authentication.salt, password);
        if (expectedHash !== user.authentication.password) {
            return res.sendStatus(403);
        }
        const salt = (0, helpers_1.random)();
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie("TAHER-AUTH", user.authentication.sessionToken, {
            domain: "localhost",
            path: "/",
        });
        return res.status(200).json(user).end();
    }
    catch (e) {
        next(e);
    }
};
exports.default = login;
