"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../category");
// import { newCategoryProps } from "../../types";
const idReplacer_1 = __importDefault(require("../../utils/idReplacer"));
const error_1 = require("../../utils/error");
const updateItem = async (req, res, next) => {
    try {
        const { body: { name }, params: { id: _id }, } = req;
        // const updateObj: newCategoryProps = {
        //   name,
        // };
        const data = await (0, category_1.getCategory)({ _id });
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
                self: `/categories/${item.id}`,
            },
            success: true,
        });
    }
    catch (e) {
        next(e);
    }
};
exports.default = updateItem;
