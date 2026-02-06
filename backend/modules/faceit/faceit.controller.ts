import { Request, Response } from "express";
import { logger } from "../../core/logger";
import {
    ImportFaceitMatchesSchema,
    ImportFaceitStageSchema,
    VerifyFaceitPlayerTeamsSchema,
    VerifyTeamPlayersSchema,
} from "./faceit.validation";
import { faceitImportService } from "./faceit.service";
import { faceitFetchUtil } from "../../utils/faceitFetch.util";
import { teamRepository } from "../teams/team.repository";
import {
    FaceitPlayerTeamsResponse,
    FaceitTeamPlayersResponse,
} from "./faceit.types";
import { playerRepository } from "../players/player.repository";
import { parseOr400 } from "../../core/validation/parseOr400";

export const faceitController = {
    testFaceitRoute: async (req: Request, res: Response) => {
        const route = req.body.route as string;
        const data = await faceitFetchUtil._callApi(route);
        res.json(data);
    },

    importFaceitStage: async (req: Request, res: Response) => {
        const data = parseOr400(res, ImportFaceitStageSchema, req.body);
        if (!data) return;

        const { tournamentId, championshipId, readFileName, writeFileName } =
            data;

        const championshipData = await faceitFetchUtil.fetchStageData(
            championshipId,
            {
                readFileName: readFileName,
                writeFileName: writeFileName,
            },
        );

        const stage = await faceitImportService.importStage(
            championshipData,
            tournamentId,
        );

        res.json({
            success: true,
            message: "Stage imported successfully",
            stageId: stage.id,
        });
    },

    importFaceitMatches: async (req: Request, res: Response) => {
        const data = parseOr400(res, ImportFaceitMatchesSchema, req.body);
        if (!data) return;

        const { stageId, championshipId, readFileName, writeFileName } = data;

        const matchesData = await faceitFetchUtil.fetchMatchesData(
            championshipId,
            {
                readFileName: readFileName,
                writeFileName: writeFileName,
            },
        );

        const result = await faceitImportService.importMatches(
            matchesData,
            stageId,
        );

        res.json({
            success: result.success,
            message: "Matches import completed",
            counts: result.counts,
            errors: result.errors.length > 0 ? result.errors : undefined,
        });
    },

    getFaceitPlayerTeams: async (req: Request, res: Response) => {
        try {
            const data = parseOr400(
                res,
                VerifyFaceitPlayerTeamsSchema,
                req.params,
            );
            if (!data) return;

            const { playerId } = data;

            const response =
                await faceitFetchUtil.fetchData<FaceitPlayerTeamsResponse>(
                    `/players/${playerId}/teams`,
                    {
                        readFileName: `player_teams_${playerId}.json`,
                        // writeFileName: `player_teams_${playerId}.json`,
                    },
                );

            const ledTeams = response.items.filter(
                (team) => team.leader === playerId,
            );

            if (ledTeams.length === 0) {
                res.status(200).json({ teams: [] });
                return;
            }

            const existingTeams = await teamRepository.findByFaceitIds(
                ledTeams.map((team) => team.team_id),
            );

            const existingTeamsByFaceitId = new Map(
                existingTeams.map((t) => [t.faceit_id!, t]),
            );

            const result = ledTeams.map((team) => ({
                team_id: team.team_id,
                name: team.name,
                avatar: team.avatar,
                leader: team.leader,
                isRegistered:
                    existingTeamsByFaceitId.get(team.team_id)?.id?.toString() ??
                    null,
            }));

            res.json({ teams: result });
        } catch (error: any) {
            logger.error("Error verifying Faceit team:", error);
            res.status(500).json({
                error: "Failed to verify Faceit team",
                details: error.message,
            });
        }
    },

    getTeamPlayers: async (req: Request, res: Response) => {
        try {
            const data = parseOr400(res, VerifyTeamPlayersSchema, req.params);
            if (!data) return;

            const { teamId } = data;

            const players =
                await faceitFetchUtil.fetchData<FaceitTeamPlayersResponse>(
                    `/teams/${teamId}`,
                    {
                        readFileName: `team_players_${teamId}.json`,
                        // writeFileName: `team_players_${teamId}.json`,
                    },
                );

            const existingPlayersByFaceitId =
                await playerRepository.findByFaceitIds(
                    players.members.map((member) => member.user_id),
                );

            if (existingPlayersByFaceitId.length === 0) {
                res.status(200).json({ players: [] });
                return;
            }

            const countryToString = (country: string) => {
                switch (country) {
                    case "us":
                        return "American";
                    case "ca":
                        return "Canadian";
                    default:
                        return country;
                }
            };

            const result = players.members.map((member) => ({
                user_id: member.user_id,
                nickname: member.nickname,
                avatar: member.avatar,
                nationality: countryToString(member.country),
            }));

            res.json({ players: result });
        } catch (error: any) {
            logger.error("Error fetching Faceit team players:", error);
            res.status(500).json({
                error: "Failed to fetch Faceit team players",
                details: error.message,
            });
        }
    },
};
