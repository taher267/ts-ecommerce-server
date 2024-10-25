"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../category");
// import { newCategoryProps } from "../../types";
const error_1 = require("../../utils/error");
const updateItem = async (req, res, next) => {
    try {
        const { params: { id: _id }, } = req;
        const { deletedCount } = await (0, category_1.removeCategory)({ _id });
        if (!deletedCount) {
            throw (0, error_1.notFound)();
        }
        res.status(202).json({
            id: _id,
            success: true,
        });
    }
    catch (e) {
        next(e);
    }
};
exports.default = updateItem;
