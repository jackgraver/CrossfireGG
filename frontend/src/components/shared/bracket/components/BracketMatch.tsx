import React from "react";
import MatchCard from "./MatchCard";
import { MatchWithParticipantsDTO } from "@repo/contracts";

interface BracketMatchProps {
    match: MatchWithParticipantsDTO | undefined;
    roundIndex: number;
    matchIndex: number;
    onPositionUpdate: (
        roundIndex: number,
        matchIndex: number,
        element: HTMLDivElement | null,
    ) => void;
}

export const BracketMatch = React.memo(
    ({
        match,
        roundIndex,
        matchIndex,
        onPositionUpdate,
    }: BracketMatchProps) => {
        const containerRef = React.useRef<HTMLDivElement>(null);

        React.useEffect(() => {
            onPositionUpdate(roundIndex, matchIndex, containerRef.current);
        }, [onPositionUpdate, roundIndex, matchIndex]);

        return (
            <div
                ref={containerRef}
                className="shrink-0"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <MatchCard match={match} margin={false} />
            </div>
        );
    },
);

BracketMatch.displayName = "BracketMatch";
