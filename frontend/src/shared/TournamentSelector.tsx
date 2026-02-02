import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface TournamentSelectorProps {
    selectedTournament: string | null;
    onTournamentChange: (tournamentId: string) => void;
}

export default function TournamentSelector({
    selectedTournament,
    onTournamentChange,
}: TournamentSelectorProps) {
    const {
        data: tournamentData,
        isLoading: tournamentsLoading,
        error: tournamentsError,
    } = useQuery({
        queryKey: ["tournaments"],
        queryFn: () =>
            api.get<{
                tournaments: any[];
            }>("/tournament/all"),
    });

    if (tournamentsError) {
        return <div>Error: {tournamentsError?.message}</div>;
    }
    if (tournamentsLoading) {
        return <div>Loading tournaments...</div>;
    }

    // const tournaments = tournamentData?.tournaments || [];

    // return (
    //     <div className="flex flex-col items-center gap-2">
    //         <select
    //             id="tournament-select"
    //             value={selectedTournament || ""}
    //             onChange={(e) => onTournamentChange(e.target.value || "")}
    //             className="text-text-primary bg-secondBg focus:border-thirdBg rounded-lg px-4 py-2 shadow-sm focus:outline-none"
    //         >
    //             {tournaments.map((tournament) => (
    //                 <option key={tournament.t_id} value={tournament.t_id}>
    //                     {tournament.t_name}
    //                 </option>
    //             ))}
    //         </select>
    //     </div>
    // );
}
