"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (validationSchema) => async (req, _res, next) => {
    try {
        // console.log(req.body);
        await validationSchema.parseAsync(req.body);
        return next();
    }
    catch (e) {
        return next(e);
    }
};
