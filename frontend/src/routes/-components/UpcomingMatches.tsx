import { useEffect, useMemo } from "react";
import { MatchDropdownProvider } from "@/components/shared/bracket/components/MatchDropdownProvider";
import ScheduledCard from "@/components/shared/bracket/components/ScheduledCard";
import { useRefreshUpcomingMatches, useUpcomingMatches } from "@/lib/api/match.queries";
import { buildUpcomingMatchDisplayItems } from "@/lib/upcomingMatchDiff.utils";
import UpcomingMatchChangeBadge from "./UpcomingMatchChangeBadge";
import UpcomingMatchRefreshIndicator from "./UpcomingMatchRefreshIndicator";

export default function UpcomingMatches() {
    const { data: upcomingMatches, isLoading } = useUpcomingMatches();
    const refreshMutation = useRefreshUpcomingMatches();
    const { mutate: refreshUpcomingMatches, isPending: isRefreshPending } = refreshMutation;

    useEffect(() => {
        refreshUpcomingMatches();
    }, [refreshUpcomingMatches]);

    const baseline = upcomingMatches ?? refreshMutation.data?.beforeMatches ?? [];
    const displayItems = useMemo(
        () => buildUpcomingMatchDisplayItems(baseline, refreshMutation.data),
        [baseline, refreshMutation.data],
    );
    const showRefreshIndicator = isLoading || isRefreshPending;

    return (
        <MatchDropdownProvider>
            <div className="flex w-full min-w-0 flex-col">
                <div className="flex shrink-0 items-center justify-between gap-2 pb-4">
                    <h2 className="text-2xl font-bold text-white">Upcoming Matches</h2>
                    {showRefreshIndicator ? <UpcomingMatchRefreshIndicator /> : null}
                </div>
                <div className="min-h-0 w-full">
                    {isLoading && displayItems.length === 0 ? null : displayItems.length === 0 ? (
                        <p className="text-textSecondary max-w-sm text-sm leading-relaxed">
                            No upcoming matches, join the Discord to hear about upcoming tournaments
                            and 10 mans
                        </p>
                    ) : (
                        <div className="flex w-full flex-col gap-4">
                            {displayItems.map(({ match, change }) => (
                                <div key={match.id} className="flex w-full flex-col gap-1">
                                    {change ? <UpcomingMatchChangeBadge change={change} /> : null}
                                    <ScheduledCard match={match} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MatchDropdownProvider>
    );
}
