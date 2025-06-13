// import { FAKEMATCHES } from "../../lib/Mock";
import type { Round, Match, Team } from "../../types/Types";
import RoundCard from "./RoundSection";

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
    console.log(rounds);

    const qualifiedTeams: Team[] = teams.filter((team) => team.win >= 3);
    const eliminatedTeams: Team[] = teams.filter((team) => team.loss >= 3);

    return (
        <div className="flex flex-row justify-center items-center">
            <div className="flex flex-col">
                <RoundCard round="0-0" matches={rounds.get("0-0")} />
            </div>
            <div className="flex flex-col">
                <RoundCard round="1-0" matches={rounds.get("1-0")} />
                <RoundCard round="0-1" matches={rounds.get("0-1")} />
            </div>

            <div className="flex flex-col">
                <div>
                    {qualifiedTeams
                        .filter((t) => t.loss === 0)
                        .map((t, i) => (
                            <span key={i}>{t.team_name}</span>
                        ))}
                </div>
                <RoundCard round="2-0" matches={rounds.get("2-0")} />
                <RoundCard round="1-1" matches={rounds.get("1-1")} />
                <RoundCard round="0-2" matches={rounds.get("0-2")} />
                <div>
                    {eliminatedTeams
                        .filter((t) => t.win === 0)
                        .map((t, i) => (
                            <span key={i}>{t.team_name}</span>
                        ))}
                </div>
            </div>

            <div className="flex flex-col">
                <div>
                    {qualifiedTeams
                        .filter((t) => t.loss === 1)
                        .map((t, i) => (
                            <span key={i}>{t.team_name}</span>
                        ))}
                </div>
                <RoundCard round="2-1" matches={rounds.get("2-1")} />{" "}
                <RoundCard round="1-2" matches={rounds.get("1-2")} />
                <div>
                    {eliminatedTeams
                        .filter((t) => t.win === 1)
                        .map((t, i) => (
                            <span key={i}>{t.team_name}</span>
                        ))}
                </div>
            </div>

            <div className="flex flex-col">
                <div>
                    {qualifiedTeams
                        .filter((t) => t.loss === 2)
                        .map((t, i) => (
                            <span key={i}>{t.team_name}</span>
                        ))}
                </div>
                <RoundCard round="2-2" matches={rounds.get("2-2")} />
                <div>
                    {eliminatedTeams
                        .filter((t) => t.win === 2)
                        .map((t, i) => (
                            <span key={i}>{t.team_name}</span>
                        ))}
                </div>
            </div>
        </div>
    );
}
