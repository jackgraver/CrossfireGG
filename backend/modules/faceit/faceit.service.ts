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
} from "../../utils/transformFaceitData";
import { teamRepository } from "../teams/team.repository";
import { matchRepository } from "../matches/match.repository";
import { faceitFetchUtil } from "../../utils/faceitFetch.util";
import { stagesRepository } from "../tournaments/stages/stages.repository";
import {
    computeRoundsFromFinal,
    formatLoserPlacementSingleElim,
} from "../teams/team.utils";

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

        const existingMatches = await matchRepository.findAllByStageId(stageId);
        const existingMatchesByFaceitId = new Map(
            existingMatches.map((m) => [m.faceit_id, m]),
        );

        const newMatches = matches
            .filter((match) => {
                const existingMatch = existingMatchesByFaceitId.get(
                    match.match_id,
                );

                if (!existingMatch) {
                    return true;
                }

                if (existingMatch.status === "finished") {
                    return false;
                }

                return existingMatch.status !== match.status.toLowerCase();
            })
            .sort((a, b) => {
                const timeA =
                    a.started_at ?? a.scheduled_at ?? a.configured_at ?? 0;
                const timeB =
                    b.started_at ?? b.scheduled_at ?? b.configured_at ?? 0;
                return timeA - timeB;
            });

        let newMatchesCount = 0;

        for (const match of newMatches) {
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
                        const stageFormat =
                            await stagesRepository.findStageFormatById(
                                stage.format_id,
                            );
                        if (
                            stageFormat?.name.toLowerCase() ===
                            "single elimination"
                        ) {
                            if (match.round == null) {
                                logger.warn(
                                    `Match ${match.match_id} has no round; skipping tournament placement`,
                                );
                            } else {
                                const totalTeams =
                                    await teamRepository.countStageTeams(
                                        stageId,
                                    );
                                const roundsFromFinal = computeRoundsFromFinal(
                                    match.round,
                                    totalTeams,
                                );
                                const loserTeamId =
                                    winnerFaction === "faction1"
                                        ? stageTeam2.team_id
                                        : stageTeam1.team_id;
                                const winnerTeamId =
                                    winnerFaction === "faction1"
                                        ? stageTeam1.team_id
                                        : stageTeam2.team_id;
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
        stageTeam1: { id: number; team_id: number },
        stageTeam2: { id: number; team_id: number },
    ): Promise<boolean> => {
        const matchData = transformFaceitMatch(faceitMatch, stageId, groupId);

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
