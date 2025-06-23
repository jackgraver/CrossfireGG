import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MatchMap, PlayerStats } from "../types/Types";
import ViewSelector from "../components/ViewSelector";
import OSSTable from "../components/OSSTable";

// Extended type to include player_name from the API
type PlayerStatsWithName = PlayerStats & {
    player_name: string;
};

export default function MatchStats() {
    const { match_id } = useParams();

    const [stats, setStats] = useState<Map<string, PlayerStatsWithName[]>>(
        new Map()
    );
    const [currentMap, setCurrentMap] = useState<string>("");

    useEffect(() => {
        // fetch(`http://localhost:8000/stats/${match_id}`)
        fetch(
            `http://localhost:8000/stats/1-d0f8a7df-6fa1-47b1-853f-08b3aee555df`
        )
            .then((response) => response.json())
            .then((data) => {
                // Group stats by map_id
                const groupedStats = new Map<string, PlayerStatsWithName[]>();

                data.forEach((stat: PlayerStatsWithName) => {
                    const mapId = stat.map_id;
                    if (!groupedStats.has(mapId)) {
                        groupedStats.set(mapId, []);
                    }
                    groupedStats.get(mapId)!.push(stat);
                });

                setStats(groupedStats);
                // Set the first map as current if available
                if (groupedStats.size > 0) {
                    setCurrentMap(Array.from(groupedStats.keys())[0]);
                }
            });
    }, [match_id]);

    const mapViews = Array.from(stats.keys()).map((mapId, index) => ({
        key: mapId,
        label: `Map ${index + 1}`,
    }));

    const currentStats = stats.get(currentMap) || [];

    return (
        <div>
            <div className="mb-6 flex justify-center pt-6">
                <ViewSelector
                    views={mapViews}
                    currentView={currentMap}
                    onViewChange={setCurrentMap}
                />
            </div>

            <OSSTable
                data={currentStats}
                headers={[
                    "Name",
                    "Kills",
                    "Deaths",
                    "Assists",
                    "ADR",
                    "Damage",
                ]}
                columnKeys={[
                    "player_name",
                    "kills",
                    "deaths",
                    "assists",
                    "adr",
                    "damage",
                ]}
                rowKey={(row) => `${row.player_id}-${row.map_id}`}
                emptyMessage="No stats available for this map"
            />
        </div>
    );
}
