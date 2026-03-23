import { logger } from "../../core/logger";
import { playerRepository } from "../players/player.repository";
import { tournamentRepository } from "../tournaments/tournament.repository";
import {
    FaceitAPIMatch,
    FaceitAPIChampionship,
    transformFaceitTournament,
    FaceitAPIMatchStats,
    transformFaceitMatch,
    transformFaceitMatchParticipants,
    transformFaceitMaps,
    FaceitAPITournamentTeam,
    extractGroupsFromMatches,
} from "../../utils/transformFaceitData";
import { teamRepository } from "../teams/team.repository";
import type { StageTeamFaceitLookup } from "../teams/team.types";
import { matchRepository } from "../matches/match.repository";
import { faceitFetchUtil } from "../../utils/faceitFetch.util";
import {
    mapFaceitFormatType,
    type StageFormat,
} from "../../utils/roundFormatter";
import { stagesRepository } from "../tournaments/stages/stages.repository";
import {
    computeRoundsFromFinal,
    formatLoserPlacementSingleElim,
    isThirdPlaceSingleElim,
} from "../teams/team.utils";

function extractUniqueTeamIds(matches: FaceitAPIMatch[]): string[] {
    const ids = new Set<string>();
    for (const m of matches) {
        ids.add(m.teams.faction1.faction_id);
        ids.add(m.teams.faction2.faction_id);
    }
    return [...ids];
}

function buildAvatarMap(matches: FaceitAPIMatch[]): Map<string, string> {
    const map = new Map<string, string>();
    for (const m of matches) {
        map.set(m.teams.faction1.faction_id, m.teams.faction1.avatar);
        map.set(m.teams.faction2.faction_id, m.teams.faction2.avatar);
    }
    return map;
}

/**
 * Stage team rows captured before W/L increments, keyed by Faceit `match_id`,
 * so {@link faceitImportService.applyTournamentPlacementsForMatches} can use pre-match loss counts.
 */
