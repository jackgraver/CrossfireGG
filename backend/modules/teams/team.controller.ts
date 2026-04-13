import { Request, Response } from "express";
import { teamService } from "./team.service";
import { logger } from "../../core/logger";
import { RegisterTeamSchema, TeamParamsSchema } from "./team.validation";
import { faceitFetchUtil } from "../../utils/faceitFetch.util";
import { FaceitTeamPlayersResponse } from "../faceit/faceit.types";
import { teamRepository } from "./team.repository";
import { playerRepository } from "../players/player.repository";
import {
    MatchWithParticipantsContract,
    PlayerContract,
    TeamContract,
    TeamMembersRosterContract,
    TeamWithTournamentContract,
} from "@repo/contracts";
import { parseOr400 } from "../../core/validation/parseOr400";
import { sendContract } from "../../core/sendContract";
import z from "zod";

export const teamController = {
    getTeamById: async (req: Request, res: Response) => {
        const data = parseOr400(res, TeamParamsSchema, req.params);
        if (!data) return;

        const teamDetails = await teamService.getTeamById(data.teamId);

        if (!teamDetails) {
            return res.status(404).json({ error: "Team not found" });
        }

        sendContract(res, TeamContract, teamDetails);
    },

    getTeamTournaments: async (req: Request, res: Response) => {
        const data = parseOr400(res, TeamParamsSchema, req.params);
        if (!data) return;

        const tournaments = await teamService.getTeamTournaments(data.teamId);

        sendContract(res, TeamWithTournamentContract, tournaments);
    },

    getTeamMembers: async (req: Request, res: Response) => {
        const data = parseOr400(res, TeamParamsSchema, req.params);
        if (!data) return;

        const roster = await teamService.getTeamMembersRoster(data.teamId);
        sendContract(res, TeamMembersRosterContract, roster);
    },

    getAllTeamMatches: async (req: Request, res: Response) => {
        const data = parseOr400(res, TeamParamsSchema, req.params);
        if (!data) return;

        const matches = await teamService.getTeamMatches(data.teamId);

        sendContract(res, z.array(MatchWithParticipantsContract), matches);
    },

    getTeamMatchesByStage: async (req: Request, res: Response) => {
        try {
            const teamId = parseInt(req.params.teamId);
            const stageId = parseInt(req.params.stageId);

            if (isNaN(teamId)) {
                return res.status(400).json({ error: "Invalid team ID" });
            }

            if (isNaN(stageId)) {
                return res.status(400).json({ error: "Invalid stage ID" });
            }

            const matches = await teamService.getTeamMatchesByStage(teamId, stageId);
            res.json(matches);
        } catch (error: any) {
            logger.error(
                `Error in getTeamMatchesByStage for team ID ${req.params.teamId} and stage ID ${req.params.stageId}:`,
                error,
            );
            res.status(500).json({ error: "Failed to fetch team matches" });
        }
    },

    getTeamPlayers: async (req: Request, res: Response) => {
        try {
            const teamId = parseInt(req.params.teamId);

            if (isNaN(teamId)) {
                return res.status(400).json({ error: "Invalid team ID" });
            }

            const players = await teamService.getTeamPlayers(teamId);

            const payload = PlayerContract.array().parse(players);

            res.json(payload);
        } catch (error: any) {
            logger.error(`Error in getTeamPlayers for team ID ${req.params.teamId}:`, error);
            res.status(500).json({ error: "Failed to fetch team players" });
        }
    },

    addPlayerToTeam: async (req: Request, res: Response) => {
        try {
            const teamId = parseInt(req.params.teamId);
            const playerId = parseInt(req.body.player_id);

            if (isNaN(teamId)) {
                return res.status(400).json({ error: "Invalid team ID" });
            }

            if (isNaN(playerId)) {
                return res.status(400).json({ error: "Invalid player ID" });
            }

            const player = await teamService.addPlayerToTeam(playerId, teamId);

            if (!player) {
                return res.status(404).json({ error: "Player not found" });
            }

            res.json(player);
        } catch (error: any) {
            logger.error(`Error in addPlayerToTeam for team ID ${req.params.teamId}:`, error);
            res.status(500).json({ error: "Failed to add player to team" });
        }
    },

    removePlayerFromTeam: async (req: Request, res: Response) => {
        try {
            const teamId = parseInt(req.params.teamId);
            const playerId = parseInt(req.params.playerId);

            if (isNaN(teamId)) {
                return res.status(400).json({ error: "Invalid team ID" });
            }

            if (isNaN(playerId)) {
                return res.status(400).json({ error: "Invalid player ID" });
            }

            const player = await teamService.removePlayerFromTeam(playerId);

            if (!player) {
                return res.status(404).json({ error: "Player not found" });
            }

            res.json(player);
        } catch (error: any) {
            logger.error(`Error in removePlayerFromTeam for team ID ${req.params.teamId}:`, error);
            res.status(500).json({
                error: "Failed to remove player from team",
            });
        }
    },

    registerTeam: async (req: Request, res: Response) => {
        try {
            const data = parseOr400(res, RegisterTeamSchema, req.body);
            if (!data) return;

            const { team, starters, subs, coach, agreements } = data;

            const teamInfoAndPlayers = await faceitFetchUtil.fetchData<FaceitTeamPlayersResponse>(
                `/teams/${team.teamId}`,
                {
                    readFileName: `me.json`,
                    // writeFileName: `team_players_${teamId}.json`,
                },
            );

            const norm = (s: string) => s.trim().toLowerCase();

            if (teamInfoAndPlayers.team_id !== team.teamId) {
                return res.status(400).json({
                    error: "Faceit team ID mismatch",
                });
            }

            if (norm(teamInfoAndPlayers.name) !== norm(team.name)) {
                return res.status(400).json({
                    error: "Team name does not match Faceit",
                });
            }

            if (teamInfoAndPlayers.avatar !== team.logo) {
                return res.status(400).json({
                    error: "Team logo does not match Faceit",
                });
            }

            if (teamInfoAndPlayers.leader !== team.captainFaceitId) {
                return res.status(400).json({
                    error: "Captain does not match Faceit team leader",
                });
            }

            const memberMap = new Map(teamInfoAndPlayers.members.map((m) => [m.user_id, m]));

            const requestedPlayers = [
                ...starters.map((p) => ({
                    ...p,
                    base_role: "starter" as const,
                })),
                ...subs.map((p) => ({ ...p, base_role: "sub" as const })),
                { ...coach, base_role: "coach" as const },
            ];

            const faceitIds = requestedPlayers.map((p) => p.faceitId);
            const uniqueIds = new Set(faceitIds);
            if (uniqueIds.size !== faceitIds.length) {
                return res.status(400).json({
                    error: "Duplicate player Faceit IDs found",
                });
            }

            const captainRequest = requestedPlayers.find(
                (p) => p.faceitId === team.captainFaceitId,
            );
            if (!captainRequest) {
                return res.status(400).json({
                    error: "Captain must be included in submitted players",
                });
            }

            for (const p of requestedPlayers) {
                const member = memberMap.get(p.faceitId);
                if (!member) {
                    return res.status(400).json({
                        error: `Player ${p.faceitId} is not a member of Faceit team ${team.teamId}`,
                    });
                }

                if (norm(member.nickname) !== norm(p.playerName)) {
                    return res.status(400).json({
                        error: `Player name mismatch for ${p.faceitId}`,
                    });
                }

                if (norm(member.country) !== norm(p.nationality)) {
                    return res.status(400).json({
                        error: `Player nationality mismatch for ${p.faceitId}`,
                    });
                }
            }

            const captainMember = memberMap.get(team.captainFaceitId);
            if (!captainMember) {
                return res.status(400).json({
                    error: "Captain not found in Faceit members list",
                });
            }

            const captainPlayer = await playerRepository.upsertPlayerByFaceitId({
                player_name: captainMember.nickname,
                faceit_id: captainMember.user_id,
                player_logo: captainMember.avatar,
                country: captainMember.country,
                base_role: captainRequest.base_role,
                hltv_id: captainRequest.hltvLink,
                discord_id: captainRequest.discordId,
            });

            const social_links =
                team.twitter && team.twitter.trim().length > 0
                    ? JSON.stringify({ twitter: team.twitter.trim() })
                    : null;

            const upsertedTeam = await teamRepository.upsertTeamByFaceitId({
                name: teamInfoAndPlayers.name,
                team_logo: teamInfoAndPlayers.avatar,
                faceit_id: teamInfoAndPlayers.team_id,
                team_captain_id: captainPlayer.id,
                social_links,
            });

            const createdPlayers = await Promise.all(
                requestedPlayers.map((p) => {
                    const member = memberMap.get(p.faceitId)!;
                    return playerRepository.upsertPlayerByFaceitId({
                        player_name: member.nickname,
                        faceit_id: member.user_id,
                        player_logo: member.avatar,
                        country: member.country,
                        team_id: upsertedTeam.id,
                        base_role: p.base_role,
                        hltv_id: p.hltvLink,
                        discord_id: p.discordId,
                    });
                }),
            );

            res.json({
                success: true,
                message: "Team registered successfully",
                team: {
                    teamId: upsertedTeam.id,
                    faceitTeamId: upsertedTeam.faceit_id,
                    players: createdPlayers.length,
                },
            });
        } catch (error: any) {
            logger.error("Error registering team:", error);
            res.status(500).json({
                error: "Failed to register team",
                details: error.message,
            });
        }
    },
};
