import { Request, Response, NextFunction } from "express";
import { z } from "zod";

interface ValidationSchemas {
    params?: z.ZodTypeAny;
    query?: z.ZodTypeAny;
    body?: z.ZodTypeAny;
}

export const validate = (schemas: ValidationSchemas) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schemas.params) {
                (req as any).params = schemas.params.parse(req.params);
            }
            if (schemas.query) {
                (req as any).query = schemas.query.parse(req.query);
            }
            if (schemas.body) {
                (req as any).body = schemas.body.parse(req.body);
            }
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: error.issues.map((issue) => ({
                        path: issue.path.join("."),
                        message: issue.message,
                    })),
                });
            }
            next(error);
        }
    };
};
