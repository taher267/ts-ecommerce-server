"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const size_1 = require("../../size");
// import { newCategoryProps } from "../../types";
const idReplacer_1 = __importDefault(require("../../utils/idReplacer"));
const error_1 = require("../../utils/error");
const updateItem = async (req, res, next) => {
    try {
        const { body: { name }, params: { id: _id }, } = req;
        const data = await (0, size_1.getSize)({ _id });
        if (!data) {
            throw (0, error_1.notFound)();
        }
        if (name) {
            data.name = name;
        }
        const updated = await data.save();
        const item = (0, idReplacer_1.default)(updated);
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
exports.default = updateItem;
