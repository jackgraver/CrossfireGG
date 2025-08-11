"use client";

import { api } from "@/lib/api";
import { SubTournament, Tournament } from "@/types/TournamentModel";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function RegisterForTournament() {
    const router = useRouter();

    const {
        data: tournamentData,
        isLoading: tournamentLoading,
        error: tournamentError,
    } = useQuery({
        queryKey: ["tournament"],
        queryFn: () =>
            api.get<{
                current_tournament: Tournament;
                current_regular_season: SubTournament;
                current_playoffs: SubTournament;
            }>("/tournament/current_tournaments"),
    });

    if (tournamentError) {
        return <div>Error: {tournamentError?.message}</div>;
    }

    if (tournamentLoading) {
        return <div>Loading Register</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl font-semibold text-textPrimary">
                Now VRS Enabled!
            </h2>
            {!tournamentLoading &&
                tournamentData?.current_regular_season?.number_of_teams !=
                    null &&
                tournamentData.current_regular_season.number_of_teams < 16 && (
                    <h3>
                        {tournamentData.current_regular_season.number_of_teams}{" "}
                        Spots left!
                    </h3>
                )}
            <button
                className="pb mt-4 rounded bg-orange-500 px-3 pb-2 pt-1 text-xl font-semibold text-textPrimary hover:bg-orange-400"
                onClick={() => router.push("/register")}
            >
                Sign up for Season 9
            </button>
        </div>
    );
}
