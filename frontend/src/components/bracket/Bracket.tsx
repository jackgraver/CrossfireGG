// import { FAKEMATCHES } from "../../lib/Mock";
import type { Round, Match, Team } from "../../types/Types";
import { MatchTeam } from "./MatchTeam";
import QualElimCard from "./qualelimcard/QualElimCard";
import RoundSection from "./RoundSection";
import RoundCard from "./RoundCard";

type BracketProps = {
    teams: Team[];
    matches: Match[];
};

export default function Bracket({ teams, matches }: BracketProps) {
    const rounds = new Map<Round, Match[]>();

    matches.forEach((match) => {
        const key = match.round;
        if (!rounds.has(key)) {
            rounds.set(key, []);
        }
        rounds.get(key)!.push(match);
    });

    rounds.forEach((matches, _) => {
        matches.sort((a, b) => {
            const aMinSeed = Math.min(a.teams.team1.seed, a.teams.team2.seed);
            const bMinSeed = Math.min(b.teams.team1.seed, b.teams.team2.seed);
            return aMinSeed - bMinSeed;
        });
    });

    const qualifiedTeams: Team[] = teams.filter((team) => team.win >= 3);
    const eliminatedTeams: Team[] = teams.filter((team) => team.loss >= 3);

    return (
        <div className="flex flex-row items-center overflow-x-auto">
            <RoundSection round_num={1}>
                <RoundCard round="0-0" matches={rounds.get("0-0")} />
            </RoundSection>

            <RoundSection round_num={2}>
                <RoundCard round="1-0" matches={rounds.get("1-0")} />
                <RoundCard round="0-1" matches={rounds.get("0-1")} />
            </RoundSection>

            <RoundSection round_num={3}>
                <RoundCard round="2-0" matches={rounds.get("2-0")} />
                <RoundCard round="1-1" matches={rounds.get("1-1")} />
                <RoundCard round="0-2" matches={rounds.get("0-2")} />
            </RoundSection>

            <RoundSection round_num={4}>
                {/* <div>
                    {qualifiedTeams
                        .filter((t) => t.loss === 0)
                        .map((t, i) => (
                            <QualElimCard key={i} team={t} qualified={true} />
                        ))}
                </div> */}
                <RoundCard round="2-1" matches={rounds.get("2-1")} />{" "}
                <RoundCard round="1-2" matches={rounds.get("1-2")} />
                {/* <div>
                    {eliminatedTeams
                        .filter((t) => t.win === 0)
                        .map((t, i) => (
                            <QualElimCard key={i} team={t} qualified={false} />
                        ))}
                </div> */}
            </RoundSection>

            <RoundSection round_num={5}>
                <div>
                    {qualifiedTeams
                        .filter((t) => t.loss === 1)
                        .map((t, i) => (
                            <QualElimCard key={i} team={t} qualified={true} />
                        ))}
                </div>
                <RoundCard round="2-2" matches={rounds.get("2-2")} />
                <div>
                    {eliminatedTeams
                        .filter((t) => t.win === 1)
                        .map((t, i) => (
                            <QualElimCard key={i} team={t} qualified={false} />
                        ))}
                </div>
            </RoundSection>
        </div>
    );
}
