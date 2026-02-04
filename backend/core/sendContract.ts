import { Response } from "express";
import { z } from "zod";

export function sendContract<T extends z.ZodTypeAny>(
    res: Response,
    contract: T,
    data: unknown,
    status = 200,
) {
    const payload = contract.parse(data);
    return res.status(status).json(payload);
}
