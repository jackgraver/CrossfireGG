import { Request, Response, NextFunction, RequestHandler } from "express";
import { auth } from "../../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { userRepository } from "../../modules/users/user.repository";

export interface AuthRequest extends Request {
    session?: any;
    user?: {
        id: string;
        name: string;
        email: string;
    };
    playerInfo?: {
        user_id: string | null;
        team_id: number | null;
        faceit_id: string | null;
    } | null;
    roles?: string[];
}

export const fetchSession: RequestHandler = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (!session?.user.id) {
            (req as AuthRequest).session = null;
            return next();
        }

        const user = await userRepository.findById(session.user.id);
        if (!user) {
            (req as AuthRequest).session = null;
            return next();
        }

        const authReq = req as AuthRequest;
        authReq.session = session;
        authReq.user = {
            id: user.id,
            name: user.name ?? session.user.name,
            email: user.email ?? session.user.email,
        };
        authReq.roles = await userRepository.getUserRoles(session.user.id);
        authReq.playerInfo = await userRepository.userPlayerInfo(
            session.user.id,
        );

        next();
    } catch (error: any) {
        // Even if session fetch fails, we might want to continue as anonymous
        // but log it for debugging
        (req as AuthRequest).session = null;
        next();
    }
};

export const requireSession: RequestHandler = (req, res, next) => {
    const authReq = req as AuthRequest;
    if (!authReq.session?.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};

export const authMiddleware = [fetchSession, requireSession];

export const requireRoles =
    (...requiredRoles: string[]): RequestHandler =>
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
