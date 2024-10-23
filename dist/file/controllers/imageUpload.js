"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloud_file_upload_1 = require("../../cloud-file-upload");
const mongodb_1 = require("mongodb");
exports.default = async (req, res, next) => {
    try {
        const image = req.files?.image;
        const { data } = image;
        const public_id = new mongodb_1.ObjectId().toString();
        const item = await (0, cloud_file_upload_1.fileupload)(data, {
            folder: "e-com/products",
            public_id,
        });
        res.status(201).json({ message: "message", item });
    }
    catch (e) {
        next(e);
    }
};
//# sourceMappingURL=imageUpload.js.map