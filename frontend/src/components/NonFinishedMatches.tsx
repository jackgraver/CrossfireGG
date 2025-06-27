import type { Match } from "../types/Types";
import { useState, useEffect, useMemo } from "react";
import ScheduledCard from "./bracket/ScheduledCard";

type NonFinishedMatchesProps = {
    matches: Match[];
};

export default function NonFinishedMatches({
    matches,
}: NonFinishedMatchesProps) {
    const [startIndex, setStartIndex] = useState(0);
    const [matchesPerPage, setMatchesPerPage] = useState(4);

    useEffect(() => {
        const updateMatchesPerPage = () => {
            const width = window.innerWidth;
            if (width < 640) setMatchesPerPage(1); // sm
            else if (width < 768) setMatchesPerPage(2); // md
            else if (width < 1024) setMatchesPerPage(3); // lg
            else setMatchesPerPage(4); // xl+
        };

        updateMatchesPerPage(); // initial check

        window.addEventListener("resize", updateMatchesPerPage);
        return () => window.removeEventListener("resize", updateMatchesPerPage);
    }, []);

    const visibleMatches = useMemo(() => {
        const validMatches = matches
            .filter((m) => m.status !== "CANCELLED")
            .sort((a, b) => {
                if (a.status === "ONGOING" && b.status !== "ONGOING") return -1; // a before b
                if (a.status !== "ONGOING" && b.status === "ONGOING") return 1; // b before a
                return b.scheduled_at - a.scheduled_at; // order by latest first
            });
        const result: Match[] = [];
        for (
            let i = 0;
            i < Math.min(matchesPerPage, validMatches.length);
            i++
        ) {
            const index = (startIndex + i) % validMatches.length;
            result.push(validMatches[index]);
        }
        return result;
    }, [matches, startIndex, matchesPerPage]);

    const goToPrevious = () => {
        setStartIndex((prev) =>
            prev === 0
                ? Math.max(0, matches.length - matchesPerPage)
                : Math.max(0, prev - 1)
        );
    };

    const goToNext = () => {
        setStartIndex((prev) =>
            prev >= matches.length - matchesPerPage ? 0 : prev + 1
        );
    };

    if (matches.length === 0) return <EmptyNonFinishedMatches />;

    return (
        <div className="relative w-full flex justify-center items-center">
            {matches.length > matchesPerPage && (
                <button
                    onClick={goToPrevious}
                    className="z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition duration-200 mx-2"
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
            <div
                className="flex gap-2 overflow-hidden"
                style={{
                    width: `${matchesPerPage * 260}px`, // matchesPerPage × card width (~260px)
                    transition: "width 0.2s ease-in-out",
                }}
            >
                {visibleMatches.map((match) => (
                    <div key={match.match_id} className="w-[250px] shrink-0">
                        <ScheduledCard match={match} />
                    </div>
                ))}
            </div>
            {matches.length > matchesPerPage && (
                <button
                    onClick={goToNext}
                    className="z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition duration-200 mx-2"
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
        </div>
    );
}

function EmptyNonFinishedMatches() {
    return (
        <div className="relative w-full flex justify-center items-center">
            <button
                onClick={() => {}}
                className="z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition duration-200 mx-2"
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

            <div
                className="flex gap-2 overflow-hidden"
                style={{
                    width: `${260}px`, // matchesPerPage × card width (~260px)
                    transition: "width 0.2s ease-in-out",
                }}
            >
                <div className="w-[250px] shrink-0">
                    <ScheduledCard match={undefined} />
                </div>
            </div>

            <button
                onClick={() => {}}
                className="z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition duration-200 mx-2"
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
        </div>
    );
}
