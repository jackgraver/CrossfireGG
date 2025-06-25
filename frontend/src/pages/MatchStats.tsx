import { useState } from "react";
import { useParams } from "react-router-dom";
import type { Match, MatchMap } from "../types/Types";
import ViewSelector from "../components/ViewSelector";
import OSSTable from "../components/OSSTable";
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

/**
 * Extracts the map name from the map_name string (de_dust2 -> Dust2)
 * @param map_name Map name to extract map name from
 * @returns Map name
 */
const getMapName = (map_name: string) => {
    return (
        map_name.split("_")[1].charAt(0).toUpperCase() +
        map_name.split("_")[1].slice(1)
    );
};

export default function MatchStats() {
    const { match_id } = useParams();

    // const [currentMap, setCurrentMap] = useState<MatchMap | null>(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ["match", match_id],
        queryFn: () =>
            api.get<{ match: Match; maps: MatchMap[] }>(`/stats/${match_id}`),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const { match, maps } = data!;

    const currentMap = maps[0];

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
        <div className="flex flex-col justify-center items-center">
            <div className="mb-6 pt-6">
                <ViewSelector
                    views={mapViews}
                    currentView={currentMap?.map_id || ""}
                    onViewChange={(view) => {
                        // setCurrentMap(maps.find((map) => map.map_id === view)!);
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
