"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (getSchema) => async (req, _res, next) => {
    try {
        const schema = getSchema(req);
        await schema.parseAsync(req.body);
        return next();
    }
    catch (e) {
        return next(e);
    }
};
