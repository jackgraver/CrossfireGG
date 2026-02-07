import { tournamentRepository } from "../modules/tournaments/tournament.repository";
import { formatRound, type StageFormat } from "./roundFormatter";

export type FaceitAPIChampionship = {
    id: string;
    name: string;
    type: string;
    status: string;
    game_id: string;
    region: string;
    championship_start: number;
    championship_end: number;
    subscription_end: number;
    slots: number;
    total_groups: number;
    faceit_url: string;
};

export type FaceitAPIPlayer = {
    player_id: string;
    nickname: string;
    avatar: string;
    game_player_name: string;
};

export type FaceitAPITeam = {
    faction_id: string;
    leader: string;
    avatar: string;
    roster: FaceitAPIPlayer[];
    name: string;
};

export type FaceitAPIMatch = {
    match_id: string;
    competition_id: string;
    teams: {
        faction1: FaceitAPITeam;
        faction2: FaceitAPITeam;
    };
    voting?: {
        map?: {
            pick?: string[];
        };
    };
    scheduled_at?: number;
    configured_at?: number;
    started_at?: number;
    finished_at?: number;
    best_of: number;
    results?: {
        winner: "faction1" | "faction2";
        score: {
            faction1: number;
            faction2: number;
        };
    };
    detailed_results?: Array<{
        winner: "faction1" | "faction2";
        factions: {
            faction1: { score: number };
            faction2: { score: number };
        };
    }>;
    status: string;
    round?: number;
    group?: number;
    faceit_url: string;
};

export type FaceitAPIMatchStats = {
    rounds: {
        played: string;
        round_stats: {
            Map: string;
            Rounds: string;
            Score: string;
            Winner: string;
        };
        teams: {
            team_id: string;
            players: {
                player_id: string;
                player_stats: {
                    MVPs: string;
                    "Utility Success Rate per Match": string;
                    "Sniper Kill Rate per Round": string;
                    "Triple Kills": string;
                    "Utility Count": string;
                    "1v2Wins": string;
                    "Clutch Kills": string;
                    "Utility Damage": string;
                    "Zeus Kills": string;
                    "Flashes per Round in a Match": string;
                    "1v1Wins": string;
                    "Match 1v2 Win Rate": string;
                    "1v1Count": string;
                    "Flash Count": string;
                    "Pistol Kills": string;
                    "Match Entry Rate": string;
                    "Entry Wins": string;
                    "Quadro Kills": string;
                    "K/R Ratio": string;
                    "Match 1v1 Win Rate": string;
                    Damage: string;
                    "Utility Successes": string;
                    "First Kills": string;
                    Headshots: string;
                    "Double Kills": string;
                    ADR: string;
                    "Enemies Flashed per Round in a Match": string;
                    "Sniper Kills": string;
                    "Match Entry Success Rate": string;
                    "Penta Kills": string;
                    "Flash Successes": string;
                    "Utility Enemies": string;
                    "Entry Count": string;
                    "Flash Success Rate per Match": string;
                    Deaths: string;
                    "Knife Kills": string;
                    Kills: string;
                    "Utility Damage per Round in a Match": string;
                    "Utility Usage per Round": string;
                    "Utility Damage Success Rate per Match": string;
                    "Enemies Flashed": string;
                    Assists: string;
                    "Sniper Kill Rate per Match": string;
                    "1v2Count": string;
                    "K/D Ratio": string;
                    "Headshots %": string;
                };
            }[];
        }[];
    }[];
};

// ============================== TRANSFORMATION FUNCTIONS ============================== //

/**
 * Transform Faceit tournament/championship data to Stage schema
 */
export async function transformFaceitTournament(
    faceitTournament: FaceitAPIChampionship,
    tournamentId: number,
) {
    const formatId = await tournamentRepository
        .findFormatByName(faceitTournament.type)
        .then((format) => format?.id || null);

    return {
        tournament_id: tournamentId,
        name: faceitTournament.name,
        faceit_id: faceitTournament.id,
        max_teams: faceitTournament.slots || 0,
        format_id: formatId,
        start_date: faceitTournament.championship_start
            ? new Date(faceitTournament.championship_start)
            : null,
        end_date: null,
        registration_deadline: faceitTournament.subscription_end
            ? new Date(faceitTournament.subscription_end)
            : null,
    };
}

/**
 * Transform Faceit player data to Player schema
 */
export function transformFaceitPlayer(faceitPlayer: FaceitAPIPlayer) {
    return {
        player_name: faceitPlayer.nickname,
        faceit_id: faceitPlayer.player_id,
        player_logo: faceitPlayer.avatar || null,
        country: null,
    };
}

/**
 * Transform Faceit team/faction data to Team schema
 * Note: team_captain_id needs to be resolved after upserting the captain player
 */
export function transformFaceitTeam(
    faceitTeam: FaceitAPITeam,
    captainPlayerId: number,
) {
    return {
        name: faceitTeam.name,
        team_logo: faceitTeam.avatar || null,
        faceit_id: faceitTeam.faction_id,
        team_captain_id: captainPlayerId,
    };
}

/**
 * Map Faceit match status to our database status
 */
export function mapFaceitMatchStatus(faceitStatus: string): string {
    const statusMap: Record<string, string> = {
        FINISHED: "finished",
        CANCELLED: "cancelled",
        ONGOING: "live",
        READY: "scheduled",
        SCHEDULED: "scheduled",
        CONFIGURING: "scheduled",
        CAPTAIN_PICK: "scheduled",
        VOTING: "scheduled",
        CHECKIN: "scheduled",
    };

    return statusMap[faceitStatus] || "scheduled";
}