type StageTeamsStandingsSnapshot = {
    stageTeam1: NonNullable<
        Awaited<ReturnType<typeof teamRepository.findStageTeamByFaceitId>>
    >;
    stageTeam2: NonNullable<
        Awaited<ReturnType<typeof teamRepository.findStageTeamByFaceitId>>
    >;
};

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
     * End-to-end Faceit sync for a stage: fetch candidate matches, validate teams, sync avatars,
     * upsert groups/matches/participants, then maps, stats API data, stage W/L, and elimination placements.
     *
     * @param stageId - Database stage id
     * @param stageFaceitId - Faceit championship id used to list matches from the API
     */
    processMatchesSteps: async (stageId: number, stageFaceitId: string) => {
        const matches = await faceitImportService.fetchMatchesToProcess(
            stageId,
            stageFaceitId,
        );
        const { validMatches, stageTeamsByFaceitId } =
            await faceitImportService.checkStageTeams(stageId, matches);
        await faceitImportService.syncTeamAvatars(validMatches);
        if (validMatches.length === 0) {
            return;
        }
        const groupMapping = await faceitImportService.createStageGroups(
            stageId,
            validMatches,
        );
        const stage = await tournamentRepository.findStageById(stageId);
        const totalTeams = await teamRepository.countStageTeams(stageId);
        const stageFormatRow =
            stage?.format_id != null
                ? ((await stagesRepository.findStageFormatById(
                      stage.format_id,
                  )) ?? null)
                : null;
        const matchContext = {
            stageFormat: stageFormatRow
                ? mapFaceitFormatType(stageFormatRow.name)
                : "unknown",
            totalTeams,
        };
        const faceitMatchIdToDbId =
            await faceitImportService.createStageMatches(
                stageId,
                validMatches,
                groupMapping,
                matchContext,
                stageTeamsByFaceitId,
            );
        await faceitImportService.createMatchParticipants(
            validMatches,
            faceitMatchIdToDbId,
            stageTeamsByFaceitId,
        );
        await faceitImportService.createMapsForMatches(
            validMatches,
            faceitMatchIdToDbId,
        );
        await faceitImportService.fetchMatchStatsForMatches(
            validMatches,
            faceitMatchIdToDbId,
        );
        const standingsSnapshots =
            await faceitImportService.updateTeamRecordsForMatches(
                validMatches,
                stageId,
            );
        await faceitImportService.applyTournamentPlacementsForMatches(
            validMatches,
            stageId,
            stageFormatRow,
            totalTeams,
            standingsSnapshots,
        );

        return { newMatchesCount: validMatches.length };
    },

    /**
     * Loads all Faceit matches for the championship and keeps only those that need processing:
     * new matches, or existing non-finished matches whose status changed vs the database.
     *
     * @param stageId - Database stage id (used to load existing `matches` rows)
     * @param stageFaceitId - Faceit championship id passed to the matches API
     * @returns Faceit match payloads to import or refresh
     */
    fetchMatchesToProcess: async (stageId: number, stageFaceitId: string) => {
        const matches = await faceitFetchUtil.fetchMatchesData(stageFaceitId);

        const existingMatches = await matchRepository.findAllByStageId(stageId);
        const existingMatchesByFaceitId = new Map(
            existingMatches.map((m) => [m.faceit_id, m]),
        );

        const newMatches = matches.filter((match) => {
            const existingMatch = existingMatchesByFaceitId.get(match.match_id);

            if (!existingMatch) {
                return true;
            }

            if (existingMatch.status === "finished") {
                return false;
            }

            return existingMatch.status !== match.status.toLowerCase();
        });

        return newMatches;
    },

    /**
     * Filters matches to those where both factions have a non-deleted `stage_teams` row for this stage.
     * Builds a Faceit id → stage-team lookup (including wins/losses and logos) for downstream steps.
     *
     * @param stageId - Database stage id
     * @param matches - Candidate Faceit matches
     * @returns `validMatches` (subset with both teams), `validIds` (Faceit team ids present on stage), and `stageTeamsByFaceitId`
     */
    async checkStageTeams(
        stageId: number,
        matches: FaceitAPIMatch[],
    ): Promise<{
        validMatches: FaceitAPIMatch[];
        validIds: Set<string>;
        stageTeamsByFaceitId: Map<string, StageTeamFaceitLookup>;
    }> {
        if (matches.length === 0) {
            return {
                validMatches: [],
                validIds: new Set(),
                stageTeamsByFaceitId: new Map(),
            };
        }
        const ids = extractUniqueTeamIds(matches);
        const stageTeamRows = await teamRepository.findStageTeamsByFaceitIds(
            ids,
            stageId,
        );
        const stageTeamsByFaceitId = new Map<string, StageTeamFaceitLookup>();
        for (const row of stageTeamRows) {
            if (row.faceit_id) {
                stageTeamsByFaceitId.set(row.faceit_id, row);
            }
        }
        const validIds = new Set(stageTeamsByFaceitId.keys());

        const validMatches = matches.filter(
            (m) =>
                validIds.has(m.teams.faction1.faction_id) &&
                validIds.has(m.teams.faction2.faction_id),
        );

        const skipped = matches.length - validMatches.length;
        if (skipped > 0) {
            logger.warn(`Skipped ${skipped} matches due to missing teams`);
        }

        return { validMatches, validIds, stageTeamsByFaceitId };
    },

    /**
     * Bulk-updates `teams.team_logo` from Faceit avatar URLs when the value differs (see {@link teamRepository.bulkUpdateAvatars}).
     *
     * @param matches - Typically {@link checkStageTeams}’s `validMatches`
     */
    async syncTeamAvatars(matches: FaceitAPIMatch[]): Promise<void> {
        if (matches.length === 0) return;
        const avatarMap = buildAvatarMap(matches);
        await teamRepository.bulkUpdateAvatars(avatarMap);
    },

    /**
     * Ensures a DB `groups` row exists for each distinct Faceit `group` number on the given matches
     * (persisted group name is `String(group)`, e.g. `"1"`, `"2"`).
     *
     * @param stageId - Database stage id
     * @param matches - Faceit matches that may carry a `group` field
     * @returns Faceit group number → database `groups.id`
     */
    async createStageGroups(
        stageId: number,
        matches: FaceitAPIMatch[],
    ): Promise<Map<number, number>> {
        const mapping = new Map<number, number>();
        const groupNums = extractGroupsFromMatches(matches);
        for (const g of groupNums) {
            const row = await tournamentRepository.upsertGroupByName(
                stageId,
                String(g),
            );
            mapping.set(g, row.id);
        }
        return mapping;
    },

    /**
     * Upserts `matches` rows from Faceit payloads (no maps, stats, or participants).
     *
     * @param stageId - Database stage id
     * @param matches - Faceit matches to persist
     * @param groupMapping - Faceit group number → database `groups.id` (from {@link createStageGroups})
     * @param matchContext - Optional format + team count for round labeling in {@link transformFaceitMatch}
     * @param stageTeamsByFaceitId - When set (e.g. from {@link checkStageTeams}), resolves factions without per-match `findStageTeamByFaceitId` calls
     * @returns Faceit `match_id` → database `matches.id`
     */
    async createStageMatches(
        stageId: number,
        matches: FaceitAPIMatch[],
        groupMapping: Map<number, number>,
        matchContext?: { stageFormat: StageFormat; totalTeams: number },
        stageTeamsByFaceitId?: Map<string, StageTeamFaceitLookup>,
    ): Promise<Map<string, number>> {
        const faceitToDbId = new Map<string, number>();
        const totalTeams = matchContext?.totalTeams ?? 0;
        for (let i = matches.length - 1; i >= 0; i--) {
            const match = matches[i];
            const f1 = match.teams.faction1.faction_id;
            const f2 = match.teams.faction2.faction_id;
            // Always fetch stage teams from the database for freshest record
            const stageTeam1 = await teamRepository.findStageTeamByFaceitId(
                f1,
                stageId,
            );
            const stageTeam2 = await teamRepository.findStageTeamByFaceitId(
                f2,
                stageId,
            );
            if (!stageTeam1 || !stageTeam2) {
                logger.warn(
                    `Skipping match ${match.match_id}: stage teams not found for factions ${f1}, ${f2}`,
                );
                continue;
            }

            let groupId: number | null = null;
            if (match.group !== undefined && match.group !== null) {
                const gid = groupMapping.get(match.group);
                if (gid === undefined) {
                    logger.warn(
                        `Match ${match.match_id} has group ${match.group} but it is missing from group mapping`,
                    );
                } else {
                    groupId = gid;
                }
            }

            console.log("stageTeam1", stageTeam1);
            console.log("stageTeam2", stageTeam2);
            const singleElim =
                matchContext &&
                (matchContext.stageFormat === "single elimination" ||
                    matchContext.stageFormat === "bracket")
                    ? {
                          totalTeams,
                          lossesBeforeF1: stageTeam1.losses ?? 0,
                          lossesBeforeF2: stageTeam2.losses ?? 0,
                      }
                    : undefined;
            console.log("singleElim", singleElim);
            const matchData = transformFaceitMatch(
                match,
                stageId,
                groupId,
                matchContext?.stageFormat,
                undefined,
                singleElim,
            );
            const created =
                await matchRepository.upsertMatchByFaceitId(matchData);
            faceitToDbId.set(match.match_id, created.id);
        }
        return faceitToDbId;
    },

    /**
     * Upserts two `match_participants` rows per match (faction1 / faction2) tied to each side’s `stage_teams.id`.
     *
     * @param matches - Faceit matches to process
     * @param faceitMatchIdToDbId - Faceit `match_id` → database `matches.id` from {@link createStageMatches}
     * @param stageTeamsByFaceitId - Faceit faction id → stage-team row from {@link checkStageTeams}
     */
    async createMatchParticipants(
        matches: FaceitAPIMatch[],
        faceitMatchIdToDbId: Map<string, number>,
        stageTeamsByFaceitId: Map<string, StageTeamFaceitLookup>,
    ): Promise<void> {
        for (const match of matches) {
            const dbMatchId = faceitMatchIdToDbId.get(match.match_id);
            if (dbMatchId === undefined) {
                logger.warn(
                    `Skipping participants for Faceit match ${match.match_id}: no DB match id in map`,
                );
                continue;
            }
            const f1 = match.teams.faction1.faction_id;
            const f2 = match.teams.faction2.faction_id;
            const stageTeam1 = stageTeamsByFaceitId.get(f1);
            const stageTeam2 = stageTeamsByFaceitId.get(f2);
            if (!stageTeam1 || !stageTeam2) {
                logger.warn(
                    `Skipping participants for match ${match.match_id}: stage teams not found in lookup map`,
                );
                continue;
            }
            const participants = transformFaceitMatchParticipants(
                match,
                dbMatchId,
                { faction1: stageTeam1.id, faction2: stageTeam2.id },
            );
            await Promise.all([
                matchRepository.upsertMatchParticipant(participants[0]),
                matchRepository.upsertMatchParticipant(participants[1]),
            ]);
        }
    },

    /**
     * Inserts or updates `maps` rows from embedded `detailed_results` on the Faceit match payload (no HTTP stats call).
     *
     * @param faceitMatch - Faceit match (may include `detailed_results`)
     * @param dbMatchId - Database `matches.id`
     * @param participant1Id - `match_participants.id` for faction1 (position order)
     * @param participant2Id - `match_participants.id` for faction2
     * @param matchRound - Formatted round string stored on map rows
     */
    async createMapsForMatch(
        faceitMatch: FaceitAPIMatch,
        dbMatchId: number,
        participant1Id: number,
        participant2Id: number,
        matchRound: string | null,
    ): Promise<void> {
        if (
            !faceitMatch.detailed_results ||
            faceitMatch.detailed_results.length === 0
        ) {
            return;
        }
        const maps = transformFaceitMaps(
            faceitMatch,
            dbMatchId,
            { faction1: participant1Id, faction2: participant2Id },
            matchRound || undefined,
        );
        for (const mapData of maps) {
            await matchRepository.upsertMap(mapData);
        }
    },

    /**
     * Calls Faceit `GET /matches/{match_id}/stats`. When `rounds` exist, upserts `maps` (scores, winner participant)
     * and `player_stats` per map; if the API returns no rounds, does nothing (use {@link createMapsForMatch} for embedded data).
     *
     * @param faceitMatch - Faceit match id used in the stats URL
     * @param dbMatchId - Database `matches.id`
     * @param participant1Id - Participant id for faction1 (Faceit team id → winner resolution)
     * @param participant2Id - Participant id for faction2
     * @param matchRound - Round label attached to each map row
     */
    async fetchMatchStatsForMatch(
        faceitMatch: FaceitAPIMatch,
        dbMatchId: number,
        participant1Id: number,
        participant2Id: number,
        matchRound: string | null,
    ): Promise<void> {
        const participantMap = {
            [faceitMatch.teams.faction1.faction_id]: participant1Id,
            [faceitMatch.teams.faction2.faction_id]: participant2Id,
        };
        try {
            const stats = await faceitFetchUtil.fetchData<FaceitAPIMatchStats>(
                `/matches/${faceitMatch.match_id}/stats`,
            );

            if (!stats || !stats.rounds || stats.rounds.length === 0) {
                return;
            }

            for (let i = 0; i < stats.rounds.length; i++) {
                const round = stats.rounds[i];
                const [score1, score2] = round.round_stats.Score.split("/").map(
                    (s) => parseInt(s.trim()),
                );

                const winnerFaceitId = round.round_stats.Winner;
                const winnerParticipantId =
                    participantMap[winnerFaceitId] || null;

                const mapPart = round.round_stats.Map.split("_")[1];
                const mapName =
                    mapPart.charAt(0).toUpperCase() + mapPart.slice(1);

                const map = await matchRepository.upsertMap({
                    match_id: dbMatchId,
                    map_name: mapName,
                    map_order: i + 1,
                    round: matchRound,
                    team1_score: score1 || 0,
                    team2_score: score2 || 0,
                    winner_id: winnerParticipantId,
                });

                for (const teamStats of round.teams) {
                    for (const playerStats of teamStats.players) {
                        const player = await playerRepository.findByFaceitId(
                            playerStats.player_id,
                        );
                        if (player) {
                            await playerRepository.upsertPlayerStats(
                                player.id,
                                dbMatchId,
                                map.id,
                                {
                                    kills:
                                        parseInt(
                                            playerStats.player_stats.Kills,
                                        ) || 0,
                                    deaths:
                                        parseInt(
                                            playerStats.player_stats.Deaths,
                                        ) || 0,
                                    assists:
                                        parseInt(
                                            playerStats.player_stats.Assists,
                                        ) || 0,
                                    adr:
                                        parseInt(
                                            playerStats.player_stats.ADR,
                                        ) || 0,
                                    damage:
                                        parseInt(
                                            playerStats.player_stats.Damage,
                                        ) || 0,
                                },
                            );
                        }
                    }
                }
            }
        } catch (error) {
            logger.warn(
                `Failed to fetch stats for match ${faceitMatch.match_id}`,
                error,
            );
        }
    },

    /**
     * For each match in **reverse** bracket order, resolves DB match + participants and runs {@link createMapsForMatch}.
     *
     * @param matches - Usually `validMatches` from {@link checkStageTeams}
     * @param faceitMatchIdToDbId - Faceit `match_id` → database `matches.id` from {@link createStageMatches}
     */
    async createMapsForMatches(
        matches: FaceitAPIMatch[],
        faceitMatchIdToDbId: Map<string, number>,
    ): Promise<void> {
        for (let i = matches.length - 1; i >= 0; i--) {
            const match = matches[i];
            try {
                const dbMatchId = faceitMatchIdToDbId.get(match.match_id);
                if (dbMatchId === undefined) {
                    continue;
                }
                const participants =
                    await matchRepository.findParticipants(dbMatchId);
                if (participants.length < 2) {
                    logger.warn(
                        `Match ${match.match_id}: expected 2 participants, got ${participants.length}`,
                    );
                    continue;
                }
                const dbMatchRow = await matchRepository.findMatchByFaceitId(
                    match.match_id,
                );
                if (!dbMatchRow) {
                    continue;
                }
                await faceitImportService.createMapsForMatch(
                    match,
                    dbMatchId,
                    participants[0].id,
                    participants[1].id,
                    dbMatchRow.round,
                );
            } catch (error) {
                logger.error(
                    `Error creating maps for match ${match.match_id}:`,
                    error,
                );
            }
        }
    },

    /**
     * For each match in **reverse** bracket order, resolves DB match + participants and runs {@link fetchMatchStatsForMatch}.
     *
     * @param matches - Usually `validMatches` from {@link checkStageTeams}
     * @param faceitMatchIdToDbId - Faceit `match_id` → database `matches.id` from {@link createStageMatches}
     */
    async fetchMatchStatsForMatches(
        matches: FaceitAPIMatch[],
        faceitMatchIdToDbId: Map<string, number>,
    ): Promise<void> {
        for (let i = matches.length - 1; i >= 0; i--) {
            const match = matches[i];
            try {
                const dbMatchId = faceitMatchIdToDbId.get(match.match_id);
                if (dbMatchId === undefined) {
                    continue;
                }
                const participants =
                    await matchRepository.findParticipants(dbMatchId);
                if (participants.length < 2) {
                    logger.warn(
                        `Match ${match.match_id}: expected 2 participants, got ${participants.length}`,
                    );
                    continue;
                }
                const dbMatchRow = await matchRepository.findMatchByFaceitId(
                    match.match_id,
                );
                if (!dbMatchRow) {
                    continue;
                }
                await faceitImportService.fetchMatchStatsForMatch(
                    match,
                    dbMatchId,
                    participants[0].id,
                    participants[1].id,
                    dbMatchRow.round,
                );
            } catch (error) {
                logger.error(
                    `Error fetching stats for match ${match.match_id}:`,
                    error,
                );
            }
        }
    },

    /**
     * Increments `stage_teams` wins/losses for both factions when the Faceit match is `FINISHED` and has a `results.winner`.
     *
     * @param match - Faceit match payload
     * @param stageId - Database stage id
     * @param stageTeam1 - Stage team row for faction1 (`team_id` is the core `teams.id`)
     * @param stageTeam2 - Stage team row for faction2
     */
    async updateTeamRecordsForMatch(
        match: FaceitAPIMatch,
        stageId: number,
        stageTeam1: { team_id: number },
        stageTeam2: { team_id: number },
    ): Promise<void> {
        if (match.status !== "FINISHED" || !match.results?.winner) {
            return;
        }
        const winnerFaction = match.results.winner;
        await teamRepository.incrementStageTeamRecord(
            stageTeam1.team_id,
            stageId,
            winnerFaction === "faction1" ? 1 : 0,
            winnerFaction === "faction1" ? 0 : 1,
        );
        await teamRepository.incrementStageTeamRecord(
            stageTeam2.team_id,
            stageId,
            winnerFaction === "faction2" ? 1 : 0,
            winnerFaction === "faction2" ? 0 : 1,
        );
    },

    /**
     * Writes `tournament_results` placements for **single elimination** when the match is finished (3rd/4th, loser bracket, 1st).
     * **Caller must pass stage team rows whose `losses` reflect the state before this match’s W/L update.**
     *
     * @param match - Faceit match (needs `round` for non–third-place logic)
     * @param stageId - Database stage id
     * @param stageTeam1 - Stage team for faction1 (pre-increment losses used for third-place detection)
     * @param stageTeam2 - Stage team for faction2
     * @param stageFormatRow - DB row describing format; only `"single elimination"` triggers placement
     * @param totalTeams - Team count for bracket math ({@link computeRoundsFromFinal})
     */
    async applyTournamentPlacementsForMatch(
        match: FaceitAPIMatch,
        stageId: number,
        stageTeam1: { team_id: number; losses?: number | null },
        stageTeam2: { team_id: number; losses?: number | null },
        stageFormatRow: { name: string } | null,
        totalTeams: number,
    ): Promise<void> {
        if (match.status !== "FINISHED" || !match.results?.winner) {
            return;
        }
        if (stageFormatRow?.name.toLowerCase() !== "single elimination") {
            return;
        }
        if (match.round == null) {
            logger.warn(
                `Match ${match.match_id} has no round; skipping tournament placement`,
            );
            return;
        }
        const winnerFaction = match.results.winner;
        const lossesBefore1 = stageTeam1.losses ?? 0;
        const lossesBefore2 = stageTeam2.losses ?? 0;
        const isThirdPlace = isThirdPlaceSingleElim(
            lossesBefore1,
            lossesBefore2,
        );
        const loserTeamId =
            winnerFaction === "faction1"
                ? stageTeam2.team_id
                : stageTeam1.team_id;
        const winnerTeamId =
            winnerFaction === "faction1"
                ? stageTeam1.team_id
                : stageTeam2.team_id;
        if (isThirdPlace) {
            await teamRepository.upsertTournamentPlacementByTeamAndStage(
                winnerTeamId,
                stageId,
                "3rd",
            );
            await teamRepository.upsertTournamentPlacementByTeamAndStage(
                loserTeamId,
                stageId,
                "4th",
            );
        } else {
            const roundsFromFinal = computeRoundsFromFinal(
                match.round,
                totalTeams,
            );
            const loserPlacement =
                formatLoserPlacementSingleElim(roundsFromFinal);
            if (loserPlacement == null) {
                logger.warn(
                    `Match ${match.match_id} round ${match.round} inconsistent with bracket size (teams=${totalTeams}); skipping placement`,
                );
            } else {
                await teamRepository.upsertTournamentPlacementByTeamAndStage(
                    loserTeamId,
                    stageId,
                    loserPlacement,
                );
            }
            if (roundsFromFinal === 1 && loserPlacement != null) {
                await teamRepository.upsertTournamentPlacementByTeamAndStage(
                    winnerTeamId,
                    stageId,
                    "1st",
                );
            }
        }
    },

    /**
     * Walks `matches` in **reverse** bracket order: loads both stage teams, stores a {@link StageTeamsStandingsSnapshot},
     * then applies {@link updateTeamRecordsForMatch} so each placement step can use pre-increment loss totals.
     *
     * @param matches - Typically `validMatches` from {@link checkStageTeams}
     * @param stageId - Database stage id
     * @returns Map of Faceit `match_id` → snapshot (for {@link applyTournamentPlacementsForMatches})
     */
    async updateTeamRecordsForMatches(
        matches: FaceitAPIMatch[],
        stageId: number,
    ): Promise<Map<string, StageTeamsStandingsSnapshot>> {
        const snapshots = new Map<string, StageTeamsStandingsSnapshot>();
        for (let i = matches.length - 1; i >= 0; i--) {
            const match = matches[i];
            try {
                const stageTeam1 = await teamRepository.findStageTeamByFaceitId(
                    match.teams.faction1.faction_id,
                    stageId,
                );
                const stageTeam2 = await teamRepository.findStageTeamByFaceitId(
                    match.teams.faction2.faction_id,
                    stageId,
                );
                if (!stageTeam1 || !stageTeam2) {
                    continue;
                }
                snapshots.set(match.match_id, { stageTeam1, stageTeam2 });
                await faceitImportService.updateTeamRecordsForMatch(
                    match,
                    stageId,
                    stageTeam1,
                    stageTeam2,
                );
            } catch (error) {
                logger.error(
                    `Error updating team records for match ${match.match_id}:`,
                    error,
                );
            }
        }
        return snapshots;
    },

    /**
     * Walks `matches` in **reverse** bracket order and runs {@link applyTournamentPlacementsForMatch} using snapshots
     * produced by {@link updateTeamRecordsForMatches} (required so loss-based placement logic stays correct).
     *
     * @param matches - Same list order as passed to {@link updateTeamRecordsForMatches}
     * @param stageId - Database stage id
     * @param stageFormatRow - Stage format metadata from `stages` / `stage_formats`
     * @param totalTeams - Bracket size for placement math
     * @param standingsSnapshots - Output from {@link updateTeamRecordsForMatches}
     */
    async applyTournamentPlacementsForMatches(
        matches: FaceitAPIMatch[],
        stageId: number,
        stageFormatRow: { name: string } | null,
        totalTeams: number,
        standingsSnapshots: Map<string, StageTeamsStandingsSnapshot>,
    ): Promise<void> {
        for (let i = matches.length - 1; i >= 0; i--) {
            const match = matches[i];
            const snap = standingsSnapshots.get(match.match_id);
            if (!snap) {
                continue;
            }
            try {
                await faceitImportService.applyTournamentPlacementsForMatch(
                    match,
                    stageId,
                    snap.stageTeam1,
                    snap.stageTeam2,
                    stageFormatRow,
                    totalTeams,
                );
            } catch (error) {
                logger.error(
                    `Error applying placements for match ${match.match_id}:`,
                    error,
                );
            }
        }
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

        const existingMatches = await matchRepository.findAllByStageId(stageId);
        const existingMatchesByFaceitId = new Map(
            existingMatches.map((m) => [m.faceit_id, m]),
        );

        const totalTeams = await teamRepository.countStageTeams(stageId);
        const stageFormatRow =
            stage.format_id != null
                ? ((await stagesRepository.findStageFormatById(
                      stage.format_id,
                  )) ?? null)
                : null;
        const stageFormatMapped = stageFormatRow
            ? mapFaceitFormatType(stageFormatRow.name)
            : "unknown";

        const newMatches = matches.filter((match) => {
            const existingMatch = existingMatchesByFaceitId.get(match.match_id);

            if (!existingMatch) {
                return true;
            }

            if (existingMatch.status === "finished") {
                return false;
            }

            return existingMatch.status !== match.status.toLowerCase();
        });
        // .sort((a, b) => {
        //     const timeA =
        //         a.started_at ?? a.scheduled_at ?? a.configured_at ?? 0;
        //     const timeB =
        //         b.started_at ?? b.scheduled_at ?? b.configured_at ?? 0;
        //     if (timeA !== timeB) return timeA - timeB;
        //     const ra = a.round ?? 0;
        //     const rb = b.round ?? 0;
        //     return ra - rb;
        // });

        let newMatchesCount = 0;

        // for (const match of newMatches) {
        for (let i = newMatches.length - 1; i >= 0; i--) {
            const match = newMatches[i];
            try {
                const stageTeam1 = await teamRepository.findStageTeamByFaceitId(
                    match.teams.faction1.faction_id,
                    stageId,
                );
                const stageTeam2 = await teamRepository.findStageTeamByFaceitId(
                    match.teams.faction2.faction_id,
                    stageId,
                );

                //update team avatars
                await teamRepository.updateTeamAvatarByFaceitId(
                    match.teams.faction1.faction_id,
                    match.teams.faction1.avatar,
                );
                await teamRepository.updateTeamAvatarByFaceitId(
                    match.teams.faction2.faction_id,
                    match.teams.faction2.avatar,
                );

                if (!stageTeam1 || !stageTeam2) {
                    logger.warn(
                        `Stage teams not found for match ${match.match_id}. Faction1: ${match.teams.faction1.faction_id}, Faction2: ${match.teams.faction2.faction_id}`,
                    );
                    continue;
                }

                [
                    match.teams.faction1.roster,
                    match.teams.faction2.roster,
                ].forEach(async (roster) => {
                    for (const player of roster) {
                        await playerRepository.upsertPlayerByFaceitId({
                            player_name: player.nickname,
                            faceit_id: player.player_id,
                            player_logo: player.avatar,
                            country: "",
                        });
                    }
                });

                // const players1 = await playerRepository.findByFaceitIds(
                //     match.teams.faction1.roster.map((p) => p.player_id),
                // );
                // if (players1.length !== match.teams.faction1.roster.length) {
                //     logger.warn(
                //         `Not all players found for team ${match.teams.faction1.faction_id} in match ${match.match_id}. Skipping.`,
                //     );
                //     continue;
                // }

                // const players2 = await playerRepository.findByFaceitIds(
                //     match.teams.faction2.roster.map((p) => p.player_id),
                // );
                // if (players2.length !== match.teams.faction2.roster.length) {
                //     logger.warn(
                //         `Not all players found for team ${match.teams.faction2.faction_id} in match ${match.match_id}. Skipping.`,
                //     );
                //     continue;
                // }

                let groupId: number | null = null;
                if (match.group !== undefined && match.group !== null) {
                    const group = await tournamentRepository.upsertGroupByName(
                        stageId,
                        match.group.toString(),
                    );
                    groupId = group.id;
                }

                const created = await faceitImportService.processStageMatch(
                    match,
                    stageId,
                    groupId,
                    stageTeam1,
                    stageTeam2,
                    { stageFormat: stageFormatMapped, totalTeams },
                );

                if (created) {
                    newMatchesCount++;

                    if (match.status === "FINISHED" && match.results?.winner) {
                        const winnerFaction = match.results.winner;
                        await teamRepository.incrementStageTeamRecord(
                            stageTeam1.team_id,
                            stageId,
                            winnerFaction === "faction1" ? 1 : 0,
                            winnerFaction === "faction1" ? 0 : 1,
                        );
                        await teamRepository.incrementStageTeamRecord(
                            stageTeam2.team_id,
                            stageId,
                            winnerFaction === "faction2" ? 1 : 0,
                            winnerFaction === "faction2" ? 0 : 1,
                        );
                        if (
                            stageFormatRow?.name.toLowerCase() ===
                            "single elimination"
                        ) {
                            if (match.round == null) {
                                logger.warn(
                                    `Match ${match.match_id} has no round; skipping tournament placement`,
                                );
                            } else {
                                const lossesBefore1 = stageTeam1.losses ?? 0;
                                const lossesBefore2 = stageTeam2.losses ?? 0;
                                const isThirdPlace = isThirdPlaceSingleElim(
                                    lossesBefore1,
                                    lossesBefore2,
                                );
                                const loserTeamId =
                                    winnerFaction === "faction1"
                                        ? stageTeam2.team_id
                                        : stageTeam1.team_id;
                                const winnerTeamId =
                                    winnerFaction === "faction1"
                                        ? stageTeam1.team_id
                                        : stageTeam2.team_id;
                                if (isThirdPlace) {
                                    await teamRepository.upsertTournamentPlacementByTeamAndStage(
                                        winnerTeamId,
                                        stageId,
                                        "3rd",
                                    );
                                    await teamRepository.upsertTournamentPlacementByTeamAndStage(
                                        loserTeamId,
                                        stageId,
                                        "4th",
                                    );
                                } else {
                                    const roundsFromFinal =
                                        computeRoundsFromFinal(
                                            match.round,
                                            totalTeams,
                                        );
                                    const loserPlacement =
                                        formatLoserPlacementSingleElim(
                                            roundsFromFinal,
                                        );
                                    if (loserPlacement == null) {
                                        logger.warn(
                                            `Match ${match.match_id} round ${match.round} inconsistent with bracket size (teams=${totalTeams}); skipping placement`,
                                        );
                                    } else {
                                        await teamRepository.upsertTournamentPlacementByTeamAndStage(
                                            loserTeamId,
                                            stageId,
                                            loserPlacement,
                                        );
                                    }
                                    if (
                                        roundsFromFinal === 1 &&
                                        loserPlacement != null
                                    ) {
                                        await teamRepository.upsertTournamentPlacementByTeamAndStage(
                                            winnerTeamId,
                                            stageId,
                                            "1st",
                                        );
                                    }
                                }
                            }
                        }
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
        stageId: number,
        groupId: number | null,
        stageTeam1: { id: number; team_id: number; losses?: number | null },
        stageTeam2: { id: number; team_id: number; losses?: number | null },
        matchContext?: { stageFormat: StageFormat; totalTeams: number },
    ): Promise<boolean> => {
        const singleElim =
            matchContext &&
            (matchContext.stageFormat === "single elimination" ||
                matchContext.stageFormat === "bracket")
                ? {
                      totalTeams: matchContext.totalTeams,
                      lossesBeforeF1: stageTeam1.losses ?? 0,
                      lossesBeforeF2: stageTeam2.losses ?? 0,
                  }
                : undefined;
        const matchData = transformFaceitMatch(
            faceitMatch,
            stageId,
            groupId,
            matchContext?.stageFormat,
            undefined,
            singleElim,
        );

        const createdMatch =
            await matchRepository.upsertMatchByFaceitId(matchData);

        const participants = transformFaceitMatchParticipants(
            faceitMatch,
            createdMatch.id,
            { faction1: stageTeam1.id, faction2: stageTeam2.id },
        );

        const [p1, p2] = await Promise.all([
            matchRepository.upsertMatchParticipant(participants[0]),
            matchRepository.upsertMatchParticipant(participants[1]),
        ]);

        const participantMap = {
            [faceitMatch.teams.faction1.faction_id]: p1.id,
            [faceitMatch.teams.faction2.faction_id]: p2.id,
        };

        try {
            const stats = await faceitFetchUtil.fetchData<FaceitAPIMatchStats>(
                `/matches/${faceitMatch.match_id}/stats`,
            );

            if (stats && stats.rounds && stats.rounds.length > 0) {
                for (let i = 0; i < stats.rounds.length; i++) {
                    const round = stats.rounds[i];
                    const [score1, score2] = round.round_stats.Score.split(
                        "/",
                    ).map((s) => parseInt(s.trim()));

                    const winnerFaceitId = round.round_stats.Winner;
                    const winnerParticipantId =
                        participantMap[winnerFaceitId] || null;

                    const mapPart = round.round_stats.Map.split("_")[1];
                    const mapName =
                        mapPart.charAt(0).toUpperCase() + mapPart.slice(1);

                    const map = await matchRepository.upsertMap({
                        match_id: createdMatch.id,
                        map_name: mapName,
                        map_order: i + 1,
                        round: matchData.round,
                        team1_score: score1 || 0,
                        team2_score: score2 || 0,
                        winner_id: winnerParticipantId,
                    });

                    for (const teamStats of round.teams) {
                        for (const playerStats of teamStats.players) {
                            const player =
                                await playerRepository.findByFaceitId(
                                    playerStats.player_id,
                                );
                            if (player) {
                                await playerRepository.upsertPlayerStats(
                                    player.id,
                                    createdMatch.id,
                                    map.id,
                                    {
                                        kills:
                                            parseInt(
                                                playerStats.player_stats.Kills,
                                            ) || 0,
                                        deaths:
                                            parseInt(
                                                playerStats.player_stats.Deaths,
                                            ) || 0,
                                        assists:
                                            parseInt(
                                                playerStats.player_stats
                                                    .Assists,
                                            ) || 0,
                                        adr:
                                            parseInt(
                                                playerStats.player_stats.ADR,
                                            ) || 0,
                                        damage:
                                            parseInt(
                                                playerStats.player_stats.Damage,
                                            ) || 0,
                                    },
                                );
                            }
                        }
                    }
                }
            } else if (
                faceitMatch.detailed_results &&
                faceitMatch.detailed_results.length > 0
            ) {
                const maps = transformFaceitMaps(
                    faceitMatch,
                    createdMatch.id,
                    { faction1: p1.id, faction2: p2.id },
                    matchData.round || undefined,
                );
                for (const mapData of maps) {
                    await matchRepository.upsertMap(mapData);
                }
            }
        } catch (error) {
            logger.warn(
                `Failed to process stats for match ${faceitMatch.match_id}`,
                error,
            );
        }

        return true;
    },

    processStageTeams: async (
        teams: FaceitAPITournamentTeam[],
        stageId: number,
    ) => {
        const stage = await tournamentRepository.findStageById(stageId);
        if (!stage) {
            throw new Error(`Stage with ID ${stageId} not found`);
        }

        // const existingTeams = await teamRepository.findByFaceitIds(
        //     teams.map((team) => team.team.team_id),
        // );
        // const existingTeamFaceitIds = new Set(
        //     existingTeams.map((t) => t.faceit_id),
        // );

        for (const team of teams) {
            let leaderId: number | null = null;

            const insertedTeam = await teamRepository.upsertTeamByFaceitId({
                name: team.team.name,
                team_logo: team.team.avatar || "",
                faceit_id: team.team.team_id,
                team_captain_id: null,
            });
            const insertedStageTeam =
                await tournamentRepository.upsertStageTeam({
                    stage_id: stageId,
                    team_id: insertedTeam.id,
                    group_id: null, //TODO create group first?
                    seed: 0,
                    wins: 0,
                    losses: 0,
                });

            for (const playerId of [...team.roster, ...team.substitutes]) {
                const player = await playerRepository.findByFaceitId(playerId);

                const member = team.team.members.find(
                    (m) => m.user_id === playerId,
                );

                if (!member) {
                    throw new Error(`Member with ID ${playerId} not found`);
                }

                const insertedPlayer =
                    await playerRepository.upsertPlayerByFaceitId({
                        player_name: member.nickname,
                        faceit_id: member.user_id,
                        player_logo: member.avatar,
                        country: member.country,
                        team_id: insertedTeam.id,
                        base_role: "starter",
                        hltv_id: "",
                        discord_id: "",
                    });
                await tournamentRepository.upsertStageRoster({
                    stage_team_id: insertedStageTeam.id,
                    player_id: insertedPlayer.id,
                    role: "starter",
                });
                ``;

                if (playerId === team.leader) {
                    leaderId = insertedPlayer.id;
                }
            }

            if (leaderId) {
                await teamRepository.updateTeamCaptain(
                    insertedTeam.id,
                    leaderId,
                );
            }
        }

        return teams;
    },
};
