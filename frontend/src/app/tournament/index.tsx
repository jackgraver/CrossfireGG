import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTournaments } from "./-queries/tournamentQueries";
import { formatDateOnly, toUnixTimestamp } from "@/lib/dateUtils";
import SignUpButton from "./-components/SignUpButton";
import { openInNewTab } from "@/lib/NewTab";

export const Route = createFileRoute("/tournament/")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();

    const session = Route.useRouteContext().session;

    const { data, isLoading, error } = useTournaments();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-textPrimary">Loading tournaments...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-red-500">
                    Error loading tournaments: {error.message}
                </div>
            </div>
        );
    }

    const tournaments = data?.tournaments || [];

    return (
        <div className="mx-auto min-h-screen max-w-[1200px] p-5">
            <h1 className="text-textPrimary mb-8 text-4xl font-bold">
                Tournaments
            </h1>
            {tournaments.length === 0 ? (
                <div className="text-textSecondary text-center">
                    No tournaments found
                </div>
            ) : (
                <div className="flex flex-col gap-8 text-gray-200">
                    {tournaments.map((tournament) => (
                        <div key={tournament.ID} className="flex flex-col gap-4">
                            <div
                                onClick={() =>
                                    navigate({
                                        to: `/tournament/${tournament.ID}`,
                                    })
                                }
                                className="cursor-pointer rounded-xl border border-neutral-700 bg-neutral-900 p-6 shadow-md transition-all hover:bg-neutral-800"
                            >
                                <h2 className="text-textPrimary mb-2 text-3xl font-bold">
                                    {tournament.name}
                                </h2>
                                {tournament.start_date &&
                                    tournament.end_date && (
                                        <div className="text-textSecondary">
                                            <span className="font-semibold">
                                                {formatDateOnly(
                                                    toUnixTimestamp(
                                                        tournament.start_date,
                                                    )!,
                                                )}
                                                {" - "}
                                                {formatDateOnly(
                                                    toUnixTimestamp(
                                                        tournament.end_date,
                                                    )!,
                                                )}
                                            </span>
                                        </div>
                                    )}
                            </div>
                            {tournament.stages && tournament.stages.length > 0 && (
                                <div className="flex flex-col gap-4 ml-4">
                                    {tournament.stages.map((stage) => (
                                        <div
                                            key={stage.ID}
                                            className="rounded-xl border border-neutral-700 bg-neutral-900 p-6 shadow-md"
                                        >
                                            <div className="flex items-center justify-between gap-6">
                                                <div className="flex-1">
                                                    <h3 className="text-textPrimary mb-2 text-xl font-bold">
                                                        {stage.name}
                                                    </h3>
                                                    <div className="text-textSecondary flex flex-wrap gap-4">
                                                        {stage.teams_count !== undefined && (
                                                            <div>
                                                                <span className="font-semibold">
                                                                    {stage.teams_count} / {stage.max_teams} teams
                                                                </span>
                                                            </div>
                                                        )}
                                                        {stage.start_date &&
                                                            stage.end_date && (
                                                                <div>
                                                                    <span className="font-semibold">
                                                                        {formatDateOnly(
                                                                            toUnixTimestamp(
                                                                                stage.start_date,
                                                                            )!,
                                                                        )}
                                                                        {" - "}
                                                                        {formatDateOnly(
                                                                            toUnixTimestamp(
                                                                                stage.end_date,
                                                                            )!,
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 flex-col gap-y-2">
                                                    {stage.faceit_id ? (
                                                        <button
                                                            onClick={(e) => {
                                                                openInNewTab(`https://www.faceit.com/en/championship/${stage.faceit_id}`);
                                                                e.stopPropagation();
                                                            }}
                                                            className="rounded-md bg-orange-500 px-4 py-2 font-bold text-gray-100 hover:bg-orange-600"
                                                        >
                                                            Open in Faceit
                                                        </button>
                                                    ) : null}
                                                    {true ? (
                                                        <SignUpButton session={session} />
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
