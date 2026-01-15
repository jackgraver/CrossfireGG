import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAllTournaments } from "./-queries/tournamentsQueries";
import { formatDateOnly, toUnixTimestamp } from "@/lib/dateUtils";
import SignUpButton from "./-components/SignUpButton";
import { openInNewTab } from "@/lib/NewTab";
import { Trophy, Clock, Users, ExternalLink, Calendar } from "lucide-react";

export const Route = createFileRoute("/tournament/")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();
    const session = Route.useRouteContext().session;
    const { data, isLoading, error } = useAllTournaments();

    // if (isLoading) {
    //     return (
    //         <div className="flex min-h-screen items-center justify-center">
    //             <div className="text-textPrimary flex animate-pulse flex-col items-center gap-4">
    //                 <div className="border-cfRed h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
    //                 <span className="text-sm font-bold tracking-widest uppercase">
    //                     Loading tournaments...
    //                 </span>
    //             </div>
    //         </div>
    //     );
    // }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="max-w-md rounded-xl border border-red-500/50 bg-red-500/10 p-6 text-center">
                    <h2 className="mb-2 text-xl font-bold text-red-500">
                        Error Loading Tournaments
                    </h2>
                    <p className="text-textSecondary text-sm">
                        {error.message}
                    </p>
                </div>
            </div>
        );
    }

    const tournaments = data || [];

    return (
        <div className="mx-auto min-h-screen max-w-[1200px] p-6">
            <header className="border-border/40 border-b pb-12 md:pb-16">
                <h1 className="text-textPrimary text-5xl font-black tracking-tight md:text-6xl">
                    Tournaments
                </h1>
                <p className="text-textSecondary mt-4 text-sm font-bold tracking-widest uppercase opacity-60">
                    Browse and compete in upcoming seasons
                </p>
            </header>
            {isLoading ? (
                <div className="flex min-h-screen justify-center pt-24">
                    <div className="text-textPrimary flex animate-pulse flex-col items-center gap-4">
                        <div className="border-cfRed h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
                        <span className="text-sm font-bold tracking-widest uppercase">
                            Loading tournaments...
                        </span>
                    </div>
                </div>
            ) : (
                <>
                    {tournaments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 opacity-20">
                            <Trophy size={64} strokeWidth={1} />
                            <p className="mt-4 text-sm font-bold tracking-widest uppercase">
                                No tournaments found
                            </p>
                        </div>
                    ) : (
                        <div className="mt-12 space-y-24">
                            {tournaments.map((tournament) => (
                                <section key={tournament.ID} className="group">
                                    <div
                                        onClick={() =>
                                            navigate({
                                                to: `/tournament/${tournament.ID}/stage/${tournament.stages[0]?.ID}`,
                                            })
                                        }
                                        className="border-border/20 flex cursor-pointer flex-col justify-between gap-6 border-b pb-8 transition-all md:flex-row md:items-end"
                                    >
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <span className="bg-cfRed rounded-full px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase">
                                                    Season
                                                </span>
                                                {tournament.start_date && (
                                                    <span className="text-textSecondary flex items-center gap-1.5 text-xs font-medium">
                                                        <Clock
                                                            size={14}
                                                            className="opacity-50"
                                                        />
                                                        {formatDateOnly(
                                                            toUnixTimestamp(
                                                                tournament.start_date,
                                                            )!,
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            <h2 className="text-textPrimary text-4xl font-black tracking-tight transition-colors md:text-5xl">
                                                {tournament.name}
                                            </h2>
                                        </div>
                                        <div className="text-cfRed flex items-center gap-2">
                                            <span className="text-xs font-black tracking-widest uppercase">
                                                View Details
                                            </span>
                                            <ExternalLink size={16} />
                                        </div>
                                    </div>
                                    {tournament.stages &&
                                        tournament.stages.length > 0 && (
                                            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                {tournament.stages.map(
                                                    (stage: any) => (
                                                        <div
                                                            key={stage.ID}
                                                            className="bg-secondBg/30 hover:bg-secondBg/60 relative flex flex-col justify-between gap-6 rounded-2xl p-6 transition-all"
                                                        >
                                                            <div className="space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <h3 className="text-textPrimary text-xl font-black tracking-tight">
                                                                        {
                                                                            stage.name
                                                                        }
                                                                    </h3>
                                                                    {stage.teams_count !==
                                                                        undefined && (
                                                                        <div className="text-textSecondary flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase">
                                                                            <Users
                                                                                size={
                                                                                    12
                                                                                }
                                                                            />
                                                                            {
                                                                                stage.teams_count
                                                                            }{" "}
                                                                            /{" "}
                                                                            {
                                                                                stage.max_teams
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {stage.start_date && (
                                                                    <div className="text-textSecondary flex items-center gap-2 text-xs font-medium opacity-70">
                                                                        <Calendar
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                        <span>
                                                                            {formatDateOnly(
                                                                                toUnixTimestamp(
                                                                                    stage.start_date,
                                                                                )!,
                                                                            )}
                                                                            {
                                                                                " - "
                                                                            }
                                                                            {formatDateOnly(
                                                                                toUnixTimestamp(
                                                                                    stage.end_date,
                                                                                )!,
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {stage.faceit_id && (
                                                                    <button
                                                                        onClick={(
                                                                            e,
                                                                        ) => {
                                                                            openInNewTab(
                                                                                `https://www.faceit.com/en/championship/${stage.faceit_id}`,
                                                                            );
                                                                            e.stopPropagation();
                                                                        }}
                                                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-600/10 py-3 text-xs font-black tracking-widest text-orange-500 uppercase transition-all hover:bg-orange-600 hover:text-white"
                                                                    >
                                                                        <ExternalLink
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                        Faceit
                                                                    </button>
                                                                )}
                                                                <div className="flex-1">
                                                                    <SignUpButton
                                                                        session={
                                                                            session
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                </section>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
