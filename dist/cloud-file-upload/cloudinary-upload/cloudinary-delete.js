"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = __importDefault(require("../../cloud-file-upload/cloudinary-upload/init"));
// Function to delete a file from Cloudinary using public_id
exports.default = async (publicId) => {
    return new Promise((resolve, reject) => {
        init_1.default.uploader.destroy(publicId, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
};
