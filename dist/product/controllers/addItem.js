"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../product");
const slugify_1 = __importDefault(require("slugify"));
const product_category_1 = require("../../product_category");
const category_1 = require("../../category");
const idReplacer_1 = __importDefault(require("../../utils/idReplacer"));
const addItem = async (req, res, next) => {
    try {
        const { name, description, sku, model, brand, regular_price, sale_price, images, slug, currency = "$", features, categories = [], } = req.body;
        const s = slug ?? `${(0, slugify_1.default)(name)}-${sku}`.toLowerCase();
        const newObj = {
            name,
            description,
            sku,
            model,
            brand,
            regular_price,
            sale_price,
            slug: s,
            images,
            currency,
            features,
        };
        const product = await (0, product_1.addProduct)(newObj);
        const data = {
            ...product,
            categories,
        };
        if (categories?.length) {
            await (0, product_category_1.addProductCategory)({
                product_id: product._id,
                category_ids: categories,
            });
            const get_categories = await (0, category_1.getCategories)({
                query: { _id: { $in: categories } },
            });
            data.categories = get_categories;
        }
        const item = (0, idReplacer_1.default)(data);
        res.status(201).json({
            item,
            links: {
                self: `/products/${item.id}`,
            },
            success: true,
        });
    }
    catch (e) {
        next(e);
    }
};
exports.default = addItem;
