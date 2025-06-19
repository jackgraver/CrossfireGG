import type { Match, Team } from "../../types/Types";
import MatchCard from "./MatchCard";
import RoundSection from "./RoundSection";

// Define the round names for a standard single-elimination bracket
const PLAYOFF_ROUNDS = [
    { key: "RO16", label: "Round of 16" },
    { key: "Quarterfinals", label: "Quarterfinals" },
    { key: "Semifinals", label: "Semifinals" },
    { key: "GrandFinal", label: "Grand Final" },
];

type PlayoffBracketProps = {
    teams: Team[];
    matches: Match[];
};

export default function PlayoffBracket({
    teams,
    matches,
}: PlayoffBracketProps) {
    // Group matches by round
    const rounds = new Map<string, Match[]>();
    matches.forEach((match) => {
        const key = match.round;
        if (!rounds.has(key)) {
            rounds.set(key, []);
        }
        rounds.get(key)!.push(match);
    });

    // Optionally sort matches in each round by seed
    rounds.forEach((matches, _) => {
        matches.sort((a, b) => {
            const aMinSeed = Math.min(a.teams.team1.seed, a.teams.team2.seed);
            const bMinSeed = Math.min(b.teams.team1.seed, b.teams.team2.seed);
            return aMinSeed - bMinSeed;
        });
    });

    return (
        <div className="flex flex-row items-center overflow-x-auto">
            {PLAYOFF_ROUNDS.map((round, idx) => (
                <RoundSection key={round.key} round_num={idx + 1}>
                    <h2 className="text-lg text-white mb-2">{round.label}</h2>
                    {(rounds.get(round.key) || []).map((match, i) => (
                        <MatchCard key={match.match_id || i} match={match} />
                    ))}
                </RoundSection>
            ))}
        </div>
    );
}
