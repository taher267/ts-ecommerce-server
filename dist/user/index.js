"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updaeUserById = exports.deleteUserById = exports.createUser = exports.getUserById = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUser = exports.getUsers = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: false },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
const getUsers = (qry) => exports.User.find(qry || {});
exports.getUsers = getUsers;
const getUser = (qry) => exports.User.findOne(qry);
exports.getUser = getUser;
const getUserByEmail = (email) => exports.User.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = (sessionToken) => exports.User.findOne({ "authentication.sessionToken": sessionToken });
exports.getUserBySessionToken = getUserBySessionToken;
const getUserById = (id) => exports.User.findById(id);
exports.getUserById = getUserById;
const createUser = (values) => new exports.User(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteUserById = (id) => exports.User.findByIdAndDelete(id);
exports.deleteUserById = deleteUserById;
const updaeUserById = (id, values) => exports.User.findByIdAndUpdate(id, values);
exports.updaeUserById = updaeUserById;
//   https://www.youtube.com/watch?v=b8ZUb_Okxro&t=2s
