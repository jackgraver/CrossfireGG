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
    }
};

export default function RoundCard({ round, matches }: RoundCardProps) {
    if (!matches) {
        matches = [];
    }

    matches.sort((m1, m2) => m1.teams.team1.seed - m2.teams.team2.seed);

    return (
        <div className="flex flex-col bg-gray-500 p-2 m-2">
            <h1>{round}</h1>
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
