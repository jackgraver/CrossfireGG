"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import MatchHeader from "../components/MatchHeader";
import PlayerCard from "../components/PlayerCard";
import MapResults from "../components/MapResults";
import TeamDisplay from "../components/TeamDisplay";
import { useRouter } from "next/navigation";

type MatchProps = {
    params: Promise<{ match_id: string }>;
};

type Player = {
    player_id: string;
    player_id_i: string;
    player_logo: string;
    player_name: string;
    sub_t_id: string;
    team_id: string;
};

type Map = {
    map_id: string;
    match_id: string;
    map_name: string;
    round: number;
    winner_id: string;
    team1_score: number;
    team2_score: number;
};

export default function MatchPage({ params }: MatchProps) {
    const router = useRouter();

    const { match_id } = use(params);

    const { data, isLoading, error } = useQuery({
        queryKey: ["match", match_id],
        queryFn: () => api.get<any>(`/match/${match_id}`),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    const { team1, team2 } = { team1: data.team1, team2: data.team2 };
    const players1 = data.players1;
    const players2 = data.players2;
    const match = data.match;
    const maps: Map[] = data.maps;

    return (
        <div className="flex min-h-screen w-full flex-col items-center bg-black px-4 py-8 text-white">
            <MatchHeader team1={team1} team2={team2} match={match} />

            <div className="mt-8 flex w-full max-w-7xl flex-row gap-8">
                <div className="w-1/3">
                    <TeamDisplay team={team1} players={players1} />
                </div>

                <div className="flex w-[320px] flex-col items-center justify-start gap-6 pt-16">
                    <div className="flex flex-col gap-4 text-center">
                        <button
                            className="rounded bg-orange-500 px-6 py-2 text-sm font-bold"
                            onClick={() =>
                                window.open(match.faceit_url, "_blank")
                            }
                        >
                            VIEW FACEIT PAGE
                        </button>
                        {match.status === "FINISHED" && (
                            <button
                                className="rounded bg-blue-500 px-6 py-2 text-sm font-bold"
                                onClick={() =>
                                    router.push(
                                        `/match/${match.match_id}/stats`,
                                    )
                                }
                            >
                                MATCH STATS
                            </button>
                        )}
                    </div>
                    <MapResults maps={maps} />
                </div>

                <div className="w-1/3">
                    <TeamDisplay team={team2} players={players2} />
                </div>
            </div>
        </div>
    );
}
