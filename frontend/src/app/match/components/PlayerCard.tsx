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
                        e.currentTarget.src = "/oss-logo-placeholder.png";
                    }}
                    className="h-12 w-12 rounded-full"
                />
                <div className="flex flex-col">
                    <span className="font-bold">{player.player_name}</span>
                    <span className="text-xs text-gray-400">
                        CountryFlag · Name
                    </span>
                </div>
                {/* <div className="ml-auto text-right text-xl font-bold">2500</div> */}
            </div>
            {/* <div className="mt-2 flex justify-between text-xs text-gray-400">
                <div>
                    <div>Matches</div>
                    <div className="font-bold text-white">1,987</div>
                </div>
                <div>
                    <div>Win rate</div>
                    <div className="font-bold text-white">55%</div>
                </div>
                <div>
                    <div>ADR / HS</div>
                    <div className="font-bold text-white">87.1 / 58%</div>
                </div>
                <div>
                    <div>K/D / K/R</div>
                    <div className="font-bold text-white">1.13 / 0.80</div>
                </div>
            </div> */}
        </div>
    );
}
