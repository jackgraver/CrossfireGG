import { Response } from "express";
import { z } from "zod";

/**
 * Validates data against a Zod schema.
 * If validation fails, it sends a 400 response and returns undefined.
 * If validation succeeds, it returns the parsed data with full typing.
 */
export function parseOr400<S extends z.ZodTypeAny>(
    res: Response,
    schema: S,
    data: unknown,
): z.infer<S> | undefined {
    const validation = schema.safeParse(data);

    if (!validation.success) {
        console.log(validation.error.issues);
        res.status(400).json({
            error: "Validation failed",
            details: validation.error.issues.map((err) => ({
                path: err.path.join("."),
                message: err.message,
            })),
        });
        return undefined;
    }

    return validation.data;
}
