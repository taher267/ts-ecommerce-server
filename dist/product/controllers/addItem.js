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
const color_1 = require("../../color");
const product_color_1 = require("../../product_color");
const product_size_1 = require("../../product_size");
const product_tag_1 = require("../../product_tag");
const tag_1 = require("../../tag");
const size_1 = require("../../size");
const addItem = async (req, res, next) => {
    try {
        const { name, description, sku, model, brand, regular_price, sale_price, images, slug, currency = "$", features, categories = [], colors = [], tags = [], sizes = [], } = req.body;
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
            colors,
            tags,
            sizes,
        };
        const product_id = product._id;
        if (categories?.length) {
            await (0, product_category_1.addProductCategory)({
                product_id,
                category_ids: categories,
            });
            const get_categories = await (0, category_1.getCategories)({
                query: { _id: { $in: categories } },
            });
            data.categories = get_categories;
        }
        if (colors?.length) {
            await (0, product_color_1.addProductColor)({
                product_id,
                color_ids: colors,
            });
            const get_colors = await (0, color_1.getColors)({
                query: { _id: { $in: colors } },
            });
            data.colors = get_colors;
        }
        if (sizes?.length) {
            await (0, product_size_1.addProductSize)({
                product_id,
                size_ids: sizes,
            });
            const get_sizes = await (0, size_1.getSizes)({
                query: { _id: { $in: sizes } },
            });
            data.sizes = get_sizes;
        }
        if (tags?.length) {
            await (0, product_tag_1.addProductTag)({
                product_id,
                tag_ids: tags,
            });
            const get_tags = await (0, tag_1.getTags)({
                query: { _id: { $in: tags } },
            });
            data.tags = get_tags;
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
