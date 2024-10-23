"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const zod_1 = __importDefault(require("zod"));
const morgan_1 = __importDefault(require("morgan"));
const PORT = process.env.PORT || 4001;
const app = (0, express_1.default)();
const middlewares = [
    (0, cors_1.default)({ origin: "*" }),
    express_1.default.json({ limit: "10mb" }),
    express_1.default.urlencoded({ extended: true }),
    (0, compression_1.default)(),
    (0, cookie_parser_1.default)(),
    (0, express_fileupload_1.default)(),
    (0, morgan_1.default)("dev"),
    // (
    //   req: express.Request,
    //   _res: express.Response,
    //   next: express.NextFunction
    // ) => {
    //   console.log(req.url);
    //   next();
    // },
];
app.use(middlewares);
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
app.use("/api/v1/github", (req, res) => {
    const str = `<a href="https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_AUTH_CALLBACK}?path=/&scope=user:email"
    >LOGIN WITH GITHUB</a>`;
    res.send(str);
});
const server = http_1.default.createServer(app);
mongoose_1.default.Promise;
mongoose_1.default.connect(process.env.MONGO_STR);
mongoose_1.default.connection.on("error", (err) => {
    console.log(err);
    process.exit(1);
});
mongoose_1.default.connection.on("connected", () => {
    server.listen(PORT, () => console.log(`Server on Running http://localhost:${PORT}`));
});
//# sourceMappingURL=index.js.map