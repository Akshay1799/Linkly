import rateLimit from "express-rate-limit";

const rateLimitHandler = (req, res) => {
  return res.status(429).json({
    message: "Too many requests, please try again later",
  });
};

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler
    }
)
export const authLimiter  = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler
    }
)
export const apiLimiter  = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler
})