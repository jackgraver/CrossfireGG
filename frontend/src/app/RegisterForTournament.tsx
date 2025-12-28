"use client";

import { api } from "@/lib/api";
import { Team } from "@/types/TeamModel";
import { SubTournament, Tournament } from "@/types/TournamentModel";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

type TournamentResponse = {
    current_tournament: Tournament;
    current_regular_season: SubTournament;
    current_playoffs: SubTournament;
};

export default function RegisterForTournament() {
    const navigate = useNavigate();

    const {
        data: tournamentData,
        isLoading: tournamentLoading,
        error: tournamentError,
    } = useQuery({
        queryKey: ["tournament"],
        queryFn: async () => {
            const res = await api.get<TournamentResponse>(
                "/tournament/current_tournament",
            );
            return {
                ...res,
                current_regular_season: {
                    number_of_teams: 0,
                    ...res.current_regular_season,
                },
            };
        },
    });

    const regSeasonId = tournamentData?.current_regular_season.sub_t_id ?? "";
    const {
        data: regSeasonTeams = [],
        isLoading: regSeasonLoading,
        error: regSeasonError,
    } = useQuery({
        queryKey: ["regseason_teams", regSeasonId],
        queryFn: () => api.get<Team[]>(`/team/${regSeasonId}/teams`),
        enabled: !!regSeasonId,
    });

    if (tournamentError) return <div>Error: {tournamentError.message}</div>;
    if (tournamentLoading) return <div>Loading Register</div>;
    if (regSeasonError) return <div>Error: {regSeasonError.message}</div>;
    if (regSeasonLoading) return <div>Loading Register</div>;

    const remainingSpots =
        16 - (tournamentData?.current_regular_season.number_of_teams ?? 0);

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl font-semibold text-textPrimary">
                Now VRS Enabled!
            </h2>
            {remainingSpots > 0 && <h3>{remainingSpots} Spots left!</h3>}
            <button
                className="mt-4 rounded bg-orange-500 px-3 py-1 pb-2 text-xl font-semibold text-textPrimary hover:bg-orange-400"
                onClick={() => navigate({ to: "/register" })}
            >
                Sign up for Season 9
            </button>
        </div>
    );
}
