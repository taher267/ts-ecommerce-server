"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const compression_1 = __importDefault(require("compression"));
const swaggerDoc = yamljs_1.default.load("./src/swagger.yaml");
// const swaggerDoc = YAML.load(path.resolve("./swagger.yaml"));
// const cookieParser from"cookie-parser";
// const authenticate from'./authenticate';
const cookieObj = (cookie = "") => cookie?.split?.(/; /g)?.reduce?.((a, c) => {
    const [k, v] = c.split("=");
    if (k && v)
        a[k.trim()] = v.trim();
    return a;
}, {});
const applyMiddleware = (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)({
    //   origin: [
    //     "http://localhost:4001",
    //     "http://localhost:4003",
    //     "http://localhost:3000",
    //     "https://pz-attendance.netlify.app",
    //     "https://at.abutaher.online",
    //   ],
    //   credentials: true,
    }));
    app.use((0, morgan_1.default)("dev"), (0, express_fileupload_1.default)(), (0, compression_1.default)());
    // app.use(cookieParser())
    app.use((req, res, next) => {
        const { cookie } = req.headers;
        if (cookie) {
            const cookies = cookieObj(decodeURIComponent(cookie));
            req.cookies = cookies;
        }
        return next();
    });
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc));
    //   app.use(
    //     OpenApiValidator.middleware({
    //       apiSpec:path.resolve("./swagger.yaml"),
    //     })
    //   );
};
exports.default = applyMiddleware;
//   cors({ origin: "*" }),
//   express.json({ limit: "10mb" }),
//  ,
//   ,
//   cookieParser(),
//   ,
//   morgan("dev"),
