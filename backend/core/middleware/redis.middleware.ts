import { NextFunction, Request, RequestHandler, Response } from "express";
import { redisGet, redisSet } from "../redis";

export const checkRedisCache =
    (
        ttl = 900,
        getKey: (req: Request) => string = cacheKeyGenerator,
    ): RequestHandler =>
    async (req: Request, res: Response, next: NextFunction) => {
        const start = process.hrtime.bigint();
        if (req.method !== "GET" || req.originalUrl === "/user/me") {
            return next();
        }

        const cacheKey = getKey(req);
        const found = await redisGet(cacheKey);
        if (found) {
            try {
                const ms = Number(process.hrtime.bigint() - start) / 1e6;
                console.log(`[cache] ${ms.toFixed(2)}ms - found`);
                return res.json(JSON.parse(found));
            } catch {
                const ms = Number(process.hrtime.bigint() - start) / 1e6;
                console.log(`[cache] ${ms.toFixed(2)}ms - not found`);
                return next();
            }
        }

        const originalJson = res.json.bind(res);
        res.json = ((body) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                void redisSet(cacheKey, JSON.stringify(body), ttl);
            }
            return originalJson(body);
        }) as typeof res.json;

        next();
    };

export const cacheKeyGenerator = (req: Request): string => {
    const { method, originalUrl } = req;
    return `cache:${method}:${originalUrl}`;
};
