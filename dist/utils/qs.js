"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateQueryString = (query) => {
    return Object.keys(query)
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(query[key]))
        .join("&");
};
exports.default = generateQueryString;
