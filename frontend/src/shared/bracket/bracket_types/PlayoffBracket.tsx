import type { Match } from "../../../types/Types";
import RoundCard from "../components/RoundCard";
import RoundSection from "../components/RoundSection";
import { filterAndSortMatchesByRound } from "../Bracket.util";

type PlayoffBracketProps = {
    matches: Match[];
};

export default function PlayoffBracket({ matches }: PlayoffBracketProps) {
    return (
        <div className="flex flex-row overflow-x-auto">
            <RoundSection round_num={1}>
                <RoundCard
                    round="RO16"
                    matches={filterAndSortMatchesByRound(matches, "1")}
                />
            </RoundSection>
            <RoundSection round_num={2}>
                <RoundCard
                    round="QF"
                    matches={filterAndSortMatchesByRound(matches, "QF")}
                />
            </RoundSection>
            <RoundSection round_num={3}>
                <RoundCard
                    round="SF"
                    matches={filterAndSortMatchesByRound(matches, "SF")}
                />
            </RoundSection>
            <RoundSection round_num={4}>
                <RoundCard
                    round="F"
                    matches={filterAndSortMatchesByRound(matches, "F")}
                />
            </RoundSection>
        </div>
    );
}
