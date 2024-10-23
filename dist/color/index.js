"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addColor = exports.getColor = exports.getColors = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const colorSchema = new mongoose_1.default.Schema({
    name: { type: String, required: false, minlength: 3, maxlength: 50 },
    code: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 9,
    },
});
const Color = mongoose_1.default.model("Color", colorSchema);
exports.default = Color;
const getColors = (query) => Color.find(query);
exports.getColors = getColors;
const getColor = (query = {}) => Color.findOne(query);
exports.getColor = getColor;
const addColor = (query) => new Color(query).save().then((data) => data.toObject());
exports.addColor = addColor;
//# sourceMappingURL=index.js.map