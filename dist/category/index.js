"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategory = exports.addCategory = exports.updateCategory = exports.getCategory = exports.categoriesCount = exports.getCategories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, minlength: 4, maxlength: 50 },
});
const Category = mongoose_1.default.model("Category", categorySchema);
exports.default = Category;
const getCategories = ({ query = {}, select = "", sort = "name", limit = 10, skip = 0, }) => Category.find(query).select(select).sort(sort).limit(limit).skip(skip).exec();
exports.getCategories = getCategories;
const categoriesCount = (query) => Category.countDocuments(query || {});
exports.categoriesCount = categoriesCount;
const getCategory = (query = {}, select = "") => Category.findOne(query).select(select).exec();
exports.getCategory = getCategory;
const updateCategory = (query = {}, data) => Category.findOne(query, data).exec();
exports.updateCategory = updateCategory;
const addCategory = (data) => new Category(data).save().then((data) => data.toObject());
exports.addCategory = addCategory;
const removeCategory = (query = {}) => Category.deleteOne(query).exec();
exports.removeCategory = removeCategory;
