"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { DB_CONNECTION_URL, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
console.log({ DB_CONNECTION_URL, DB_USERNAME, DB_PASSWORD, DB_NAME });
let connectionURL = DB_CONNECTION_URL;
connectionURL = connectionURL.replace("<username>", DB_USERNAME);
connectionURL = connectionURL.replace("<password>", DB_PASSWORD);
const DB = async () => {
    mongoose_1.default.connection.on("error", (err) => {
        console.log(err);
        process.exit(1);
    });
    return mongoose_1.default.connect(connectionURL, { dbName: DB_NAME });
};
exports.default = DB;
