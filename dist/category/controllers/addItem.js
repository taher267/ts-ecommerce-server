"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../category");
const idReplacer_1 = __importDefault(require("../../utils/idReplacer"));
const addItem = async (req, res, next) => {
    try {
        const { name } = req.body;
        const newObj = {
            name,
        };
        const data = await (0, category_1.addCategory)(newObj);
        const item = (0, idReplacer_1.default)(data);
        res.json({
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
exports.default = addItem;
