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

export const faceitController = {
    test: async (req: Request, res: Response) => {
        try {
            const test = await faceitFetchUtil.fetchData<any>(
                "/matches/1-3eda1154-09fd-4274-a40c-54f676c2632f/stats",
            );
            res.json(test);
        } catch (error: any) {
            logger.error("Error testing Faceit:", error);
            res.status(500).json({ error: "Failed to test Faceit" });
        }
    },

    importFaceitStage: async (req: Request, res: Response) => {
        try {
            const validation = ImportFaceitStageSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: validation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }

            const {
                tournamentId,
                championshipId,
                readFileName,
                writeFileName,
            } = validation.data;

            logger.info(
                `Importing Faceit stage for championship ${championshipId}`,
            );

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
                stage: stage,
            });
        } catch (error: any) {
            logger.error("Error importing Faceit stage:", error);
            res.status(500).json({
                error: "Failed to import Faceit stage",
                details: error.message,
            });
        }
    },

    importFaceitMatches: async (req: Request, res: Response) => {
        try {
            const validation = ImportFaceitMatchesSchema.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: validation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }

            const { stageId, championshipId, readFileName, writeFileName } =
                validation.data;

            logger.info(
                `Importing Faceit matches for championship ${championshipId} into stage ${stageId}`,
            );

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
        } catch (error: any) {
            logger.error("Error importing Faceit matches:", error);
            res.status(500).json({
                error: "Failed to import Faceit matches",
                details: error.message,
            });
        }
    },

    getFaceitPlayerTeams: async (req: Request, res: Response) => {
        try {
            const validation = VerifyFaceitPlayerTeamsSchema.safeParse(
                req.params,
            );
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: validation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }

            const { playerId } = validation.data;

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
            const validation = VerifyTeamPlayersSchema.safeParse(req.params);
            if (!validation.success) {
                return res.status(400).json({
                    error: "Validation failed",
                    details: validation.error.issues.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }

            const { teamId } = validation.data;

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
