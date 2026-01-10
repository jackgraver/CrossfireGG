import { api } from "@/lib/api";
import { MatchParticipant } from "@/types/MatchParticipantModel";
import type { Match, Round } from "@/types/Types";

export type MatchDetailResponse = {
    ID: number;
    group_id?: string; // foreign key groups.ID
    status?: string | null;
    scheduled_at?: number | null;
    round?: Round | null;
    faceit_url?: string | null;
    team1_id?: string | null;
    team2_id?: string | null;
    winner?: string | null;
    participants?: MatchParticipant[];
    team1_score?: number | null;
    team2_score?: number | null;
    caster_id?: number;
};

export const matchApi = {
    getMatchById: async (matchId: string): Promise<any> => {
        return api.get<any>(`/match/${matchId}`);
    },
};
