"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategory = exports.getCategory = exports.getCategories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, minlength: 4, maxlength: 50 },
});
const Category = mongoose_1.default.model("Category", categorySchema);
exports.default = Category;
const getCategories = ({ query = {}, select = "", sort = "name", limit = 10, skip = 0, }) => Category.find(query).select(select).sort(sort).limit(limit).skip(skip).exec();
exports.getCategories = getCategories;
const getCategory = (query = {}) => Category.findOne(query);
exports.getCategory = getCategory;
const addCategory = (query) => new Category(query).save().then((data) => data.toObject());
exports.addCategory = addCategory;
