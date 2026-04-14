import { MatchDropdownProvider } from "@/components/shared/bracket/components/MatchDropdownProvider";
import ScheduledCard from "@/components/shared/bracket/components/ScheduledCard";
import { useUpcomingMatches } from "@/lib/api/match.queries";

export default function UpcomingMatches() {
    const { data: upcomingMatches, isLoading } = useUpcomingMatches();
    const matches = upcomingMatches ?? [];

    return (
        <MatchDropdownProvider>
            <div className="flex w-full min-w-0 flex-col">
                <h2 className="shrink-0 pb-4 text-2xl font-bold text-white">Upcoming Matches</h2>
                <div className="min-h-0 w-full">
                    {isLoading ? null : matches.length === 0 ? (
                        <p className="text-textSecondary max-w-sm text-sm leading-relaxed">
                            No upcoming matches, join the Discord to hear about upcoming tournaments
                            and 10 mans
                        </p>
                    ) : (
                        <div className="flex w-full flex-col gap-4">
                            {matches.map((match) => (
                                <ScheduledCard key={match.id} match={match} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MatchDropdownProvider>
    );
}
