import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTournaments } from "./-queries/tournamentQueries";
import { formatDateOnly } from "@/lib/dateUtils";

export const Route = createFileRoute("/tournament/")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();
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
                <div className="flex flex-col gap-6 text-gray-200">
                    {tournaments.map((tournament) => (
                        <div
                            key={tournament.t_id}
                            onClick={() =>
                                navigate({
                                    to: `/tournament/${tournament.t_id}`,
                                })
                            }
                            className="cursor-pointer rounded-xl border border-neutral-700 bg-neutral-900 p-6 shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg"
                        >
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex-1">
                                    <h2 className="text-textPrimary mb-3 text-2xl font-bold">
                                        {tournament.t_name}
                                    </h2>
                                    <div className="text-textSecondary flex flex-wrap gap-4">
                                        {tournament.start_date &&
                                            tournament.end_date && (
                                                <div>
                                                    <span className="font-semibold">
                                                        {formatDateOnly(
                                                            tournament.start_date,
                                                        )}
                                                        -
                                                        {formatDateOnly(
                                                            tournament.end_date,
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        {tournament.stages &&
                                            tournament.stages.length > 0 && (
                                                <div>
                                                    <span>Stages: </span>
                                                    {tournament.stages.map(
                                                        (stage) => (
                                                            <span
                                                                key={
                                                                    stage.sub_t_id
                                                                }
                                                                className="font-semibold"
                                                            >
                                                                {
                                                                    stage.t_name
                                                                }{" "}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    {true ? ( // TODO: make sure faceit id is not null
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className="rounded-md bg-orange-500 px-4 py-2 font-bold text-gray-100 hover:bg-orange-600"
                                        >
                                            Open in Faceit
                                        </button>
                                    ) : null}
                                    {true ? ( // TODO: make sure sign up open and not already signed up
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className="rounded-md bg-blue-500 px-4 py-2 font-bold text-gray-100 hover:bg-blue-600"
                                        >
                                            Sign Up
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
