"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function ManageTournaments() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["tournament_info"],
        queryFn: () => api.get<any>("/tournament/current_tournaments"),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    const current_tournaments: {
        current_tournament: any;
        current_regular_season: any;
        current_playoffs: any;
    } = data;

    return (
        <div>
            <form className="mt-4 flex max-w-md flex-col gap-2">
                <label className="flex flex-col">
                    <span>Current Tournament ID</span>
                    <input
                        type="text"
                        className="bg-bgPrimary rounded border border-border p-2"
                        placeholder="Enter current tournament ID"
                        value={current_tournaments.current_tournament.t_id}
                        onChange={(e) => {}}
                    />
                </label>
                <label className="flex flex-col">
                    <span>Regular Season Tournament ID</span>
                    <input
                        type="text"
                        className="bg-bgPrimary rounded border border-border p-2"
                        placeholder="Enter regular season ID"
                        value={current_tournaments.current_regular_season.t_id}
                        onChange={(e) => {}}
                    />
                </label>
                <label className="flex flex-col">
                    <span>Playoff Tournament ID</span>
                    <input
                        type="text"
                        className="bg-bgPrimary rounded border border-border p-2"
                        placeholder="Enter playoff ID"
                        value={current_tournaments.current_playoffs.t_id}
                        onChange={(e) => {}}
                    />
                </label>
                <button
                    type="submit"
                    className="bg-accent mt-2 rounded p-2 font-semibold text-white"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
