import React from "react";
import MatchCard from "./MatchCard";
import { MatchWithParticipantAndMinifiedMapsDTO } from "@repo/contracts";
import ScheduledCard from "./ScheduledCard";

interface BracketMatchProps {
    match: MatchWithParticipantAndMinifiedMapsDTO | undefined;
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
    ({ match, roundIndex, matchIndex, layoutKey, onPositionUpdate }: BracketMatchProps) => {
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
                className="flex w-full min-w-0 flex-col items-stretch justify-center"
            >
                <div className="w-full min-w-0">
                    {match?.status === "scheduled" ? (
                        <ScheduledCard match={match} bracketLayout />
                    ) : (
                        <MatchCard match={match} margin={false} bracketLayout />
                    )}
                </div>
            </div>
        );
    },
);

BracketMatch.displayName = "BracketMatch";
