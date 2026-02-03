import { Response, RequestHandler } from "express";
import { AuthRequest } from "../../core/middleware/auth.middleware";

export const userController = {
    getMe: (async (req, res: Response) => {
        try {
            const authReq = req as AuthRequest;
            if (!authReq.user) {
                return res.json(null);
            }

            res.json({
                userId: authReq.user.id,
                name: authReq.user.name,
                faceitId: authReq.playerInfo?.faceit_id,
                teamId: authReq.playerInfo?.team_id,
                roles: authReq.roles ?? [],
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }) as RequestHandler,
};
