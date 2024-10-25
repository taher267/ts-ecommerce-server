"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitError = exports.onlyError = exports.customError = exports.authorizationError = exports.authenticationError = exports.serverError = exports.badRequest = exports.notFound = void 0;
const notFound = (msg = "Resource not found") => {
    const error = new Error(msg);
    error.status = 404;
    return error;
};
exports.notFound = notFound;
const badRequest = (msg = "Bad Request") => {
    const error = new Error(msg);
    error.status = 400;
    return error;
};
exports.badRequest = badRequest;
const serverError = (msg = "Internal Server Error") => {
    const error = new Error(msg);
    error.status = 500;
    return error;
};
exports.serverError = serverError;
const authenticationError = (msg = "Authentication Failed") => {
    const error = new Error(msg);
    error.status = 401;
    return error;
};
exports.authenticationError = authenticationError;
const authorizationError = (msg = "Permission Denied") => {
    const error = new Error(msg);
    error.status = 403;
    return error;
};
exports.authorizationError = authorizationError;
const customError = ({ message = "Bad request", status = 400, errors, }) => {
    const error = new Error(message);
    error.status = status;
    error.errors = errors;
    return error;
};
exports.customError = customError;
const onlyError = ({ message = "Something Went Wrong" }) => {
    const error = new Error(message);
    // error.status = status;
    // error.errors = errors;
    return error;
};
exports.onlyError = onlyError;
const rateLimitError = (msg = "Too many requests, please try again later.") => {
    const error = new Error(msg);
    error.status = 429;
    return error;
};
exports.rateLimitError = rateLimitError;
