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
const product_1 = __importStar(require("../../product"));
const config_1 = require("../config");
const query_1 = require("../../utils/query");
const idReplacer_1 = __importDefault(require("../../utils/idReplacer"));
const getItems = async ({ page, limit, sortType, sortBy, search, searchBy, searchType, expands, }) => {
    const sortStr = sortType === "dsc" ? -1 : 1;
    // delete defaultFilter.observer;
    const filter = {};
    if (searchBy && search) {
        if (searchType === "pattern") {
            filter[searchBy] = { $regex: search, $options: "i" };
        }
        else if (searchType === "strict") {
            filter[searchBy] = search;
        }
    }
    // console.log(filter);
    const skip = page * limit - limit;
    const datas = await product_1.default.aggregate([
        { $match: filter },
        {
            $lookup: {
                from: "productCategories",
                localField: "_id",
                foreignField: "product_id",
                as: "productCategory",
            },
        },
        {
            $unwind: {
                path: "$productCategory",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "categories",
                localField: "productCategory.category_ids",
                foreignField: "_id",
                as: "categoryDetails",
            },
        },
        { $sort: { [sortBy]: sortStr } },
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                slug: { $first: "$slug" },
                description: { $first: "$description" },
                sku: { $first: "$sku" },
                regular_price: { $first: "$regular_price" },
                sale_price: { $first: "$sale_price" },
                currency: { $first: "$currency" },
                images: { $first: "$images" },
                categories: { $push: "$categoryDetails" },
            },
        },
        {
            $project: {
                id: "$_id",
                name: 1,
                slug: 1,
                description: 1,
                sku: 1,
                regular_price: 1,
                sale_price: 1,
                currency: 1,
                images: 1,
                categories: {
                    $reduce: {
                        input: "$categories",
                        initialValue: [],
                        in: { $concatArrays: ["$$value", "$$this"] },
                    },
                },
            },
        },
    ])
        .limit(limit)
        .skip(skip);
    return { items: datas, filter };
};
const getAllItems = async (req, res, next) => {
    try {
        const page = req.query.page || config_1.defaultQuery.page;
        const limit = req.query.limit || config_1.defaultQuery.limit;
        const sortType = req.query.sort_type || config_1.defaultQuery.sortType;
        const sortBy = req.query.sort_by || config_1.defaultQuery.sortBy;
        const search = req.query.search || config_1.defaultQuery.search;
        const searchBy = req.query.searchBy || "";
        const searchType = req.query.searchType || "";
        const expands = req.query.expands || config_1.defaultQuery?.search || "";
        const { path, url, query } = req;
        const { items: data, filter } = await getItems({
            page,
            limit,
            sortType,
            sortBy,
            search,
            searchBy,
            searchType,
            expands,
        });
        const request = { path, url, query };
        const totalItems = await (0, product_1.productsCount)(filter);
        const pagination = (0, query_1.getPagination)({
            totalItems,
            limit: Number(limit),
            page: Number(page),
        });
        // HATEOAS Links
        const links = (0, query_1.getHATEOASForAllItems)({
            url: request.url,
            path: request.path,
            query: request.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page: Number(page),
        });
        const items = (0, idReplacer_1.default)(data);
        res.json({ items, links, totalItems, pagination });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getAllItems;
