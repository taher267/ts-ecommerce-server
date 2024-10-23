"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.deleteProduct = exports.getProduct = exports.getProducts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Image = {
    url: { type: String, required: true },
    // url: { type: mg.Types.ObjectId, ref: "Image", required: true },
    _id: false,
};
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        index: 1,
        minlength: 10,
        maxlength: 300,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: 1,
        minlength: 10,
        maxlength: 300,
    },
    description: {
        type: String,
        required: true,
        index: 1,
        minLength: 10,
        maxLength: 3000,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
        index: 1,
        minlength: 1,
        maxlength: 50,
    },
    model: { type: String, index: 1, minlength: 1, maxlength: 100 },
    brand: { type: String, index: 1, minlength: 1, maxlength: 100 },
    regular_price: { type: Number, required: true },
    sale_price: { type: Number },
    currenty: { type: String, required: true, default: "$" },
    features: [String],
    images: [Image],
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
const getProducts = (query) => Product.find(query);
exports.getProducts = getProducts;
const getProduct = (query = {}, select = "") => Product.findOne(query).select(select).exec();
exports.getProduct = getProduct;
const deleteProduct = (query = {}) => Product.deleteOne(query).exec();
exports.deleteProduct = deleteProduct;
const addProduct = (query) => new Product(query).save().then((data) => data.toObject());
exports.addProduct = addProduct;
