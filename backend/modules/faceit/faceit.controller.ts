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

export const faceitController = {
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
                `Importing Faceit stage for championship ${championshipId}`
            );

            const championshipData = await faceitFetchUtil.fetchStageData(
                championshipId,
                {
                    readFileName: readFileName,
                    writeFileName: writeFileName,
                }
            );

            const stage = await faceitImportService.importStage(
                championshipData,
                tournamentId
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
                `Importing Faceit matches for championship ${championshipId} into stage ${stageId}`
            );

            const matchesData = await faceitFetchUtil.fetchMatchesData(
                championshipId,
                {
                    readFileName: readFileName,
                    writeFileName: writeFileName,
                }
            );

            const result = await faceitImportService.importMatches(
                matchesData,
                stageId
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
                req.params
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

            console.log(`Verifying Faceit team ${playerId}`);
            const response =
                await faceitFetchUtil._callApi<FaceitPlayerTeamsResponse>(
                    `/players/${playerId}/teams`
                );

            const existingTeams = await teamRepository.findAll();

            const existingTeamIds = new Set(
                existingTeams.map(
                    (t) => t.faceit_id || t.faceit_id || t.ID?.toString()
                )
            );
            const inputTeams = Array.isArray(response.items)
                ? response.items
                : response.items
                ? [response.items]
                : [];

            res.json({
                success: true,
                message: "Faceit player teams verified successfully",
                teams: Array.isArray(inputTeams)
                    ? inputTeams
                          .map((team) => ({
                              team_id: team.team_id,
                              name: team.name,
                              avatar: team.avatar,
                              leader: team.leader,
                              exists: existingTeamIds.has(team.team_id),
                          }))
                          .sort((a, b) =>
                              a.exists === b.exists ? 0 : a.exists ? 1 : -1
                          )
                    : [],
            });
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
                await faceitFetchUtil._callApi<FaceitTeamPlayersResponse>(
                    `/teams/${teamId}`
                );
            console.log(players);

            res.json({
                success: true,
                message: "Faceit team players fetched successfully",
                players: players.members.map((member) => ({
                    user_id: member.user_id,
                    nickname: member.nickname,
                    avatar: member.avatar,
                })),
            });
        } catch (error: any) {
            logger.error("Error fetching Faceit team players:", error);
            res.status(500).json({
                error: "Failed to fetch Faceit team players",
                details: error.message,
            });
        }
    },
};

type FaceitPlayerTeamsResponse = {
    items: {
        team_id: string;
        name: string;
        avatar: string;
        leader: string;
    };
};

type FaceitTeamPlayersResponse = {
    name: string;
    team_id: string;
    members: {
        user_id: string;
        nickname: string;
        avatar: string;
    }[];
};
