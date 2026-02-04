import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import { HttpError } from "../errors";
import { z } from "zod";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            error: err.message,
            details: err.details,
        });
    }

    if (err instanceof z.ZodError) {
        // This usually happens during response contract parsing if it's not caught in validation middleware
        // We treat it as a 500 because it means our service returned data that doesn't match our contract
        logger.error("Contract validation failed:", err.issues);
        return res.status(500).json({
            error: "Internal server error",
            message:
                process.env.NODE_ENV === "development"
                    ? "Response contract validation failed"
                    : undefined,
            details:
                process.env.NODE_ENV === "development" ? err.issues : undefined,
        });
    }

    logger.error("Unhandled error:", err);

    res.status(500).json({
        error: "Internal server error",
        message:
            process.env.NODE_ENV === "development" ? err.message : undefined,
    });
}
