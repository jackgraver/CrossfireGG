import { Request, Response, NextFunction } from "express";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const apiKey = req.headers["x-api-key"];
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (apiKey) {
        req.apiKey = apiKey as string;
    }

    if (token) {
        req.userToken = token;
    }

    next();
}

declare global {
    namespace Express {
        interface Request {
            apiKey?: string;
            userToken?: string;
        }
    }
}

