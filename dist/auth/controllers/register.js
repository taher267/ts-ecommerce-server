"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../user");
const helpers_1 = require("../../helpers");
const register = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const existingUser = await (0, user_1.getUserByEmail)(email);
        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = (0, helpers_1.random)();
        const user = await (0, user_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
            },
        });
        return res.status(201).json(user).end();
    }
    catch (e) {
        return next(e);
    }
};
exports.default = register;
