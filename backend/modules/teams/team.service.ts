import { playerRepository } from "../players/player.repository";
import { teamRepository } from "./team.repository";
import { formatTeamPlacementSummary } from "./team.utils";
import type {
    TeamDetailResponse,
    FormattedTeam,
    FormattedMatch,
    FormattedStage,
    FormattedTournament,
} from "./team.types";
import type { TeamMemberPlayerDTO } from "@repo/contracts";
import { PlayerContract } from "@repo/contracts";

type PlayerRow = NonNullable<
    Awaited<ReturnType<typeof teamRepository.findPlayersByTeamId>>
>[number];

type StageRosterRow = {
    player: PlayerRow;
    rosterRole: string;
    stageEndDate: Date;
    stageId: number;
};

function parseRosterRole(role: string): "starter" | "sub" | "coach" {
    if (role === "sub" || role === "coach") return role;
    return "starter";
}

function dedupeStageRowsByLatestStage(
    rows: StageRosterRow[],
): Map<number, { player: PlayerRow; rosterRole: "starter" | "sub" | "coach" }> {
    const byPlayer = new Map<number, StageRosterRow[]>();
    for (const r of rows) {
        const id = r.player.id;
        const list = byPlayer.get(id) ?? [];
        list.push(r);
        byPlayer.set(id, list);
    }
    const out = new Map<
        number,
        { player: PlayerRow; rosterRole: "starter" | "sub" | "coach" }
    >();
    for (const [pid, list] of byPlayer) {
        const sorted = [...list].sort((a, b) => {
            const t = b.stageEndDate.getTime() - a.stageEndDate.getTime();
            if (t !== 0) return t;
            return b.stageId - a.stageId;
        });
        const pick = sorted[0];
        out.set(pid, {
            player: pick.player,
            rosterRole: parseRosterRole(pick.rosterRole),
        });
    }
    return out;
}

function playerToMember(
    player: PlayerRow,
    rosterRole: "starter" | "sub" | "coach",
    matchesPlayed: number,
): TeamMemberPlayerDTO {
    const base = PlayerContract.parse({
        id: player.id,
        player_name: player.player_name,
        faceit_id: player.faceit_id ?? null,
        team_id: player.team_id ?? null,
        user_id: player.user_id ?? null,
        player_logo: player.player_logo ?? null,
        country: player.country ?? null,
        base_role: player.base_role ?? null,
        hltv_id: player.hltv_id ?? null,
        hltv_verified: player.hltv_verified ?? null,
        discord_id: player.discord_id ?? null,
        discord_verified: player.discord_verified ?? null,
    });
    return {
        ...base,
        matches_played: matchesPlayed,
        roster_role: rosterRole,
    };
}

