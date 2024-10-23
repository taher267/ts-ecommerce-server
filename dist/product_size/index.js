"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductSize = exports.getProductSize = exports.getProductSizes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSizeSchema = new mongoose_1.default.Schema({
    size_id: { type: mongoose_1.default.Types.ObjectId, ref: "Size" },
    product_id: { type: mongoose_1.default.Types.ObjectId, ref: "Product" },
    stock: { type: Number, default: 0 },
}, { collection: "productSizes" });
const ProductSize = mongoose_1.default.model("ProductSize", productSizeSchema);
exports.default = ProductSize;
const getProductSizes = (query) => ProductSize.find(query);
exports.getProductSizes = getProductSizes;
const getProductSize = (query = {}, select = "") => ProductSize.findOne(query).select(select).exec();
exports.getProductSize = getProductSize;
const addProductSize = (query) => new ProductSize(query).save().then((data) => data.toObject());
exports.addProductSize = addProductSize;
//# sourceMappingURL=index.js.map