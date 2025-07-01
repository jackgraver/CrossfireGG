"use client";

import { useState } from "react";
import type { Match, MatchMap } from "@/types/Types";
import ViewSelector from "@/components/ViewSelector";
import OSSTable from "@/components/OSSTable";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { formatMatchDate } from "@/lib/dateUtils";
import { notFound } from "next/navigation";

/**
 * Extracts the map name from the map_name string (de_anubis -> Anubis)
 * @param map_name Map name to extract map name from
 * @returns Map name
 */
const getMapName = (map_name: string) => {
    const mapPart = map_name.split("_")[1];
    return mapPart.charAt(0).toUpperCase() + mapPart.slice(1);
};

type MatchStatsProps = {
    params: { match_id: string };
};

export default function MatchStats({ params }: MatchStatsProps) {
    const { match_id } = params;

    if (!match_id) return notFound();

    const [currentMapId, setCurrentMapId] = useState<string>("");

    const { data, isLoading, error } = useQuery({
        queryKey: ["match", match_id],
        queryFn: () =>
            api.get<{ match_info: Match; maps: MatchMap[] }>(
                `/stats/${match_id}`
            ),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const { match_info, maps } = data!;

    // Set initial current map if not set and maps are available
    if (currentMapId === "" && maps.length > 0) {
        setCurrentMapId(maps[0].map_id);
    }

    // Find the current map based on the selected map ID
    const currentMap =
        maps.find((map) => map.map_id === currentMapId) || maps[0];

    const mapViews = maps.map((map) => ({
        key: map.map_id,
        label: getMapName(map.map_name),
    }));

    const teamA =
        currentMap?.teams[0].players.flatMap((player) => ({
            player_name: player.player_name,
            kills: player.stats.kills,
            deaths: player.stats.deaths,
            assists: player.stats.assists,
            adr: player.stats.adr,
            damage: player.stats.damage,
        })) || [];
    const teamB =
        currentMap?.teams[1].players.flatMap((player) => ({
            player_name: player.player_name,
            kills: player.stats.kills,
            deaths: player.stats.deaths,
            assists: player.stats.assists,
            adr: player.stats.adr,
            damage: player.stats.damage,
        })) || [];

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Match Information Section */}
            <div className="mb-8 w-full max-w-6xl rounded-lg border border-border bg-bg p-6">
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                    {/* Teams and Score */}
                    <div className="flex items-center gap-6">
                        {/* Team 1 */}
                        <div className="flex items-center gap-3">
                            <img
                                src={match_info.teams.team1.team_logo}
                                alt={match_info.teams.team1.team_name}
                                className="h-12 w-12 rounded"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "/oss-logo-placeholder.png";
                                }}
                            />
                            <div className="text-center">
                                <div className="text-lg font-semibold text-text-primary">
                                    {match_info.teams.team1.team_name}
                                </div>
                                <div
                                    className={`text-2xl font-bold ${
                                        match_info.winner ===
                                        match_info.teams.team1.team_id
                                            ? "text-green-500"
                                            : "text-text-secondary"
                                    }`}
                                >
                                    {match_info.team1_score}
                                </div>
                            </div>
                        </div>

                        {/* VS */}
                        <div className="text-xl font-bold text-text-secondary">
                            VS
                        </div>

                        {/* Team 2 */}
                        <div className="flex items-center gap-3">
                            <div className="text-center">
                                <div className="text-lg font-semibold text-text-primary">
                                    {match_info.teams.team2.team_name}
                                </div>
                                <div
                                    className={`text-2xl font-bold ${
                                        match_info.winner ===
                                        match_info.teams.team2.team_id
                                            ? "text-green-500"
                                            : "text-text-secondary"
                                    }`}
                                >
                                    {match_info.team2_score}
                                </div>
                            </div>
                            <img
                                src={match_info.teams.team2.team_logo}
                                alt={match_info.teams.team2.team_name}
                                className="h-12 w-12 rounded"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "/oss-logo-placeholder.png";
                                }}
                            />
                        </div>
                    </div>

                    {/* Match Details */}
                    <div className="flex flex-col items-end gap-2 text-sm text-text-secondary">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-text-primary">
                                {match_info.round}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-text-primary">
                                {formatMatchDate(match_info.scheduled_at)}
                            </span>
                        </div>
                        {match_info.faceit_url && (
                            <a
                                href={match_info.faceit_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-500 transition-colors hover:text-blue-400"
                            >
                                <span>View on Faceit</span>
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>

                {/* Winner Highlight */}
                {match_info.winner && (
                    <div className="mt-4 rounded-lg border border-green-600/20 bg-green-600/10 p-3">
                        <div className="flex items-center gap-2">
                            <svg
                                className="h-5 w-5 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-semibold text-green-500">
                                Winner:{" "}
                                {match_info.winner ===
                                match_info.teams.team1.team_id
                                    ? match_info.teams.team1.team_name
                                    : match_info.teams.team2.team_name}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-6 pt-6">
                <ViewSelector
                    views={mapViews}
                    currentView={currentMapId}
                    onViewChange={(view) => {
                        setCurrentMapId(view);
                    }}
                />
            </div>
            <div className="flex flex-row gap-4">
                <OSSTable
                    data={teamA}
                    columns={[
                        {
                            header: "Player",
                            accessor: "player_name",
                        },
                        { header: "Kills", accessor: "kills" },
                        { header: "Deaths", accessor: "deaths" },
                        { header: "Assists", accessor: "assists" },
                        { header: "ADR", accessor: "adr" },
                        { header: "Damage", accessor: "damage" },
                    ]}
                />
                <OSSTable
                    data={teamB}
                    columns={[
                        {
                            header: "Player",
                            accessor: "player_name",
                        },
                        { header: "Kills", accessor: "kills" },
                        { header: "Deaths", accessor: "deaths" },
                        { header: "Assists", accessor: "assists" },
                        { header: "ADR", accessor: "adr" },
                        { header: "Damage", accessor: "damage" },
                    ]}
                />
            </div>
        </div>
    );
}
