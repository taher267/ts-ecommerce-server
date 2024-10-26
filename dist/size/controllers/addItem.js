"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const size_1 = require("../../size");
const idReplacer_1 = __importDefault(require("../../utils/idReplacer"));
const addItem = async (req, res, next) => {
    try {
        const { name } = req.body;
        const newObj = {
            name,
        };
        const data = await (0, size_1.addSize)(newObj);
        const item = (0, idReplacer_1.default)(data);
        res.json({
            item,
            links: {
                self: `/sizes/${item.id}`,
            },
            // success: true,
        });
    }
    catch (e) {
        next(e);
    }
};
exports.default = addItem;
