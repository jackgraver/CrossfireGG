import React from "react";
import MatchCard from "./MatchCard";
import { MatchWithParticipantsDTO } from "@repo/contracts";

interface BracketMatchProps {
    match: MatchWithParticipantsDTO | undefined;
    roundIndex: number;
    matchIndex: number;
    layoutKey: string;
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
        layoutKey,
        onPositionUpdate,
    }: BracketMatchProps) => {
        const containerRef = React.useRef<HTMLDivElement>(null);

        React.useLayoutEffect(() => {
            const el = containerRef.current;
            if (!el) return;

            const measure = () => onPositionUpdate(roundIndex, matchIndex, el);

            measure();

            const ro = new ResizeObserver(() => measure());
            ro.observe(el);
            return () => ro.disconnect();
        }, [onPositionUpdate, roundIndex, matchIndex, layoutKey]);

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
