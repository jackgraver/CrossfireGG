import { createFileRoute, Link } from "@tanstack/react-router";
import { useAllTournaments } from "@/lib/api/tournament.queries";
import { formatDateOnly, toUnixTimestamp } from "@/lib/date.utils";
import SignUpButton from "./-components/SignUpButton";
import {
    Trophy,
    Users,
    Calendar,
    DollarSign,
    PlayCircle,
    CheckCircle2,
    CalendarFold,
} from "lucide-react";
import { TournamentWithStagesDTO } from "@repo/contracts";

export const Route = createFileRoute("/tournament/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data, isLoading, error } = useAllTournaments();

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

    // Group tournaments by status: "ACTIVE", "UPCOMING", "ENDED"
    const activeTournaments = tournaments.filter(
        (t) => (t.status?.toUpperCase?.() ?? "") === "ACTIVE",
    );
    const upcomingTournaments = tournaments.filter(
        (t) => (t.status?.toUpperCase?.() ?? "") === "UPCOMING",
    );
    const endedTournaments = tournaments.filter(
        (t) => (t.status?.toUpperCase?.() ?? "") === "ENDED",
    );

    return (
        <div className="min-h-screen py-6">
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
                        <>
                            <TournamentGroup
                                type="active"
                                tournaments={activeTournaments}
                            />
                            <TournamentGroup
                                type="upcoming"
                                tournaments={upcomingTournaments}
                            />
                            <TournamentGroup
                                type="ended"
                                tournaments={endedTournaments}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export const TournamentGroup = ({
    type,
    tournaments,
}: {
    type: "active" | "upcoming" | "ended";
    tournaments: TournamentWithStagesDTO[];
}) => {
    if (tournaments.length === 0) return null;

    const iconMap = {
        active: <PlayCircle size={28} />,
        upcoming: <CalendarFold size={28} />,
        ended: <CheckCircle2 size={28} />,
    };

    return (
        <div className="mb-12 flex flex-col gap-4">
            <h2 className="text-textSecondary border-border/10 flex items-center gap-2 border-b text-3xl font-black tracking-tight uppercase">
                {iconMap[type]}
                {type === "active"
                    ? "Active Tournaments"
                    : type === "upcoming"
                      ? "Upcoming Tournaments"
                      : "Ended Tournaments"}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {tournaments.map((tournament: TournamentWithStagesDTO) => (
                    <Link
                        to={"/tournament/$tournamentId/stage/$stageId/bracket"}
                        params={{
                            tournamentId: tournament.id.toString(),
                            stageId: tournament.stages[0]?.id.toString(),
                        }}
                    >
                        <section
                            key={tournament.id}
                            className="bg-firstBg border-border/10 hover:border-cfRed/30 flex min-w-125 flex-col rounded-2xl border p-0 transition-all"
                        >
                            <img
                                src={
                                    tournament.id % 2 === 1
                                        ? "ex2.jpg"
                                        : "SEASON_4_ANNOUNCEMENT.png"
                                }
                                alt="Season 4 Announcement"
                                className="h-48 w-full rounded-t-2xl object-cover"
                                style={{ background: "#252628" }}
                            />
                            <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <h2 className="text-textPrimary line-clamp-2 text-2xl font-black tracking-tight">
                                            {tournament.name}
                                        </h2>
                                        <div className="flex shrink-0 items-center gap-2">
                                            {tournament.prize_pool != null && (
                                                <span className="bg-cfRed/10 text-cfRed flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold">
                                                    <DollarSign size={12} />
                                                    {tournament.prize_pool.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                        <span className="text-textSecondary flex items-center gap-1.5 text-xs font-bold">
                                            <Users
                                                size={14}
                                                className="opacity-70"
                                            />
                                            {tournament?.stages[0]
                                                ?.teams_count || 0}{" "}
                                            / {tournament?.stages[0]?.max_teams}{" "}
                                            Teams
                                        </span>
                                        {tournament.start_date && (
                                            <div className="text-textSecondary flex items-center gap-1.5 text-xs font-medium opacity-60">
                                                <Calendar size={14} />
                                                {formatDateOnly(
                                                    toUnixTimestamp(
                                                        tournament.start_date,
                                                    )!,
                                                )}
                                                {tournament.end_date && (
                                                    <>
                                                        {" - "}
                                                        {formatDateOnly(
                                                            toUnixTimestamp(
                                                                tournament.end_date,
                                                            )!,
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 px-6 pb-6">
                                <Link
                                    to={
                                        "/tournament/$tournamentId/stage/$stageId/bracket"
                                    }
                                    params={{
                                        tournamentId: tournament.id.toString(),
                                        stageId:
                                            tournament.stages[0]?.id.toString(),
                                    }}
                                    className="bg-secondBg text-textPrimary hover:bg-secondBg/80 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-black tracking-widest uppercase transition-all"
                                >
                                    View Tournament
                                </Link>
                                {tournament.status === "upcoming" &&
                                    !tournament.isRegistered && (
                                        <SignUpButton
                                            tournamentId={tournament.id.toString()}
                                        />
                                    )}
                            </div>
                        </section>
                    </Link>
                ))}
            </div>
        </div>
    );
};
