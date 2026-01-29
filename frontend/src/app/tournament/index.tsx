import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAllTournaments } from "./-queries/tournamentsQueries";
import { formatDateOnly, toUnixTimestamp } from "@/lib/dateUtils";
import SignUpButton from "./-components/SignUpButton";
import { openInNewTab } from "@/lib/NewTab";
import { Trophy, Users, ExternalLink, Calendar, DollarSign } from "lucide-react";
import { TournamentWithStagesDTO } from "@repo/contracts";
import { useAuth } from "@/contexts/auth";

export const Route = createFileRoute("/tournament/")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();
    const { data, isLoading, error } = useAllTournaments();
    const { user, isLoading: isAuthLoading } = useAuth();

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="max-w-md rounded-xl border border-red-500/50 bg-red-500/10 p-6 text-center">
                    <h2 className="mb-2 text-xl font-bold text-red-500">
                        Error Loading Tournaments
                    </h2>
                    <p className="text-textSecondary text-sm">{error.message}</p>
                </div>
            </div>
        );
    }

    const tournaments = data || [];

    return (
        <div className="mx-auto min-h-screen max-w-[1200px] p-6">
            <header className="border-border/40 border-b pb-4">
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
                        <div className="mt-12 space-y-12">
                            {tournaments.map((tournament: TournamentWithStagesDTO) => (
                                <section
                                    key={tournament.id}
                                    className="group bg-firstBg rounded-2xl p-6"
                                >
                                    <div
                                        onClick={() =>
                                            navigate({
                                                to: `/tournament/${tournament.id}/stage/${tournament.stages[0]?.id}/bracket`,
                                            })
                                        }
                                        className="flex cursor-pointer flex-col justify-between gap-6 pb-8 transition-all md:flex-row md:items-end"
                                    >
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase ${tournament.id === 1 ? "bg-green-500" : "bg-blue-500"}`}
                                                >
                                                    {tournament.id === 1 ? "Live" : "Upcoming"}
                                                </span>
                                                {tournament.start_date && (
                                                    <span className="text-textSecondary flex items-center gap-1.5 text-xs font-medium">
                                                        <Calendar
                                                            size={14}
                                                            className="opacity-50"
                                                        />
                                                        {formatDateOnly(
                                                            toUnixTimestamp(tournament.start_date)!,
                                                        )}
                                                        {" - "}
                                                        {tournament.end_date && (
                                                            <span>
                                                                {formatDateOnly(
                                                                    toUnixTimestamp(
                                                                        tournament.end_date,
                                                                    )!,
                                                                )}
                                                            </span>
                                                        )}
                                                    </span>
                                                )}
                                                {tournament.prize_pool != null && (
                                                    <span className="text-textSecondary flex items-center text-xs font-medium">
                                                        <DollarSign
                                                            size={14}
                                                            className="opacity-50"
                                                        />
                                                        {tournament.prize_pool.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                            <h2 className="text-textPrimary text-4xl font-black tracking-tight transition-colors md:text-5xl">
                                                {tournament.name}
                                            </h2>
                                        </div>
                                        <div className="text-cfRed flex-start flex gap-2">
                                            <SignUpButton
                                                user={user}
                                                isRegistered={tournament.isRegistered}
                                            />
                                        </div>
                                    </div>
                                    {tournament.stages && tournament.stages.length > 0 && (
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            {tournament.stages.map((stage: any) => (
                                                <div
                                                    key={stage.id}
                                                    className="bg-secondBg relative flex flex-col justify-between gap-6 rounded-2xl p-6"
                                                >
                                                    <div className="space-y-4">
                                                        <div className="mb-2 flex items-center gap-4">
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase ${stage.id === 4 ? "bg-green-500" : "bg-gray-500"}`}
                                                            >
                                                                {stage.id === 4
                                                                    ? "Current"
                                                                    : "Ended"}
                                                            </span>
                                                            {stage.start_date && (
                                                                <div className="text-textSecondary flex items-center gap-2 text-xs font-medium opacity-70">
                                                                    <Calendar size={14} />
                                                                    <span>
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
                                                        <div className="flex items-baseline justify-between">
                                                            <h3 className="text-textPrimary text-2xl font-black tracking-tight">
                                                                {stage.name}
                                                            </h3>

                                                            {stage.teams_count !== undefined && (
                                                                <div className="text-textSecondary flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase">
                                                                    <Users size={12} />
                                                                    {stage.teams_count} /{" "}
                                                                    {stage.max_teams}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {stage.faceit_id && (
                                                            <button
                                                                onClick={(e) => {
                                                                    openInNewTab(
                                                                        `https://www.faceit.com/en/championship/${stage.faceit_id}`,
                                                                    );
                                                                    e.stopPropagation();
                                                                }}
                                                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-600/10 py-3 text-xs font-black tracking-widest text-orange-500 uppercase transition-all hover:bg-orange-600 hover:text-white"
                                                            >
                                                                <ExternalLink size={14} />
                                                                View on Faceit
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
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
