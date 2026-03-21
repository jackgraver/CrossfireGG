import MatchCard from "./MatchCard";
import { MatchWithParticipantsDTO } from "@repo/contracts";

type RoundCardProps = {
    round: string;
    matches: MatchWithParticipantsDTO[] | undefined;
};

const numMatchesForRound = (round: string): number => {
    switch (round) {
        case "0-0":
            return 8;
        case "0-1":
        case "1-0":
        case "1-1":
            return 4;
        case "2-0":
        case "0-2":
            return 2;
        case "2-1":
        case "1-2":
        case "2-2":
            return 6;
        case "RO16":
        case "1":
            return 8;
        case "QF":
        case "2":
            return 4;
        case "SF":
        case "3":
            return 2;
        case "3RD":
        case "4":
            return 1;
        case "GF":
        case "F":
        case "5":
            return 1;
        default: {
            const ro = round.match(/^RO(\d+)$/);
            if (ro) {
                const n = parseInt(ro[1], 10);
                return n / 2;
            }
            return 0;
        }
    }
};

const getDisplayRound = (round: string): string => {
    switch (round) {
        case "QF":
        case "2":
            return "QUARTER FINALS";
        case "SF":
        case "3":
            return "SEMI-FINALS";
        case "GF":
        case "F":
        case "5":
            return "FINAL";
        case "3RD":
        case "4":
            return "3RD PLACE";
    }
    return round;
};

export default function RoundCard({ round, matches }: RoundCardProps) {
    if (!matches) {
        matches = [];
    }

    const displayRound = getDisplayRound(round);

    return (
        <div className="m-2 flex flex-col p-2">
            <div className="flex items-center justify-center">
                <h1 className="bg-firstBg text-textPrimary min-w-16 px-2 py-1 text-2xl font-semibold">
                    {displayRound}
                </h1>
            </div>

            {matches.map((match) => (
                <MatchCard key={match.id} match={match} />
            ))}
            {Array.from(
                { length: numMatchesForRound(round) - matches.length },
                (_, i) => (
                    <MatchCard key={`placeholder-${round}-${i}`} match={undefined} />
                ),
            )}
        </div>
    );
}
