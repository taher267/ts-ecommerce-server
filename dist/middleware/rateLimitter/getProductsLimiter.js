"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const error_1 = require("../../utils/error");
const rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
    points: 1, // 1 attempt
    duration: 1, // 1 second
});
const getProductsLimitter = async (req, res, next) => {
    try {
        const ip = req.headers["x-forwarded-for"] || req.ip;
        const IP = ip;
        // const IP = ip === "::1" ? "104.18.27.48" : ip;
        await rateLimiter.consume(IP);
        next();
    }
    catch (rateLimiterRes) {
        if (rateLimiterRes instanceof rate_limiter_flexible_1.RateLimiterRes) {
            // Set headers for retry and rate limits
            res.set("Retry-After", String(rateLimiterRes.msBeforeNext / 1000));
            res.set("X-RateLimit-Limit", "1");
            res.set("X-RateLimit-Remaining", String(rateLimiterRes.remainingPoints));
            res.set("X-RateLimit-Reset", new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString());
            next((0, error_1.rateLimitError)());
        }
        else {
            next((0, error_1.serverError)());
        }
    }
};
exports.default = getProductsLimitter;
