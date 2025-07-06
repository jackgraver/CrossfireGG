type Map = {
    map_id: string;
    match_id: string;
    map_name: string;
    round: number;
    winner_id: string;
    team1_score: number;
    team2_score: number;
};

const formatScore = (score: number, winner: boolean) => {
    if (winner) {
        return <p className="text-green-500">{score}</p>;
    }
    return <p className="text-red-500">{score}</p>;
};

export default function MapResults({ maps }: { maps: Map[] }) {
    return (
        <div className="flex w-full flex-col gap-2">
            {maps.map((map: Map, i: number) => (
                <div
                    key={i}
                    className={`flex items-center justify-between rounded bg-zinc-800 px-4 py-2 ${
                        map.team1_score ? "text-white" : "text-gray-500"
                    }`}
                >
                    <div className="flex flex-row items-center gap-x-4">
                        <img
                            src={`/map_icons/${map.map_name}.png`}
                            alt={map.map_name}
                            className="h-8 w-8 flex-shrink-0 rounded object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "/map_icons/default.png";
                            }}
                        />
                        <span className="font-semibold">{map.map_name}</span>
                    </div>

                    <span className="flex flex-row gap-x-0.5">
                        {formatScore(
                            map.team1_score,
                            map.team1_score > map.team2_score,
                        )}
                        <p>-</p>
                        {formatScore(
                            map.team2_score,
                            map.team2_score > map.team1_score,
                        )}
                    </span>
                </div>
            ))}
        </div>
    );
}
