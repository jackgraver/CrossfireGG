import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MatchDropdownProvider } from "@/components/shared/bracket/components/MatchDropdownProvider";
import ScheduledCard from "@/components/shared/bracket/components/ScheduledCard";
import { useUpcomingMatches } from "@/lib/api/match.queries";

const MATCHES_PER_PAGE = 5;

export default function UpcomingMatches() {
    const { data: upcomingMatches, isLoading } = useUpcomingMatches();
    const [startIndex, setStartIndex] = useState(0);

    const visibleMatches = useMemo(() => {
        if (!upcomingMatches?.length) {
            return [];
        }

        return upcomingMatches.slice(startIndex, startIndex + MATCHES_PER_PAGE);
    }, [upcomingMatches, startIndex]);

    if (isLoading) {
        return null;
    }

    if (!upcomingMatches?.length) {
        return null;
    }

    const canGoPrevious = startIndex > 0;
    const canGoNext = startIndex + MATCHES_PER_PAGE < upcomingMatches.length;

    const goToPrevious = () => {
        if (!canGoPrevious) {
            return;
        }

        setStartIndex((prev) => Math.max(prev - MATCHES_PER_PAGE, 0));
    };

    const goToNext = () => {
        if (!canGoNext) {
            return;
        }

        setStartIndex((prev) =>
            Math.min(
                prev + MATCHES_PER_PAGE,
                Math.max(upcomingMatches.length - MATCHES_PER_PAGE, 0),
            ),
        );
    };

    return (
        <MatchDropdownProvider>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={goToPrevious}
                    disabled={!canGoPrevious}
                    aria-label="Show previous upcoming matches"
                    className="bg-firstBg text-textPrimary border-border hover:bg-secondBg disabled:text-textSecondary/50 disabled:hover:bg-firstBg flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex-1 overflow-hidden">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {visibleMatches.map((match) => (
                            <ScheduledCard key={match.id} match={match} />
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={goToNext}
                    disabled={!canGoNext}
                    aria-label="Show next upcoming matches"
                    className="bg-firstBg text-textPrimary border-border hover:bg-secondBg disabled:text-textSecondary/50 disabled:hover:bg-firstBg flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
        </MatchDropdownProvider>
    );
}
