import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

/**
 * Patterns that are commonly used by automated scanners to find vulnerabilities.
 * If a request matches any of these, it's almost certainly a bot.
 */
const BANNED_PATTERNS = [
    /\.env/i,
    /\.php$/i,
    /\.asp/i,
    /\.jsp/i,
    /wp-admin/i,
    /wordpress/i,
    /xmlrpc/i,
    /cgi-bin/i,
    /server-status/i,
    /\.git/i,
    /\.bak$/i,
    /\.sql$/i,
    /config/i,
    /admin/i,
    /backup/i,
];

/**
 * Middleware to block requests that look like automated vulnerability scans.
 * This helps reduce noise in logs and prevents bots from wasting server resources.
 */
export function scannerBlocker(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl || req.url;

    const isBot = BANNED_PATTERNS.some((pattern) => pattern.test(url));

    if (isBot) {
        const clientIp =
            (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
            req.socket.remoteAddress ||
            req.ip ||
            "unknown";

        logger.warn(`Blocked suspicious request from ${clientIp}: ${req.method} ${url}`);
        
        // Return 404 to avoid confirming the path exists or 403 to be explicit.
        // 404 is often better as it doesn't give the bot any information.
        res.status(404).end();
        return;
    }

    next();
}
