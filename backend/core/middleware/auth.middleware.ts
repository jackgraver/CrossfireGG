import { Request, Response, NextFunction, RequestHandler } from "express";
import { auth } from "../../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { userRepository } from "../../modules/users/user.repository";
import { Role } from "@repo/types";
import { logger } from "../logger";

export interface AuthRequest extends Request {
    session?: any;
    user?: {
        id: string;
        name: string;
        email: string;
        image?: string | null;
    };
    playerInfo?: {
        user_id: string | null;
        team_id: number | null;
        faceit_id: string | null;
    } | null;
    roles?: Role[];
}

/**
 * Used for routes that should behave differently for anonymous vs logged-in users.
 *
 * Provides:
 * - `req.session`: Better Auth session (or `null` if missing/invalid)
 * - `req.user`: user row from DB (only when session user exists in DB)
 * - `req.roles`: roles loaded from DB for the user
 * - `req.playerInfo`: player/team linkage info (if available)
 *
 * Depends on:
 * - No prior middleware required. Other auth middlewares (e.g. `requireSession`, `requireRoles`)
 *   should run AFTER this to use the populated fields.
 */
export const fetchSession: RequestHandler = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        console.log("session null ? ", session === null);

        if (!session?.user.id) {
            (req as AuthRequest).session = null;
            return next();
        }

        const user = await userRepository.findById(session.user.id);
        if (!user) {
            (req as AuthRequest).session = null;
            console.log("no user");
            return next();
        }

        const authReq = req as AuthRequest;
        authReq.session = session;
        authReq.user = {
            id: user.id,
            name: user.name ?? session.user.name,
            email: user.email ?? session.user.email,
            image: user.image ?? null,
        };
        authReq.roles = await userRepository.getUserRoles(session.user.id);
        authReq.playerInfo = await userRepository.userPlayerInfo(
            session.user.id,
        );
        console.log("set", authReq.user);

        next();
    } catch (error: any) {
        logger.warn("Failed to fetch session, continuing as anonymous.", error);
        (req as AuthRequest).session = null;
        next();
    }
};

/**
 * Used for routes that require a logged-in user.
 *
 * Provides:
 * - Guarantees `req.session.user.id` exists for subsequent handlers.
 *
 * Depends on:
 * - `fetchSession` (or an equivalent middleware) running first to set `req.session`.
 */
export const requireSession: RequestHandler = (req, res, next) => {
    const authReq = req as AuthRequest;
    if (!authReq.session?.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};

/**
 * Used for routes that should always require login.
 *
 * Provides:
 * - `fetchSession` hydration + enforced authentication via `requireSession`.
 *
 * Depends on:
 * - No prior middleware required.
 */
export const authMiddleware = [fetchSession, requireSession];

/**
 * Used for routes that require specific role(s).
 *
 * Provides:
 * - Enforces authorization: user must have at least one of the required roles.
 *
 * Depends on:
 * - `fetchSession` (or equivalent) to populate `req.user` and `req.roles`.
 * - If you also want to explicitly enforce "must be logged in", add `requireSession`
 *   (or use `authMiddleware`) before this.
 */
export const requireRoles =
    (...requiredRoles: Role[]): RequestHandler =>
    (req, res, next) => {
        const authReq = req as AuthRequest;
        if (!authReq.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (requiredRoles.length === 0) {
            return next();
        }
        const roles = authReq.roles ?? [];
        const allowed = requiredRoles.some((r) => roles.includes(r));
        if (!allowed) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
