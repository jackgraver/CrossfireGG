import { createFileRoute, Link } from "@tanstack/react-router";
import { useTeam, useTeamTournaments } from "@/lib/api/team.queries";
import { PlacementOrdinal } from "@/components/shared/PlacementOrdinal";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/team/$team_id/")({
    component: TeamOverview,
});

function TeamOverview() {
    const { team_id } = Route.useParams();
    const { data: team, isLoading, error } = useTeam(team_id);
    const { data: tournaments, isLoading: loadingTournaments } = useTeamTournaments(team_id);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-6">
                <div className="bg-thirdBg h-10 w-56 animate-pulse rounded-md" />
                <div className="rounded-xl shadow-md">
                    <div className="border-border border-b p-4">
                        <div className="bg-thirdBg h-6 w-48 animate-pulse rounded-md" />
                    </div>
                    <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-thirdBg h-24 animate-pulse rounded-lg" />
                        <div className="bg-thirdBg h-24 animate-pulse rounded-lg" />
                    </div>
                </div>
                <div className="rounded-xl shadow-md">
                    <div className="border-border border-b p-4">
                        <div className="bg-thirdBg h-6 w-48 animate-pulse rounded-md" />
                    </div>
                    <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-thirdBg h-24 animate-pulse rounded-lg" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !team) {
        return <div className="text-textSecondary py-8 text-center">Failed to load team data</div>;
    }

    if (tournaments?.length === 0) {
        return (
            <div className="bg-firstBg flex flex-col items-center gap-3 rounded-xl p-12 text-center shadow-md">
                <Trophy className="text-textSecondary h-10 w-10" />
                <p className="text-textSecondary">
                    This team hasn't participated in any tournaments yet.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {loadingTournaments && (
                <div className="rounded-xl shadow-md">
                    <div className="border-border border-b p-4">
                        <div className="bg-thirdBg h-6 w-48 animate-pulse rounded-md" />
                    </div>
                    <div className="grid gap-3 p-4 sm:grid-cols-2">
                        <div className="bg-thirdBg h-24 animate-pulse rounded-lg" />
                        <div className="bg-thirdBg h-24 animate-pulse rounded-lg" />
                    </div>
                </div>
            )}
            {tournaments?.map((tournament) => (
                <div key={tournament.id} className="rounded-xl shadow-md">
                    <div className="gap flex flex-row items-center pb-2">
                        <Link
                            to="/tournament/$tournamentId/stage/$stageId/bracket"
                            params={{
                                tournamentId: tournament.id.toString(),
                                stageId: String(tournament.stages[0]?.id ?? ""),
                            }}
                            className="text-textPrimary hover:text-cfRed text-xl font-bold transition-colors"
                        >
                            {tournament.name}
                        </Link>
                        {tournament.placement != null && tournament.placement !== "" && (
                            <div className="pl-4">
                                <PlacementOrdinal placement={tournament.placement} />
                            </div>
                        )}
                    </div>
                    <div className="grid gap-3 pb-2 sm:grid-cols-2 lg:grid-cols-3">
                        {tournament.stages.map((stage) => (
                            <div key={stage.id}>
                                {stage.stageTeams.length === 1 && (
                                    <div className="border-border bg-firstBg hover:bg-secondBg rounded-lg border p-4 transition-colors">
                                        <h3 className="text-textPrimary mb-3 font-medium">
                                            {stage.name}
                                        </h3>
                                        <h2></h2>
                                        <article className="flex flex-wrap gap-3 text-sm">
                                            {stage.stageTeams[0].wins !== undefined &&
                                                stage.stageTeams[0].losses !== undefined && (
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-textSecondary">
                                                            Record:
                                                        </span>
                                                        <span className="font-bold text-green-500">
                                                            {stage.stageTeams[0].wins}W
                                                        </span>
                                                        <span className="text-textSecondary">
                                                            -
                                                        </span>
                                                        <span className="font-bold text-red-500">
                                                            {stage.stageTeams[0].losses}L
                                                        </span>
                                                    </div>
                                                )}
                                            {stage.stageTeams[0]?.seed &&
                                                stage.stageTeams[0].seed > 0 && (
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-textSecondary">
                                                            Seed:
                                                        </span>
                                                        <span className="text-textPrimary font-medium">
                                                            #{stage.stageTeams[0].seed}
                                                        </span>
                                                    </div>
                                                )}
                                        </article>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
