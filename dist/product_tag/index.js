"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductTag = exports.getProductTag = exports.getProductTags = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productTagSchema = new mongoose_1.default.Schema({
    tag_id: { type: mongoose_1.default.Types.ObjectId, ref: "Tag" },
    product_id: { type: mongoose_1.default.Types.ObjectId, ref: "Product" },
    stock: { type: Number, default: 0 },
}, { collection: "productTags" });
const ProductTag = mongoose_1.default.model("ProductTag", productTagSchema);
exports.default = ProductTag;
const getProductTags = (query) => ProductTag.find(query);
exports.getProductTags = getProductTags;
const getProductTag = (query = {}, select = "") => ProductTag.findOne(query).select(select).exec();
exports.getProductTag = getProductTag;
const addProductTag = (query) => new ProductTag(query).save().then((data) => data.toObject());
exports.addProductTag = addProductTag;
//# sourceMappingURL=index.js.map