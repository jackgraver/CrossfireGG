import { MatchWithParticipantsDTO } from "@repo/contracts";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { getPlayoffRounds, BracketRound } from "./playoff_utils";
import { BracketMatch } from "../components/BracketMatch";
import MatchCard from "../components/MatchCard";
import { cn } from "@/utils/cn";

type PlayoffBracketProps = {
    matches: MatchWithParticipantsDTO[];
};

interface MatchPosition {
    x: number;
    y: number;
    height: number;
    width: number;
}

export default function PlayoffBracket({ matches }: PlayoffBracketProps) {
    const rounds = useMemo(() => {
        const allRounds = getPlayoffRounds(matches);
        // Separate the 3rd place round from the main flow
        return {
            mainRounds: allRounds.filter((r) => r.name !== "3rd Place"),
            thirdPlaceRound: allRounds.find((r) => r.name === "3rd Place"),
        };
    }, [matches]);
    const [positions, setPositions] = useState<Record<string, MatchPosition>>(
        {},
    );
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePositionUpdate = useCallback(
        (
            roundIndex: number,
            matchIndex: number,
            element: HTMLDivElement | null,
        ) => {
            if (!element || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const rect = element.getBoundingClientRect();

            const newPos = {
                x: rect.left - containerRect.left,
                y: rect.top - containerRect.top,
                width: rect.width,
                height: rect.height,
            };

            const key = `${roundIndex}-${matchIndex}`;
            setPositions((prev) => {
                if (prev[key]?.x === newPos.x && prev[key]?.y === newPos.y)
                    return prev;
                return { ...prev, [key]: newPos };
            });
        },
        [],
    );

    // Force a re-render after initial mount to ensure positions are captured
    const [, forceUpdate] = useState({});
    useEffect(() => {
        const timer = setTimeout(() => forceUpdate({}), 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => forceUpdate({});
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const renderConnections = () => {
        const paths: React.ReactNode[] = [];

        rounds.mainRounds.forEach((round, roundIndex) => {
            if (roundIndex === rounds.mainRounds.length - 1) return;

            round.matches.forEach((_, matchIndex) => {
                const currentKey = `${roundIndex}-${matchIndex}`;
                const nextMatchIndex = Math.floor(matchIndex / 2);
                const nextKey = `${roundIndex + 1}-${nextMatchIndex}`;

                const currentPos = positions[currentKey];
                const nextPos = positions[nextKey];

                if (currentPos && nextPos) {
                    const startX = currentPos.x + currentPos.width;
                    const startY = currentPos.y + currentPos.height / 2;
                    const endX = nextPos.x;
                    const endY = nextPos.y + nextPos.height / 2;
                    const midX = startX + (endX - startX) / 2;

                    paths.push(
                        <path
                            key={`path-${currentKey}`}
                            d={`M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`}
                            fill="none"
                            stroke="var(--color-second-bg)"
                            strokeWidth="2"
                        />,
                    );
                }
            });
        });

        return (
            <svg className="pointer-events-none absolute inset-0 h-full w-full">
                {paths}
            </svg>
        );
    };

    return (
        <div
            ref={containerRef}
            className="scrollbar-hide relative flex min-h-200 flex-row overflow-x-auto"
        >
            {renderConnections()}
            {rounds.mainRounds.map((round, roundIndex) => (
                <div
                    key={round.name}
                    className={cn(
                        "z-10 flex flex-col justify-around",
                        roundIndex === 0 ? "pr-8" : "px-8",
                    )}
                >
                    <div className="mb-4 text-center">
                        <h2 className="bg-secondBg rounded-md p-1 font-bold tracking-wider text-gray-400 uppercase">
                            {round.name}
                        </h2>
                    </div>
                    <div className="flex grow flex-col justify-around">
                        {round.matches.map((match, matchIndex) => (
                            <div
                                key={`${roundIndex}-${matchIndex}`}
                                className="relative"
                            >
                                <BracketMatch
                                    match={match}
                                    roundIndex={roundIndex}
                                    matchIndex={matchIndex}
                                    onPositionUpdate={handlePositionUpdate}
                                />
                                {round.name === "Grand Final" &&
                                    rounds.thirdPlaceRound && (
                                        <div className="absolute top-full right-0 left-0 mt-32">
                                            <div className="text-center">
                                                <h2 className="bg-secondBg rounded-md p-1 font-bold tracking-wider text-gray-400 uppercase">
                                                    Third Place
                                                </h2>
                                            </div>
                                            <div className="flex min-h-[100px] items-center">
                                                <MatchCard
                                                    match={
                                                        rounds.thirdPlaceRound
                                                            ?.matches[0]
                                                    }
                                                    margin={false}
                                                />
                                            </div>
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
