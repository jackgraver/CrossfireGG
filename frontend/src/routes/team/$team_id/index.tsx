import { createFileRoute } from "@tanstack/react-router";
import { useTeam, useTeamTournaments } from "@/lib/api/team.queries";

export const Route = createFileRoute("/team/$team_id/")({
    component: TeamOverview,
});

function TeamOverview() {
    const { team_id } = Route.useParams();
    const { data: team, isLoading, error } = useTeam(team_id);
    const {
        data: tournaments,
        isLoading: loadingTournaments,
        error: errorTournaments,
    } = useTeamTournaments(team_id);

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

    if (tournaments?.length === 0) {
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
            <h1 className="text-4xl">Events Played In</h1>
            {loadingTournaments && <div>Loading...</div>}
            {tournaments?.map((tournament) => (
                <div key={tournament.id} className="rounded-xl shadow-md">
                    <div className="border-border flex flex-row gap-4 border-b p-4">
                        <h2 className="text-textPrimary text-lg font-semibold">
                            {tournament.name}
                        </h2>
                        <span className="text-textSecondary pt-1 font-semibold">
                            8-12th
                        </span>
                    </div>
                    <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
                        {tournament.stages.map((stage) => (
                            <>
                                {stage.stageTeams.length === 1 && (
                                    <div
                                        key={stage.id}
                                        className="border-border bg-secondBg rounded-lg border p-4"
                                    >
                                        <h3 className="text-textPrimary mb-3 font-medium">
                                            {stage.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-3 text-sm">
                                            {stage.stageTeams[0].wins !==
                                                undefined &&
                                                stage.stageTeams[0].losses !==
                                                    undefined && (
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-textSecondary">
                                                            Record:
                                                        </span>
                                                        <span className="text-textPrimary font-medium">
                                                            {
                                                                stage
                                                                    .stageTeams[0]
                                                                    .wins
                                                            }
                                                            W -{" "}
                                                            {
                                                                stage
                                                                    .stageTeams[0]
                                                                    .losses
                                                            }
                                                            L
                                                        </span>
                                                    </div>
                                                )}
                                            {stage &&
                                                stage.stageTeams[0] &&
                                                stage.stageTeams[0].seed &&
                                                stage.stageTeams[0].seed >
                                                    0 && (
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-textSecondary">
                                                            Seed:
                                                        </span>
                                                        <span className="text-textPrimary font-medium">
                                                            #
                                                            {
                                                                stage
                                                                    .stageTeams[0]
                                                                    .seed
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
