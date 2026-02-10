import { createFileRoute } from "@tanstack/react-router";
import { useTeam } from "@/lib/api/team.queries";
//TODO: Boolean Status?

export const Route = createFileRoute("/team/$team_id/")({
    component: TeamOverview,
});

function TeamOverview() {
    const { team_id } = Route.useParams();
    const { data: team, isLoading, error } = useTeam(team_id);

    if (isLoading) {
        return (
            <div className="text-textSecondary py-8 text-center">
                Loading overview...
            </div>
        );
    }

    if (error || !team) {
        return (
            <div className="text-textSecondary py-8 text-center">
                Failed to load team data
            </div>
        );
    }

    const tournaments: [] = [];

    if (tournaments.length === 0) {
        return (
            <div className="bg-firstBg rounded-xl p-8 text-center shadow-md">
                <p className="text-textSecondary">
                    This team hasn't participated in any tournaments yet.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {tournaments.map((tournament: any) => (
                <div
                    key={tournament.tournament_id}
                    className="bg-firstBg rounded-xl shadow-md"
                >
                    <div className="border-border border-b p-4">
                        <h2 className="text-textPrimary text-lg font-semibold">
                            {tournament.tournament_name}
                        </h2>
                    </div>
                    <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
                        {tournament.stages.map((stage: any) => (
                            <div
                                key={stage.stage_id}
                                className="border-border bg-secondBg rounded-lg border p-4"
                            >
                                <h3 className="text-textPrimary mb-3 font-medium">
                                    {stage.stage_name}
                                </h3>
                                <div className="flex flex-wrap gap-3 text-sm">
                                    {stage.wins !== undefined &&
                                        stage.losses !== undefined && (
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-textSecondary">
                                                    Record:
                                                </span>
                                                <span className="text-textPrimary font-medium">
                                                    {stage.wins}W -{" "}
                                                    {stage.losses}L
                                                </span>
                                            </div>
                                        )}
                                    {stage.seed !== undefined &&
                                        stage.seed > 0 && (
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-textSecondary">
                                                    Seed:
                                                </span>
                                                <span className="text-textPrimary font-medium">
                                                    #{stage.seed}
                                                </span>
                                            </div>
                                        )}
                                </div>
                                {(stage.paid !== undefined ||
                                    stage.joined_tournament !== undefined) && (
                                    <div className="mt-3 flex gap-2">
                                        {stage.joined_tournament !==
                                            undefined && (
                                            <span
                                                className={`rounded px-2 py-0.5 text-xs font-medium ${
                                                    stage.joined_tournament
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-yellow-500/20 text-yellow-400"
                                                }`}
                                            >
                                                {stage.joined_tournament
                                                    ? "Signed Up"
                                                    : "Not Signed Up"}
                                            </span>
                                        )}
                                        {stage.paid !== undefined && (
                                            <span
                                                className={`rounded px-2 py-0.5 text-xs font-medium ${
                                                    stage.paid
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-red-500/20 text-red-400"
                                                }`}
                                            >
                                                {stage.paid ? "Paid" : "Unpaid"}
                                            </span>
                                        )}
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
