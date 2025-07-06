import { Team } from "@/types/Types";
import PlayerCard from "./PlayerCard";

type Player = {
    player_id: string;
    player_id_i: string;
    player_logo: string;
    player_name: string;
    sub_t_id: string;
    team_id: string;
};

export default function TeamDisplay({
    team,
    players,
}: {
    team: Team;
    players: Player[];
}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-4">
                <img
                    src={team.team_logo}
                    onError={(e) => {
                        e.currentTarget.src = "/oss-logo-placeholder.png";
                    }}
                    className="h-12 w-12 rounded"
                />
                <h1 className="truncate text-2xl font-bold">
                    {team.team_name}
                </h1>
            </div>
            <div className="flex flex-col gap-4">
                {players.map((player: Player) => (
                    <PlayerCard key={player.player_id} player={player} />
                ))}
            </div>
        </div>
    );
}