/**
 * Transform Faceit match data to Match schema
 * Note: group_id and stage_id need to be resolved from the database
 */
export function transformFaceitMatch(
    faceitMatch: FaceitAPIMatch,
    stageId: number,
    groupId: number | null,
    stageFormat?: StageFormat,
    teamRecords?: {
        faction1?: { wins: number; losses: number };
        faction2?: { wins: number; losses: number };
    },
) {
    let formattedRound = faceitMatch.round?.toString() || null;

    // If we have format information, format the round nicely
    if (faceitMatch.round && stageFormat && stageFormat !== "unknown") {
        // For Swiss format, try to include team records if available
        if (stageFormat === "swiss" && teamRecords?.faction1) {
            formattedRound = formatRound(stageFormat, faceitMatch.round, {
                wins: teamRecords.faction1.wins,
                losses: teamRecords.faction1.losses,
            });
        } else {
            formattedRound = formatRound(stageFormat, faceitMatch.round);
        }
    }

    return {
        group_id: groupId,
        stage_id: stageId,
        faceit_id: faceitMatch.match_id,
        match_number: null,
        round: formattedRound,
        status: mapFaceitMatchStatus(faceitMatch.status),
        best_of: faceitMatch.best_of || 1,
        stream_url: null,
        scheduled_at: faceitMatch.scheduled_at
            ? new Date(faceitMatch.scheduled_at * 1000)
            : null,
        faceit_url: faceitMatch.faceit_url?.replace("{lang}", "en") || null,
    };
}

/**
 * Extract map data from Faceit match detailed results
 */
export function transformFaceitMaps(
    faceitMatch: FaceitAPIMatch,
    matchId: number,
    participantMap: { faction1: number; faction2: number },
    formattedRound?: string,
) {
    if (
        !faceitMatch.detailed_results ||
        faceitMatch.detailed_results.length === 0
    ) {
        return [];
    }

    const maps = [];
    const mapNames = faceitMatch.voting?.map?.pick || [];

    for (let i = 0; i < faceitMatch.detailed_results.length; i++) {
        const result = faceitMatch.detailed_results[i];
        const mapName = mapNames[i] || `Map ${i + 1}`;
        const winnerId =
            result.winner === "faction1"
                ? participantMap.faction1
                : result.winner === "faction2"
                  ? participantMap.faction2
                  : null;

        maps.push({
            match_id: matchId,
            map_name: mapName,
            map_order: i + 1,
            round: formattedRound || faceitMatch.round?.toString() || null,
            team1_score: result.factions?.faction1?.score ?? 0,
            team2_score: result.factions?.faction2?.score ?? 0,
            winner_id: winnerId,
        });
    }

    return maps;
}

/**
 * Transform Faceit match participants
 */
export function transformFaceitMatchParticipants(
    faceitMatch: FaceitAPIMatch,
    matchId: number,
    teamMap: { faction1: number; faction2: number },
) {
    const winner = faceitMatch.results?.winner;
    const score = faceitMatch.results?.score;

    return [
        {
            match_id: matchId,
            team_id: teamMap.faction1,
            position: 1,
            score: score?.faction1 ?? 0,
            winner: winner === "faction1",
        },
        {
            match_id: matchId,
            team_id: teamMap.faction2,
            position: 2,
            score: score?.faction2 ?? 0,
            winner: winner === "faction2",
        },
    ];
}

/**
 * Extract unique group names/numbers from matches
 */
export function extractGroupsFromMatches(matches: FaceitAPIMatch[]): number[] {
    const groups = new Set<number>();

    for (const match of matches) {
        if (match.group !== undefined && match.group !== null) {
            groups.add(match.group);
        }
    }

    return Array.from(groups).sort((a, b) => a - b);
}

/**
 * Extract all unique players from a match
 */
export function extractPlayersFromMatch(
    faceitMatch: FaceitAPIMatch,
): FaceitAPIPlayer[] {
    const players: FaceitAPIPlayer[] = [];

    if (faceitMatch.teams.faction1?.roster) {
        players.push(...faceitMatch.teams.faction1.roster);
    }

    if (faceitMatch.teams.faction2?.roster) {
        players.push(...faceitMatch.teams.faction2.roster);
    }

    return players;
}

/**
 * Extract all unique teams from a match
 */
export function extractTeamsFromMatch(
    faceitMatch: FaceitAPIMatch,
): FaceitAPITeam[] {
    const teams: FaceitAPITeam[] = [];

    if (faceitMatch.teams.faction1) {
        teams.push(faceitMatch.teams.faction1);
    }

    if (faceitMatch.teams.faction2) {
        teams.push(faceitMatch.teams.faction2);
    }

    return teams;
}

/**
 * Extract all unique players from multiple matches
 */
export function extractAllPlayers(
    matches: FaceitAPIMatch[],
): Map<string, FaceitAPIPlayer> {
    const playersMap = new Map<string, FaceitAPIPlayer>();

    for (const match of matches) {
        const players = extractPlayersFromMatch(match);
        for (const player of players) {
            if (!playersMap.has(player.player_id)) {
                playersMap.set(player.player_id, player);
            }
        }
    }

    return playersMap;
}

/**
 * Extract all unique teams from multiple matches
 */
export function extractAllTeams(
    matches: FaceitAPIMatch[],
): Map<string, FaceitAPITeam> {
    const teamsMap = new Map<string, FaceitAPITeam>();

    for (const match of matches) {
        const teams = extractTeamsFromMatch(match);
        for (const team of teams) {
            if (!teamsMap.has(team.faction_id)) {
                teamsMap.set(team.faction_id, team);
            }
        }
    }

    return teamsMap;
}
