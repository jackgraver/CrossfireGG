import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useAllTournaments, type TournamentListStatus } from "@/lib/api/tournament.queries";
import type { TournamentWithTeamCountDTO } from "@repo/contracts";
import { TournamentGroup, TournamentGroupSkeleton } from "./TournamentGroup";
import { Trophy } from "lucide-react";
import { cn } from "@/utils/cn";
import SectionTitle from "@/routes/-components/SectionTitle";

const STATUS_OPTIONS: { value: TournamentListStatus; label: string }[] = [
    { value: "active", label: "Active" },
    { value: "upcoming", label: "Upcoming" },
    { value: "ended", label: "Ended" },
];

const STATUS_HEADLINES: Record<TournamentListStatus, string> = {
    active: "Active Tournaments",
    upcoming: "Upcoming Tournaments",
    ended: "Ended Tournaments",
};

const EMPTY_BY_STATUS: Record<TournamentListStatus, TournamentWithTeamCountDTO[]> = {
    active: [],
    upcoming: [],
    ended: [],
};

function groupTournamentsByStatus(
    tournaments: TournamentWithTeamCountDTO[] | undefined,
): Record<TournamentListStatus, TournamentWithTeamCountDTO[]> {
    if (!tournaments?.length) return EMPTY_BY_STATUS;
    const grouped: Record<TournamentListStatus, TournamentWithTeamCountDTO[]> = {
        active: [],
        upcoming: [],
        ended: [],
    };
    for (const tournament of tournaments) {
        const key = tournament.status as TournamentListStatus;
        if (key in grouped) grouped[key].push(tournament);
    }
    return grouped;
}

export default function TournamentsSection() {
    const [status, setStatus] = useState<TournamentListStatus>("active");
    const userPickedTab = useRef(false);
    const { data, isLoading, error } = useAllTournaments();
    const tournamentsByStatus = useMemo(() => groupTournamentsByStatus(data), [data]);
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const tabStripRef = useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

    const [defaultResolved, setDefaultResolved] = useState(false);

    useEffect(() => {
        if (userPickedTab.current || isLoading) return;
        const firstWithData = STATUS_OPTIONS.find(
            ({ value }) => tournamentsByStatus[value].length > 0,
        );
        setStatus(firstWithData?.value ?? "ended");
        setDefaultResolved(true);
    }, [isLoading, tournamentsByStatus]);

    const isResolvingDefault = !userPickedTab.current && (isLoading || !defaultResolved);
    const activeIndex = STATUS_OPTIONS.findIndex((o) => o.value === status);

    useLayoutEffect(() => {
        const measure = () => {
            const el = tabsRef.current[activeIndex];
            if (!el || !tabStripRef.current) return;
            setIndicator({
                left: el.offsetLeft,
                width: el.offsetWidth,
                opacity: 1,
            });
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [activeIndex]);

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

    const tournaments = tournamentsByStatus[status];

    return (
        <div className="min-h-screen py-6">
            <div className="mb-8 flex w-full flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="min-w-0">
                    <SectionTitle title={STATUS_HEADLINES[status]} subtitle="COMPETE" />
                </div>
                <div
                    className="flex w-full max-w-full shrink-0 justify-end rounded-2xl border border-border/60 bg-black/25 p-1.5 shadow-inner backdrop-blur-sm sm:w-auto"
                    role="tablist"
                    aria-label="Filter by tournament status"
                >
                    <div ref={tabStripRef} className="relative flex w-full min-w-0 gap-0 sm:w-auto">
                        <span
                            className="pointer-events-none absolute inset-y-0 rounded-xl bg-orange-500 shadow-md shadow-orange-900/30 transition-[left,width,opacity] duration-300 ease-in-out"
                            style={{
                                left: indicator.left,
                                width: indicator.width,
                                opacity: indicator.opacity,
                            }}
                        />
                        {STATUS_OPTIONS.map(({ value, label }, i) => {
                            const selected = status === value;
                            return (
                                <button
                                    key={value}
                                    ref={(el) => {
                                        tabsRef.current[i] = el;
                                    }}
                                    type="button"
                                    role="tab"
                                    aria-selected={selected}
                                    onClick={() => {
                                        userPickedTab.current = true;
                                        setStatus(value);
                                    }}
                                    className={cn(
                                        "relative z-10 min-h-11 flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-semibold transition-colors sm:min-w-26 sm:flex-initial sm:px-4",
                                        selected
                                            ? "text-white"
                                            : "text-textSecondary hover:text-textPrimary",
                                    )}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            {isResolvingDefault ? (
                <TournamentGroupSkeleton />
            ) : tournaments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 opacity-20">
                    <Trophy size={64} strokeWidth={1} />
                    <p className="mt-4 text-sm font-bold tracking-widest uppercase">
                        No tournaments found
                    </p>
                </div>
            ) : (
                <TournamentGroup type={status} tournaments={tournaments} />
            )}
        </div>
    );
}
