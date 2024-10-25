import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";
import { rateLimitError, serverError } from "@/utils/error";

const rateLimiter = new RateLimiterMemory({
  points: 1, // 1 attempt
  duration: 1, // 1 second
});

const getProductsLimitter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ip = (req.headers["x-forwarded-for"] as string) || req.ip;
    const IP = ip;
    // const IP = ip === "::1" ? "104.18.27.48" : ip;
    await rateLimiter.consume(IP as string);
    next();
  } catch (rateLimiterRes) {
    if (rateLimiterRes instanceof RateLimiterRes) {
      // Set headers for retry and rate limits
      res.set("Retry-After", String(rateLimiterRes.msBeforeNext / 1000));
      res.set("X-RateLimit-Limit", "1");
      res.set("X-RateLimit-Remaining", String(rateLimiterRes.remainingPoints));
      res.set(
        "X-RateLimit-Reset",
        new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString()
      );
      next(rateLimitError());
    } else {
      next(serverError());
    }
  }
};

export default getProductsLimitter;
