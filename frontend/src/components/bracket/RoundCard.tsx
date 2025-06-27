import type { Match, Round } from "../../types/Types";
import MatchCard from "./MatchCard";

type RoundCardProps = {
    round: Round;
    matches: Match[] | undefined;
};

const numMatchesForRound = (round: Round): number => {
    switch (round) {
        case "0-0":
            return 16;
        case "0-1":
        case "1-0":
        case "1-1":
            return 8;
        case "2-0":
        case "0-2":
            return 4;
        case "2-1":
        case "1-2":
        case "2-2":
            return 6;
        case "RO16":
            return 8;
        case "QF":
            return 4;
        case "SF":
            return 2;
        case "F":
            return 1;
        default:
            return 0;
    }
};

const getDisplayRound = (round: Round): string => {
    switch (round) {
        case "QF":
            return "QUARTER FINALS";
        case "SF":
            return "SEMI-FINALS";
        case "F":
            return "FINAL";
    }
    return round;
};

export default function RoundCard({ round, matches }: RoundCardProps) {
    if (!matches) {
        matches = [];
    }

    const displayRound = getDisplayRound(round);

    return (
        <div className="flex flex-col p-2 m-2">
            <div className="flex justify-center items-center">
                <h1 className="bg-bg-light min-w-16 px-2 py-1 text-2xl text-text-primary">
                    {displayRound}
                </h1>
            </div>

            {matches.map((match, i) => (
                <MatchCard key={i} match={match} />
            ))}
            {Array.from(
                { length: numMatchesForRound(round) - matches.length },
                (_, i) => (
                    <MatchCard key={i} match={undefined} />
                )
            )}
        </div>
    );
}
