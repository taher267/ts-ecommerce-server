"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./db"));
const PORT = process.env.PORT || 4001;
const server = http_1.default.createServer(app_1.default);
const main = async () => {
    try {
        await (0, db_1.default)();
        server.listen(PORT, async () => {
            console.log(`Express server is listening at http://localhost:${PORT}`);
        });
    }
    catch (e) {
        console.log("Database Error");
        console.log(e);
    }
};
main();
