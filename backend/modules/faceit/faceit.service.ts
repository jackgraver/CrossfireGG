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
    FaceitAPITeam,
    FaceitAPIMatchStats,
} from "../../utils/transformFaceitData";
import { type StageFormat } from "../../utils/roundFormatter";
import { teamRepository } from "../teams/team.repository";
import { matchRepository } from "../matches/match.repository";
import { MatchSchema } from "../teams/team.types";
import { MatchDTO, TeamDTO } from "@repo/contracts";
import { faceitFetchUtil } from "../../utils/faceitFetch.util";

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
    currentRound: number,
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
        tournamentId: number,
    ) => {
        const tournament = await tournamentRepository.findById(tournamentId);
        if (!tournament) {
            throw new Error(`Tournament with ID ${tournamentId} not found`);
        }

        const stageData = await transformFaceitTournament(
            championshipData,
            tournamentId,
        );

        const stage =
            await tournamentRepository.upsertStageByFaceitId(stageData);

        return stage;
    },

    /**
     * Import only matches into an existing stage
     * Fails if the stage does not exist
     */
    processNewStageMatches: async (
        matches: FaceitAPIMatch[],
        stageId: number,
    ): Promise<{ newMatchesCount: number }> => {
        if (matches.length === 0) {
            logger.info("No matches to import");
            return { newMatchesCount: 0 };
        }

        const stage = await tournamentRepository.findStageById(stageId);
        if (!stage) {
            throw new Error(
                `Stage with ID ${stageId} not found. Please import the stage first.`,
            );
        }

        //TODO use offset in faceit api call?
        const existingMatches = await matchRepository.findAllByStageId(stageId);
        logger.info(`Found ${existingMatches.length} existing matches`);
        const newMatches = matches.filter(
            (match) =>
                !existingMatches.some((m) => m.faceit_id === match.match_id),
        );
        logger.info(`Found ${newMatches.length} new matches`);

        let newMatchesCount = 0;

        for (const match of newMatches.reverse()) {
            try {
                const team1 = await teamRepository.findStageTeamByFaceitId(
                    match.teams.faction1.faction_id,
                    stageId,
                );
                const players1 = await playerRepository.findByFaceitIds(
                    match.teams.faction1.roster.map(
                        (player) => player.player_id,
                    ),
                );
                if (players1.length !== match.teams.faction1.roster.length) {
                    logger.warn(
                        `Players not found for team ${match.teams.faction1.faction_id}`,
                    );
                    continue;
                }
                const team2 = await teamRepository.findStageTeamByFaceitId(
                    match.teams.faction2.faction_id,
                    stageId,
                );
                const players2 = await playerRepository.findByFaceitIds(
                    match.teams.faction2.roster.map(
                        (player) => player.player_id,
                    ),
                );
                if (players2.length !== match.teams.faction2.roster.length) {
                    logger.warn(
                        `Players not found for team ${match.teams.faction2.faction_id}`,
                    );
                    continue;
                }

                const winnerFaction =
                    match.status === "FINISHED"
                        ? match.results?.winner
                        : undefined;
                const winnerId =
                    winnerFaction === "faction1"
                        ? team1?.team_id
                        : winnerFaction === "faction2"
                          ? team2?.team_id
                          : undefined;

                const createdMatch =
                    await faceitImportService.processStageMatch(
                        match,
                        {
                            id: team1?.team_id ?? 0,
                            games: (team1?.wins ?? 0) + (team1?.losses ?? 0),
                            winner:
                                winnerId !== undefined &&
                                winnerId === team1?.team_id,
                        },
                        {
                            id: team2?.team_id ?? 0,
                            games: (team2?.wins ?? 0) + (team2?.losses ?? 0),
                            winner:
                                winnerId !== undefined &&
                                winnerId === team2?.team_id,
                        },
                        stageId,
                    );

                if (createdMatch) newMatchesCount++;

                if (createdMatch && winnerId !== undefined) {
                    if (team1) {
                        const isTeam1Winner = winnerId === team1.team_id;
                        await teamRepository.incrementStageTeamRecord(
                            team1.team_id,
                            stageId,
                            isTeam1Winner ? 1 : 0,
                            isTeam1Winner ? 0 : 1,
                        );
                    }
                    if (team2) {
                        const isTeam2Winner = winnerId === team2.team_id;
                        await teamRepository.incrementStageTeamRecord(
                            team2.team_id,
                            stageId,
                            isTeam2Winner ? 1 : 0,
                            isTeam2Winner ? 0 : 1,
                        );
                    }
                }
            } catch (error) {
                logger.error(`Error importing match ${match.match_id}:`, error);
            }
        }

        return { newMatchesCount };
    },

    /**
     * Import a single Faceit match
     */
    processStageMatch: async (
        faceitMatch: FaceitAPIMatch,
        team1: { id: number; games: number; winner: boolean },
        team2: { id: number; games: number; winner: boolean },
        stageId: number,
    ): Promise<boolean> => {
        if (team1.winner && team2.winner) {
            return false;
        }

        let round = 1;
        if (
            faceitMatch.round &&
            faceitMatch.round > 1 &&
            team1.games === team2.games
        ) {
            round = team1.games + 1;
        }

        const createdMatch = await matchRepository.upsertMatchByFaceitId({
            group_id: faceitMatch.group ?? 1,
            stage_id: stageId,
            faceit_id: faceitMatch.match_id,
            match_number: null,
            round: round.toString(),
            status: faceitMatch.status,
            best_of: faceitMatch.best_of,
            stream_url: null,
            scheduled_at: faceitMatch.scheduled_at
                ? new Date(faceitMatch.scheduled_at * 1000)
                : null,
            faceit_url: faceitMatch.faceit_url,
        });

        matchRepository.upsertMatchParticipant({
            match_id: createdMatch.id,
            team_id: team1.id,
            position: 1,
            score: 0,
            winner: team1.winner,
        });

        matchRepository.upsertMatchParticipant({
            match_id: createdMatch.id,
            team_id: team2.id,
            position: 2,
            score: 0,
            winner: team2.winner,
        });

        try {
            const stats = await faceitFetchUtil.fetchData<FaceitAPIMatchStats>(
                `/matches/${faceitMatch.match_id}/stats`,
                {
                    readFileName: `match_stats/${faceitMatch.match_id}_stats.json`,
                    allow404: true,
                },
            );

            for (const round of stats.rounds) {
                const [score1, score2] = round.round_stats.Score.split(" / ");

                const map = await matchRepository.upsertMap({
                    match_id: createdMatch.id,
                    map_name: round.round_stats.Map,
                    map_order: 1,
                    round: "1",
                    team1_score: parseInt(score1),
                    team2_score: parseInt(score2),
                    winner_id: null,
                });

                for (const team of round.teams) {
                    for (const player of team.players) {
                        await playerRepository.upsertPlayerStats(
                            player.player_id,
                            createdMatch.id,
                            map.id,
                            {
                                kills: parseInt(player.player_stats.Kills),
                                deaths: parseInt(player.player_stats.Deaths),
                                assists: parseInt(player.player_stats.Assists),
                                adr: parseInt(player.player_stats.ADR),
                                damage: parseInt(player.player_stats.Damage),
                            },
                        );
                    }
                }
            }
        } catch (error) {
            logger.warn(
                `Failed to fetch stats for match ${faceitMatch.match_id}`,
                error,
            );
        }

        return true;
    },
};
