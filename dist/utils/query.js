"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransformedItems = exports.getHATEOASForAllItems = exports.getPagination = void 0;
const defaults_1 = __importDefault(require("../config/defaults"));
const qs_1 = __importDefault(require("../utils/qs"));
const getPagination = ({ totalItems = defaults_1.default.totalItems, limit = defaults_1.default.limit, page = defaults_1.default.page, }) => {
    const totalPage = Math.ceil(totalItems / limit);
    const pagination = {
        page,
        limit,
        totalItems,
        totalPage,
    };
    if (page < totalPage) {
        pagination.next = page + 1;
    }
    if (page > 1) {
        pagination.prev = page - 1;
    }
    return pagination;
};
exports.getPagination = getPagination;
const getHATEOASForAllItems = ({ url = "/", path = "", query = {}, hasNext = false, hasPrev = false, page = 1, }) => {
    const links = {
        self: url,
    };
    if (hasNext) {
        const queryStr = (0, qs_1.default)({ ...query, page: page + 1 });
        links.next = `${path}?${queryStr}`;
    }
    if (hasPrev) {
        const queryStr = (0, qs_1.default)({ ...query, page: page - 1 });
        links.prev = `${path}?${queryStr}`;
    }
    return links;
};
exports.getHATEOASForAllItems = getHATEOASForAllItems;
const getTransformedItems = ({ items = [], selection = [], path = "/", }) => {
    if (!Array.isArray(items) || !Array.isArray(selection)) {
        throw new Error("Invalid selection");
    }
    if (selection.length === 0) {
        return items.map((item) => ({
            ...item,
            link: `${path}/${item.id}`,
        }));
    }
    return items.map((item) => {
        const result = {};
        selection.forEach((key) => {
            result[key] = item[key];
        });
        result.link = `${path}/${item.id || ""}`;
        return result;
    });
};
exports.getTransformedItems = getTransformedItems;
