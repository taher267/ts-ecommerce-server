"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../category");
const idReplacer_1 = __importDefault(require("../../utils/idReplacer"));
const error_1 = require("../../utils/error");
const getItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await (0, category_1.getCategory)({ _id: id });
        if (!data) {
            throw (0, error_1.notFound)();
        }
        const item = (0, idReplacer_1.default)(data);
        res.status(200).json({
            item,
            links: {
                self: `/categories/${item.id}`,
            },
            success: true,
        });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getItem;
