import { useMemo } from "react";
import { MatchDropdownProvider } from "@/components/shared/bracket/components/MatchDropdownProvider";
import ScheduledCard from "@/components/shared/bracket/components/ScheduledCard";
import { useUpcomingMatches } from "@/lib/api/match.queries";

export default function UpcomingMatches() {
    const { data: upcomingMatches, isLoading } = useUpcomingMatches();

    const matches = useMemo(() => upcomingMatches ?? [], [upcomingMatches]);

    if (isLoading) {
        return (
            <MatchDropdownProvider>
                <div className="flex w-full flex-col gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <ScheduledCard key={i} match={undefined} />
                    ))}
                </div>
            </MatchDropdownProvider>
        );
    }

    if (!matches.length) {
        return null;
    }

    return (
        <MatchDropdownProvider>
            <h1 className="pb-4 text-2xl font-bold">Upcoming Matches</h1>
            <div className="flex w-full flex-col gap-4">
                {matches.map((match) => (
                    <ScheduledCard key={match.id} match={match} />
                ))}
            </div>
        </MatchDropdownProvider>
    );
}
