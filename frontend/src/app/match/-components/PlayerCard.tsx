type Player = {
    player_id: string;
    player_id_i: string;
    player_logo: string;
    player_name: string;
    sub_t_id: string;
    team_id: string;
};

export default function PlayerCard({ player }: { player: Player }) {
    return (
        <div className="flex w-full flex-col rounded bg-zinc-900 p-4">
            <div className="flex items-center gap-4">
                <img
                    src={player.player_logo}
                    onError={(e) => {
                        if (
                            !e.currentTarget.src.includes(
                                "/oss-logo-placeholder.png",
                            )
                        ) {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/oss-logo-placeholder.png";
                        }
                    }}
                    alt={player.player_name}
                    className="h-12 w-12 rounded-full"
                    loading="lazy"
                />
                <div className="flex flex-col">
                    <span className="font-bold">{player.player_name}</span>
                </div>
            </div>
        </div>
    );
}
