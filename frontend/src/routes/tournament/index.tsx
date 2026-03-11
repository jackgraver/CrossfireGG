import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
import { TournamentWithTeamCountDTO } from "@repo/contracts";
import Tile from "./$tournamentId/-component/Tile";

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
                <TournamentGroupSkeleton />
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

function TournamentGroupSkeleton() {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <div className="bg-thirdBg h-9 w-120 animate-pulse rounded" />
            </div>
            <div className="flex flex-wrap gap-8">
                <article className="bg-firstBg border-border/10 flex w-full min-w-125 flex-col rounded-2xl border p-0 md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.334rem)]">
                    <div className="bg-thirdBg h-48 w-full animate-pulse rounded-t-2xl" />
                    <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-thirdBg h-6 w-20 animate-pulse rounded-md" />
                                <div className="bg-thirdBg h-6 w-24 animate-pulse rounded-md" />
                                <div className="bg-thirdBg h-6 w-28 animate-pulse rounded-md" />
                            </div>
                            <div className="bg-thirdBg h-10 w-full animate-pulse rounded" />
                            <div className="bg-thirdBg h-4 w-40 animate-pulse rounded" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 px-6 pb-6">
                        <div className="bg-thirdBg h-9 w-full animate-pulse rounded-lg" />
                    </div>
                </article>
            </div>
        </section>
    );
}

export const TournamentGroup = ({
    type,
    tournaments,
}: {
    type: "active" | "upcoming" | "ended";
    tournaments: TournamentWithTeamCountDTO[];
}) => {
    if (tournaments.length === 0) return null;

    const iconMap = {
        active: <PlayCircle size={28} />,
        upcoming: <CalendarFold size={28} />,
        ended: <CheckCircle2 size={28} />,
    };

    const navigate = useNavigate();

    return (
        <section className="mb-12 flex flex-col gap-4">
            <h2 className="text-textSecondary flex items-center gap-2 text-3xl font-black tracking-tight uppercase">
                {iconMap[type]}
                {type === "active"
                    ? "Active Tournaments"
                    : type === "upcoming"
                      ? "Upcoming Tournaments"
                      : "Ended Tournaments"}
            </h2>
            <div className="flex flex-wrap gap-8">
                {tournaments.map((tournament: TournamentWithTeamCountDTO) => (
                    <article
                        key={tournament.id}
                        onClick={() => {
                            navigate({
                                to: "/tournament/$tournamentId/$stageId/bracket",
                                params: {
                                    tournamentId: tournament.name,
                                    stageId: tournament.entry_stage,
                                },
                            });
                        }}
                        className="bg-firstBg border-border/10 hover:border-cfRed/30 flex w-full min-w-125 flex-col rounded-2xl border p-0 transition-all md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.334rem)]"
                    >
                        <img
                            src={
                                tournament.id % 2 === 0
                                    ? "ex2.jpg"
                                    : "SEASON_4_ANNOUNCEMENT.png"
                            }
                            alt="Season 4 Announcement"
                            className="h-48 w-full rounded-t-2xl object-cover"
                            style={{ background: "#252628" }}
                        />
                        <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    <div className="flex shrink-0 items-center gap-2">
                                        {tournament.prize_pool != null && (
                                            <Tile
                                                bg="bg-green-500/20"
                                                text="text-green-400"
                                                icon={DollarSign}
                                                label={tournament.prize_pool.toLocaleString()}
                                            />
                                        )}
                                        {tournament.is_vrs_enabled && (
                                            <Tile
                                                bg="bg-blue-500/20"
                                                text="text-blue-400"
                                                icon={CheckCircle2}
                                                label={"VRS Compliance"}
                                            />
                                        )}
                                        <Tile
                                            bg="bg-gray-500/40"
                                            text="text-gray-200"
                                            icon={Users}
                                            label={
                                                tournament.team_count +
                                                " / " +
                                                tournament.max_teams +
                                                " Teams"
                                            }
                                        />
                                    </div>
                                    <h2 className="text-textPrimary line-clamp-2 text-4xl font-black tracking-tight">
                                        {tournament.name}
                                    </h2>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
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
                                    tournamentId: tournament.name,
                                    stageId: tournament.entry_stage,
                                }}
                                className="bg-secondBg text-textPrimary hover:bg-secondBg/80 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-black tracking-widest uppercase transition-all"
                            >
                                View Tournament
                            </Link>
                            {tournament.status === "upcoming" && (
                                <SignUpButton
                                    tournamentId={tournament.id.toString()}
                                />
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};
