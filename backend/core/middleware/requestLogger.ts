import { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const clientIp =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        req.ip ||
        "unknown";

    res.on("finish", () => {
        const duration = Date.now() - startTime;
        const durationMs = (duration / 1000).toFixed(4);
        const status = res.statusCode.toString();
        const method = req.method.padEnd(3);
        const route = req.originalUrl || req.url;

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const date = `${year}/${month}/${day}`;
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const time = `${hours}:${minutes}:${seconds}`;

        console.log(
            `[EXPRESS] ${date} - ${time} | ${status} | ${durationMs}ms | ${clientIp} | ${method} "${route}"`,
        );
    });

    next();
}
