import TeamLogo from "@/shared/bracket/atoms/TeamLogo";
import { useTeamPlayers } from "../-queries/registerTeam.queries";
import { Player } from "../-types/registration.types";

type ReviewTeamProps = {
    teamId: string;
    players: Player[];
    subs: Player[];
    coach: Player | null;
};

export default function ReviewTeam({ teamId, players, subs, coach }: ReviewTeamProps) {
    return (
        <div>
            {players.length > 0 && (
                <>
                    <h2 className="text-lg font-bold">Starting 5</h2>
                    <div className="flex flex-col gap-2">
                        {players.map((player) => (
                            <Card
                                key={player.faceitId}
                                avatar={player.avatar}
                                name={player.playerName}
                            />
                        ))}
                    </div>
                </>
            )}
            {subs.length > 0 && (
                <>
                    <h2 className="text-lg font-bold">Substitutes</h2>
                    <div className="flex flex-col gap-2">
                        {subs.map((sub) => (
                            <Card key={sub.faceitId} avatar={sub.avatar} name={sub.playerName} />
                        ))}
                    </div>
                </>
            )}
            {coach && (
                <>
                    <h2 className="text-lg font-bold">Coach</h2>
                    <div className="flex flex-col gap-2">
                        <Card key={coach.faceitId} avatar={coach.avatar} name={coach.playerName} />
                    </div>
                </>
            )}
        </div>
    );
}

function Card({ avatar, name }: { avatar: string; name: string }) {
    return (
        <div className="flex w-full flex-col items-center pr-2">
            <div
                className={`group grid w-full grid-cols-[48px_1fr_32px] items-center rounded-lg border p-2 transition-colors duration-150 border-gray-600`}
            >
                <TeamLogo
                    avatar={avatar ?? "/oss-logo-placeholder.png"}
                    styling="h-12 w-12 rounded-full object-cover"
                />
                <p className="px-3 text-lg font-medium">{name}</p>
                🇨🇦
            </div>
        </div>
    );
}
