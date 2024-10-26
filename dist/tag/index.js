"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTag = exports.tagsCount = exports.addTag = exports.getTag = exports.getTags = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TagSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
    },
});
const Tag = mongoose_1.default.model("Tag", TagSchema);
exports.default = Tag;
const getTags = (query) => Tag.find(query);
exports.getTags = getTags;
const getTag = (query = {}, select = "") => Tag.findOne(query).select(select).exec();
exports.getTag = getTag;
const addTag = (query) => new Tag(query).save().then((data) => data.toObject());
exports.addTag = addTag;
const tagsCount = (query) => Tag.countDocuments(query || {});
exports.tagsCount = tagsCount;
const deleteTag = (query = {}) => Tag.deleteOne(query).exec();
exports.deleteTag = deleteTag;
