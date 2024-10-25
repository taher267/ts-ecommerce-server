"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const OpenApiValidator = __importStar(require("express-openapi-validator"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const compression_1 = __importDefault(require("compression"));
// const swaggerDoc = YAML.load("./src/swagger.yaml");
const swaggerDoc = yamljs_1.default.load(path_1.default.resolve("./swagger.yaml"));
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
    app.use(OpenApiValidator.middleware({
        apiSpec: path_1.default.resolve("./swagger.yaml"),
    }));
};
exports.default = applyMiddleware;
//   cors({ origin: "*" }),
//   express.json({ limit: "10mb" }),
//  ,
//   ,
//   cookieParser(),
//   ,
//   morgan("dev"),
