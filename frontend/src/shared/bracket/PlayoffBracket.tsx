import type { Match } from "../../types/Types";
import type { Team } from "@/types/TeamModel";
import RoundCard from "./RoundCard";
import RoundSection from "./RoundSection";
import { filterAndSortMatchesByRound } from "./Bracket.util";

type PlayoffBracketProps = {
    matches: Match[];
};

export default function PlayoffBracket({ matches }: PlayoffBracketProps) {
    return (
        <div className="flex flex-row items-center overflow-x-auto">
            <RoundSection round_num={1}>
                <RoundCard
                    round="RO16"
                    matches={filterAndSortMatchesByRound(matches, "RO16")}
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
