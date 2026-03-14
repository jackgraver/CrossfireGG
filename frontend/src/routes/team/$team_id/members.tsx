import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useTeam, useTeamPlayers } from "@/lib/api/team.queries";
import PlayerCard from "./-components/PlayerCard";
import { PlayerDTO } from "@repo/contracts";
import { Users } from "lucide-react";

export const Route = createFileRoute("/team/$team_id/members")({
    component: MembersPage,
});

function MembersPage() {
    const { team_id } = Route.useParams();
    const { data: teamData } = useTeam(team_id);
    const { data: players, isLoading } = useTeamPlayers(team_id);

    return (
        <>
            {isLoading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="border-border bg-firstBg flex items-center gap-4 rounded-lg border p-4">
                            <div className="bg-thirdBg h-12 w-12 animate-pulse rounded-full" />
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="bg-thirdBg h-5 w-32 animate-pulse rounded-md" />
                                <div className="bg-thirdBg h-4 w-20 animate-pulse rounded-md" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : !players || players.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                    <Users className="text-textSecondary h-10 w-10" />
                    <p className="text-textSecondary">No players on this team</p>
                </div>
            ) : (
                <AllPlayersView
                    players={players}
                    teamCaptainId={teamData?.team_captain_id}
                />
            )}
        </>
    );
}

function AllPlayersView({
    players,
    teamCaptainId,
}: {
    players: PlayerDTO[];
    teamCaptainId?: number;
}) {
    const sortedPlayers = useMemo(() => {
        return [...players].sort((a, b) => {
            const getRank = (p: typeof a) => {
                if (p.id === teamCaptainId) return 0;
                switch (p.base_role) {
                    case "starter":
                        return 1;
                    case "sub":
                        return 2;
                    case "coach":
                        return 3;
                    default:
                        return 4;
                }
            };
            return getRank(a) - getRank(b);
        });
    }, [players, teamCaptainId]);

    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {sortedPlayers.map((player) => (
                <PlayerCard
                    key={player.id}
                    player={player}
                    isCaptain={player.id === teamCaptainId}
                />
            ))}
        </div>
    );
}
