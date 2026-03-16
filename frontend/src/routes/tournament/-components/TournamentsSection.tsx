import { useAllTournaments } from "@/lib/api/tournament.queries";
import { TournamentGroup, TournamentGroupSkeleton } from "./TournamentGroup";
import { Trophy } from "lucide-react";

export default function TournamentsSection() {
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
