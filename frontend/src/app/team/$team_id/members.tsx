import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTeam, useTeamPlayers } from "../-queries/team.queries";
import type { Player } from "@/types/PlayerModel";

export const Route = createFileRoute("/team/$team_id/members")({
    component: MembersPage,
});

type ViewMode = "all" | "by-stage";

function MembersPage() {
    const { team_id } = Route.useParams();
    const [viewMode, setViewMode] = useState<ViewMode>("all");

    const { data: teamData } = useTeam(team_id);
    const { data: players, isLoading } = useTeamPlayers(team_id);

    const stages =
        teamData?.tournaments.flatMap((t) =>
            t.stages.map((s) => ({ ...s, tournament_name: t.tournament_name })),
        ) || [];

    return (
        <div className="bg-firstBg rounded-xl shadow-md">
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
                        stages={stages}
                        teamCaptainId={teamData?.team.team_captain_id}
                    />
                ) : (
                    <ByStageView players={players} stages={stages} />
                )}
            </div>
        </div>
    );
}

function PlayerCard({
    player,
    isCaptain,
    stageBadges,
}: {
    player: Player;
    isCaptain?: boolean;
    stageBadges?: { stage_name: string; tournament_name: string }[];
}) {
    return (
        <div className="border-border bg-secondBg flex items-center gap-4 rounded-lg border p-4">
            {player.player_logo ? (
                <img
                    src={player.player_logo}
                    alt={player.player_name}
                    className="h-12 w-12 rounded-full object-cover"
                />
            ) : (
                <div className="bg-thirdBg text-textSecondary flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                    {player.player_name.charAt(0).toUpperCase()}
                </div>
            )}
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <span className="text-textPrimary truncate font-semibold">
                        {player.player_name}
                    </span>
                    {isCaptain && (
                        <span className="rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs font-medium text-yellow-400">
                            Captain
                        </span>
                    )}
                </div>
                {stageBadges && stageBadges.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                        {stageBadges.map((badge, idx) => (
                            <span
                                key={idx}
                                className="bg-thirdBg text-textSecondary rounded px-1.5 py-0.5 text-xs"
                                title={badge.tournament_name}
                            >
                                {badge.stage_name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {player.faceit_id && (
                <a
                    href={`https://www.faceit.com/en/players/${player.player_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-textSecondary hover:text-textPrimary shrink-0 text-sm"
                    onClick={(e) => e.stopPropagation()}
                >
                    FACEIT →
                </a>
            )}
        </div>
    );
}

function AllPlayersView({
    players,
    stages,
    teamCaptainId,
}: {
    players: Player[];
    stages: { stage_id: string; stage_name: string; tournament_name: string }[];
    teamCaptainId?: string;
}) {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {players.map((player) => (
                <PlayerCard
                    key={player.player_id}
                    player={player}
                    isCaptain={player.player_id === teamCaptainId}
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
    players: Player[];
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
                    <PlayerCard key={player.player_id} player={player} />
                ))}
            </div>
            <p className="text-textSecondary mt-4 text-center text-sm">
                Stage-specific rosters coming soon
            </p>
        </div>
    );
}
