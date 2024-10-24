"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const routes_1 = __importDefault(require("./routes"));
const middleware_1 = __importDefault(require("./middleware"));
const app = (0, express_1.default)();
(0, middleware_1.default)(app);
app.get("/health", (_req, res) => {
    res.status(200).json({ message: `Alhamdu lillah` });
});
app.use("/api/v1", (0, routes_1.default)());
app.use((_req, res) => {
    res.status(404).json({ message: `Not Found!` });
});
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    const status = err?.status || 500, message = err?.message || `Internal server error`;
    if (err instanceof zod_1.default.ZodError) {
        const errors = err.errors.map(({ path, message }) => {
            return { path: path[0], message };
        });
        return res.status(400).json({
            errorType: "validationError",
            message: "Validation failed",
            errors,
            code: 400,
        });
    }
    res.status(status).json({ message, code: status });
});
exports.default = app;
