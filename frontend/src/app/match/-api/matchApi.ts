import { api } from "@/lib/api";
import type { Team } from "@/types/TeamModel";
import type { MatchMap } from "@/types/Types";
import type { Round } from "@/types/Types";

export type MatchDetailMatch = {
    match_id: string;
    status: string;
    scheduled_at: number;
    round: Round;
    faceit_url: string;
    winner: string;
    teams: { team1: Team; team2: Team };
    team1_score: number;
    team2_score: number;
    caster_id?: number;
};

export type MatchDetailPlayer = {
    player_id: string;
    player_id_i: string;
    player_logo: string;
    player_name: string;
    sub_t_id: string;
    team_id: string;
};

export type MatchDetailResponse = {
    match: MatchDetailMatch;
    team1: Team;
    team2: Team;
    players1: MatchDetailPlayer[];
    players2: MatchDetailPlayer[];
    maps: MatchMap[];
};

export const matchApi = {
    getMatchById: async (matchId: string): Promise<MatchDetailResponse> => {
        return api.get<MatchDetailResponse>(`/match/${matchId}`);
    },
};
