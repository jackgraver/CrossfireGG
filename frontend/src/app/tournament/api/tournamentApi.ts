import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";
import type { Tournament } from "@/types/TournamentModel";
import type { Match } from "@/types/Types";
import type { Team } from "@/types/TeamModel";

export type TournamentListResponse = {
    tournaments: Tournament[];
};

export type Stage = {
    sub_t_id: string;
    t_id: string;
    t_name: string;
    format: string | null;
    is_current: boolean;
    start_date: number | null;
    end_date: number | null;
    groups?: {
        group_id: string;
        name: string;
    }[];
};

export type TournamentDetailResponse = {
    tournament: {
        t_id: string;
        t_name: string;
        start_date: number | null;
        end_date: number | null;
        faceit_id: string | null;
        teams_signed_up: number;
        stages: Stage[];
    };
    matches: Match[];
    teams: Team[];
};

export const tournamentApi = {
    getAllTournaments: async (): Promise<TournamentListResponse> => {
        return api.get<TournamentListResponse>("/tournament/all");
    },
    getTournamentById: async (
        tournamentId: string,
    ): Promise<TournamentDetailResponse> => {
        return api.get<TournamentDetailResponse>(`/tournament/${tournamentId}`);
    },
};
