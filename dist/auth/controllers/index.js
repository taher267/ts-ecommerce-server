"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
var login_1 = require("../../auth/controllers/login");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return __importDefault(login_1).default; } });
var register_1 = require("../../auth/controllers/register");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return __importDefault(register_1).default; } });
//# sourceMappingURL=index.js.map