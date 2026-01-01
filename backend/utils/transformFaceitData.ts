/**
 * Utilities to transform FaceIT API data structures into our database schema format
 */

// ============================== TYPE DEFINITIONS ============================== //

export interface FaceitTournament {
    id: string;
    championship_id: string;
    name: string;
    type: string;
    status: string;
    game_id: string;
    region: string;
    championship_start: number;
    slots: number;
    current_subscriptions: number;
    total_groups: number;
    total_rounds?: number;
    faceit_url: string;
}

export interface FaceitPlayer {
    player_id: string;
    nickname: string;
    avatar: string;
    game_player_id: string;
    game_player_name: string;
}

export interface FaceitTeam {
    faction_id: string;
    leader: string;
    avatar: string;
    roster: FaceitPlayer[];
    name: string;
    type: string;
}

export interface FaceitMatch {
    match_id: string;
    game: string;
    region: string;
    competition_id: string;
    competition_type: string;
    competition_name: string;
    teams: {
        faction1: FaceitTeam;
        faction2: FaceitTeam;
    };
    voting?: {
        map?: {
            pick?: string[];
        };
    };
    best_of: number;
    scheduled_at?: number;
    configured_at?: number;
    started_at?: number;
    finished_at?: number;
    status: string;
    round?: number;
    group?: number;
    results?: {
        winner: string;
        score: {
            faction1: number;
            faction2: number;
        };
    };
    detailed_results?: Array<{
        winner: string;
        factions: {
            faction1: { score: number };
            faction2: { score: number };
        };
    }>;
    faceit_url: string;
}

export interface FaceitMatchesResponse {
    items: FaceitMatch[];
    start: number;
    end: number;
}

// ============================== TRANSFORMATION FUNCTIONS ============================== //

/**
 * Transform FaceIT tournament/championship data to Stage schema
 */
export function transformFaceitTournament(
    faceitTournament: FaceitTournament,
    tournamentId: number
) {
    return {
        tournament_id: tournamentId,
        name: faceitTournament.name,
        faceit_id: faceitTournament.championship_id,
        max_teams: faceitTournament.slots || 0,
        start_date: faceitTournament.championship_start
            ? new Date(faceitTournament.championship_start)
            : null,
        end_date: null,
    };
}

/**
 * Transform FaceIT player data to Player schema
 */
export function transformFaceitPlayer(faceitPlayer: FaceitPlayer) {
    return {
        player_name: faceitPlayer.nickname,
        faceit_id: faceitPlayer.player_id,
        player_logo: faceitPlayer.avatar || null,
        country: null,
    };
}

/**
 * Transform FaceIT team/faction data to Team schema
 * Note: team_captain_id needs to be resolved after upserting the captain player
 */
export function transformFaceitTeam(
    faceitTeam: FaceitTeam,
    captainPlayerId: number,
    region?: string
) {
    return {
        name: faceitTeam.name,
        team_logo: faceitTeam.avatar || null,
        faceit_id: faceitTeam.faction_id,
        team_captain_id: captainPlayerId,
        region: region || null,
    };
}

/**
 * Map FaceIT match status to our database status
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
 * Transform FaceIT match data to Match schema
 * Note: group_id and stage_id need to be resolved from the database
 */
export function transformFaceitMatch(
    faceitMatch: FaceitMatch,
    stageId: number,
    groupId: number | null
) {
    return {
        group_id: groupId,
        stage_id: stageId,
        faceit_id: faceitMatch.match_id,
        match_number: null,
        round: faceitMatch.round?.toString() || null,
        status: mapFaceitMatchStatus(faceitMatch.status),
        best_of: faceitMatch.best_of || 1,
        stream_url: null,
        scheduled_at: faceitMatch.scheduled_at
            ? new Date(faceitMatch.scheduled_at * 1000)
            : null,
        faceit_url: faceitMatch.faceit_url || null,
    };
}

/**
 * Extract map data from FaceIT match detailed results
 */
export function transformFaceitMaps(
    faceitMatch: FaceitMatch,
    matchId: number,
    participantMap: { faction1: number; faction2: number }
) {
    if (!faceitMatch.detailed_results || faceitMatch.detailed_results.length === 0) {
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
            round: faceitMatch.round?.toString() || null,
            winner_id: winnerId,
        });
    }

    return maps;
}

/**
 * Transform FaceIT match participants
 */
export function transformFaceitMatchParticipants(
    faceitMatch: FaceitMatch,
    matchId: number,
    teamMap: { faction1: number; faction2: number }
) {
    const winner = faceitMatch.results?.winner;

    return [
        {
            match_id: matchId,
            team_id: teamMap.faction1,
            position: 1,
            winner: winner === "faction1",
        },
        {
            match_id: matchId,
            team_id: teamMap.faction2,
            position: 2,
            winner: winner === "faction2",
        },
    ];
}

/**
 * Extract unique group names/numbers from matches
 */
export function extractGroupsFromMatches(matches: FaceitMatch[]): number[] {
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
export function extractPlayersFromMatch(faceitMatch: FaceitMatch): FaceitPlayer[] {
    const players: FaceitPlayer[] = [];

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
export function extractTeamsFromMatch(faceitMatch: FaceitMatch): FaceitTeam[] {
    const teams: FaceitTeam[] = [];

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
export function extractAllPlayers(matches: FaceitMatch[]): Map<string, FaceitPlayer> {
    const playersMap = new Map<string, FaceitPlayer>();

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
export function extractAllTeams(matches: FaceitMatch[]): Map<string, FaceitTeam> {
    const teamsMap = new Map<string, FaceitTeam>();

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

