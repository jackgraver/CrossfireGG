import { logger } from "../../core/logger";
import { playerRepository } from "../players/player.repository";
import { tournamentRepository } from "../tournaments/tournament.repository";
import {
    transformFaceitPlayer,
    transformFaceitTeam,
    transformFaceitMatch,
    transformFaceitMatchParticipants,
    transformFaceitMaps,
    extractGroupsFromMatches,
    extractAllPlayers,
    extractAllTeams,
    FaceitAPIMatch,
    FaceitAPIChampionship,
    transformFaceitTournament,
} from "../../utils/transformFaceitData";
import { type StageFormat } from "../../utils/roundFormatter";
import { teamRepository } from "../teams/team.repository";
import { matchRepository } from "../matches/match.repository";

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

/**
 * Calculate team records (wins/losses) up to a specific round
 * This is useful for Swiss format where we need to know team records for round labeling
 */
function calculateTeamRecordsUpToRound(
    matches: FaceitAPIMatch[],
    teamFaceitId: string,
    currentRound: number
): { wins: number; losses: number } {
    let wins = 0;
    let losses = 0;

    for (const match of matches) {
        // Only count matches before the current round
        if (!match.round || match.round >= currentRound) {
            continue;
        }

        // Skip if match doesn't involve this team
        const isFaction1 = match.teams.faction1?.faction_id === teamFaceitId;
        const isFaction2 = match.teams.faction2?.faction_id === teamFaceitId;

        if (!isFaction1 && !isFaction2) {
            continue;
        }

        // Check if match is finished
        if (match.status !== "FINISHED" || !match.results?.winner) {
            continue;
        }

        // Count win or loss
        const teamWon =
            (isFaction1 && match.results.winner === "faction1") ||
            (isFaction2 && match.results.winner === "faction2");

        if (teamWon) {
            wins++;
        } else {
            losses++;
        }
    }

    return { wins, losses };
}

