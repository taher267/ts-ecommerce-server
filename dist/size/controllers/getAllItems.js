"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const size_1 = require("../../size");
const defaults_1 = __importDefault(require("../../config/defaults"));
const idReplacer_1 = __importDefault(require("../../utils/idReplacer"));
const query_1 = require("../../utils/query");
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
        // const items = await getSizes({});
        const skip = page * limit - limit;
        const items = await (0, size_1.getSizes)({
            query: filter,
            limit,
            skip,
            sort: sortStr,
        });
        if (!items?.length) {
            return res.status(200).json({ items });
        }
        const datas = (0, idReplacer_1.default)(items);
        const dataItems = (0, query_1.getTransformedItems)({
            items: datas,
            selection: ["id", "name"],
            path: "/sizes",
        });
        // pagination
        const totalItems = await (0, size_1.sizesCount)(filter);
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
        res.status(200).json({ items: dataItems, totalItems, pagination, links });
    }
    catch (e) {
        next(e);
    }
};
exports.default = getAllItems;
