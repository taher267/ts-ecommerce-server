"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductColor = exports.getProductColor = exports.getProductColors = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productColorSchema = new mongoose_1.default.Schema({
    product_id: { type: mongoose_1.default.Types.ObjectId, ref: "Product" },
    color_id: { type: mongoose_1.default.Types.ObjectId, ref: "Color" },
}, { collection: "productColors" });
const ProductColor = mongoose_1.default.model("ProductColor", productColorSchema);
exports.default = ProductColor;
const getProductColors = (query) => ProductColor.find(query);
exports.getProductColors = getProductColors;
const getProductColor = (query = {}, select = "") => ProductColor.findOne(query).select(select).exec();
exports.getProductColor = getProductColor;
const addProductColor = (query) => new ProductColor(query).save().then((data) => data.toObject());
exports.addProductColor = addProductColor;
//# sourceMappingURL=index.js.map