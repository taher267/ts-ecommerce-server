"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloud_file_upload_1 = require("../../cloud-file-upload");
exports.default = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await (0, cloud_file_upload_1.fileDelete)(id);
        res.status(201).json({ message: "message", item });
    }
    catch (e) {
        next(e);
    }
};
//# sourceMappingURL=removeImage.js.map