import { useState } from "react";
import { useAllTournaments, type TournamentListStatus } from "@/lib/api/tournament.queries";
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

export default function TournamentsSection() {
    const [status, setStatus] = useState<TournamentListStatus>("active");
    const { data, isLoading, error } = useAllTournaments(status);

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

    const tournaments = data ?? [];

    return (
        <div className="min-h-screen py-6">
            <div className="mb-8 flex flex-wrap gap-2">
                <div className="flex flex-row items-center gap-2">
                    <SectionTitle
                        title={
                            status === "active"
                                ? "Active Tournaments"
                                : status === "upcoming"
                                  ? "Upcoming Tournaments"
                                  : "Ended Tournaments"
                        }
                        subtitle="COMPETE"
                    />
                    {STATUS_OPTIONS.map(({ value, label }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setStatus(value)}
                            className={cn(
                                "rounded-lg border px-4 py-2 text-sm font-semibold transition-colors",
                                status === value
                                    ? "border-orange-500 bg-orange-500/20 text-white"
                                    : "border-border text-textSecondary hover:border-orange-500/50 hover:text-textPrimary",
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            {isLoading ? (
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
