import { Response } from "express";
import { z } from "zod";

export function sendContract(
    res: Response,
    contract: z.ZodTypeAny,
    data: unknown,
    status = 200,
) {
    const payload = contract.parse(data);
    return res.status(status).json(payload);
}
