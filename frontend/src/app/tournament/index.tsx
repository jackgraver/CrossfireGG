import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTournaments } from "./queries/tournamentQueries";
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
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tournaments.map((tournament) => (
                        <div
                            key={tournament.t_id}
                            onClick={() =>
                                navigate({
                                    to: `/tournament/${tournament.t_id}`,
                                })
                            }
                            className="bg-firstBg hover:bg-secondBg cursor-pointer rounded-xl p-6 shadow-md transition-all hover:shadow-lg"
                        >
                            <h2 className="text-textPrimary mb-3 text-2xl font-bold">
                                {tournament.t_name}
                            </h2>
                            <div className="text-textSecondary space-y-2">
                                {tournament.start_date && (
                                    <div>
                                        <span className="font-semibold">
                                            Start:{" "}
                                        </span>
                                        {formatDateOnly(tournament.start_date)}
                                    </div>
                                )}
                                {tournament.end_date && (
                                    <div>
                                        <span className="font-semibold">
                                            End:{" "}
                                        </span>
                                        {formatDateOnly(tournament.end_date)}
                                    </div>
                                )}
                                {tournament.stages &&
                                    tournament.stages.length > 0 && (
                                        <div>
                                            <span className="font-semibold">
                                                Stages:{" "}
                                            </span>
                                            {tournament.stages.length}
                                        </div>
                                    )}
                                {tournament.faceit_id ? (
                                    <div>
                                        <button onClick={() => {}}>
                                            Open in Faceit
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
