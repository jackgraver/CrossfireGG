import { Request, Response, NextFunction } from "express";
import { jwtUtils } from "../../lib/jwt";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const apiKey = req.headers["x-api-key"];

    if (apiKey) {
        req.apiKey = apiKey as string;
    }

    const accessToken = req.cookies?.accessToken;

    if (accessToken) {
        try {
            const payload = jwtUtils.verifyAccessToken(accessToken);
            req.user = {
                userId: payload.userId,
                username: payload.username,
                teamId: payload.teamId,
            };
        } catch (error) {
            req.user = undefined;
        }
    }

    next();
}

declare global {
    namespace Express {
        interface Request {
            apiKey?: string;
            user?: {
                userId: number;
                username: string;
                teamId?: number;
            };
        }
    }
}
