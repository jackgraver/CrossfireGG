import type { Match, Team } from "../../types/Types";
import RoundCard from "./RoundCard";
import RoundSection from "./RoundSection";
import { groupMatchesByRoundAndSort } from "./Bracket.util";

type PlayoffBracketProps = {
    teams: Team[];
    matches: Match[];
};

export default function PlayoffBracket({
    teams,
    matches,
}: PlayoffBracketProps) {
    const rounds = groupMatchesByRoundAndSort(matches);

    return (
        <div className="flex flex-row items-center overflow-x-auto">
            <RoundSection round_num={1}>
                <RoundCard round="RO16" matches={rounds.get("RO16")} />
            </RoundSection>

            <RoundSection round_num={2}>
                <RoundCard round="QF" matches={rounds.get("QF")} />
            </RoundSection>

            <RoundSection round_num={3}>
                <RoundCard round="SF" matches={rounds.get("SF")} />
            </RoundSection>

            <RoundSection round_num={4}>
                <RoundCard round="F" matches={rounds.get("F")} />
            </RoundSection>
        </div>
    );
}
