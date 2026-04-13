import { Response, RequestHandler } from "express";
import { AuthRequest } from "../../core/middleware/auth.middleware";
import { userRepository } from "./user.repository";
import { playerRepository } from "../players/player.repository";
import { sendContract } from "../../core/sendContract";
import { UserWithRolesContract, UpdateUserRolesBodyContract } from "@repo/contracts";
import { parseOr400 } from "../../core/validation/parseOr400";
import { ROOT_USER_EMAIL } from "../../core/rootUser";
import { Role } from "@repo/types";
import { UserSearchQuerySchema, normalizeUserSearchQuery } from "./user.validation";

export const userController = {
    getMe: (async (req, res: Response) => {
        try {
            const authReq = req as AuthRequest;
            if (!authReq.user) {
                return res.json(null);
            }
            let playerInfo = authReq.playerInfo;
            if (!playerInfo?.faceit_id) {
                const faceitAccountId = await userRepository.findFaceitAccountIdByUserId(
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
                    playerInfo = await userRepository.userPlayerInfo(authReq.user.id);
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

    getStaffUsers: (async (_req, res: Response) => {
        const staffUsers = await userRepository.findAllStaff();
        sendContract(res, UserWithRolesContract.array(), staffUsers);
    }) as RequestHandler,

    searchUsers: (async (req, res: Response) => {
        const normalized = normalizeUserSearchQuery(req.query as Record<string, unknown>);
        const data = parseOr400(res, UserSearchQuerySchema, normalized);
        if (!data) {
            return;
        }
        const matches = await userRepository.searchUsersByQuery(data.q);
        sendContract(res, UserWithRolesContract.array(), matches);
    }) as RequestHandler,

    patchUserRoles: (async (req, res: Response) => {
        try {
            const userId = req.params.userId;
            if (!userId) {
                return res.status(400).json({ error: "Missing user id" });
            }

            const parsed = UpdateUserRolesBodyContract.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ error: "Invalid body" });
            }

            const target = await userRepository.findById(userId);
            if (!target) {
                return res.status(404).json({ error: "User not found" });
            }

            if (target.email === ROOT_USER_EMAIL) {
                return res.status(403).json({ error: "Cannot modify root user" });
            }

            await userRepository.replaceStaffRolesForUser(userId, parsed.data.roles as Role[]);

            const updated = await userRepository.findWithRolesById(userId);
            if (!updated) {
                return res.status(404).json({ error: "User not found" });
            }

            sendContract(res, UserWithRolesContract, updated);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }) as RequestHandler,
};
