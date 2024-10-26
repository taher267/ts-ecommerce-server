"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSize = exports.sizesCount = exports.addSize = exports.getSize = exports.getSizes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sizeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 50,
    },
});
const Size = mongoose_1.default.model("Size", sizeSchema);
exports.default = Size;
const getSizes = ({ query = {}, select = "", sort = "name", limit = 10, skip = 0, }) => Size.find(query).select(select).sort(sort).limit(limit).skip(skip).exec();
exports.getSizes = getSizes;
const getSize = (query = {}, select = "") => Size.findOne(query).select(select).exec();
exports.getSize = getSize;
const addSize = (query) => new Size(query).save().then((data) => data.toObject());
exports.addSize = addSize;
const sizesCount = (query) => Size.countDocuments(query || {});
exports.sizesCount = sizesCount;
const deleteSize = (query = {}) => Size.deleteOne(query).exec();
exports.deleteSize = deleteSize;
