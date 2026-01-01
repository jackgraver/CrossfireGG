import { db } from "../../config/database";
import { logger } from "../../core/logger";
import { playerRepository } from "../players/player.repository";
import { teamRepository } from "../teams/team.repository";
import { tournamentRepository } from "./tournament.repository";
import { matchRepository } from "../matches/match.repository";
import {
    transformFaceitPlayer,
    transformFaceitTeam,
    transformFaceitMatch,
    transformFaceitMatchParticipants,
    transformFaceitMaps,
    extractGroupsFromMatches,
    extractAllPlayers,
    extractAllTeams,
    FaceitMatch,
    FaceitMatchesResponse,
    FaceitTournament,
    transformFaceitTournament,
} from "../../utils/transformFaceitData";

interface ImportResult {
    success: boolean;
    stageId?: number;
    counts: {
        players: number;
        teams: number;
        matches: number;
        groups: number;
    };
    errors: string[];
}

export const faceitImportService = {
    /**
     * Import FaceIT tournament data (stage) into a tournament
     */
    importTournamentData: async (
        faceitTournament: FaceitTournament,
        tournamentId: number
    ): Promise<{ stageId: number }> => {
        logger.info(`Importing FaceIT tournament: ${faceitTournament.name}`);

        const stageData = transformFaceitTournament(faceitTournament, tournamentId);
        const stage = await tournamentRepository.upsertStageByFaceitId(stageData);

        logger.info(`Stage created/updated: ${stage.name} (ID: ${stage.ID})`);

        return { stageId: stage.ID };
    },

    /**
     * Import FaceIT matches data into the database
     */
    importMatchesData: async (
        matchesResponse: FaceitMatchesResponse,
        tournamentId: number
    ): Promise<ImportResult> => {
        const result: ImportResult = {
            success: false,
            counts: {
                players: 0,
                teams: 0,
                matches: 0,
                groups: 0,
            },
            errors: [],
        };

        try {
            const matches = matchesResponse.items;

            if (matches.length === 0) {
                logger.info("No matches to import");
                return { ...result, success: true };
            }

            logger.info(`Starting import of ${matches.length} matches`);

            const tournament = await tournamentRepository.findById(tournamentId);
            if (!tournament) {
                throw new Error(`Tournament with ID ${tournamentId} not found`);
            }

            const competitionId = matches[0].competition_id;
            const competitionName = matches[0].competition_name;

            let stage = await tournamentRepository.findStageByFaceitId(competitionId);
            if (!stage) {
                const stageData = {
                    tournament_id: tournamentId,
                    name: competitionName,
                    faceit_id: competitionId,
                    max_teams: 0,
                    start_date: null,
                    end_date: null,
                };
                stage = await tournamentRepository.upsertStageByFaceitId(stageData);
                logger.info(`Created stage: ${stage.name} (ID: ${stage.ID})`);
            }

            result.stageId = stage.ID;

            const uniquePlayers = extractAllPlayers(matches);
            logger.info(`Found ${uniquePlayers.size} unique players`);

            for (const [faceitId, player] of uniquePlayers) {
                try {
                    const playerData = transformFaceitPlayer(player);
                    await playerRepository.upsertPlayerByFaceitId(playerData);
                    result.counts.players++;
                } catch (error) {
                    logger.error(`Error upserting player ${faceitId}:`, error);
                    result.errors.push(`Player ${faceitId}: ${error}`);
                }
            }

            logger.info(`Processed ${result.counts.players} players`);

            const uniqueTeams = extractAllTeams(matches);
            logger.info(`Found ${uniqueTeams.size} unique teams`);

            for (const [faceitId, team] of uniqueTeams) {
                try {
                    let leaderPlayer = await playerRepository.findByFaceitId(team.leader);
                    
                    if (!leaderPlayer) {
                        const leaderInRoster = team.roster.find(p => p.player_id === team.leader);
                        if (leaderInRoster) {
                            const playerData = transformFaceitPlayer(leaderInRoster);
                            leaderPlayer = await playerRepository.upsertPlayerByFaceitId(playerData);
                            logger.info(`Created missing leader player ${team.leader} for team ${team.name}`);
                        } else {
                            logger.warn(`Leader player ${team.leader} not found in roster for team ${team.name}`);
                            result.errors.push(`Team ${faceitId}: Leader player not found`);
                            continue;
                        }
                    }

                    const region = matches.find(
                        (m) =>
                            m.teams.faction1.faction_id === faceitId ||
                            m.teams.faction2.faction_id === faceitId
                    )?.region;

                    const teamData = transformFaceitTeam(team, leaderPlayer.ID, region);
                    const dbTeam = await teamRepository.upsertTeamByFaceitId(teamData);

                    for (const player of team.roster) {
                        const dbPlayer = await playerRepository.findByFaceitId(player.player_id);
                        if (dbPlayer && dbPlayer.team_id !== dbTeam.ID) {
                            await playerRepository.updatePlayerTeam(dbPlayer.ID, dbTeam.ID);
                        }
                    }

                    await tournamentRepository.upsertStageTeam({
                        stage_id: stage.ID,
                        team_id: dbTeam.ID,
                        group_id: null,
                    });

                    result.counts.teams++;
                } catch (error) {
                    logger.error(`Error upserting team ${faceitId}:`, error);
                    result.errors.push(`Team ${faceitId}: ${error}`);
                }
            }

            logger.info(`Processed ${result.counts.teams} teams`);

            const groupNumbers = extractGroupsFromMatches(matches);
            const groupIdMap = new Map<number, number>();

            for (const groupNum of groupNumbers) {
                try {
                    const group = await tournamentRepository.upsertGroupByName(
                        stage.ID,
                        `Group ${groupNum}`
                    );
                    groupIdMap.set(groupNum, group.ID);
                    result.counts.groups++;
                } catch (error) {
                    logger.error(`Error creating group ${groupNum}:`, error);
                    result.errors.push(`Group ${groupNum}: ${error}`);
                }
            }

            logger.info(`Processed ${result.counts.groups} groups`);

            for (const match of matches) {
                try {
                    await faceitImportService.importMatch(match, stage.ID, groupIdMap);
                    result.counts.matches++;
                } catch (error) {
                    logger.error(`Error importing match ${match.match_id}:`, error);
                    result.errors.push(`Match ${match.match_id}: ${error}`);
                }
            }

            logger.info(`Processed ${result.counts.matches} matches`);

            result.success = true;
            return result;
        } catch (error) {
            logger.error("Error during import:", error);
            result.errors.push(`General error: ${error}`);
            return result;
        }
    },

    /**
     * Import a single FaceIT match
     */
    importMatch: async (
        faceitMatch: FaceitMatch,
        stageId: number,
        groupIdMap: Map<number, number>
    ): Promise<void> => {
        const groupId =
            faceitMatch.group !== undefined && faceitMatch.group !== null
                ? groupIdMap.get(faceitMatch.group) || null
                : null;

        const matchData = transformFaceitMatch(faceitMatch, stageId, groupId);
        const dbMatch = await matchRepository.upsertMatchByFaceitId(matchData);

        const team1 = await teamRepository.findTeamByFaceitId(
            faceitMatch.teams.faction1.faction_id
        );
        const team2 = await teamRepository.findTeamByFaceitId(
            faceitMatch.teams.faction2.faction_id
        );

        if (!team1 || !team2) {
            logger.warn(`Teams not found for match ${faceitMatch.match_id}`);
            return;
        }

        const teamMap = {
            faction1: team1.ID,
            faction2: team2.ID,
        };

        const participants = transformFaceitMatchParticipants(
            faceitMatch,
            dbMatch.ID,
            teamMap
        );

        const participantMap: { faction1: number; faction2: number } = {
            faction1: 0,
            faction2: 0,
        };

        for (const participant of participants) {
            const dbParticipant = await matchRepository.upsertMatchParticipant(participant);
            if (participant.team_id === team1.ID) {
                participantMap.faction1 = dbParticipant.ID;
            } else {
                participantMap.faction2 = dbParticipant.ID;
            }
        }

        const mapsData = transformFaceitMaps(faceitMatch, dbMatch.ID, participantMap);

        for (const mapData of mapsData) {
            await matchRepository.upsertMap(mapData);
        }

        if (groupId) {
            await tournamentRepository.upsertStageTeam({
                stage_id: stageId,
                team_id: team1.ID,
                group_id: groupId,
            });

            await tournamentRepository.upsertStageTeam({
                stage_id: stageId,
                team_id: team2.ID,
                group_id: groupId,
            });
        }
    },
};

