import type { Match } from "../../../types/Types";
import type { Team } from "@/types/TeamModel";
import RoundSection from "../components/RoundSection";
import RoundCard from "../components/RoundCard";
import { filterAndSortMatchesByRound, groupMatchesByRoundAndSort } from "../Bracket.util";

type BracketProps = {
    matches: Match[];
};

export default function RegularSeasonBracket({ matches }: BracketProps) {
    return (
        <div className="flex flex-row items-center overflow-x-auto">
            <RoundSection round_num={1}>
                <RoundCard round="0-0" matches={filterAndSortMatchesByRound(matches, "0-0")} />
            </RoundSection>
            <RoundSection round_num={2}>
                <RoundCard round="1-0" matches={filterAndSortMatchesByRound(matches, "1-0")} />
                <RoundCard round="0-1" matches={filterAndSortMatchesByRound(matches, "0-1")} />
            </RoundSection>
            <RoundSection round_num={3}>
                <RoundCard round="2-0" matches={filterAndSortMatchesByRound(matches, "2-0")} />
                <RoundCard round="1-1" matches={filterAndSortMatchesByRound(matches, "1-1")} />
                <RoundCard round="0-2" matches={filterAndSortMatchesByRound(matches, "0-2")} />
            </RoundSection>
            <RoundSection round_num={4}>
                <RoundCard round="2-1" matches={filterAndSortMatchesByRound(matches, "2-1")} />
                <RoundCard round="1-2" matches={filterAndSortMatchesByRound(matches, "1-2")} />
            </RoundSection>
            <RoundSection round_num={5}>
                <RoundCard round="2-2" matches={filterAndSortMatchesByRound(matches, "2-2")} />
            </RoundSection>
        </div>
    );
}
