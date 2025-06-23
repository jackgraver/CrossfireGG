import type { Match } from "../types/Types";
import MatchCard from "./bracket/MatchCard";
import { useState, useEffect } from "react";
import ScheduledCard from "./bracket/ScheduledCard";

type NonFinishedMatchesProps = {
    matches: Match[];
};

export default function NonFinishedMatches({
    matches,
}: NonFinishedMatchesProps) {
    const [startIndex, setStartIndex] = useState(0);
    const matchesPerPage = matches.length > 4 ? 4 : matches.length;

    const goToPrevious = () => {
        if (matches.length <= matchesPerPage) return;

        setStartIndex((prev) => {
            if (prev === 0) {
                // Loop back to the end
                return Math.max(0, matches.length - matchesPerPage);
            }
            return Math.max(0, prev - 1);
        });
    };

    const goToNext = () => {
        if (matches.length <= matchesPerPage) return;

        setStartIndex((prev) => {
            if (prev >= matches.length - matchesPerPage) {
                // Loop back to the beginning
                return 0;
            }
            return prev + 1;
        });
    };

    // Reset to first position when matches change
    useEffect(() => {
        setStartIndex(0);
    }, [matches]);

    if (matches.length === 0) {
        return <></>;
    }

    // Get the 4 matches to display (with wrapping if needed)
    const getVisibleMatches = () => {
        const visibleMatches = [];
        for (let i = 0; i < matchesPerPage; i++) {
            const index = (startIndex + i) % matches.length;
            visibleMatches.push(matches[index]);
        }
        return visibleMatches;
    };

    const visibleMatches = getVisibleMatches();

    return (
        <div className="relative">
            {/* Left Arrow - always show if there are more than 4 matches */}
            {matches.length > matchesPerPage && (
                <button
                    onClick={goToPrevious}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all duration-200"
                    aria-label="Previous match"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
            )}

            {/* Right Arrow - always show if there are more than 4 matches */}
            {matches.length > matchesPerPage && (
                <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all duration-200"
                    aria-label="Next match"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            )}

            {/* Matches Container */}
            <div className="flex gap-2 px-2">
                {visibleMatches.map((match: Match, index: number) => (
                    <div
                        key={`${match.match_id}-${startIndex + index}`}
                        className="flex-1"
                    >
                        <ScheduledCard match={match} />
                    </div>
                ))}
            </div>
        </div>
    );
}
