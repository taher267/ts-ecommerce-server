"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDelete = exports.fileupload = void 0;
var cloudinary_upload_1 = require("../cloud-file-upload/cloudinary-upload/cloudinary-upload");
Object.defineProperty(exports, "fileupload", { enumerable: true, get: function () { return __importDefault(cloudinary_upload_1).default; } });
var cloudinary_delete_1 = require("../cloud-file-upload/cloudinary-upload/cloudinary-delete");
Object.defineProperty(exports, "fileDelete", { enumerable: true, get: function () { return __importDefault(cloudinary_delete_1).default; } });