export const teamService = {
    getAllTeams: async (): Promise<any> => {
        // TODO: probably need to filter by current stage (maybe tournament based on current = true stage)
        const teams = await teamRepository.findAll();
        return teams;
    },

    getTeamById: async (teamId: number) => {
        const team = await teamRepository.findById(teamId);
        if (!team) {
            return null;
        }

        const tournaments = await teamService.getTeamTournaments(teamId);
        const placement_summaries: string[] = [];
        for (const t of tournaments) {
            const p = t.placement;
            if (p != null && String(p).trim() !== "") {
                if (!["1st", "2nd", "3rd", "3rd-4th"].includes(p)) continue;
                placement_summaries.push(
                    formatTeamPlacementSummary(t.name, String(p)),
                );
            }
        }

        return {
            id: team.id,
            name: team.name,
            short_name: team.short_name ?? "",
            team_logo: team.team_logo ?? null,
            faceit_id: team.faceit_id ?? null,
            team_captain_id: team.team_captain_id!,
            social_links: team.social_links ?? null,
            placement_summaries,
        };
    },

    getTeamTournaments: async (teamId: number) => {
        const tournaments = await teamRepository.getTeamTournaments(teamId);
        return tournaments.map((tournament) => {
            const stagesWithResult = tournament.stages.filter(
                (stage) => stage.stageTeams[0]?.tournamentResult,
            );

            let placement: string | undefined;

            if (stagesWithResult.length > 0) {
                const sortedStages = [...stagesWithResult].sort((a, b) => {
                    const dateA = new Date(a.end_date).getTime();
                    const dateB = new Date(b.end_date).getTime();
                    if (dateB !== dateA) return dateB - dateA;
                    return b.id - a.id;
                });

                const raw =
                    sortedStages[0].stageTeams[0].tournamentResult?.placement;
                placement =
                    raw != null && String(raw).trim() !== ""
                        ? String(raw)
                        : undefined;
            }

            return {
                ...tournament,
                placement,
            };
        });
    },

    getTeamMatches: async (teamId: number) => {
        const matches = await teamRepository.findMatchesByTeamId(teamId);
        return matches;
    },

    getTeamMatchesByStage: async (
        teamId: number,
        stageId: number,
    ): Promise<FormattedMatch[]> => {
        const teamMatches = await teamRepository.findMatchesByTeamIdAndStageId(
            teamId,
            stageId,
        );

        const formattedMatches: FormattedMatch[] = await Promise.all(
            teamMatches.map(async (match) => {
                const participants = await teamRepository.findMatchParticipants(
                    match.id,
                );

                const team1Entry = participants.find(
                    (p) => p.participant.position === 1,
                );
                const team2Entry = participants.find(
                    (p) => p.participant.position === 2,
                );

                const team1Data = team1Entry?.team;
                const team2Data = team2Entry?.team;

                const team1: FormattedTeam | null = team1Data
                    ? {
                          team_id: team1Data.id.toString(),
                          name: team1Data.name,
                          team_logo: team1Data.team_logo || null,
                          faceit_id: team1Data.faceit_id || null,
                          team_captain_id:
                              team1Data.team_captain_id?.toString() || null,
                      }
                    : null;

                const team2: FormattedTeam | null = team2Data
                    ? {
                          team_id: team2Data.id.toString(),
                          name: team2Data.name,
                          team_logo: team2Data.team_logo || null,
                          faceit_id: team2Data.faceit_id || null,
                          team_captain_id:
                              team2Data.team_captain_id?.toString() || null,
                      }
                    : null;

                return {
                    match_id: match.id.toString(),
                    group_id: match.group_id?.toString() || "",
                    status: match.status || null,
                    scheduled_at: match.scheduled_at ?? null,
                    round: match.round || null,
                    faceit_url: match.faceit_url || null,
                    participants: {
                        team1: team1,
                        team2: team2,
                    },
                };
            }),
        );

        return formattedMatches;
    },

    getTeamPlayers: async (teamId: number) => {
        return await teamRepository.findPlayersByTeamId(teamId);
    },

    getTeamMembersRoster: async (teamId: number) => {
        const orderedTournaments =
            await teamRepository.findTournamentsForTeamOrderedByStartDate(
                teamId,
            );

        if (orderedTournaments.length > 0) {
            type DedupedMap = Map<
                number,
                { player: PlayerRow; rosterRole: "starter" | "sub" | "coach" }
            >;

            const perTournament: {
                tournament_id: number;
                tournament_name: string;
                deduped: DedupedMap;
            }[] = [];

            for (const t of orderedTournaments) {
                const rows =
                    await teamRepository.findStagePlayersForTeamInTournament(
                        teamId,
                        t.id,
                    );
                const stageRows: StageRosterRow[] = rows.map((r) => ({
                    player: r.player,
                    rosterRole: r.rosterRole,
                    stageEndDate: r.stageEndDate,
                    stageId: r.stageId,
                }));
                perTournament.push({
                    tournament_id: t.id,
                    tournament_name: t.name,
                    deduped: dedupeStageRowsByLatestStage(stageRows),
                });
            }

            const rosterPlayers =
                await teamRepository.findPlayersByTeamId(teamId);
            const rosterIds = rosterPlayers.map((p) => p.id);

            const allIds = [
                ...new Set([
                    ...perTournament.flatMap((tr) => [...tr.deduped.keys()]),
                    ...rosterIds,
                ]),
            ];
            const matchCounts =
                await teamRepository.countMatchesPlayedByPlayerIds(
                    teamId,
                    allIds,
                );

            const tournament_rosters = perTournament.map((tr) => ({
                tournament_id: tr.tournament_id,
                tournament_name: tr.tournament_name,
                players: [...tr.deduped.values()].map(
                    ({ player, rosterRole }) =>
                        playerToMember(
                            player,
                            rosterRole,
                            matchCounts.get(player.id) ?? 0,
                        ),
                ),
            }));

            const historic_players = rosterPlayers.map((p) =>
                playerToMember(
                    p,
                    parseRosterRole(p.base_role ?? "starter"),
                    matchCounts.get(p.id) ?? 0,
                ),
            );

            return {
                tournament_rosters,
                historic_players,
            };
        }

        const rosterPlayers =
            await teamRepository.findPlayersByTeamId(teamId);
        const matchCounts = await teamRepository.countMatchesPlayedByPlayerIds(
            teamId,
            rosterPlayers.map((p) => p.id),
        );
        const historic_players = rosterPlayers.map((p) =>
            playerToMember(
                p,
                parseRosterRole(p.base_role ?? "starter"),
                matchCounts.get(p.id) ?? 0,
            ),
        );
        return {
            tournament_rosters: [],
            historic_players,
        };
    },

    searchPlayers: async (searchQuery: string, excludeTeamId?: number) => {
        const foundPlayers = await teamRepository.searchPlayers(
            searchQuery,
            excludeTeamId,
        );
        return foundPlayers.map((player) => ({
            player_id: player.id.toString(),
            player_name: player.player_name,
            faceit_id: player.faceit_id || null,
            team_id: player.team_id?.toString() || null,
            user_id: player.user_id?.toString() || null,
            player_logo: player.player_logo || null,
        }));
    },

    addPlayerToTeam: async (playerId: number, teamId: number) => {
        const player = await teamRepository.addPlayerToTeam(playerId, teamId);
        if (!player) {
            return null;
        }
        return {
            player_id: player.id.toString(),
            player_name: player.player_name,
            faceit_id: player.faceit_id || null,
            team_id: player.team_id?.toString() || null,
            user_id: player.user_id?.toString() || null,
            player_logo: player.player_logo || null,
        };
    },

    removePlayerFromTeam: async (playerId: number) => {
        const player = await teamRepository.removePlayerFromTeam(playerId);
        if (!player) {
            return null;
        }
        return {
            player_id: player.id.toString(),
            player_name: player.player_name,
            faceit_id: player.faceit_id || null,
            team_id: player.team_id?.toString() || null,
            user_id: player.user_id?.toString() || null,
            player_logo: player.player_logo || null,
        };
    },
};