export const faceitImportService = {
    /**
     * Import only the stage (championship) from Faceit data
     */
    importStage: async (
        championshipData: FaceitAPIChampionship,
        tournamentId: number
    ): Promise<any> => {
        const tournament = await tournamentRepository.findById(tournamentId);
        if (!tournament) {
            throw new Error(`Tournament with ID ${tournamentId} not found`);
        }

        logger.info(
            `Importing stage: ${championshipData.name} (${championshipData.id})`
        );

        const stageData = await transformFaceitTournament(
            championshipData,
            tournamentId
        );

        const stage = await tournamentRepository.upsertStageByFaceitId(
            stageData
        );
        logger.info(`Stage created/updated: ${stage.name} (id: ${stage.id})`);

        return stage;
    },

    /**
     * Import only matches into an existing stage
     * Fails if the stage does not exist
     */
    importMatches: async (
        matches: FaceitAPIMatch[],
        stageId: number
    ): Promise<ImportResult> => {
        const result: ImportResult = {
            success: false,
            stageId,
            counts: {
                players: 0,
                teams: 0,
                matches: 0,
                groups: 0,
            },
            errors: [],
        };

        try {
            if (matches.length === 0) {
                logger.info("No matches to import");
                return { ...result, success: true };
            }

            logger.info(
                `Starting import of ${matches.length} matches into stage ${stageId}`
            );

            const stage = await tournamentRepository.findStageById(stageId);
            if (!stage) {
                throw new Error(
                    `Stage with ID ${stageId} not found. Please import the stage first.`
                );
            }

            logger.info(`Importing matches into stage: ${stage.name}`);

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
                    let leaderPlayer = await playerRepository.findByFaceitId(
                        team.leader
                    );

                    if (!leaderPlayer) {
                        const leaderInRoster = team.roster.find(
                            (p) => p.player_id === team.leader
                        );
                        if (leaderInRoster) {
                            const playerData =
                                transformFaceitPlayer(leaderInRoster);
                            leaderPlayer =
                                await playerRepository.upsertPlayerByFaceitId(
                                    playerData
                                );
                            logger.info(
                                `Created missing leader player ${team.leader} for team ${team.name}`
                            );
                        } else {
                            logger.warn(
                                `Leader player ${team.leader} not found in roster for team ${team.name}`
                            );
                            result.errors.push(
                                `Team ${faceitId}: Leader player not found`
                            );
                            continue;
                        }
                    }

                    const teamData = transformFaceitTeam(team, leaderPlayer.id);
                    const dbTeam = await teamRepository.upsertTeamByFaceitId(
                        teamData
                    );

                    for (const player of team.roster) {
                        const dbPlayer = await playerRepository.findByFaceitId(
                            player.player_id
                        );
                        if (dbPlayer && dbPlayer.team_id !== dbTeam.id) {
                            await playerRepository.updatePlayerTeam(
                                dbPlayer.id,
                                dbTeam.id
                            );
                        }
                    }

                    await tournamentRepository.upsertStageTeam({
                        stage_id: stage.id,
                        team_id: dbTeam.id,
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
                        stage.id,
                        `Group ${groupNum}`
                    );
                    groupIdMap.set(groupNum, group.id);
                    result.counts.groups++;
                } catch (error) {
                    logger.error(`Error creating group ${groupNum}:`, error);
                    result.errors.push(`Group ${groupNum}: ${error}`);
                }
            }

            logger.info(`Processed ${result.counts.groups} groups`);

            const stageFormat = "unknown";

            // Track team records as we process matches
            const teamRecordsMap = new Map<
                string,
                { wins: number; losses: number }
            >();

            for (const match of matches.reverse()) {
                try {
                    await faceitImportService.importMatch(
                        match,
                        stage.id,
                        groupIdMap,
                        matches,
                        stageFormat,
                        teamRecordsMap
                    );
                    result.counts.matches++;
                } catch (error) {
                    logger.error(
                        `Error importing match ${match.match_id}:`,
                        error
                    );
                    result.errors.push(`Match ${match.match_id}: ${error}`);
                }
            }

            logger.info(`Processed ${result.counts.matches} matches`);

            result.success = true;
            return result;
        } catch (error) {
            logger.error("Error during import:", error);
            result.errors.push(`General error: ${error}`);
            throw error;
        }
    },

    /**
     * Import a single Faceit match
     */
    importMatch: async (
        faceitMatch: FaceitAPIMatch,
        stageId: number,
        groupIdMap: Map<number, number>,
        allMatches: FaceitAPIMatch[] = [],
        stageFormat: StageFormat = "unknown",
        teamRecordsMap?: Map<string, { wins: number; losses: number }>
    ): Promise<void> => {
        const groupId =
            faceitMatch.group !== undefined && faceitMatch.group !== null
                ? groupIdMap.get(faceitMatch.group) || null
                : null;

        // Get current team records from the map (for Swiss format round labeling)
        let teamRecords:
            | {
                faction1?: { wins: number; losses: number };
                faction2?: { wins: number; losses: number };
            }
            | undefined;

        if (
            stageFormat === "roundRobin" &&
            faceitMatch.round &&
            teamRecordsMap
        ) {
            const faction1Id = faceitMatch.teams.faction1?.faction_id;
            const faction2Id = faceitMatch.teams.faction2?.faction_id;

            if (faction1Id) {
                teamRecords = {
                    faction1: teamRecordsMap.get(faction1Id) || {
                        wins: 0,
                        losses: 0,
                    },
                };
            }
            if (faction2Id) {
                teamRecords = teamRecords || {};
                teamRecords.faction2 = teamRecordsMap.get(faction2Id) || {
                    wins: 0,
                    losses: 0,
                };
            }
        }

        const matchData = transformFaceitMatch(
            faceitMatch,
            stageId,
            groupId,
            stageFormat,
            teamRecords
        );
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
            faction1: team1.id,
            faction2: team2.id,
        };

        const participants = transformFaceitMatchParticipants(
            faceitMatch,
            dbMatch.id,
            teamMap
        );

        const participantMap: { faction1: number; faction2: number } = {
            faction1: 0,
            faction2: 0,
        };

        for (const participant of participants) {
            const dbParticipant = await matchRepository.upsertMatchParticipant(
                participant
            );
            if (participant.team_id === team1.id) {
                participantMap.faction1 = dbParticipant.id;
            } else {
                participantMap.faction2 = dbParticipant.id;
            }
        }

        const mapsData = transformFaceitMaps(
            faceitMatch,
            dbMatch.id,
            participantMap,
            matchData.round || undefined
        );

        for (const mapData of mapsData) {
            await matchRepository.upsertMap(mapData);
        }

        if (groupId) {
            await tournamentRepository.upsertStageTeam({
                stage_id: stageId,
                team_id: team1.id,
                group_id: groupId,
            });

            await tournamentRepository.upsertStageTeam({
                stage_id: stageId,
                team_id: team2.id,
                group_id: groupId,
            });
        }

        // Update wins/losses for both teams after match is imported (if match is finished)
        if (
            faceitMatch.status === "FINISHED" &&
            faceitMatch.results?.winner &&
            teamRecordsMap
        ) {
            const faction1Id = faceitMatch.teams.faction1?.faction_id;
            const faction2Id = faceitMatch.teams.faction2?.faction_id;

            if (faction1Id && faction2Id) {
                // Initialize records if they don't exist
                if (!teamRecordsMap.has(faction1Id)) {
                    teamRecordsMap.set(faction1Id, { wins: 0, losses: 0 });
                }
                if (!teamRecordsMap.has(faction2Id)) {
                    teamRecordsMap.set(faction2Id, { wins: 0, losses: 0 });
                }

                // Get current records
                const faction1Records = teamRecordsMap.get(faction1Id)!;
                const faction2Records = teamRecordsMap.get(faction2Id)!;

                // Update records based on match result
                if (faceitMatch.results.winner === "faction1") {
                    faction1Records.wins++;
                    faction2Records.losses++;
                } else if (faceitMatch.results.winner === "faction2") {
                    faction2Records.wins++;
                    faction1Records.losses++;
                }

                // Update stage_teams with the new records
                await tournamentRepository.upsertStageTeam({
                    stage_id: stageId,
                    team_id: team1.id,
                    group_id: groupId,
                    wins: faction1Records.wins,
                    losses: faction1Records.losses,
                });

                await tournamentRepository.upsertStageTeam({
                    stage_id: stageId,
                    team_id: team2.id,
                    group_id: groupId,
                    wins: faction2Records.wins,
                    losses: faction2Records.losses,
                });
            }
        }
    },
};
