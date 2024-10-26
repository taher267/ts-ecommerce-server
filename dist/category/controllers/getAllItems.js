"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../category");
const defaults_1 = __importDefault(require("../../config/defaults"));
const query_1 = require("../../utils/query");
const idReplacer_1 = __importDefault(require("../../utils/idReplacer"));
const getAllItems = async (req, res, next) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit) : defaults_1.default.limit;
        const page = req.query.page ? Number(req.query.page) : defaults_1.default.page;
        const sortType = req.query.sort_type || defaults_1.default.sortType;
        const sortBy = req.query.sort_by || defaults_1.default.sortBy;
        const search = req.query.search || defaults_1.default.search;
        const searchBy = (req.query.searchBy || "");
        const searchType = req.query.searchType || "";
        const { path, url, query } = req;
        const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
        const filter = {};
        if (searchBy && search) {
            if (searchType === "pattern") {
                filter[searchBy] = { $regex: search, $options: "i" };
            }
            else if (searchType === "strict") {
                filter[searchBy] = search;
            }
        }
        const skip = page * limit - limit;
        const items = await (0, category_1.getCategories)({
            query: filter,
            limit,
            skip,
            sort: sortStr,
        });
        if (!items?.length) {
            throw res.json({ items });
        }
        const datas = (0, idReplacer_1.default)(items);
        const dataItems = (0, query_1.getTransformedItems)({
            items: datas,
            selection: ["id", "name"],
            path: "/categories",
        });
        // pagination
        const totalItems = await (0, category_1.categoriesCount)(filter);
        const pagination = (0, query_1.getPagination)({ totalItems, limit, page });
        // HATEOAS Links
        const links = (0, query_1.getHATEOASForAllItems)({
            url,
            path,
            query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page,
        });
        res.json({ items: dataItems, totalItems, pagination, links });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getAllItems;
