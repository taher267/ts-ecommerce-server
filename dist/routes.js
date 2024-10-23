"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const product_routes_1 = __importDefault(require("./product/product.routes"));
const category_routes_1 = __importDefault(require("./category/category.routes"));
const size_routes_1 = __importDefault(require("./size/size.routes"));
const color_routes_1 = __importDefault(require("./color/color.routes"));
const tag_routes_1 = __importDefault(require("./tag/tag.routes"));
const file_routes_1 = __importDefault(require("./file/file.routes"));
// import productCategoryRoute from "./product_category/product_category.routes";
// import productSizeRoute from "./product_size/product_size.routes";
// import productColorRoute from "./product_color/product_color.routes";
// import productTagRoute from "./product_tag/product_tag.routes";
const router = express_1.default.Router();
exports.default = () => {
    router.use("/users", user_routes_1.default);
    router.use("/auth", auth_routes_1.default);
    router.use("/products", product_routes_1.default);
    router.use("/categories", category_routes_1.default);
    router.use("/sizes", size_routes_1.default);
    router.use("/colors", color_routes_1.default);
    router.use("/tags", tag_routes_1.default);
    router.use("/files", file_routes_1.default);
    // router.use("/product-categories", productCategoryRoute);
    // router.use("/product-size", productSizeRoute);
    // router.use("/product-colors", productColorRoute);
    // router.use("/product-tags", productTagRoute);
    return router;
};
//# sourceMappingURL=routes.js.map