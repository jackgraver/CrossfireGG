import { MatchWithParticipantAndMinifiedMapsDTO } from "@repo/contracts";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { getPlayoffRounds } from "./playoff_utils";
import { BracketMatch } from "../components/BracketMatch";
import MatchCard from "../components/MatchCard";

type PlayoffBracketProps = {
    matches: MatchWithParticipantAndMinifiedMapsDTO[];
};

interface MatchPosition {
    x: number;
    y: number;
    height: number;
    width: number;
}

const Connections = ({
    mainRounds,
    positions,
}: {
    mainRounds: any[];
    positions: Record<string, MatchPosition>;
}) => {
    const paths: React.ReactNode[] = [];

    mainRounds.forEach((round, roundIndex) => {
        if (roundIndex === mainRounds.length - 1) return;

        round.matches.forEach((_: any, matchIndex: number) => {
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

    return <svg className="pointer-events-none absolute inset-0 h-full w-full">{paths}</svg>;
};

export default function PlayoffBracket({ matches }: PlayoffBracketProps) {
    const rounds = useMemo(() => {
        const allRounds = getPlayoffRounds(matches);
        // Separate the 3rd place round from the main flow
        return {
            mainRounds: allRounds.filter((r) => r.name !== "3rd Place"),
            thirdPlaceRound: allRounds.find((r) => r.name === "3rd Place"),
        };
    }, [matches]);

    const bracketLayoutSignature = useMemo(
        () =>
            matches
                .map((m) =>
                    [
                        m.id,
                        m.status,
                        m.participants
                            ?.map(
                                (p) =>
                                    `${p.stageTeam?.team_id ?? ""}:${p.stageTeam?.team?.name ?? ""}`,
                            )
                            .join(",") ?? "",
                    ].join(":"),
                )
                .join("|"),
        [matches],
    );
    const [positions, setPositions] = useState<Record<string, MatchPosition>>({});
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePositionUpdate = useCallback(
        (roundIndex: number, matchIndex: number, element: HTMLDivElement | null) => {
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
                const prevPos = prev[key];
                if (
                    prevPos?.x === newPos.x &&
                    prevPos?.y === newPos.y &&
                    prevPos?.width === newPos.width &&
                    prevPos?.height === newPos.height
                )
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

    return (
        <div
            ref={containerRef}
            className="scrollbar-hide relative flex min-h-200 w-full min-w-0 flex-row gap-16 md:gap-16"
        >
            <Connections mainRounds={rounds.mainRounds} positions={positions} />
            {rounds.mainRounds.map((round, roundIndex) => (
                <div key={round.name} className="z-10 flex min-w-0 flex-1 flex-col justify-around">
                    <div className="mb-4 w-full text-center">
                        <h2 className="bg-secondBg rounded-md p-1 font-bold tracking-wider text-gray-400 uppercase">
                            {round.name}
                        </h2>
                    </div>
                    <div className="flex w-full grow flex-col justify-around">
                        {round.matches.map((match, matchIndex) => (
                            <div
                                key={`${roundIndex}-${matchIndex}`}
                                className="relative w-full min-w-0"
                            >
                                <BracketMatch
                                    match={match}
                                    roundIndex={roundIndex}
                                    matchIndex={matchIndex}
                                    layoutKey={bracketLayoutSignature}
                                    onPositionUpdate={handlePositionUpdate}
                                />
                                {round.name === "Grand Final" && rounds.thirdPlaceRound && (
                                    <div className="absolute top-full right-0 left-0 mt-32">
                                        <div className="text-center">
                                            <h2 className="bg-secondBg rounded-md p-1 font-bold tracking-wider text-gray-400 uppercase">
                                                Third Place
                                            </h2>
                                        </div>
                                        <div className="flex min-h-25 items-center">
                                            <MatchCard
                                                match={
                                                    rounds.thirdPlaceRound
                                                        ?.matches[0] as MatchWithParticipantAndMinifiedMapsDTO
                                                }
                                                margin={false}
                                                bracketLayout
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
