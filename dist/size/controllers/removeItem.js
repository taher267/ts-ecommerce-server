"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const size_1 = require("../../size");
const http_errors_1 = __importDefault(require("http-errors"));
const removeItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { deletedCount } = await (0, size_1.deleteSize)({ _id: id });
        if (!deletedCount) {
            throw (0, http_errors_1.default)(404, "Product not found");
        }
        res.status(200).json({ item: { id }, success: true });
    }
    catch (e) {
        next(e);
    }
};
exports.default = removeItem;
