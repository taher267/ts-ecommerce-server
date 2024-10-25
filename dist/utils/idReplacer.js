"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (items) => JSON.parse(JSON.stringify(items).replace(/"_id"/g, '"id"'));
