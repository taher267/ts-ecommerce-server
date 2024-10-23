"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = __importDefault(require("../../cloud-file-upload/cloudinary-upload/init"));
exports.default = async (fileBuffer, options = {}) => {
    return new Promise((resolve, reject) => {
        init_1.default.uploader
            .upload_stream(options, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        })
            .end(fileBuffer); // Send buffer to the stream
    });
};
//# sourceMappingURL=cloudinary-upload.js.map