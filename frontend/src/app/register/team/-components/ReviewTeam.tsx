import TeamLogo from "@/shared/bracket/atoms/TeamLogo";
import { useTeamPlayers } from "../-queries/registerQueries";

type ReviewTeamProps = {
    teamId: string;
    playerIds: string[];
    subIds: string[];
    coachIds: string[];
};

export default function ReviewTeam({ teamId, playerIds, subIds, coachIds }: ReviewTeamProps) {
    const { data: teamPlayers } = useTeamPlayers(teamId);

    const players = teamPlayers?.players.filter((player) => playerIds.includes(player.user_id)) ?? [];
    const subs = teamPlayers?.players.filter((player) => subIds.includes(player.user_id)) ?? [];
    const coaches = teamPlayers?.players.filter((player) => coachIds.includes(player.user_id)) ?? [];

    return (
        <div>
            <h1>Review your team</h1>
            <h2 className="text-lg font-bold">Starting Players</h2>
            <div className="flex flex-col gap-2">
                {players.map((player) => (
                    <Card key={player.user_id} avatar={player.avatar} name={player.nickname} />
                ))}
            </div>
            <h2 className="text-lg font-bold">Substitutes</h2>
            <div className="flex flex-col gap-2">
                {subs.map((sub) => (
                    <Card key={sub.user_id} avatar={sub.avatar} name={sub.nickname} />
                ))}
            </div>
            <h2 className="text-lg font-bold">Coaches</h2>
            <div className="flex flex-col gap-2">
                {coaches.map((coach) => (
                    <Card key={coach.user_id} avatar={coach.avatar} name={coach.nickname} />
                ))}
            </div>
        </div>
    );
}

function Card({
    avatar,
    name,
}: {
    avatar: string;
    name: string;
}) {
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
            </div>
        </div>
    )
}