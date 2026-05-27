import { Response } from "express";
import { z } from "zod";
import { logger } from "./logger";

/**
 * Validates `data` against a Zod contract and sends the parsed payload as JSON.
 * Use this for outbound responses so the API shape matches shared contracts.
 *
 * On validation failure, responds with HTTP 500 and a generic error body — Zod
 * messages and paths are not exposed to clients (they are logged server-side).
 */
export function sendContract(res: Response, contract: z.ZodTypeAny, data: unknown, status = 200) {
    const result = contract.safeParse(data);
    if (!result.success) {
        logger.error("Response contract validation failed:", result.error.issues);
        const isDev = process.env.NODE_ENV === "development";
        return res.status(500).json({
            error: "Internal server error",
            message: isDev ? "Response contract validation failed" : undefined,
            details: isDev ? result.error.issues : undefined,
        });
    }
    return res.status(status).json(result.data);
}
