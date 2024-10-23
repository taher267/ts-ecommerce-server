"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductCategory = exports.getProductCategory = exports.getProductCategories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productCategorySchema = new mongoose_1.default.Schema({
    category_ids: [
        { type: mongoose_1.default.Types.ObjectId, ref: "Category", required: true },
    ],
    product_id: { type: mongoose_1.default.Types.ObjectId, ref: "Product" },
}, { collection: "productCategories" });
const ProductCategory = mongoose_1.default.model("ProductCategory", productCategorySchema);
exports.default = ProductCategory;
const getProductCategories = (query) => ProductCategory.find(query);
exports.getProductCategories = getProductCategories;
const getProductCategory = (query = {}, select = "") => ProductCategory.findOne(query).select(select).exec();
exports.getProductCategory = getProductCategory;
const addProductCategory = (query) => new ProductCategory(query).save().then((data) => data.toObject());
exports.addProductCategory = addProductCategory;
