import { MatchWithParticipantsDTO } from "@repo/contracts";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { getPlayoffRounds, BracketRound } from "./playoff_utils";
import { BracketMatch } from "../components/BracketMatch";

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
    const rounds = useMemo(() => getPlayoffRounds(matches), [matches]);
    const [positions, setPositions] = useState<Record<string, MatchPosition>>({});
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePositionUpdate = useCallback((roundIndex: number, matchIndex: number, element: HTMLDivElement | null) => {
        if (!element || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const rect = element.getBoundingClientRect();

        const newPos = {
            x: rect.left - containerRect.left,
            y: rect.top - containerRect.top,
            width: rect.width,
            height: rect.height
        };

        const key = `${roundIndex}-${matchIndex}`;
        setPositions(prev => {
            if (prev[key]?.x === newPos.x && prev[key]?.y === newPos.y) return prev;
            return { ...prev, [key]: newPos };
        });
    }, []);

    // Force a re-render after initial mount to ensure positions are captured
    const [, forceUpdate] = useState({});
    useEffect(() => {
        const timer = setTimeout(() => forceUpdate({}), 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => forceUpdate({});
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderConnections = () => {
        const paths: React.ReactNode[] = [];

        rounds.forEach((round, roundIndex) => {
            if (roundIndex === rounds.length - 1) return;

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
                            stroke="#4a5568"
                            strokeWidth="2"
                        />
                    );
                }
            });
        });

        return <svg className="absolute inset-0 pointer-events-none w-full h-full">{paths}</svg>;
    };

    return (
        <div ref={containerRef} className="relative flex flex-row overflow-auto min-h-[800px] ">
            {renderConnections()}
            {rounds.map((round, roundIndex) => (
                <div key={round.name} className="flex flex-col justify-around px-8 z-10">
                    <div className="text-center mb-4">
                        <h2 className="text-gray-400 font-bold uppercase tracking-wider">{round.name}</h2>
                    </div>
                    <div className="flex flex-col grow justify-around">
                        {round.matches.map((match, matchIndex) => (
                            <BracketMatch
                                key={`${roundIndex}-${matchIndex}`}
                                match={match}
                                roundIndex={roundIndex}
                                matchIndex={matchIndex}
                                onPositionUpdate={handlePositionUpdate}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
