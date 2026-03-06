import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTeam, useTeamPlayers } from "@/lib/api/team.queries";
import PlayerCard from "./-components/PlayerCard";
import { PlayerDTO } from "@repo/contracts";

export const Route = createFileRoute("/team/$team_id/members")({
    component: MembersPage,
});

type ViewMode = "all" | "by-stage";

function MembersPage() {
    const { team_id } = Route.useParams();
    const [viewMode, setViewMode] = useState<ViewMode>("all");

    const { data: teamData } = useTeam(team_id);
    const { data: players, isLoading } = useTeamPlayers(team_id);

    return (
        <>
            <div className="border-border flex items-center justify-between border-b p-4">
                <h2 className="text-textPrimary text-lg font-semibold">
                    Team Members
                </h2>
                <div className="bg-secondBg flex rounded-lg p-1">
                    <button
                        onClick={() => setViewMode("all")}
                        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                            viewMode === "all"
                                ? "bg-thirdBg text-textPrimary"
                                : "text-textSecondary hover:text-textPrimary"
                        }`}
                    >
                        All Players
                    </button>
                    <button
                        onClick={() => setViewMode("by-stage")}
                        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                            viewMode === "by-stage"
                                ? "bg-thirdBg text-textPrimary"
                                : "text-textSecondary hover:text-textPrimary"
                        }`}
                    >
                        By Stage
                    </button>
                </div>
            </div>
            <div className="p-4">
                {isLoading ? (
                    <div className="text-textSecondary py-8 text-center">
                        Loading players...
                    </div>
                ) : !players || players.length === 0 ? (
                    <div className="text-textSecondary py-8 text-center">
                        No players on this team
                    </div>
                ) : viewMode === "all" ? (
                    <AllPlayersView
                        players={players}
                        stages={[]}
                        teamCaptainId={teamData?.team_captain_id}
                    />
                ) : (
                    <ByStageView players={players} stages={[]} />
                )}
            </div>
        </>
    );
}

function AllPlayersView({
    players,
    stages,
    teamCaptainId,
}: {
    players: PlayerDTO[];
    stages: { stage_id: string; stage_name: string; tournament_name: string }[];
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
                    stageBadges={stages.map((s) => ({
                        stage_name: s.stage_name,
                        tournament_name: s.tournament_name,
                    }))}
                />
            ))}
        </div>
    );
}

function ByStageView({
    players,
    stages,
}: {
    players: PlayerDTO[];
    stages: { stage_id: string; stage_name: string; tournament_name: string }[];
}) {
    const [selectedStageId, setSelectedStageId] = useState<string | null>(
        stages[0]?.stage_id || null,
    );

    if (stages.length === 0) {
        return (
            <div className="text-textSecondary py-8 text-center">
                No stages available
            </div>
        );
    }

    return (
        <div>
            <div className="mb-4 flex flex-wrap gap-2">
                {stages.map((stage) => (
                    <button
                        key={stage.stage_id}
                        onClick={() => setSelectedStageId(stage.stage_id)}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                            selectedStageId === stage.stage_id
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-secondBg text-textSecondary hover:bg-thirdBg"
                        }`}
                    >
                        {stage.stage_name}
                    </button>
                ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
                {players.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                ))}
            </div>
            <p className="text-textSecondary mt-4 text-center text-sm">
                Stage-specific rosters coming soon
            </p>
        </div>
    );
}
