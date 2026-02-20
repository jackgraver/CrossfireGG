import { Response, RequestHandler } from "express";
import { AuthRequest } from "../../core/middleware/auth.middleware";
import { userRepository } from "./user.repository";
import { playerRepository } from "../players/player.repository";
import { sendContract } from "../../core/sendContract";
import { UserWithRolesContract } from "@repo/contracts";

export const userController = {
    getMe: (async (req, res: Response) => {
        try {
            const authReq = req as AuthRequest;
            if (!authReq.user) {
                return res.json(null);
            }
            let playerInfo = authReq.playerInfo;
            if (!playerInfo?.faceit_id) {
                const faceitAccountId =
                    await userRepository.findFaceitAccountIdByUserId(
                        authReq.user.id,
                    );
                if (faceitAccountId) {
                    await playerRepository.upsertPlayerByFaceitId({
                        faceit_id: faceitAccountId,
                        user_id: authReq.user.id,
                        player_name: authReq.user.name,
                        player_logo: null,
                        country: null,
                        base_role: "starter",
                    });
                    playerInfo = await userRepository.userPlayerInfo(
                        authReq.user.id,
                    );
                }
            }

            res.json({
                userId: authReq.user.id,
                name: authReq.user.name,
                image: authReq.user.image,
                faceitId: playerInfo?.faceit_id,
                teamId: playerInfo?.team_id,
                roles: authReq.roles ?? [],
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }) as RequestHandler,

    getAllUsers: (async (req, res: Response) => {
        const users = await userRepository.findAll();

        // res.json(users);
        sendContract(res, UserWithRolesContract.array(), users);
    }) as RequestHandler,
};
